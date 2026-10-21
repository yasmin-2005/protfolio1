import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { Sparkles, RotateCw, Palette, Compass } from 'lucide-react';
import { personalData } from '../data/personalData';

interface Hero3DProps {
  onOpenAssetGuide?: () => void;
}

export const Hero3D: React.FC<Hero3DProps> = ({ onOpenAssetGuide }) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [hasWebGL, setHasWebGL] = useState(true);
  const [isInteractiveTilt, setIsInteractiveTilt] = useState(true);
  const [activeMood, setActiveMood] = useState<'sage' | 'lavender' | 'sky'>('sage');
  const [scrollProgress, setScrollProgress] = useState(0);

  // Mouse tilt tracking refs
  const mouseRef = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 });
  const isTiltActiveRef = useRef(true);
  isTiltActiveRef.current = isInteractiveTilt;

  // Scroll parallax tracking ref
  const scrollYRef = useRef(0);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // WebGL capability check
    const isGlSupported = (() => {
      try {
        const canvas = document.createElement('canvas');
        const gl = canvas.getContext('webgl2') || canvas.getContext('webgl');
        return !!gl;
      } catch (e) {
        return false;
      }
    })();

    if (!isGlSupported) {
      setHasWebGL(false);
      return;
    }

    // Detect software rendering
    const isSoftwareGl = (() => {
      try {
        const gl = document.createElement('canvas').getContext('webgl2');
        if (!gl) return false;
        const ext = gl.getExtension('WEBGL_debug_renderer_info');
        const param = ext ? ext.UNMASKED_RENDERER_WEBGL : gl.RENDERER;
        const gpu = String(gl.getParameter(param));
        gl.getExtension('WEBGL_lose_context')?.loseContext();
        return /SwiftShader|llvmpipe|softpipe|Software|Basic Render/i.test(gpu);
      } catch (e) {
        return false;
      }
    })();

    const width = container.clientWidth || 460;
    const height = container.clientHeight || 560;

    // 1. Scene & Atmosphere
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0xE8F3ED, 0.04);

    // 2. Camera setup for elegant portrait focal length
    const camera = new THREE.PerspectiveCamera(38, width / height, 0.1, 100);
    camera.position.set(0, 0, 5.2);

    // 3. Renderer with high-fidelity color management
    const renderer = new THREE.WebGLRenderer({
      antialias: !isSoftwareGl,
      alpha: true,
      powerPreference: 'high-performance',
    });
    renderer.setPixelRatio(isSoftwareGl ? 1 : Math.min(window.devicePixelRatio, 2));
    renderer.setSize(width, height);
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.08;
    renderer.shadowMap.enabled = !isSoftwareGl;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    container.appendChild(renderer.domElement);

    // 4. Studio Lighting System (Soft, editorial pastel lighting)
    const ambientLight = new THREE.AmbientLight(0xFFFFFF, 0.95);
    scene.add(ambientLight);

    const hemiLight = new THREE.HemisphereLight(0xEAF2FF, 0xE8F3ED, 0.85);
    hemiLight.position.set(0, 10, 0);
    scene.add(hemiLight);

    // Key portrait light (Warm soft champagne)
    const keyLight = new THREE.DirectionalLight(0xFFFBF2, 1.8);
    keyLight.position.set(3, 3.5, 3.5);
    keyLight.castShadow = !isSoftwareGl;
    keyLight.shadow.mapSize.width = 1024;
    keyLight.shadow.mapSize.height = 1024;
    keyLight.shadow.bias = -0.0004;
    scene.add(keyLight);

    // Rim light (Lavender Mist)
    const rimLight = new THREE.PointLight(0xEEE9FA, 1.3, 12);
    rimLight.position.set(-3, 2.5, -1.5);
    scene.add(rimLight);

    // Moving Specular Sheen Light (glides across glass face with pointer)
    const specularLight = new THREE.PointLight(0xDCEBFF, 2.4, 8);
    specularLight.position.set(0, 0.5, 2.8);
    scene.add(specularLight);

    // 5. Root 3D Hierarchy
    const masterGroup = new THREE.Group();
    scene.add(masterGroup);

    const cardGroup = new THREE.Group();
    masterGroup.add(cardGroup);

    // 6. Portrait Texture Loading (Real portrait photograph with uncropped 3:4 aspect ratio)
    const textureLoader = new THREE.TextureLoader();
    const portraitTexture = textureLoader.load(
      personalData.avatarUrl || '/images/yasmin_portrait.png',
      (texture) => {
        texture.colorSpace = THREE.SRGBColorSpace;
        texture.generateMipmaps = true;
        texture.minFilter = THREE.LinearMipmapLinearFilter;
        texture.magFilter = THREE.LinearFilter;
        renderer.render(scene, camera);
      }
    );

    // Portrait mesh dimensions (Proportional to 3:4 aspect ratio: 2.1 x 2.8)
    const pWidth = 2.1;
    const pHeight = 2.8;

    // Layer 1: Backing Frosted Glass Panel with Soft Depth
    const backplateGeo = new THREE.BoxGeometry(pWidth + 0.24, pHeight + 0.24, 0.08);
    const backplateMat = new THREE.MeshStandardMaterial({
      color: 0xFFFFFF,
      roughness: 0.18,
      metalness: 0.08,
      transparent: true,
      opacity: 0.94,
    });
    const backplate = new THREE.Mesh(backplateGeo, backplateMat);
    backplate.position.z = -0.02;
    backplate.castShadow = !isSoftwareGl;
    backplate.receiveShadow = !isSoftwareGl;
    cardGroup.add(backplate);

    // Layer 2: Beveled Frame Trim (Metallic Powder Blue & Soft Silver)
    const borderGeo = new THREE.BoxGeometry(pWidth + 0.08, pHeight + 0.08, 0.04);
    const borderMat = new THREE.MeshStandardMaterial({
      color: 0xDCEBFF,
      roughness: 0.22,
      metalness: 0.75,
    });
    const borderMesh = new THREE.Mesh(borderGeo, borderMat);
    borderMesh.position.z = 0.015;
    cardGroup.add(borderMesh);

    // Layer 3: The Authentic Portrait (Entire face, headwear, and blazer fully displayed)
    const faceGeo = new THREE.PlaneGeometry(pWidth, pHeight);
    const faceMat = new THREE.MeshStandardMaterial({
      map: portraitTexture,
      roughness: 0.32,
      metalness: 0.04,
    });
    const faceMesh = new THREE.Mesh(faceGeo, faceMat);
    faceMesh.position.z = 0.04;
    cardGroup.add(faceMesh);

    // Layer 4: Front Specular Glass Reflection Panel
    const frontGlassGeo = new THREE.PlaneGeometry(pWidth + 0.02, pHeight + 0.02);
    const frontGlassMat = new THREE.MeshStandardMaterial({
      color: 0xFFFFFF,
      transparent: true,
      opacity: 0.16,
      roughness: 0.06,
      metalness: 0.35,
    });
    const frontGlass = new THREE.Mesh(frontGlassGeo, frontGlassMat);
    frontGlass.position.z = 0.065;
    cardGroup.add(frontGlass);

    // 7. Helper: Create Floating 3D Canvas Badges (Pills)
    const createBadgeMesh = (
      text: string,
      iconEmoji: string,
      accentColor: string,
      geoWidth: number,
      geoHeight: number
    ) => {
      const canvas = document.createElement('canvas');
      canvas.width = 380;
      canvas.height = 100;
      const bctx = canvas.getContext('2d')!;

      // Background rounded pill
      bctx.fillStyle = 'rgba(255, 255, 255, 0.94)';
      bctx.beginPath();
      bctx.roundRect(8, 8, 364, 84, 42);
      bctx.fill();

      // Border with accent
      bctx.strokeStyle = accentColor;
      bctx.lineWidth = 4;
      bctx.stroke();

      // Text and Icon
      bctx.fillStyle = '#26344A';
      bctx.font = 'bold 26px "Plus Jakarta Sans", sans-serif';
      bctx.textAlign = 'center';
      bctx.textBaseline = 'middle';
      bctx.fillText(`${iconEmoji}  ${text}`, 190, 50);

      const texture = new THREE.CanvasTexture(canvas);
      texture.colorSpace = THREE.SRGBColorSpace;

      const geo = new THREE.PlaneGeometry(geoWidth, geoHeight);
      const mat = new THREE.MeshBasicMaterial({
        map: texture,
        transparent: true,
        opacity: 0.96,
        side: THREE.DoubleSide,
      });

      return { mesh: new THREE.Mesh(geo, mat), texture, geo, mat };
    };

    // Array to manage all floating companions
    const floatingCompanions: Array<{
      mesh: THREE.Object3D;
      speed: number;
      offset: number;
      orbitRadius: number;
      orbitSpeed: number;
      rotSpeed: { x: number; y: number; z: number };
      initialPos: THREE.Vector3;
    }> = [];

    // Badge 1: Top-Left "Python & AI" (layered in front Z = 0.45)
    const badge1 = createBadgeMesh('Python & AI', '✨', '#DCEBFF', 0.95, 0.26);
    badge1.mesh.position.set(-1.18, 1.1, 0.42);
    cardGroup.add(badge1.mesh);
    floatingCompanions.push({
      mesh: badge1.mesh,
      speed: 0.8,
      offset: 0,
      orbitRadius: 0.8,
      orbitSpeed: 0.1,
      rotSpeed: { x: 0, y: 0.004, z: 0.002 },
      initialPos: new THREE.Vector3(-1.18, 1.1, 0.42),
    });

    // Badge 2: Bottom-Right "Generative AI" (layered in front Z = 0.52)
    const badge2 = createBadgeMesh('Generative AI', '⚡', '#F6EAF0', 1.05, 0.28);
    badge2.mesh.position.set(1.15, -0.95, 0.48);
    cardGroup.add(badge2.mesh);
    floatingCompanions.push({
      mesh: badge2.mesh,
      speed: 1.0,
      offset: 2.1,
      orbitRadius: 0.85,
      orbitSpeed: -0.12,
      rotSpeed: { x: 0, y: -0.004, z: -0.002 },
      initialPos: new THREE.Vector3(1.15, -0.95, 0.48),
    });

    // Badge 3: Bottom-Left "Web Development" (Z = 0.35)
    const badge3 = createBadgeMesh('Web Development', '💻', '#EEE9FA', 1.1, 0.28);
    badge3.mesh.position.set(-1.05, -1.2, 0.35);
    cardGroup.add(badge3.mesh);
    floatingCompanions.push({
      mesh: badge3.mesh,
      speed: 0.9,
      offset: 4.2,
      orbitRadius: 0.7,
      orbitSpeed: 0.08,
      rotSpeed: { x: 0, y: 0.003, z: 0.001 },
      initialPos: new THREE.Vector3(-1.05, -1.2, 0.35),
    });

    // 8. Geometric 3D Companion Elements (Refined, elegant pastel accents)
    // Accent 1: Powder Blue Glass Sphere (Top Right)
    const sphereGeo = new THREE.SphereGeometry(0.22, 32, 32);
    const sphereMat = new THREE.MeshStandardMaterial({
      color: 0xEAF2FF,
      roughness: 0.15,
      metalness: 0.4,
    });
    const sphereMesh = new THREE.Mesh(sphereGeo, sphereMat);
    sphereMesh.position.set(1.35, 1.0, 0.3);
    sphereMesh.castShadow = !isSoftwareGl;
    masterGroup.add(sphereMesh);
    floatingCompanions.push({
      mesh: sphereMesh,
      speed: 1.2,
      offset: 0.5,
      orbitRadius: 1.1,
      orbitSpeed: 0.25,
      rotSpeed: { x: 0.01, y: 0.015, z: 0 },
      initialPos: new THREE.Vector3(1.35, 1.0, 0.3),
    });

    // Accent 2: Lavender Mist Torus Ring (Left Middle)
    const torusGeo = new THREE.TorusGeometry(0.28, 0.07, 24, 48);
    const torusMat = new THREE.MeshStandardMaterial({
      color: 0xEEE9FA,
      roughness: 0.25,
      metalness: 0.6,
    });
    const torusMesh = new THREE.Mesh(torusGeo, torusMat);
    torusMesh.position.set(-1.4, 0.1, 0.25);
    torusMesh.castShadow = !isSoftwareGl;
    masterGroup.add(torusMesh);
    floatingCompanions.push({
      mesh: torusMesh,
      speed: 1.4,
      offset: 1.8,
      orbitRadius: 1.05,
      orbitSpeed: -0.2,
      rotSpeed: { x: 0.015, y: 0.01, z: 0.012 },
      initialPos: new THREE.Vector3(-1.4, 0.1, 0.25),
    });

    // Accent 3: Blush Pink Icosahedron (Right Middle)
    const icoGeo = new THREE.IcosahedronGeometry(0.16, 0);
    const icoMat = new THREE.MeshStandardMaterial({
      color: 0xF6EAF0,
      roughness: 0.2,
      metalness: 0.45,
      flatShading: true,
    });
    const icoMesh = new THREE.Mesh(icoGeo, icoMat);
    icoMesh.position.set(1.38, -0.15, 0.35);
    icoMesh.castShadow = !isSoftwareGl;
    masterGroup.add(icoMesh);
    floatingCompanions.push({
      mesh: icoMesh,
      speed: 1.6,
      offset: 3.2,
      orbitRadius: 0.95,
      orbitSpeed: 0.3,
      rotSpeed: { x: 0.02, y: 0.025, z: 0.01 },
      initialPos: new THREE.Vector3(1.38, -0.15, 0.35),
    });

    // Accent 4: Soft Sage Orbit Ring (Bottom Left)
    const sageRingGeo = new THREE.TorusGeometry(0.18, 0.025, 16, 32);
    const sageRingMat = new THREE.MeshStandardMaterial({
      color: 0xCBDAD1,
      roughness: 0.3,
      metalness: 0.7,
    });
    const sageRingMesh = new THREE.Mesh(sageRingGeo, sageRingMat);
    sageRingMesh.position.set(-1.3, -0.65, 0.2);
    masterGroup.add(sageRingMesh);
    floatingCompanions.push({
      mesh: sageRingMesh,
      speed: 1.1,
      offset: 4.5,
      orbitRadius: 0.9,
      orbitSpeed: -0.15,
      rotSpeed: { x: 0.012, y: 0.018, z: 0.008 },
      initialPos: new THREE.Vector3(-1.3, -0.65, 0.2),
    });

    // 9. Soft Contact Shadow Plane Grounding
    const shadowCanvas = document.createElement('canvas');
    shadowCanvas.width = 256;
    shadowCanvas.height = 256;
    const sctx = shadowCanvas.getContext('2d')!;
    const shadowGrad = sctx.createRadialGradient(128, 128, 15, 128, 128, 120);
    shadowGrad.addColorStop(0, 'rgba(38, 52, 74, 0.32)');
    shadowGrad.addColorStop(0.4, 'rgba(38, 52, 74, 0.12)');
    shadowGrad.addColorStop(1, 'rgba(38, 52, 74, 0)');
    sctx.fillStyle = shadowGrad;
    sctx.fillRect(0, 0, 256, 256);

    const shadowTexture = new THREE.CanvasTexture(shadowCanvas);
    const shadowGeo = new THREE.PlaneGeometry(3.0, 3.0);
    const shadowMat = new THREE.MeshBasicMaterial({
      map: shadowTexture,
      transparent: true,
      opacity: 0.75,
      depthWrite: false,
    });
    const shadowMesh = new THREE.Mesh(shadowGeo, shadowMat);
    shadowMesh.rotation.x = -Math.PI / 2;
    shadowMesh.position.y = -1.6;
    scene.add(shadowMesh);

    // 10. Pointer Tracking (Gentle tilt with smooth damping)
    const handlePointerMove = (e: PointerEvent) => {
      const rect = container.getBoundingClientRect();
      const nx = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const ny = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
      
      // Restrained angle limits: max ~14 degrees (0.24 rad)
      mouseRef.current.targetX = Math.max(-0.25, Math.min(0.25, nx * 0.25));
      mouseRef.current.targetY = Math.max(-0.20, Math.min(0.20, ny * 0.20));

      // Update moving sheen light position
      specularLight.position.x = nx * 1.8;
      specularLight.position.y = ny * 1.5 + 0.4;
    };

    const handlePointerLeave = () => {
      mouseRef.current.targetX = 0;
      mouseRef.current.targetY = 0;
      specularLight.position.set(0, 0.5, 2.8);
    };

    container.addEventListener('pointermove', handlePointerMove);
    container.addEventListener('pointerleave', handlePointerLeave);

    // 11. Scroll Parallax Listener
    const handleScroll = () => {
      const y = window.scrollY || window.pageYOffset;
      scrollYRef.current = y;
      setScrollProgress(Math.min(1, y / 500));
    };
    window.addEventListener('scroll', handleScroll, { passive: true });

    // 12. Resize Handler
    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      if (w === 0 || h === 0) return;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', handleResize);

    // 13. Smooth Animation Loop with Natural Physics
    let clock = new THREE.Clock();
    let frameId = 0;
    let entranceScale = 0.94;

    const animate = () => {
      frameId = requestAnimationFrame(animate);
      const delta = Math.min(clock.getDelta(), 0.1);
      const elapsed = clock.getElapsedTime();

      // Smooth entrance scale animation
      if (entranceScale < 1.0) {
        entranceScale = THREE.MathUtils.damp(entranceScale, 1.0, 4, delta);
        cardGroup.scale.set(entranceScale, entranceScale, entranceScale);
      }

      if (!prefersReducedMotion) {
        // Damped mouse tracking
        mouseRef.current.x = THREE.MathUtils.damp(
          mouseRef.current.x,
          mouseRef.current.targetX,
          5,
          delta
        );
        mouseRef.current.y = THREE.MathUtils.damp(
          mouseRef.current.y,
          mouseRef.current.targetY,
          5,
          delta
        );

        // Natural idle breathing (subtle, non-distracting float)
        const idleFloatY = Math.sin(elapsed * 0.8) * 0.025;
        const idleTilt = Math.sin(elapsed * 0.6) * 0.015;

        // Scroll parallax offset
        const scrollParallaxY = -scrollYRef.current * 0.0006;
        const scrollParallaxRot = scrollYRef.current * 0.0002;

        if (isTiltActiveRef.current) {
          cardGroup.rotation.y = mouseRef.current.x + idleTilt;
          cardGroup.rotation.x = -mouseRef.current.y + scrollParallaxRot;
        } else {
          cardGroup.rotation.y = idleTilt;
          cardGroup.rotation.x = scrollParallaxRot;
        }

        cardGroup.position.y = idleFloatY + scrollParallaxY;

        // Animate floating companion badges & geometric shapes
        floatingCompanions.forEach((comp) => {
          const compFloatY = Math.sin(elapsed * comp.speed + comp.offset) * 0.04;
          comp.mesh.position.y = comp.initialPos.y + compFloatY;

          comp.mesh.rotation.x += comp.rotSpeed.x;
          comp.mesh.rotation.y += comp.rotSpeed.y;
          comp.mesh.rotation.z += comp.rotSpeed.z;
        });
      }

      renderer.render(scene, camera);
    };

    animate();

    // 14. Comprehensive Resource Cleanup
    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('scroll', handleScroll);
      container.removeEventListener('pointermove', handlePointerMove);
      container.removeEventListener('pointerleave', handlePointerLeave);

      backplateGeo.dispose();
      backplateMat.dispose();
      borderGeo.dispose();
      borderMat.dispose();
      faceGeo.dispose();
      faceMat.dispose();
      frontGlassGeo.dispose();
      frontGlassMat.dispose();

      badge1.geo.dispose();
      badge1.mat.dispose();
      badge1.texture.dispose();
      badge2.geo.dispose();
      badge2.mat.dispose();
      badge2.texture.dispose();
      badge3.geo.dispose();
      badge3.mat.dispose();
      badge3.texture.dispose();

      sphereGeo.dispose();
      sphereMat.dispose();
      torusGeo.dispose();
      torusMat.dispose();
      icoGeo.dispose();
      icoMat.dispose();
      sageRingGeo.dispose();
      sageRingMat.dispose();

      shadowGeo.dispose();
      shadowMat.dispose();
      portraitTexture.dispose();
      shadowTexture.dispose();

      renderer.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div className="relative w-full max-w-[480px] sm:max-w-[510px] aspect-[4/5] mx-auto select-none">
      
      {/* Outer ambient pastel depth glow */}
      <div
        className={`absolute inset-0 rounded-3xl blur-2xl transition-all duration-700 pointer-events-none -z-10 ${
          activeMood === 'sage'
            ? 'bg-gradient-to-tr from-[#E8F3ED]/80 via-[#EAF2FF]/60 to-[#F6EAF0]/50'
            : activeMood === 'lavender'
            ? 'bg-gradient-to-tr from-[#EEE9FA]/80 via-[#F6EAF0]/70 to-[#EAF2FF]/60'
            : 'bg-gradient-to-tr from-[#DCEBFF]/80 via-[#EAF2FF]/70 to-[#E8F3ED]/60'
        }`}
      />

      {/* WebGL Canvas or CSS 3D Fallback */}
      {hasWebGL ? (
        <div
          ref={mountRef}
          className="w-full h-full cursor-grab active:cursor-grabbing rounded-3xl overflow-hidden relative"
          title="Interactive 3D Portrait Frame — Move cursor to inspect dimensional depth"
        />
      ) : (
        /* CSS 3D Fallback displaying the authentic portrait with layered depth */
        <div className="w-full h-full rounded-3xl p-6 glass-panel flex flex-col items-center justify-center relative overflow-hidden shadow-xl border border-white">
          <div className="w-full max-w-[320px] aspect-[3/4] rounded-2xl overflow-hidden shadow-lg border-2 border-white/90 relative mb-4">
            <img
              src="/images/yasmin_portrait.png"
              alt="Shaik Yasmin Portrait"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
            <div className="absolute bottom-3 left-3 text-white">
              <p className="font-editorial font-bold text-lg leading-tight">Shaik Yasmin</p>
              <p className="text-xs text-white/90">Computer Science Engineering</p>
            </div>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-2">
            <span className="px-3 py-1 rounded-full bg-white/90 border border-gray-200 text-xs font-semibold text-[#26344A]">
              ✨ Python & AI
            </span>
            <span className="px-3 py-1 rounded-full bg-white/90 border border-gray-200 text-xs font-semibold text-[#26344A]">
              ⚡ Generative AI
            </span>
          </div>
        </div>
      )}

      {/* Elegant Bottom Control Dock */}
      <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-[92%] max-w-[400px] z-10">
        <div className="glass-panel rounded-2xl px-3.5 py-2 shadow-sm border border-white/90 flex items-center justify-between gap-2 text-xs backdrop-blur-md">
          <div className="flex items-center gap-1.5 text-[#747780]">
            <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block animate-pulse" />
            <span className="font-medium text-[11px] text-[#26344A]">3D Portrait View</span>
          </div>

          <div className="flex items-center gap-2">
            {/* Tilt Interactivity Toggle */}
            <button
              onClick={() => setIsInteractiveTilt(!isInteractiveTilt)}
              className={`p-1.5 rounded-lg transition-colors flex items-center gap-1 text-[11px] ${
                isInteractiveTilt ? 'bg-[#E8F3ED] text-[#26344A] font-semibold' : 'text-[#747780] hover:bg-white'
              }`}
              title={isInteractiveTilt ? 'Pause pointer tilt' : 'Enable pointer tilt'}
            >
              <Compass className="w-3 h-3 text-[#26344A]" />
              <span className="hidden sm:inline">{isInteractiveTilt ? 'Tilt On' : 'Tilt Off'}</span>
            </button>

            {/* Ambient Lighting Mood Swatches */}
            <div className="flex items-center gap-1 pl-1.5 border-l border-gray-200">
              <button
                onClick={() => setActiveMood('sage')}
                className={`w-3.5 h-3.5 rounded-full border transition-all ${
                  activeMood === 'sage' ? 'scale-125 border-[#26344A] ring-1 ring-[#26344A]' : 'border-gray-300'
                }`}
                style={{ backgroundColor: '#E8F3ED' }}
                title="Soft Sage Accent"
              />
              <button
                onClick={() => setActiveMood('lavender')}
                className={`w-3.5 h-3.5 rounded-full border transition-all ${
                  activeMood === 'lavender' ? 'scale-125 border-[#26344A] ring-1 ring-[#26344A]' : 'border-gray-300'
                }`}
                style={{ backgroundColor: '#EEE9FA' }}
                title="Lavender Mist Accent"
              />
              <button
                onClick={() => setActiveMood('sky')}
                className={`w-3.5 h-3.5 rounded-full border transition-all ${
                  activeMood === 'sky' ? 'scale-125 border-[#26344A] ring-1 ring-[#26344A]' : 'border-gray-300'
                }`}
                style={{ backgroundColor: '#DCEBFF' }}
                title="Powder Sky Accent"
              />
            </div>
          </div>
        </div>
      </div>

    </div>
  );
};
