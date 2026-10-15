import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { Eye, RotateCcw, Sparkles, Layers, Info } from 'lucide-react';

interface KMapTorus3DProps {
  kmapCells: Record<number, '0' | '1' | 'X'>;
  onCellToggle?: (index: number) => void;
  className?: string;
}

export const KMapTorus3D: React.FC<KMapTorus3DProps> = ({
  kmapCells,
  onCellToggle,
  className = ''
}) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [hoveredCell, setHoveredCell] = useState<number | null>(null);
  const [highlightCorners, setHighlightCorners] = useState<boolean>(false);

  // K-Map 4-variable Gray code cell mapping:
  // Rows (AB): 00, 01, 11, 10 (indices: row 0, 1, 2, 3)
  // Cols (CD): 00, 01, 11, 10 (indices: col 0, 1, 2, 3)
  // 16 Minterms matrix:
  // [  0,  1,  3,  2 ]  (row 00)
  // [  4,  5,  7,  6 ]  (row 01)
  // [ 12, 13, 15, 14 ]  (row 11)
  // [  8,  9, 11, 10 ]  (row 10)
  const cellGrid = [
    [0, 1, 3, 2],
    [4, 5, 7, 6],
    [12, 13, 15, 14],
    [8, 9, 11, 10]
  ];

  const torusMeshRef = useRef<THREE.Mesh | null>(null);
  const cellMeshListRef = useRef<{ id: number; mesh: THREE.Mesh; pos: THREE.Vector3 }[]>([]);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const scene = new THREE.Scene();
    scene.background = null;

    const width = container.clientWidth || 500;
    const height = container.clientHeight || 360;

    const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 100);
    camera.position.set(0, 3.5, 5.5);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.minDistance = 3.5;
    controls.maxDistance = 10;

    // Lighting
    const ambient = new THREE.AmbientLight(0xffffff, 0.85);
    scene.add(ambient);

    const dirLight = new THREE.DirectionalLight(0xffffff, 1.2);
    dirLight.position.set(5, 8, 5);
    scene.add(dirLight);

    const backLight = new THREE.PointLight(0xcc785c, 1.2, 10);
    backLight.position.set(-3, -2, -3);
    scene.add(backLight);

    // Torus Geometry Parameters
    const majorRadius = 1.8; // Distance from center of tube to center of torus
    const minorRadius = 0.75; // Radius of tube

    // Semi-transparent base torus
    const torusGeo = new THREE.TorusGeometry(majorRadius, minorRadius, 32, 64);
    const torusMat = new THREE.MeshPhysicalMaterial({
      color: 0xefe9de,
      roughness: 0.2,
      metalness: 0.1,
      transparent: true,
      opacity: 0.35,
      side: THREE.DoubleSide
    });
    const mainTorus = new THREE.Mesh(torusGeo, torusMat);
    mainTorus.rotation.x = Math.PI / 2;
    scene.add(mainTorus);
    torusMeshRef.current = mainTorus;

    // Create 16 3D Cell Markers on the Torus Surface
    const cellMeshes: { id: number; mesh: THREE.Mesh; pos: THREE.Vector3 }[] = [];
    const numRows = 4;
    const numCols = 4;

    for (let r = 0; r < numRows; r++) {
      for (let c = 0; c < numCols; c++) {
        const minterm = cellGrid[r][c];

        // Angle around the major circle (rows AB wrapping around)
        const u = (r / numRows) * Math.PI * 2;
        // Angle around the minor circle (cols CD wrapping around)
        const v = (c / numCols) * Math.PI * 2;

        // Torus coordinate formulas:
        const x = (majorRadius + minorRadius * Math.cos(v)) * Math.cos(u);
        const y = minorRadius * Math.sin(v);
        const z = (majorRadius + minorRadius * Math.cos(v)) * Math.sin(u);

        // Marker box
        const boxGeo = new THREE.BoxGeometry(0.32, 0.12, 0.32);
        const boxMat = new THREE.MeshStandardMaterial({
          color: 0xd8d2c7,
          roughness: 0.3,
          metalness: 0.2
        });
        const box = new THREE.Mesh(boxGeo, boxMat);
        box.position.set(x, y, z);
        box.lookAt(x * 1.5, y * 1.5, z * 1.5);
        scene.add(box);

        cellMeshes.push({ id: minterm, mesh: box, pos: new THREE.Vector3(x, y, z) });
      }
    }
    cellMeshListRef.current = cellMeshes;

    // Subtle continuous rotation
    let animId: number;
    const animate = () => {
      animId = requestAnimationFrame(animate);
      if (mainTorus) {
        mainTorus.rotation.z += 0.002;
      }
      controls.update();
      renderer.render(scene, camera);
    };
    animate();

    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
      renderer.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  // Update cell materials based on kmapCells state and corner highlight
  useEffect(() => {
    cellMeshListRef.current.forEach(({ id, mesh }) => {
      const val = kmapCells[id] || '0';
      const isCorner = [0, 2, 8, 10].includes(id);
      const isHighlighted = highlightCorners && isCorner;

      const mat = mesh.material as THREE.MeshStandardMaterial;

      if (isHighlighted) {
        mat.color.setHex(0xcc785c); // Coral corner highlight!
        mesh.scale.set(1.4, 1.4, 1.4);
      } else if (val === '1') {
        mat.color.setHex(0x5db8a6); // Teal 1
        mesh.scale.set(1.15, 1.15, 1.15);
      } else if (val === 'X') {
        mat.color.setHex(0xe8a55a); // Amber Don't Care
        mesh.scale.set(1.1, 1.1, 1.1);
      } else {
        mat.color.setHex(0xd8d2c7); // Muted gray 0
        mesh.scale.set(1, 1, 1);
      }
    });
  }, [kmapCells, highlightCorners]);

  return (
    <div className={`relative flex flex-col rounded-2xl bg-white dark:bg-[#131b2e] border border-[#e2e8f0] dark:border-[#1e293b] shadow-sm overflow-hidden ${className}`}>
      
      {/* 3D Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-[#e2e8f0] dark:border-[#1e293b] bg-[#f8fafc]/90 dark:bg-[#131b2e]/90 backdrop-blur-sm z-10">
        <div className="flex items-center space-x-2">
          <span className="w-2 h-2 rounded-full bg-[#0066cc] animate-pulse" />
          <span className="font-heading text-sm font-bold text-[#0f172a] dark:text-[#f8fafc]">
            3D K-Map Torus Topology (ทอรัสรูปโดนัท)
          </span>
          <span className="text-xs font-mono px-2 py-0.5 rounded bg-[#0066cc]/10 dark:bg-[#0066cc]/20 text-[#0066cc] dark:text-[#38bdf8] border border-[#0066cc]/20">
            Topological Adjacency
          </span>
        </div>

        <button
          onClick={() => setHighlightCorners(prev => !prev)}
          className={`px-3 py-1 rounded-lg text-xs font-semibold flex items-center space-x-1.5 transition cursor-pointer ${
            highlightCorners 
              ? 'bg-[#0066cc] text-white shadow-sm' 
              : 'bg-white dark:bg-[#1e293b] text-[#334155] dark:text-[#f8fafc] border border-[#e2e8f0] dark:border-[#334155]'
          }`}
          title="แสดงกลุ่ม 4 มุม (m0, m2, m8, m10) ว่าชิดติดกันจริงในมิติ 3D"
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>{highlightCorners ? 'ซ่อนการไฮไลต์ 4 มุม' : 'จำลองกลุ่ม 4 มุม (m0, m2, m8, m10)'}</span>
        </button>
      </div>

      {/* 3D Canvas */}
      <div 
        ref={mountRef} 
        className="w-full h-72 sm:h-80 relative cursor-grab active:cursor-grabbing select-none"
      />

      {/* 3D Explanatory Banner */}
      <div className="p-3.5 bg-[#f8fafc]/95 dark:bg-[#101726]/95 border-t border-[#e2e8f0] dark:border-[#1e293b] text-xs text-[#475569] dark:text-[#94a3b8] flex items-start space-x-2.5">
        <Info className="w-4 h-4 text-[#0066cc] dark:text-[#38bdf8] shrink-0 mt-0.5" />
        <div className="leading-relaxed">
          <strong className="text-[#0f172a] dark:text-[#f8fafc]">ทำไมขอบ K-Map ถึงวงข้ามกันได้? </strong>
          ในทางคณิตศาสตร์ แผนผัง K-Map 4 ตัวแปรมีลักษณะพื้นผิวแบบ <strong>Torus (โดนัท 3 มิติ)</strong> โดยขอบซ้ายจะม้วนมาติดกับขอบขวา และขอบบนจะม้วนมาติดกับขอบล่าง ทำให้เซลล์มุมทั้ง 4 มุม (<code className="font-mono text-[#0066cc] dark:text-[#38bdf8]">m0, m2, m8, m10</code>) สัมผัสติดกันเป็นกลุ่มสี่เหลี่ยมเดียวกันใน 3D ลดรูปเหลือเพียง <code className="font-mono font-bold text-[#0066cc] dark:text-[#38bdf8]">B'D'</code>
        </div>
      </div>

    </div>
  );
};
