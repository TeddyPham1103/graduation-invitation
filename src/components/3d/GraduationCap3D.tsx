import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

interface GraduationCap3DProps {
  className?: string;
  isZoomingIn?: boolean;
  interactive?: boolean;
}

export const GraduationCap3D: React.FC<GraduationCap3DProps> = ({
  className = '',
  isZoomingIn = false,
  interactive = true,
}) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [webglSupported, setWebglSupported] = useState<boolean>(true);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // Check WebGL availability
    try {
      const testCanvas = document.createElement('canvas');
      const gl = testCanvas.getContext('webgl') || testCanvas.getContext('experimental-webgl');
      if (!gl) {
        setWebglSupported(false);
        return;
      }
    } catch {
      setWebglSupported(false);
      return;
    }

    let animationFrameId: number;
    const width = container.clientWidth || window.innerWidth;
    const height = container.clientHeight || window.innerHeight;

    // 1. Scene setup
    const scene = new THREE.Scene();

    // 2. Camera setup
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.set(0, 1.2, 5.5);

    // 3. Renderer setup
    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;
    container.appendChild(renderer.domElement);

    // 4. Lighting - Cinematic 3-point lighting
    const ambientLight = new THREE.AmbientLight(0x0c1226, 2.5);
    scene.add(ambientLight);

    // Key light (warm champagne)
    const keyLight = new THREE.DirectionalLight(0xffe6a3, 3.0);
    keyLight.position.set(4, 5, 4);
    scene.add(keyLight);

    // Rim light (bright golden glow from behind)
    const rimLight = new THREE.DirectionalLight(0xd4af37, 4.0);
    rimLight.position.set(-4, 3, -4);
    scene.add(rimLight);

    // Soft fill light (cool midnight blue)
    const fillLight = new THREE.PointLight(0x385585, 2.0, 15);
    fillLight.position.set(0, -3, 3);
    scene.add(fillLight);

    // 5. Materials
    const capFabricMaterial = new THREE.MeshStandardMaterial({
      color: 0x090f24, // Deep midnight obsidian
      roughness: 0.55,
      metalness: 0.15,
    });

    const goldMaterial = new THREE.MeshStandardMaterial({
      color: 0xd4af37, // Gleaming gold
      roughness: 0.25,
      metalness: 0.88,
    });

    const parchmentMaterial = new THREE.MeshStandardMaterial({
      color: 0xf5eedb, // Creamy ivory parchment
      roughness: 0.6,
      metalness: 0.05,
    });

    // 6. Create Cap Group
    const capGroup = new THREE.Group();

    // Mortarboard Top (Diamond Rhombus)
    const boardGeometry = new THREE.BoxGeometry(2.4, 0.08, 2.4);
    const board = new THREE.Mesh(boardGeometry, capFabricMaterial);
    board.position.y = 0.5;
    board.rotation.y = Math.PI / 4; // 45 deg angle
    capGroup.add(board);

    // Gold trim around mortarboard
    const trimGeometry = new THREE.BoxGeometry(2.44, 0.04, 2.44);
    const trimMesh = new THREE.Mesh(trimGeometry, goldMaterial);
    trimMesh.position.y = 0.5;
    trimMesh.rotation.y = Math.PI / 4;
    capGroup.add(trimMesh);

    // Skull cap base (under the board)
    const skullCapGeometry = new THREE.CylinderGeometry(0.85, 0.75, 0.7, 32);
    const skullCap = new THREE.Mesh(skullCapGeometry, capFabricMaterial);
    skullCap.position.y = 0.15;
    capGroup.add(skullCap);

    // Top button
    const buttonGeometry = new THREE.CylinderGeometry(0.12, 0.12, 0.06, 16);
    const button = new THREE.Mesh(buttonGeometry, goldMaterial);
    button.position.y = 0.56;
    capGroup.add(button);

    // Tassel cord & tassel
    const tasselGroup = new THREE.Group();
    // Cord draped over side
    const curve = new THREE.CatmullRomCurve3([
      new THREE.Vector3(0, 0.56, 0),
      new THREE.Vector3(0.7, 0.54, 0.7),
      new THREE.Vector3(1.15, 0.45, 1.15),
      new THREE.Vector3(1.22, 0.1, 1.22),
    ]);
    const cordGeometry = new THREE.TubeGeometry(curve, 20, 0.022, 8, false);
    const cordMesh = new THREE.Mesh(cordGeometry, goldMaterial);
    tasselGroup.add(cordMesh);

    // Hanging tassel fringe
    const fringeGeometry = new THREE.ConeGeometry(0.09, 0.4, 16);
    const fringeMesh = new THREE.Mesh(fringeGeometry, goldMaterial);
    fringeMesh.position.set(1.22, -0.1, 1.22);
    fringeMesh.rotation.x = Math.PI;
    tasselGroup.add(fringeMesh);

    capGroup.add(tasselGroup);

    // 7. Rolled Diploma Scroll with Ribbon
    const diplomaGroup = new THREE.Group();
    const scrollGeometry = new THREE.CylinderGeometry(0.18, 0.18, 1.8, 24);
    const scrollMesh = new THREE.Mesh(scrollGeometry, parchmentMaterial);
    diplomaGroup.add(scrollMesh);

    // Golden Ribbon
    const ribbonGeometry = new THREE.CylinderGeometry(0.19, 0.19, 0.35, 24);
    const ribbonMesh = new THREE.Mesh(ribbonGeometry, goldMaterial);
    diplomaGroup.add(ribbonMesh);

    // Ribbon tails
    const ribbonTailGeo = new THREE.BoxGeometry(0.15, 0.4, 0.02);
    const ribbonTail1 = new THREE.Mesh(ribbonTailGeo, goldMaterial);
    ribbonTail1.position.set(0.18, -0.15, 0);
    ribbonTail1.rotation.z = -0.3;
    diplomaGroup.add(ribbonTail1);

    diplomaGroup.position.set(-0.8, -0.4, 0.5);
    diplomaGroup.rotation.set(0.4, 0.6, 1.3);
    capGroup.add(diplomaGroup);

    // Initial orientation
    capGroup.rotation.x = 0.25;
    capGroup.rotation.y = -0.3;
    scene.add(capGroup);

    // 8. Floating Golden Particle Cloud
    const particleCount = 450;
    const particleGeo = new THREE.BufferGeometry();
    const particlePos = new Float32Array(particleCount * 3);
    const particleScales = new Float32Array(particleCount);

    for (let i = 0; i < particleCount * 3; i += 3) {
      particlePos[i] = (Math.random() - 0.5) * 10;
      particlePos[i + 1] = (Math.random() - 0.5) * 8;
      particlePos[i + 2] = (Math.random() - 0.5) * 8;
      particleScales[i / 3] = Math.random() * 0.05 + 0.02;
    }

    particleGeo.setAttribute('position', new THREE.BufferAttribute(particlePos, 3));

    // Particle texture
    const canvas = document.createElement('canvas');
    canvas.width = 32;
    canvas.height = 32;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      const grad = ctx.createRadialGradient(16, 16, 0, 16, 16, 16);
      grad.addColorStop(0, 'rgba(255, 235, 170, 1)');
      grad.addColorStop(0.3, 'rgba(212, 175, 55, 0.8)');
      grad.addColorStop(1, 'rgba(212, 175, 55, 0)');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, 32, 32);
    }
    const particleTex = new THREE.CanvasTexture(canvas);

    const particleMat = new THREE.PointsMaterial({
      size: 0.12,
      map: particleTex,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      color: 0xffe28a,
    });

    const particles = new THREE.Points(particleGeo, particleMat);
    scene.add(particles);

    // 9. Mouse / Touch Interaction variables
    let targetRotX = 0.25;
    let targetRotY = -0.3;
    let mouseX = 0;
    let mouseY = 0;

    const handlePointerMove = (e: MouseEvent | TouchEvent) => {
      if (!interactive) return;
      const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
      const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;

      mouseX = (clientX / window.innerWidth) * 2 - 1;
      mouseY = -(clientY / window.innerHeight) * 2 + 1;

      targetRotY = mouseX * 0.8;
      targetRotX = 0.25 - mouseY * 0.5;
    };

    window.addEventListener('mousemove', handlePointerMove);
    window.addEventListener('touchmove', handlePointerMove, { passive: true });

    // Handle Resize
    const handleResize = () => {
      if (!container) return;
      const newW = container.clientWidth;
      const newH = container.clientHeight;
      camera.aspect = newW / newH;
      camera.updateProjectionMatrix();
      renderer.setSize(newW, newH);
    };

    window.addEventListener('resize', handleResize);

    // 10. Animation Loop
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Smooth inertia rotation toward target
      capGroup.rotation.y += (targetRotY - capGroup.rotation.y) * 0.05;
      capGroup.rotation.x += (targetRotX - capGroup.rotation.x) * 0.05;

      // Gentle floating levitation effect
      capGroup.position.y = Math.sin(elapsedTime * 1.5) * 0.12;

      // Rotate particles slowly
      particles.rotation.y = elapsedTime * 0.04;
      particles.rotation.x = Math.sin(elapsedTime * 0.02) * 0.05;

      // Pulse rim light
      rimLight.intensity = 3.5 + Math.sin(elapsedTime * 2.5) * 0.8;

      // Camera zoom transition if triggered
      if (isZoomingIn) {
        camera.position.z = THREE.MathUtils.lerp(camera.position.z, 2.8, 0.05);
        camera.position.y = THREE.MathUtils.lerp(camera.position.y, 0.3, 0.05);
      }

      renderer.render(scene, camera);
    };

    animate();

    // Cleanup
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', handlePointerMove);
      window.removeEventListener('touchmove', handlePointerMove);
      window.removeEventListener('resize', handleResize);

      boardGeometry.dispose();
      trimGeometry.dispose();
      skullCapGeometry.dispose();
      buttonGeometry.dispose();
      cordGeometry.dispose();
      fringeGeometry.dispose();
      scrollGeometry.dispose();
      ribbonGeometry.dispose();
      ribbonTailGeo.dispose();
      particleGeo.dispose();

      capFabricMaterial.dispose();
      goldMaterial.dispose();
      parchmentMaterial.dispose();
      particleMat.dispose();
      particleTex.dispose();

      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, [interactive, isZoomingIn]);

  // Graceful WebGL Fallback if device doesn't support WebGL
  if (!webglSupported) {
    return (
      <div className={`flex items-center justify-center ${className}`}>
        <div className="relative animate-float-slow text-center p-8">
          <div className="w-48 h-48 mx-auto rounded-full bg-gradient-to-tr from-champagne-500/20 to-champagne-300/10 border border-champagne-500/40 flex items-center justify-center shadow-gold-glow">
            <svg viewBox="0 0 100 100" className="w-28 h-28 text-champagne-400 drop-shadow-md">
              <polygon points="50,20 85,38 50,56 15,38" fill="currentColor" />
              <path d="M30,48 L30,68 C30,76 70,76 70,68 L70,48" stroke="currentColor" strokeWidth="4" fill="none" />
              <path d="M50,38 Q75,40 76,58" stroke="#FFEAA7" strokeWidth="3" fill="none" />
              <circle cx="76" cy="60" r="4" fill="#FFEAA7" />
            </svg>
          </div>
          <p className="mt-4 text-xs tracking-widest text-champagne-400/80 uppercase">Graduation Symbol</p>
        </div>
      </div>
    );
  }

  return (
    <div
      ref={mountRef}
      className={`w-full h-full relative cursor-grab active:cursor-grabbing ${className}`}
      aria-label="3D Graduation Cap and Diploma Experience"
    />
  );
};
