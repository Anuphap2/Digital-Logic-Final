import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { Play, Pause, RotateCcw, Droplets, Zap, Info, Eye } from 'lucide-react';

interface WaterTank3DProps {
  waterLevel: number;
  setWaterLevel: (val: number | ((prev: number) => number)) => void;
  fsmState: 0 | 1;
  pumpOutput: number;
  sensorA: number;
  sensorB: number;
  isAutoRunning?: boolean;
  setIsAutoRunning?: (val: boolean | ((prev: boolean) => boolean)) => void;
  className?: string;
}

export const WaterTank3D: React.FC<WaterTank3DProps> = ({
  waterLevel,
  setWaterLevel,
  fsmState,
  pumpOutput,
  sensorA,
  sensorB,
  isAutoRunning = true,
  setIsAutoRunning,
  className = ''
}) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [internalAuto, setInternalAuto] = useState<boolean>(isAutoRunning);
  const autoRunning = setIsAutoRunning ? isAutoRunning : internalAuto;
  const toggleAuto = () => {
    if (setIsAutoRunning) {
      setIsAutoRunning(prev => !prev);
    } else {
      setInternalAuto(prev => !prev);
    }
  };

  // Three.js object references
  const waterMeshRef = useRef<THREE.Mesh | null>(null);
  const sensorABuoyRef = useRef<THREE.Mesh | null>(null);
  const sensorBBuoyRef = useRef<THREE.Mesh | null>(null);
  const pumpImpellerRef = useRef<THREE.Group | null>(null);
  const waterFlowParticlesRef = useRef<THREE.Points | null>(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // 1. Scene, Camera, Renderer
    const scene = new THREE.Scene();
    scene.background = null; // transparent background

    const width = container.clientWidth || 500;
    const height = container.clientHeight || 380;

    const camera = new THREE.PerspectiveCamera(42, width / height, 0.1, 1000);
    camera.position.set(0, 3.5, 7.5);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFShadowMap;
    container.appendChild(renderer.domElement);

    // Orbit Controls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.maxPolarAngle = Math.PI / 2 + 0.1;
    controls.minDistance = 4;
    controls.maxDistance = 14;
    controls.target.set(0, 1.2, 0);

    // 2. Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.85);
    scene.add(ambientLight);

    const dirLight = new THREE.DirectionalLight(0xffffff, 1.2);
    dirLight.position.set(5, 10, 7);
    dirLight.castShadow = true;
    dirLight.shadow.mapSize.width = 1024;
    dirLight.shadow.mapSize.height = 1024;
    scene.add(dirLight);

    const blueLight = new THREE.PointLight(0x5db8a6, 1.5, 15);
    blueLight.position.set(-3, 3, 2);
    scene.add(blueLight);

    const coralLight = new THREE.PointLight(0xcc785c, 1.2, 12);
    coralLight.position.set(3, 1, 3);
    scene.add(coralLight);

    // 3. Tank Geometry (Acrylic Cylinder)
    const tankRadius = 1.6;
    const tankHeight = 3.6;

    // Glass Tank Cylinder
    const glassGeo = new THREE.CylinderGeometry(tankRadius, tankRadius, tankHeight, 36, 1, true);
    const glassMat = new THREE.MeshPhysicalMaterial({
      color: 0xeef5f8,
      transparent: true,
      opacity: 0.28,
      roughness: 0.05,
      metalness: 0.1,
      transmission: 0.9,
      ior: 1.45,
      side: THREE.DoubleSide,
      depthWrite: false,
    });
    const tankMesh = new THREE.Mesh(glassGeo, glassMat);
    tankMesh.position.y = tankHeight / 2;
    scene.add(tankMesh);

    // Tank Base (Metallic / Matte Base)
    const baseGeo = new THREE.CylinderGeometry(tankRadius + 0.15, tankRadius + 0.25, 0.25, 36);
    const baseMat = new THREE.MeshStandardMaterial({
      color: 0xd8d2c7,
      roughness: 0.4,
      metalness: 0.3,
    });
    const baseMesh = new THREE.Mesh(baseGeo, baseMat);
    baseMesh.position.y = 0.125;
    scene.add(baseMesh);

    // Tank Top Ring
    const ringGeo = new THREE.TorusGeometry(tankRadius, 0.06, 16, 48);
    const ringMat = new THREE.MeshStandardMaterial({ color: 0xcc785c, roughness: 0.3, metalness: 0.6 });
    const ringMesh = new THREE.Mesh(ringGeo, ringMat);
    ringMesh.rotation.x = Math.PI / 2;
    ringMesh.position.y = tankHeight;
    scene.add(ringMesh);

    // Measurement ruler lines on tank glass
    const graduationGroup = new THREE.Group();
    for (let i = 1; i <= 4; i++) {
      const lineH = (tankHeight / 5) * i;
      const markerGeo = new THREE.TorusGeometry(tankRadius + 0.01, 0.012, 8, 36);
      const markerMat = new THREE.MeshBasicMaterial({ color: 0x8e8b82, transparent: true, opacity: 0.4 });
      const marker = new THREE.Mesh(markerGeo, markerMat);
      marker.rotation.x = Math.PI / 2;
      marker.position.y = lineH;
      graduationGroup.add(marker);
    }
    scene.add(graduationGroup);

    // 4. Dynamic Water Cylinder
    const waterRadius = tankRadius - 0.03;
    const waterGeo = new THREE.CylinderGeometry(waterRadius, waterRadius, 1, 32, 1);
    const waterMat = new THREE.MeshStandardMaterial({
      color: 0x38bdf8,
      transparent: true,
      opacity: 0.72,
      roughness: 0.1,
      metalness: 0.1,
      side: THREE.DoubleSide
    });
    const waterMesh = new THREE.Mesh(waterGeo, waterMat);
    waterMesh.position.y = 0.5;
    scene.add(waterMesh);
    waterMeshRef.current = waterMesh;

    // 5. Sensor A (Bottom: 30%) and Sensor B (Top: 75%) Indicators
    // Level heights in 3D:
    const sensorAY = tankHeight * 0.30;
    const sensorBY = tankHeight * 0.75;

    // Sensor mounting rods outside tank
    const rodGeo = new THREE.CylinderGeometry(0.03, 0.03, tankHeight, 16);
    const rodMat = new THREE.MeshStandardMaterial({ color: 0x5a5854, metalness: 0.7, roughness: 0.3 });
    const rod = new THREE.Mesh(rodGeo, rodMat);
    rod.position.set(tankRadius + 0.3, tankHeight / 2, 0);
    scene.add(rod);

    // Sensor A Probe and Buoy
    const probeAGeo = new THREE.CylinderGeometry(0.02, 0.02, 0.45, 12);
    const probeAMat = new THREE.MeshStandardMaterial({ color: 0xe8a55a, metalness: 0.6 });
    const probeA = new THREE.Mesh(probeAGeo, probeAMat);
    probeA.rotation.z = Math.PI / 2;
    probeA.position.set(tankRadius + 0.1, sensorAY, 0);
    scene.add(probeA);

    const buoyGeo = new THREE.SphereGeometry(0.14, 20, 20);
    const buoyAMat = new THREE.MeshStandardMaterial({ color: 0xe8a55a, roughness: 0.2 });
    const buoyA = new THREE.Mesh(buoyGeo, buoyAMat);
    buoyA.position.set(tankRadius - 0.25, sensorAY, 0);
    scene.add(buoyA);
    sensorABuoyRef.current = buoyA;

    // Sensor B Probe and Buoy
    const probeB = new THREE.Mesh(probeAGeo, probeAMat);
    probeB.rotation.z = Math.PI / 2;
    probeB.position.set(tankRadius + 0.1, sensorBY, 0);
    scene.add(probeB);

    const buoyBMat = new THREE.MeshStandardMaterial({ color: 0xc64545, roughness: 0.2 });
    const buoyB = new THREE.Mesh(buoyGeo, buoyBMat);
    buoyB.position.set(tankRadius - 0.25, sensorBY, 0);
    scene.add(buoyB);
    sensorBBuoyRef.current = buoyB;

    // 6. Centrifugal Pump Motor (3D Pump unit next to tank)
    const pumpGroup = new THREE.Group();
    pumpGroup.position.set(tankRadius + 1.2, 0.4, 0);

    // Motor housing
    const motorBodyGeo = new THREE.CylinderGeometry(0.35, 0.35, 0.7, 24);
    const motorMat = new THREE.MeshStandardMaterial({ color: 0x252320, roughness: 0.5, metalness: 0.8 });
    const motorBody = new THREE.Mesh(motorBodyGeo, motorMat);
    motorBody.rotation.z = Math.PI / 2;
    pumpGroup.add(motorBody);

    // Motor Impeller (Spins when active)
    const impellerGroup = new THREE.Group();
    for (let b = 0; b < 4; b++) {
      const bladeGeo = new THREE.BoxGeometry(0.04, 0.28, 0.08);
      const bladeMat = new THREE.MeshStandardMaterial({ color: 0xcc785c, metalness: 0.5 });
      const blade = new THREE.Mesh(bladeGeo, bladeMat);
      blade.rotation.x = (Math.PI / 2) * b;
      impellerGroup.add(blade);
    }
    impellerGroup.position.set(0.38, 0, 0);
    pumpGroup.add(impellerGroup);
    pumpImpellerRef.current = impellerGroup;

    // Connecting Pipe from tank to pump
    const pipeGeo = new THREE.CylinderGeometry(0.1, 0.1, 0.9, 16);
    const pipeMat = new THREE.MeshStandardMaterial({ color: 0x8e8b82, metalness: 0.8, roughness: 0.2 });
    const pipe = new THREE.Mesh(pipeGeo, pipeMat);
    pipe.rotation.z = Math.PI / 2;
    pipe.position.set(-0.55, -0.15, 0);
    pumpGroup.add(pipe);

    scene.add(pumpGroup);

    // 7. Water Particle Flow (when pump is active)
    const particleCount = 60;
    const particleGeo = new THREE.BufferGeometry();
    const particlePos = new Float32Array(particleCount * 3);
    for (let p = 0; p < particleCount; p++) {
      particlePos[p * 3] = (Math.random() - 0.5) * 1.5;
      particlePos[p * 3 + 1] = Math.random() * 3;
      particlePos[p * 3 + 2] = (Math.random() - 0.5) * 1.5;
    }
    particleGeo.setAttribute('position', new THREE.BufferAttribute(particlePos, 3));
    const particleMat = new THREE.PointsMaterial({
      color: 0x67e8f9,
      size: 0.05,
      transparent: true,
      opacity: 0.6
    });
    const particles = new THREE.Points(particleGeo, particleMat);
    scene.add(particles);
    waterFlowParticlesRef.current = particles;

    // 8. Animation Loop
    let animId: number;

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const elapsedTime = performance.now() * 0.001;

      // Rotate pump blades if pump is ON
      if (pumpImpellerRef.current && pumpOutput === 1) {
        pumpImpellerRef.current.rotation.x += 0.25;
      }

      // Animate water flow particles
      if (waterFlowParticlesRef.current) {
        const positions = waterFlowParticlesRef.current.geometry.attributes.position.array as Float32Array;
        for (let i = 0; i < particleCount; i++) {
          if (pumpOutput === 1) {
            positions[i * 3 + 1] -= 0.04;
            if (positions[i * 3 + 1] < 0) {
              positions[i * 3 + 1] = 3.2;
            }
          }
        }
        waterFlowParticlesRef.current.geometry.attributes.position.needsUpdate = true;
        waterFlowParticlesRef.current.visible = pumpOutput === 1;
      }

      controls.update();
      renderer.render(scene, camera);
    };

    animate();

    // Resize handler
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

  // Sync Water Level with 3D Water Mesh
  useEffect(() => {
    if (waterMeshRef.current) {
      const tankH = 3.6;
      const curH = Math.max((waterLevel / 100) * tankH, 0.05);
      waterMeshRef.current.scale.set(1, curH, 1);
      waterMeshRef.current.position.y = curH / 2 + 0.1;

      // Color shift based on temperature or state
      const mat = waterMeshRef.current.material as THREE.MeshStandardMaterial;
      if (fsmState === 0) {
        mat.color.setHex(0x38bdf8); // Fresh Filling Cyan
      } else {
        mat.color.setHex(0x2dd4bf); // Draining Teal
      }
    }

    // Glow effect on buoys when submerged
    if (sensorABuoyRef.current) {
      const matA = sensorABuoyRef.current.material as THREE.MeshStandardMaterial;
      matA.color.setHex(sensorA === 1 ? 0x22c55e : 0xe8a55a); // Green when sensor a is wet!
    }
    if (sensorBBuoyRef.current) {
      const matB = sensorBBuoyRef.current.material as THREE.MeshStandardMaterial;
      matB.color.setHex(sensorB === 1 ? 0x22c55e : 0xc64545); // Green when sensor b is wet!
    }
  }, [waterLevel, fsmState, sensorA, sensorB]);

  return (
    <div className={`relative flex flex-col rounded-2xl bg-white dark:bg-[#131b2e] border border-[#e2e8f0] dark:border-[#1e293b] shadow-sm overflow-hidden ${className}`}>
      
      {/* 3D Canvas Header Bar */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-[#e2e8f0] dark:border-[#1e293b] bg-[#f8fafc]/90 dark:bg-[#131b2e]/90 backdrop-blur-sm z-10">
        <div className="flex items-center space-x-2">
          <span className="w-2 h-2 rounded-full bg-[#0066cc] animate-pulse" />
          <span className="font-heading text-sm font-bold text-[#0f172a] dark:text-[#f8fafc]">
            3D Interactive Water Tank Model
          </span>
          <span className="text-xs font-mono px-2 py-0.5 rounded bg-[#0066cc]/10 dark:bg-[#0066cc]/20 text-[#0066cc] dark:text-[#38bdf8] border border-[#0066cc]/20">
            Three.js WebGL
          </span>
        </div>

        <div className="flex items-center space-x-2 text-xs">
          <span className="text-xs text-[#64748b] dark:text-[#94a3b8] flex items-center gap-1 font-mono">
            <Eye className="w-3.5 h-3.5" />
            <span>คลิกลากเพื่อหมุน 3D</span>
          </span>
          <button
            onClick={toggleAuto}
            className={`px-2.5 py-1 rounded-lg text-xs font-semibold flex items-center space-x-1 transition cursor-pointer ${
              autoRunning 
                ? 'bg-[#0066cc] text-white shadow-sm' 
                : 'bg-white dark:bg-[#1e293b] text-[#334155] dark:text-[#f8fafc] border border-[#e2e8f0] dark:border-[#334155]'
            }`}
            title="เปิด/ปิดการจำลองระดับน้ำอัตโนมัติ"
          >
            {autoRunning ? <Pause className="w-3 h-3" /> : <Play className="w-3 h-3" />}
            <span>{autoRunning ? 'หยุดชั่วคราว' : 'เล่นต่อ'}</span>
          </button>
        </div>
      </div>

      {/* 3D WebGL Canvas Container */}
      <div 
        ref={mountRef} 
        className="w-full h-80 sm:h-96 relative cursor-grab active:cursor-grabbing select-none"
      />

      {/* 3D Status Overlay Chips */}
      <div className="absolute top-14 left-4 z-10 space-y-1.5 pointer-events-none">
        <div className="px-2.5 py-1 rounded-lg bg-white/95 dark:bg-[#131b2e]/95 border border-[#e2e8f0] dark:border-[#1e293b] text-xs shadow-sm backdrop-blur-sm flex items-center space-x-2">
          <span className="font-mono font-semibold text-[#0f172a] dark:text-[#f8fafc]">ระดับน้ำจริง:</span>
          <span className="font-mono font-bold text-[#0066cc] dark:text-[#38bdf8]">{Math.round(waterLevel)}%</span>
        </div>

        <div className="px-2.5 py-1 rounded-lg bg-white/95 dark:bg-[#131b2e]/95 border border-[#e2e8f0] dark:border-[#1e293b] text-xs shadow-sm backdrop-blur-sm flex items-center space-x-2">
          <span className={`w-2 h-2 rounded-full ${sensorB === 1 ? 'bg-emerald-500' : 'bg-rose-500'}`} />
          <span className="font-mono text-[#334155] dark:text-[#f8fafc]">เซนเซอร์ b (บน):</span>
          <span className="font-mono font-bold">{sensorB === 1 ? '1 (จุ่มน้ำ)' : '0 (ไม่จุ่ม)'}</span>
        </div>

        <div className="px-2.5 py-1 rounded-lg bg-white/95 dark:bg-[#131b2e]/95 border border-[#e2e8f0] dark:border-[#1e293b] text-xs shadow-sm backdrop-blur-sm flex items-center space-x-2">
          <span className={`w-2 h-2 rounded-full ${sensorA === 1 ? 'bg-emerald-500' : 'bg-amber-500'}`} />
          <span className="font-mono text-[#334155] dark:text-[#f8fafc]">เซนเซอร์ a (ล่าง):</span>
          <span className="font-mono font-bold">{sensorA === 1 ? '1 (จุ่มน้ำ)' : '0 (ไม่จุ่ม)'}</span>
        </div>
      </div>

      {/* Floating State Hologram (Right Side) */}
      <div className="absolute top-14 right-4 z-10 pointer-events-none">
        <div className={`px-3 py-2 rounded-xl text-xs font-mono font-bold shadow-md border backdrop-blur-md ${
          pumpOutput === 1
            ? 'bg-emerald-500/20 border-emerald-500 text-emerald-600 dark:text-emerald-400'
            : 'bg-rose-500/20 border-rose-500 text-rose-600 dark:text-rose-400'
        }`}>
          <div className="text-xs uppercase tracking-wider text-opacity-80">
            {pumpOutput === 1 ? 'ปั๊มสูบน้ำเข้า (ON)' : 'ปิดปั๊มน้ำ (OFF)'}
          </div>
          <div className="text-sm">
            State S = {fsmState} | Output y = {pumpOutput}
          </div>
        </div>
      </div>

      {/* Interactive Level Slider and Quick Actions Footer */}
      <div className="p-4 bg-[#f8fafc]/95 dark:bg-[#101726]/95 border-t border-[#e2e8f0] dark:border-[#1e293b] flex flex-col sm:flex-row items-center justify-between gap-3 z-10">
        <div className="w-full sm:w-auto flex-1 flex items-center space-x-3">
          <span className="text-xs text-[#64748b] dark:text-[#94a3b8] font-mono shrink-0">
            ปรับระดับน้ำด้วยตนเอง:
          </span>
          <input
            type="range"
            min="0"
            max="100"
            value={Math.round(waterLevel)}
            onChange={(e) => setWaterLevel(Number(e.target.value))}
            className="flex-1 accent-[#0066cc] cursor-pointer"
          />
        </div>

        <div className="flex items-center space-x-2 shrink-0">
          <button
            onClick={() => setWaterLevel(10)}
            className="px-3 py-1.5 rounded-lg text-xs font-medium bg-white dark:bg-[#1e293b] hover:bg-[#f1f5f9] dark:hover:bg-[#334155] text-[#334155] dark:text-[#f8fafc] border border-[#e2e8f0] dark:border-[#334155] transition cursor-pointer"
          >
            น้ำแห้ง (10%)
          </button>
          <button
            onClick={() => setWaterLevel(85)}
            className="px-3 py-1.5 rounded-lg text-xs font-medium bg-white dark:bg-[#1e293b] hover:bg-[#f1f5f9] dark:hover:bg-[#334155] text-[#334155] dark:text-[#f8fafc] border border-[#e2e8f0] dark:border-[#334155] transition cursor-pointer"
          >
            น้ำเต็ม (85%)
          </button>
        </div>
      </div>

    </div>
  );
};
