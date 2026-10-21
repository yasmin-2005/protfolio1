import React, { useRef, useMemo, useEffect, useState, useCallback } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { Leaf, Zap, Sparkles, Pause, Play, EyeOff, ShieldCheck } from 'lucide-react';

// Interface for floating geometric shape data
interface FloatingShape {
  position: [number, number, number];
  rotation: [number, number, number];
  rotSpeed: [number, number, number];
  scale: number;
  color: string;
  type: 'octahedron' | 'torus' | 'icosahedron' | 'dodecahedron' | 'tetrahedron';
  floatSpeed: number;
  offset: number;
}

// Pastel palette matching Shaik Yasmin's visual design system
const PASTEL_COLORS = [
  '#DCEBFF', // Soft Sky Blue
  '#EAF2FF', // Powder Blue
  '#F6EAF0', // Blush Pink
  '#EEE9FA', // Lavender Mist
  '#CBDAD1', // Soft Sage Accent
  '#FAF8F3', // Soft Ivory
];

// Helper: Hardware and Performance detection
function detectLowEndHardware(): { isLowEnd: boolean; reason: string } {
  if (typeof window === 'undefined') return { isLowEnd: false, reason: 'SSR' };

  // 1. Reduced motion preference
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReduced) return { isLowEnd: true, reason: 'prefers-reduced-motion' };

  // 2. Hardware concurrency (e.g., 2-4 cores or lower on low-end laptops/phones)
  if (navigator.hardwareConcurrency && navigator.hardwareConcurrency <= 4) {
    return { isLowEnd: true, reason: `Low CPU cores (${navigator.hardwareConcurrency})` };
  }

  // 3. Device Memory API (Chrome/Edge: <= 4GB RAM)
  const nav = navigator as unknown as { deviceMemory?: number };
  if (nav.deviceMemory && nav.deviceMemory <= 4) {
    return { isLowEnd: true, reason: `Low RAM (${nav.deviceMemory}GB)` };
  }

  // 4. Software WebGL renderer detection (SwiftShader, llvmpipe)
  try {
    const canvas = document.createElement('canvas');
    const gl = canvas.getContext('webgl2') || canvas.getContext('webgl');
    if (gl) {
      const ext = gl.getExtension('WEBGL_debug_renderer_info');
      if (ext) {
        const renderer = gl.getParameter(ext.UNMASKED_RENDERER_WEBGL) || '';
        if (/SwiftShader|llvmpipe|softpipe|Software|Basic Render/i.test(renderer)) {
          return { isLowEnd: true, reason: 'Software WebGL' };
        }
      }
    }
  } catch {
    // Ignore context query errors
  }

  // 5. Mobile touch screen detection with smaller screen
  if (window.innerWidth < 768 && ('ontouchstart' in window || navigator.maxTouchPoints > 0)) {
    return { isLowEnd: true, reason: 'Mobile touch device' };
  }

  return { isLowEnd: false, reason: 'Standard hardware' };
}

// Performance Frame Monitor inside R3F Canvas to detect real-time FPS drops
interface PerfMonitorProps {
  onLowFpsDetected: () => void;
  isThrottled: boolean;
  isReducedMotion: boolean;
}

const PerformanceFrameMonitor: React.FC<PerfMonitorProps> = ({
  onLowFpsDetected,
  isThrottled,
  isReducedMotion,
}) => {
  const frameTimesRef = useRef<number[]>([]);
  const lastTimeRef = useRef<number>(performance.now());
  const triggeredRef = useRef<boolean>(false);

  useFrame(() => {
    if (isThrottled || isReducedMotion || triggeredRef.current) return;

    const now = performance.now();
    const delta = now - lastTimeRef.current;
    lastTimeRef.current = now;

    // Track frame intervals
    frameTimesRef.current.push(delta);
    if (frameTimesRef.current.length > 40) {
      frameTimesRef.current.shift();

      // Check average frame time over last 40 frames
      const avg = frameTimesRef.current.reduce((a, b) => a + b, 0) / frameTimesRef.current.length;
      // If average frame time exceeds 36ms (< 28 FPS) on what should be 60fps
      if (avg > 36) {
        triggeredRef.current = true;
        onLowFpsDetected();
      }
    }
  });

  return null;
};

