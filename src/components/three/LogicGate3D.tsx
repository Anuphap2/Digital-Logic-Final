import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { Cpu, Zap, Eye, RotateCcw } from 'lucide-react';

interface LogicGate3DProps {
  gateType: 'AND' | 'OR' | 'NAND' | 'NOR' | 'XOR' | 'NOT';
  inputA: number;
  inputB: number;
  output: number;
  setInputA: (val: number | ((prev: number) => number)) => void;
  setInputB: (val: number | ((prev: number) => number)) => void;
  className?: string;
}

export const LogicGate3D: React.FC<LogicGate3DProps> = ({
  gateType,
  inputA,
  inputB,
  output,
  setInputA,
  setInputB,
  className = ''
}) => {
  const mountRef = useRef<HTMLDivElement>(null);

  const ledLightRef = useRef<THREE.PointLight | null>(null);
  const ledMeshRef = useRef<THREE.Mesh | null>(null);
  const wireAMeshRef = useRef<THREE.Mesh | null>(null);
  const wireBMeshRef = useRef<THREE.Mesh | null>(null);
  const wireOutMeshRef = useRef<THREE.Mesh | null>(null);

  const chipPartNumbers: Record<string, string> = {
    AND: 'SN74HC08N (Quad AND)',
    OR: 'SN74HC32N (Quad OR)',
    NAND: 'SN74HC00N (Quad NAND)',
    NOR: 'SN74HC02N (Quad NOR)',
    XOR: 'SN74HC86N (Quad XOR)',
    NOT: 'SN74HC04N (Hex NOT)',
  };

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const scene = new THREE.Scene();
    scene.background = null;

    const width = container.clientWidth || 500;
    const height = container.clientHeight || 340;

    const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 100);
    camera.position.set(0, 4.2, 5.2);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    container.appendChild(renderer.domElement);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.maxPolarAngle = Math.PI / 2 + 0.1;
    controls.minDistance = 3;
    controls.maxDistance = 10;
    controls.target.set(0, 0, 0);

    // Lighting
    const ambient = new THREE.AmbientLight(0xffffff, 0.9);
    scene.add(ambient);

    const dirLight = new THREE.DirectionalLight(0xffffff, 1.4);
    dirLight.position.set(4, 8, 4);
    dirLight.castShadow = true;
    scene.add(dirLight);

    // 1. Breadboard / PCB Substrate
    const pcbGeo = new THREE.BoxGeometry(4.8, 0.2, 3.4);
    const pcbMat = new THREE.MeshStandardMaterial({
      color: 0x1f3d30, // PCB Green
      roughness: 0.6,
      metalness: 0.2
    });
    const pcb = new THREE.Mesh(pcbGeo, pcbMat);
    pcb.position.y = -0.1;
    scene.add(pcb);

    // PCB Solder Pads grid
    const padGroup = new THREE.Group();
    for (let x = -2; x <= 2; x += 0.35) {
      for (let z = -1.3; z <= 1.3; z += 0.35) {
        const padGeo = new THREE.CylinderGeometry(0.06, 0.06, 0.02, 12);
        const padMat = new THREE.MeshStandardMaterial({ color: 0xd4af37, metalness: 0.8, roughness: 0.3 });
        const pad = new THREE.Mesh(padGeo, padMat);
        pad.position.set(x, 0.01, z);
        padGroup.add(pad);
      }
    }
    scene.add(padGroup);

    // 2. DIP-14 IC Chip Body
    const chipBodyGeo = new THREE.BoxGeometry(2.4, 0.35, 1.1);
    const chipBodyMat = new THREE.MeshStandardMaterial({
      color: 0x1e1d1b, // Matte dark epoxy
      roughness: 0.5,
      metalness: 0.2
    });
    const chip = new THREE.Mesh(chipBodyGeo, chipBodyMat);
    chip.position.y = 0.3;
    scene.add(chip);

    // Notch on pin 1 side
    const notchGeo = new THREE.CylinderGeometry(0.12, 0.12, 0.36, 16, 1, false, 0, Math.PI);
    const notchMat = new THREE.MeshStandardMaterial({ color: 0x141413, roughness: 0.8 });
    const notch = new THREE.Mesh(notchGeo, notchMat);
    notch.position.set(-1.2, 0.3, 0);
    notch.rotation.y = Math.PI / 2;
    scene.add(notch);

    // 14 Metallic Pins
    const pinGroup = new THREE.Group();
    const pinMat = new THREE.MeshStandardMaterial({ color: 0xdadada, metalness: 0.9, roughness: 0.2 });
    for (let p = 0; p < 7; p++) {
      const px = -0.9 + p * 0.3;
      // Side 1
      const pin1Geo = new THREE.BoxGeometry(0.08, 0.35, 0.25);
      const pin1 = new THREE.Mesh(pin1Geo, pinMat);
      pin1.position.set(px, 0.17, 0.62);
      pinGroup.add(pin1);

      // Side 2
      const pin2 = new THREE.Mesh(pin1Geo, pinMat);
      pin2.position.set(px, 0.17, -0.62);
      pinGroup.add(pin2);
    }
    scene.add(pinGroup);

    // 3. Wires: Input A, Input B, Output
    const wireMatA = new THREE.MeshStandardMaterial({ color: 0x5a5854, roughness: 0.3 });
    const wireGeoA = new THREE.CylinderGeometry(0.04, 0.04, 1.0, 12);
    const wireA = new THREE.Mesh(wireGeoA, wireMatA);
    wireA.rotation.x = Math.PI / 2;
    wireA.position.set(-0.9, 0.1, 1.2);
    scene.add(wireA);
    wireAMeshRef.current = wireA;

    const wireMatB = new THREE.MeshStandardMaterial({ color: 0x5a5854, roughness: 0.3 });
    const wireB = new THREE.Mesh(wireGeoA, wireMatB);
    wireB.rotation.x = Math.PI / 2;
    wireB.position.set(-0.6, 0.1, 1.2);
    scene.add(wireB);
    wireBMeshRef.current = wireB;

    const wireMatOut = new THREE.MeshStandardMaterial({ color: 0x5a5854, roughness: 0.3 });
    const wireOut = new THREE.Mesh(wireGeoA, wireMatOut);
    wireOut.rotation.x = Math.PI / 2;
    wireOut.position.set(-0.3, 0.1, -1.2);
    scene.add(wireOut);
    wireOutMeshRef.current = wireOut;

    // 4. 3D Output LED Indicator
    const ledDomeGeo = new THREE.SphereGeometry(0.22, 20, 20, 0, Math.PI * 2, 0, Math.PI / 2);
    const ledMat = new THREE.MeshStandardMaterial({
      color: 0x6c6a64,
      transparent: true,
      opacity: 0.85,
      roughness: 0.1,
      metalness: 0.2
    });
    const ledMesh = new THREE.Mesh(ledDomeGeo, ledMat);
    ledMesh.position.set(-0.3, 0.15, -1.35);
    scene.add(ledMesh);
    ledMeshRef.current = ledMesh;

    const ledPointLight = new THREE.PointLight(0xcc785c, 0, 4);
    ledPointLight.position.set(-0.3, 0.4, -1.35);
    scene.add(ledPointLight);
    ledLightRef.current = ledPointLight;

    let animId: number;
    const animate = () => {
      animId = requestAnimationFrame(animate);
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

  // Update signal colors based on inputA, inputB, and output
  useEffect(() => {
    if (wireAMeshRef.current) {
      const mat = wireAMeshRef.current.material as THREE.MeshStandardMaterial;
      mat.color.setHex(inputA === 1 ? 0xcc785c : 0x5a5854);
    }
    if (wireBMeshRef.current) {
      const mat = wireBMeshRef.current.material as THREE.MeshStandardMaterial;
      mat.color.setHex(inputB === 1 ? 0xcc785c : 0x5a5854);
    }
    if (wireOutMeshRef.current) {
      const mat = wireOutMeshRef.current.material as THREE.MeshStandardMaterial;
      mat.color.setHex(output === 1 ? 0x5db872 : 0x5a5854);
    }

    // LED Glow
    if (ledMeshRef.current && ledLightRef.current) {
      const mat = ledMeshRef.current.material as THREE.MeshStandardMaterial;
      if (output === 1) {
        mat.color.setHex(0x5db872); // Glowing Green LED
        mat.emissive.setHex(0x22c55e);
        mat.emissiveIntensity = 0.8;
        ledLightRef.current.intensity = 2.5;
        ledLightRef.current.color.setHex(0x22c55e);
      } else {
        mat.color.setHex(0x6c6a64); // Dark LED
        mat.emissive.setHex(0x000000);
        mat.emissiveIntensity = 0;
        ledLightRef.current.intensity = 0;
      }
    }
  }, [inputA, inputB, output]);

  return (
    <div className={`relative flex flex-col rounded-2xl bg-white dark:bg-[#131b2e] border border-[#e2e8f0] dark:border-[#1e293b] shadow-sm overflow-hidden ${className}`}>
      
      {/* 3D Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-[#e2e8f0] dark:border-[#1e293b] bg-[#f8fafc]/90 dark:bg-[#131b2e]/90 backdrop-blur-sm z-10">
        <div className="flex items-center space-x-2">
          <span className="w-2 h-2 rounded-full bg-[#0066cc] animate-pulse" />
          <span className="font-heading text-sm font-bold text-[#0f172a] dark:text-[#f8fafc]">
            3D IC Package & Breadboard Simulation
          </span>
          <span className="text-xs font-mono px-2 py-0.5 rounded bg-[#0066cc]/10 dark:bg-[#0066cc]/20 text-[#0066cc] dark:text-[#38bdf8] border border-[#0066cc]/20">
            {chipPartNumbers[gateType] || 'DIP-14'}
          </span>
        </div>

        <div className="flex items-center space-x-2 text-xs text-[#64748b] dark:text-[#94a3b8]">
          <Eye className="w-3.5 h-3.5" />
          <span>หมุนดูขาไอซีและสัญญาณได้แบบ 3D</span>
        </div>
      </div>

      {/* 3D Canvas */}
      <div 
        ref={mountRef} 
        className="w-full h-72 sm:h-80 relative cursor-grab active:cursor-grabbing select-none"
      />

      {/* Interactive Controls Overlay */}
      <div className="p-4 bg-[#f8fafc]/95 dark:bg-[#101726]/95 border-t border-[#e2e8f0] dark:border-[#1e293b] flex flex-wrap items-center justify-between gap-3 z-10">
        <div className="flex items-center space-x-4">
          <button
            onClick={() => setInputA(prev => prev === 1 ? 0 : 1)}
            className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold border transition cursor-pointer flex items-center space-x-1.5 ${
              inputA === 1 
                ? 'bg-[#0066cc] text-white border-[#0066cc] shadow-sm' 
                : 'bg-white dark:bg-[#1e293b] text-[#334155] dark:text-[#f8fafc] border-[#e2e8f0] dark:border-[#334155]'
            }`}
          >
            <Zap className="w-3.5 h-3.5" />
            <span>Pin A = {inputA}</span>
          </button>

          {gateType !== 'NOT' && (
            <button
              onClick={() => setInputB(prev => prev === 1 ? 0 : 1)}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold border transition cursor-pointer flex items-center space-x-1.5 ${
                inputB === 1 
                  ? 'bg-[#0066cc] text-white border-[#0066cc] shadow-sm' 
                  : 'bg-white dark:bg-[#1e293b] text-[#334155] dark:text-[#f8fafc] border-[#e2e8f0] dark:border-[#334155]'
              }`}
            >
              <Zap className="w-3.5 h-3.5" />
              <span>Pin B = {inputB}</span>
            </button>
          )}
        </div>

        <div className="flex items-center space-x-2">
          <span className="text-xs font-mono text-[#64748b] dark:text-[#94a3b8]">
            สถานะเอาต์พุต LED:
          </span>
          <span className={`px-2.5 py-1 rounded-md text-xs font-mono font-bold flex items-center space-x-1.5 ${
            output === 1 
              ? 'bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30' 
              : 'bg-slate-100 dark:bg-slate-800 text-slate-500 border border-slate-200 dark:border-slate-700'
          }`}>
            <span className={`w-2 h-2 rounded-full ${output === 1 ? 'bg-emerald-500 animate-pulse' : 'bg-slate-400'}`} />
            <span>Output = {output} ({output === 1 ? 'HIGH / ไฟติด' : 'LOW / ไฟดับ'})</span>
          </span>
        </div>
      </div>

    </div>
  );
};