// 1. Particle Cloud component with adaptive counts, 30fps delta throttling, and reduced motion freeze
interface ParticleDustProps {
  isThrottled: boolean;
  isReducedMotion: boolean;
}

const InteractiveParticleDust: React.FC<ParticleDustProps> = ({ isThrottled, isReducedMotion }) => {
  const pointsRef = useRef<THREE.Points>(null);
  const { pointer, viewport, invalidate } = useThree();

  // Low-power uses 45 particles; standard uses 110; reduced motion uses 35 static particles
  const count = useMemo(() => {
    if (isReducedMotion) return 35;
    if (isThrottled) return 48;
    return 110;
  }, [isThrottled, isReducedMotion]);

  // Generate particle positions and phases
  const [positions, initialPositions, phases] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const initial = new Float32Array(count * 3);
    const ph = new Float32Array(count);

    for (let i = 0; i < count; i++) {
      const x = (Math.random() - 0.5) * 16;
      const y = (Math.random() - 0.5) * 12;
      const z = (Math.random() - 0.5) * 8 - 2;

      pos[i * 3] = x;
      pos[i * 3 + 1] = y;
      pos[i * 3 + 2] = z;

      initial[i * 3] = x;
      initial[i * 3 + 1] = y;
      initial[i * 3 + 2] = z;

      ph[i] = Math.random() * Math.PI * 2;
    }
    return [pos, initial, ph];
  }, [count]);

  // Delta accumulator for throttling updates to 30 FPS (~0.033s per calculation)
  const throttleAccumulator = useRef(0);
  const lastMousePos = useRef({ x: 9999, y: 9999 });

  useFrame((state, delta) => {
    if (!pointsRef.current) return;

    // In reduced-motion mode: no animation updates, keep static constellation
    if (isReducedMotion) {
      return;
    }

    // In low-power throttled mode: skip frames to lock CPU updates to ~30 FPS
    if (isThrottled) {
      throttleAccumulator.current += delta;
      if (throttleAccumulator.current < 0.033) {
        return;
      }
      throttleAccumulator.current = 0;
    }

    const geom = pointsRef.current.geometry;
    const posAttr = geom.attributes.position as THREE.BufferAttribute;
    if (!posAttr) return;
    const arr = posAttr.array as Float32Array;

    const time = state.clock.getElapsedTime();
    const mouseX = pointer.x * (viewport.width / 2);
    const mouseY = pointer.y * (viewport.height / 2);

    const mouseMoved =
      Math.abs(mouseX - lastMousePos.current.x) > 0.05 ||
      Math.abs(mouseY - lastMousePos.current.y) > 0.05;

    // Damp multiplier: if throttled, adjust factor for smooth visual feel
    const dampSpeed = isThrottled ? 3.2 : 2.0;

    for (let i = 0; i < count; i++) {
      const idx = i * 3;
      const initX = initialPositions[idx];
      const initY = initialPositions[idx + 1];
      const phase = phases[i];

      // Gentle wave float (slower in low-power to reduce jitter)
      const waveY = Math.sin(time * 0.35 + phase) * 0.35;
      const waveX = Math.cos(time * 0.25 + phase) * 0.25;

      let pushX = 0;
      let pushY = 0;

      // Mouse influence
      if (mouseMoved || !isThrottled) {
        const dx = arr[idx] - mouseX;
        const dy = arr[idx + 1] - mouseY;
        const distSq = dx * dx + dy * dy;

        // Radius = 2.8 units (distSq < 7.84)
        if (distSq < 7.84 && distSq > 0.0001) {
          const dist = Math.sqrt(distSq);
          const force = (2.8 - dist) / 2.8;
          pushX = (dx / dist) * force * 0.55;
          pushY = (dy / dist) * force * 0.55;
        }
      }

      arr[idx] = THREE.MathUtils.damp(arr[idx], initX + waveX + pushX, dampSpeed, delta);
      arr[idx + 1] = THREE.MathUtils.damp(arr[idx + 1], initY + waveY + pushY, dampSpeed, delta);
    }

    lastMousePos.current.x = mouseX;
    lastMousePos.current.y = mouseY;

    posAttr.needsUpdate = true;
    pointsRef.current.rotation.y = time * 0.012;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={isThrottled ? 0.09 : 0.075}
        color="#747780"
        transparent
        opacity={isReducedMotion ? 0.25 : 0.35}
        sizeAttenuation
        blending={THREE.NormalBlending}
      />
    </points>
  );
};

// 2. Individual Floating Geometric Mesh with throttle & reduced motion support
interface FloatingMeshProps {
  shape: FloatingShape;
  isThrottled: boolean;
  isReducedMotion: boolean;
}

const FloatingMeshItem: React.FC<FloatingMeshProps> = ({ shape, isThrottled, isReducedMotion }) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const { pointer } = useThree();
  const throttleAcc = useRef(0);

  useFrame((state, delta) => {
    if (!meshRef.current || isReducedMotion) return;

    // In low-power throttled mode, compute updates at ~30 FPS
    if (isThrottled) {
      throttleAcc.current += delta;
      if (throttleAcc.current < 0.033) {
        return;
      }
      throttleAcc.current = 0;
    }

    const time = state.clock.getElapsedTime();

    // Gentle vertical oscillation
    const floatOffset = Math.sin(time * shape.floatSpeed + shape.offset) * 0.3;
    meshRef.current.position.y = shape.position[1] + floatOffset;

    // Slow rotation
    meshRef.current.rotation.x += shape.rotSpeed[0] * delta;
    meshRef.current.rotation.y += shape.rotSpeed[1] * delta;
    meshRef.current.rotation.z += shape.rotSpeed[2] * delta;

    // Gentle parallax lean towards cursor
    if (!isThrottled) {
      const targetTiltY = pointer.x * 0.2;
      meshRef.current.position.x = THREE.MathUtils.damp(
        meshRef.current.position.x,
        shape.position[0] + targetTiltY * 0.35,
        1.5,
        delta
      );
    }
  });

  const geometry = useMemo(() => {
    switch (shape.type) {
      case 'octahedron':
        return new THREE.OctahedronGeometry(shape.scale, 0);
      case 'torus':
        return new THREE.TorusGeometry(
          shape.scale,
          shape.scale * 0.28,
          isThrottled ? 10 : 16,
          isThrottled ? 20 : 32
        );
      case 'icosahedron':
        return new THREE.IcosahedronGeometry(shape.scale, 0);
      case 'dodecahedron':
        return new THREE.DodecahedronGeometry(shape.scale, 0);
      case 'tetrahedron':
      default:
        return new THREE.TetrahedronGeometry(shape.scale, 0);
    }
  }, [shape.type, shape.scale, isThrottled]);

  const material = useMemo(() => {
    return new THREE.MeshStandardMaterial({
      color: shape.color,
      roughness: 0.35,
      metalness: 0.12,
      transparent: true,
      opacity: isReducedMotion ? 0.4 : 0.52,
      flatShading: shape.type !== 'torus',
    });
  }, [shape.color, shape.type, isReducedMotion]);

  return (
    <mesh
      ref={meshRef}
      position={shape.position}
      rotation={shape.rotation}
      geometry={geometry}
      material={material}
    />
  );
};

// 3. Floating Geometric Group (Adaptive density)
interface FloatingGroupProps {
  isThrottled: boolean;
  isReducedMotion: boolean;
}

const FloatingShapesGroup: React.FC<FloatingGroupProps> = ({ isThrottled, isReducedMotion }) => {
  const shapes = useMemo<FloatingShape[]>(() => {
    const items: FloatingShape[] = [];
    const types: FloatingShape['type'][] = ['octahedron', 'torus', 'icosahedron', 'dodecahedron', 'tetrahedron'];

    // Reduced motion: 7 shapes; Low-power: 9 shapes; Standard: 20 shapes
    const count = isReducedMotion ? 7 : isThrottled ? 9 : 20;

    for (let i = 0; i < count; i++) {
      const x = (Math.random() - 0.5) * 14;
      const y = (Math.random() - 0.5) * 10;
      const z = (Math.random() - 0.5) * 6 - 2.5;

      items.push({
        position: [x, y, z],
        rotation: [Math.random() * Math.PI, Math.random() * Math.PI, 0],
        rotSpeed: [
          (Math.random() - 0.5) * 0.35,
          (Math.random() - 0.5) * 0.35,
          (Math.random() - 0.5) * 0.25,
        ],
        scale: 0.22 + Math.random() * 0.26,
        color: PASTEL_COLORS[i % PASTEL_COLORS.length],
        type: types[i % types.length],
        floatSpeed: 0.5 + Math.random() * 0.6,
        offset: Math.random() * Math.PI * 2,
      });
    }
    return items;
  }, [isThrottled, isReducedMotion]);

  return (
    <group>
      {shapes.map((shape, i) => (
        <FloatingMeshItem
          key={i}
          shape={shape}
          isThrottled={isThrottled}
          isReducedMotion={isReducedMotion}
        />
      ))}
    </group>
  );
};

// Main Exported HeroBackgroundScene with Throttle & Low-Power Management
export const HeroBackgroundScene: React.FC = () => {
  const [hasWebGL, setHasWebGL] = useState(true);

  // Power state:
  // - mode: 'auto' (hardware detected), 'eco' (manually forced 30fps low-power), 'high' (forced 60fps), 'reduced' (frozen static)
  const [userMode, setUserMode] = useState<'auto' | 'eco' | 'high' | 'reduced'>('auto');
  const [isHardwareLowEnd, setIsHardwareLowEnd] = useState(false);
  const [hardwareReason, setHardwareReason] = useState('');
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [showStatusPill, setShowStatusPill] = useState(false);

  // Initialize hardware & preference checks
  useEffect(() => {
    // WebGL capability check
    try {
      const canvas = document.createElement('canvas');
      const gl = canvas.getContext('webgl2') || canvas.getContext('webgl');
      if (!gl) {
        setHasWebGL(false);
        return;
      }
    } catch {
      setHasWebGL(false);
      return;
    }

    // Check media query for prefers-reduced-motion
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(motionQuery.matches);

    const handleMotionChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches);
    };

    if (motionQuery.addEventListener) {
      motionQuery.addEventListener('change', handleMotionChange);
    } else {
      // Legacy fallback
      motionQuery.addListener(handleMotionChange);
    }

    // Initial hardware capability check
    const hw = detectLowEndHardware();
    setIsHardwareLowEnd(hw.isLowEnd);
    setHardwareReason(hw.reason);

    // Battery status detection if supported (Low battery triggers low-power mode)
    const nav = navigator as unknown as {
      getBattery?: () => Promise<{
        charging: boolean;
        level: number;
        addEventListener: (event: string, cb: () => void) => void;
      }>;
    };

    if (nav.getBattery) {
      nav.getBattery().then((battery) => {
        const checkBattery = () => {
          if (!battery.charging && battery.level < 0.25) {
            setIsHardwareLowEnd(true);
            setHardwareReason(`Battery at ${Math.round(battery.level * 100)}%`);
          }
        };
        checkBattery();
        battery.addEventListener('levelchange', checkBattery);
        battery.addEventListener('chargingchange', checkBattery);
      }).catch(() => {});
    }

    return () => {
      if (motionQuery.removeEventListener) {
        motionQuery.removeEventListener('change', handleMotionChange);
      } else {
        motionQuery.removeListener(handleMotionChange);
      }
    };
  }, []);

  // Compute actual active state based on userMode and environment
  const isReducedMotion = userMode === 'reduced' || (userMode === 'auto' && prefersReducedMotion);
  const isThrottled =
    userMode === 'eco' ||
    (userMode === 'auto' && (isHardwareLowEnd || prefersReducedMotion));

  // Handler for frame rate drops detected in real time
  const handleLowFpsDetected = useCallback(() => {
    if (userMode === 'auto' && !isHardwareLowEnd) {
      setIsHardwareLowEnd(true);
      setHardwareReason('Dynamic frame adaptation');
    }
  }, [userMode, isHardwareLowEnd]);

  if (!hasWebGL) {
    // Pure CSS subtle pastel background fallback when WebGL is unavailable
    return (
      <div className="absolute inset-0 pointer-events-none -z-10 overflow-hidden opacity-40">
        <div className="absolute -top-12 left-1/4 w-72 h-72 rounded-full bg-[#EAF2FF] blur-3xl" />
        <div className="absolute top-1/3 right-12 w-64 h-64 rounded-full bg-[#F6EAF0] blur-3xl" />
      </div>
    );
  }

  return (
    <div
      className="absolute inset-0 pointer-events-none -z-10 overflow-hidden select-none"
      aria-hidden="true"
    >
      {/* React Three Fiber Canvas with low-power optimizations */}
      <Canvas
        camera={{ position: [0, 0, 7.5], fov: 48 }}
        gl={{
          alpha: true,
          antialias: !isThrottled,
          powerPreference: isThrottled ? 'low-power' : 'high-performance',
        }}
        // In throttled mode lock DPR to 1 to reduce fragment shader overhead
        dpr={isThrottled ? 1 : [1, 1.5]}
        // When reduced-motion is active, freeze frameloop on demand to stop GPU work
        frameloop={isReducedMotion ? 'demand' : 'always'}
        className="w-full h-full"
      >
        {/* Soft pastel lighting rig */}
        <ambientLight intensity={0.9} />
        <hemisphereLight
          color="#EAF2FF"
          groundColor="#E8F3ED"
          intensity={0.8}
        />
        <directionalLight
          position={[4, 5, 4]}
          intensity={1.15}
          color="#FFFFFF"
        />
        <pointLight
          position={[-4, 2, 2]}
          intensity={0.75}
          color="#EEE9FA"
        />

        {/* Dynamic FPS Monitor to auto-throttle if system struggles */}
        <PerformanceFrameMonitor
          onLowFpsDetected={handleLowFpsDetected}
          isThrottled={isThrottled}
          isReducedMotion={isReducedMotion}
        />

        {/* 1. Subtle interactive particle dust */}
        <InteractiveParticleDust
          isThrottled={isThrottled}
          isReducedMotion={isReducedMotion}
        />

        {/* 2. Floating delicate pastel geometric shapes */}
        <FloatingShapesGroup
          isThrottled={isThrottled}
          isReducedMotion={isReducedMotion}
        />
      </Canvas>

      {/* Discreet 3D Eco & Motion Controls Badge (Accessible in pointer-events-auto) */}
      <div className="absolute bottom-4 left-6 pointer-events-auto z-20 hidden sm:flex items-center gap-1.5">
        <div className="relative group">
          <button
            type="button"
            onClick={() => setShowStatusPill((prev) => !prev)}
            aria-label="Toggle 3D performance and motion settings"
            className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/80 hover:bg-white text-[11px] font-medium text-[#26344A] border border-[#DCEBFF] shadow-2xs backdrop-blur-xs transition-all hover:shadow-xs"
          >
            {isReducedMotion ? (
              <>
                <EyeOff className="w-3 h-3 text-amber-500" />
                <span>Motion: Static</span>
              </>
            ) : isThrottled ? (
              <>
                <Leaf className="w-3 h-3 text-emerald-600" />
                <span>3D Eco Mode</span>
              </>
            ) : (
              <>
                <Sparkles className="w-3 h-3 text-sky-500" />
                <span>3D High Fidelity</span>
              </>
            )}
          </button>

          {/* Interactive Popover Settings Menu */}
          {showStatusPill && (
            <div className="absolute bottom-full left-0 mb-2 w-64 p-3 rounded-xl bg-white/95 border border-[#DCEBFF] shadow-lg backdrop-blur-md text-xs text-[#303039] z-30 animate-in fade-in slide-in-from-bottom-2">
              <div className="flex items-center justify-between pb-2 mb-2 border-b border-gray-100">
                <span className="font-semibold text-[#26344A] flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                  3D Graphics & Motion
                </span>
                <span className="text-[10px] text-[#747780]">
                  {isThrottled ? '30 FPS Capped' : '60 FPS Full'}
                </span>
              </div>

              {hardwareReason && (
                <p className="text-[10px] text-[#747780] mb-2.5">
                  Detected: <span className="font-medium text-[#26344A]">{hardwareReason}</span>
                </p>
              )}

              <div className="space-y-1">
                <button
                  type="button"
                  onClick={() => {
                    setUserMode('auto');
                    setShowStatusPill(false);
                  }}
                  className={`w-full text-left px-2 py-1.5 rounded-md flex items-center justify-between transition-colors ${
                    userMode === 'auto' ? 'bg-[#EAF2FF] text-[#26344A] font-medium' : 'hover:bg-gray-50'
                  }`}
                >
                  <span className="flex items-center gap-1.5">
                    <Zap className="w-3 h-3 text-sky-500" />
                    Auto (System Adaptive)
                  </span>
                  {userMode === 'auto' && <span className="text-[10px] font-bold text-sky-600">Active</span>}
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setUserMode('eco');
                    setShowStatusPill(false);
                  }}
                  className={`w-full text-left px-2 py-1.5 rounded-md flex items-center justify-between transition-colors ${
                    userMode === 'eco' ? 'bg-[#E8F3ED] text-[#26344A] font-medium' : 'hover:bg-gray-50'
                  }`}
                >
                  <span className="flex items-center gap-1.5">
                    <Leaf className="w-3 h-3 text-emerald-600" />
                    Eco Mode (30 FPS Throttled)
                  </span>
                  {userMode === 'eco' && <span className="text-[10px] font-bold text-emerald-600">Active</span>}
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setUserMode('high');
                    setShowStatusPill(false);
                  }}
                  className={`w-full text-left px-2 py-1.5 rounded-md flex items-center justify-between transition-colors ${
                    userMode === 'high' ? 'bg-[#FAF8F3] text-[#26344A] font-medium' : 'hover:bg-gray-50'
                  }`}
                >
                  <span className="flex items-center gap-1.5">
                    <Sparkles className="w-3 h-3 text-amber-500" />
                    Full Fidelity (60 FPS)
                  </span>
                  {userMode === 'high' && <span className="text-[10px] font-bold text-amber-600">Active</span>}
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setUserMode('reduced');
                    setShowStatusPill(false);
                  }}
                  className={`w-full text-left px-2 py-1.5 rounded-md flex items-center justify-between transition-colors ${
                    userMode === 'reduced' ? 'bg-[#EEE9FA] text-[#26344A] font-medium' : 'hover:bg-gray-50'
                  }`}
                >
                  <span className="flex items-center gap-1.5">
                    <EyeOff className="w-3 h-3 text-purple-600" />
                    Reduced Motion (Static 3D)
                  </span>
                  {userMode === 'reduced' && <span className="text-[10px] font-bold text-purple-600">Active</span>}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
