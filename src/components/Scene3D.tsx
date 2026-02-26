import React, { useRef, useMemo, useEffect, Suspense, useState } from 'react';
import { Canvas, useFrame, useThree, useLoader } from '@react-three/fiber';
import { OrbitControls, Stars, Html, Billboard, MeshDistortMaterial } from '@react-three/drei';
import * as THREE from 'three';
import { celestialObjects, constellationLines, type CelestialObject } from '../data/mockData';
import { useAstroStore } from '../store/useAstroStore';

/* ── Error Boundary for Textures ─────────────── */
class TextureErrorBoundary extends React.Component<{ fallback: React.ReactNode, children: React.ReactNode }, { hasError: boolean }> {
  constructor(props: { fallback: React.ReactNode, children: React.ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback;
    }
    return this.props.children;
  }
}

/* ── Textured Material Sub-component ──────────── */
function TexturedMaterial({
  color,
  textureUrl,
  emissive,
  emissiveIntensity,
  roughness,
  toneMapped = true,
  isStar = false
}: {
  color: string;
  textureUrl?: string;
  emissive: string;
  emissiveIntensity: number;
  roughness: number;
  toneMapped?: boolean;
  isStar?: boolean;
}) {
  const { gl } = useThree();
  const texture = textureUrl ? useLoader(THREE.TextureLoader, textureUrl) as THREE.Texture : null;

  if (texture) {
    texture.colorSpace = THREE.SRGBColorSpace;
    texture.anisotropy = gl.capabilities.getMaxAnisotropy();
    texture.minFilter = THREE.LinearFilter; // Évite le flou du mipmap sur les grosses textures
    texture.magFilter = THREE.LinearFilter;
    texture.generateMipmaps = false;
  }

  if (isStar) {
    return (
      <meshStandardMaterial
        color={texture ? '#ffffff' : color}
        map={texture || null}
        emissive={texture ? '#ffffff' : emissive}
        emissiveMap={texture ? texture : null}
        emissiveIntensity={texture ? 1.5 : emissiveIntensity}
        roughness={texture ? 1 : roughness}
        metalness={0}
        toneMapped={toneMapped}
      />
    );
  }

  return (
    <meshStandardMaterial
      color={texture ? '#ffffff' : color}
      map={texture || null}
      emissive={texture ? (isStar ? '#ffffff' : '#000000') : emissive}
      emissiveMap={texture && isStar ? texture : null}
      emissiveIntensity={texture ? (isStar ? 1.5 : 0) : emissiveIntensity}
      roughness={texture ? (isStar ? 1 : 0.3) : roughness}
      metalness={texture ? (isStar ? 0 : 0.1) : 0}
      toneMapped={toneMapped}
    />
  );
}

function TinyStarMaterial({ color, textureUrl }: { color: string, textureUrl: string }) {
  const { gl } = useThree();
  const texture = useLoader(THREE.TextureLoader, textureUrl) as THREE.Texture;

  const grayscaleTexture = useMemo(() => {
    if (!texture || !texture.image) return texture;
    const img = texture.image as HTMLImageElement;
    const canvas = document.createElement('canvas');
    canvas.width = img.width;
    canvas.height = img.height;
    const ctx = canvas.getContext('2d', { willReadFrequently: true });
    if (!ctx) return texture;

    ctx.drawImage(img, 0, 0);
    const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const data = imgData.data;
    for (let i = 0; i < data.length; i += 4) {
      const gray = data[i] * 0.299 + data[i + 1] * 0.587 + data[i + 2] * 0.114;
      data[i] = gray;
      data[i + 1] = gray;
      data[i + 2] = gray;
    }
    ctx.putImageData(imgData, 0, 0);

    const newTex = new THREE.CanvasTexture(canvas);
    newTex.colorSpace = THREE.SRGBColorSpace;
    newTex.anisotropy = gl.capabilities.getMaxAnisotropy();
    newTex.minFilter = THREE.LinearFilter;
    newTex.magFilter = THREE.LinearFilter;
    newTex.generateMipmaps = false;
    newTex.needsUpdate = true;
    return newTex;
  }, [texture, gl]);

  return (
    <meshStandardMaterial
      map={grayscaleTexture}
      color={color}
      emissive={color}
      emissiveMap={grayscaleTexture}
      emissiveIntensity={1.5}
      roughness={1}
      metalness={0}
      toneMapped={false}
    />
  );
}

/* ── Transparent Basic Material ───────────────── */
function TransparentBasicMaterial({ textureUrl, color, blending }: { textureUrl?: string, color: string, blending?: THREE.Blending }) {
  const { gl } = useThree();
  const texture = textureUrl ? useLoader(THREE.TextureLoader, textureUrl) as THREE.Texture : null;
  if (texture) {
    texture.colorSpace = THREE.SRGBColorSpace;
    texture.anisotropy = gl.capabilities.getMaxAnisotropy();
    texture.minFilter = THREE.LinearFilter;
    texture.magFilter = THREE.LinearFilter;
    texture.generateMipmaps = false;
  }
  return (
    <meshBasicMaterial
      map={texture || null}
      color={texture ? '#ffffff' : color}
      transparent={true}
      blending={blending || THREE.NormalBlending}
      side={THREE.DoubleSide}
      depthWrite={false}
      toneMapped={false}
    />
  );
}

/* ── Cosmic Background ────────────────────────── */
function CosmicBackground() {
  const texture = useLoader(THREE.TextureLoader, '/textures/stars_milky_way.jpg') as THREE.Texture;
  if (texture) {
    texture.colorSpace = THREE.SRGBColorSpace;
  }
  return (
    <mesh>
      <sphereGeometry args={[900, 64, 64]} />
      <meshBasicMaterial map={texture} side={THREE.BackSide} toneMapped={false} />
    </mesh>
  );
}

/* ── Saturn Ring Material ─────────────────────── */
function SaturnRingMaterial() {
  const texture = useLoader(THREE.TextureLoader, '/textures/saturn_ring.png') as THREE.Texture;
  if (texture) {
    texture.colorSpace = THREE.SRGBColorSpace;
  }
  return (
    <meshBasicMaterial
      map={texture}
      transparent={true}
      opacity={0.9}
      side={THREE.DoubleSide}
      toneMapped={false}
    />
  );
}

/* ── Orbit Trail Ring ─────────────────────────── */
function OrbitTrail({ radius, opacity = 0.12 }: { radius: number; opacity?: number }) {
  const points = useMemo(() => {
    const pts: THREE.Vector3[] = [];
    const segments = 128;
    for (let i = 0; i <= segments; i++) {
      const angle = (i / segments) * Math.PI * 2;
      pts.push(new THREE.Vector3(Math.cos(angle) * radius, 0, Math.sin(angle) * radius));
    }
    return pts;
  }, [radius]);

  const lineObj = useMemo(() => {
    const geo = new THREE.BufferGeometry().setFromPoints(points);
    const mat = new THREE.LineBasicMaterial({ color: '#10b981', opacity, transparent: true });
    return new THREE.Line(geo, mat);
  }, [points, opacity]);

  return <primitive object={lineObj} />;
}

/* ── Always-facing Label ──────────────────────── */
function ObjectLabel({ position, name, color, isSelected }: {
  position: [number, number, number];
  name: string;
  color: string;
  isSelected: boolean;
}) {
  return (
    <Html
      position={[position[0], position[1] + 2.5, position[2]]}
      center
      style={{ pointerEvents: 'none' }}
      zIndexRange={[10, 0]}
    >
      <div
        className="whitespace-nowrap select-none"
        style={{
          fontSize: isSelected ? '11px' : '9px',
          fontFamily: 'monospace',
          color: isSelected ? '#6ee7b7' : 'rgba(255,255,255,0.45)',
          textShadow: '0 0 4px rgba(0,0,0,0.9)',
          padding: '1px 4px',
          borderRadius: '3px',
          backgroundColor: isSelected ? 'rgba(16,185,129,0.12)' : 'transparent',
          borderBottom: isSelected ? `1px solid ${color}60` : 'none',
          transition: 'all 0.3s',
        }}
      >
        {name}
      </div>
    </Html>
  );
}

/* ── Orbiting Planet ──────────────────────────── */
function OrbitingPlanet({ data, planetPositions }: { data: CelestialObject, planetPositions: React.MutableRefObject<Map<string, THREE.Vector3>> }) {
  const groupRef = useRef<THREE.Group>(null!);
  const setSelectedAstro = useAstroStore((s) => s.setSelectedAstro);
  const setCardVisible = useAstroStore((s) => s.setCardVisible);
  const selectedAstro = useAstroStore((s) => s.selectedAstro);
  const isSelected = selectedAstro?.id === data.id;

  const radius = useMemo(() => {
    if (data.id === 'jupiter') return 1.2;
    if (data.id === 'saturn') return 1.0;
    if (data.id === 'uranus' || data.id === 'neptune') return 0.8;
    if (data.id === 'earth' || data.id === 'venus') return 0.5;
    if (data.id === 'mars') return 0.4;
    if (data.id === 'mercury') return 0.25;
    if (data.id === 'pluto') return 0.2;
    if (data.id === 'moon') return 0.15;
    return 0.5;
  }, [data.id]);

  const orbitalRadius = data.orbitalRadius!;
  const orbitalSpeed = data.orbitalSpeed!;
  const orbitalOffset = data.orbitalOffset!;

  useFrame(({ clock }) => {
    if (!groupRef.current) return;
    const t = clock.getElapsedTime();
    const angle = orbitalOffset + t * orbitalSpeed;
    const x = Math.cos(angle) * orbitalRadius;
    const z = Math.sin(angle) * orbitalRadius;
    groupRef.current.position.set(x, data.position[1], z);
    data.position[0] = x;
    data.position[2] = z;

    let pos = planetPositions.current.get(data.id);
    if (!pos) {
      pos = new THREE.Vector3();
      planetPositions.current.set(data.id, pos);
    }
    pos.copy(groupRef.current.position);
  });

  // Determine orbit trail opacity — higher for outer planets
  const trailOpacity = data.id === 'moon' ? 0.06 : 0.12;

  return (
    <>
      <OrbitTrail radius={orbitalRadius} opacity={trailOpacity} />
      <group ref={groupRef}>
        <mesh
          onClick={(e) => {
            e.stopPropagation();
            setSelectedAstro({ ...data, position: [...data.position] });
          }}
        >
          <sphereGeometry args={[radius, 64, 64]} />

          <TextureErrorBoundary
            fallback={
              <meshStandardMaterial
                color={data.color}
                emissive={data.color}
                emissiveIntensity={isSelected ? 2.5 : 0.4}
                roughness={0.7}
              />
            }
          >
            <Suspense fallback={<meshStandardMaterial color={data.color} />}>
              <TexturedMaterial
                color={data.color}
                textureUrl={data.textureUrl}
                emissive={data.color}
                emissiveIntensity={isSelected ? 2.5 : 0.4}
                roughness={0.7}
              />
            </Suspense>
          </TextureErrorBoundary>
        </mesh>
        {/* Saturn's rings */}
        {data.id === 'saturn' && (
          <mesh rotation={[Math.PI / 2.5, 0, 0]}>
            <ringGeometry args={[radius + 0.2, radius + 1.2, 64]} />
            <TextureErrorBoundary
              fallback={
                <meshStandardMaterial
                  color="#E3D599"
                  transparent
                  opacity={0.5}
                  side={THREE.DoubleSide}
                />
              }
            >
              <Suspense fallback={<meshStandardMaterial color="#E3D599" transparent opacity={0.5} side={THREE.DoubleSide} />}>
                <SaturnRingMaterial />
              </Suspense>
            </TextureErrorBoundary>
          </mesh>
        )}
        {/* Label */}
        <ObjectLabel
          position={[0, radius + 0.5, 0]}
          name={data.name}
          color={data.color}
          isSelected={isSelected}
        />
      </group>
    </>
  );
}

/* ── Orbiting Moon ────────────────────────────── */
function OrbitingMoon({ data, planetPositions }: { data: CelestialObject, planetPositions: React.MutableRefObject<Map<string, THREE.Vector3>> }) {
  const groupRef = useRef<THREE.Group>(null!);
  const trailRef = useRef<THREE.Mesh>(null!);
  const setSelectedAstro = useAstroStore((s) => s.setSelectedAstro);
  const setCardVisible = useAstroStore((s) => s.setCardVisible);
  const selectedAstro = useAstroStore((s) => s.selectedAstro);
  const isSelected = selectedAstro?.id === data.id;

  const radius = 0.15; // Moon size
  const orbitalRadius = data.orbitalRadius!;
  const orbitalSpeed = data.orbitalSpeed!;
  const orbitalOffset = data.orbitalOffset!;

  useFrame(({ clock }) => {
    if (!groupRef.current || !data.parentId) return;

    // Get parent position
    const parentPos = planetPositions.current.get(data.parentId);
    if (!parentPos) return;

    const t = clock.getElapsedTime();
    const angle = orbitalOffset + t * orbitalSpeed;
    const xOffset = Math.cos(angle) * orbitalRadius;
    const zOffset = Math.sin(angle) * orbitalRadius;

    // Set position relative to parent
    const finalX = parentPos.x + xOffset;
    const finalZ = parentPos.z + zOffset;

    groupRef.current.position.set(finalX, parentPos.y, finalZ);
    data.position[0] = finalX;
    data.position[1] = parentPos.y;
    data.position[2] = finalZ;

    if (trailRef.current) {
      trailRef.current.position.set(parentPos.x, parentPos.y, parentPos.z);
    }
  });

  const trailOpacity = 0.06;

  return (
    <>
      <mesh ref={trailRef} rotation={[Math.PI / 2, 0, 0]}>
        <ringGeometry args={[orbitalRadius - 0.05, orbitalRadius + 0.05, 64]} />
        <meshBasicMaterial color="#10b981" opacity={trailOpacity} transparent side={THREE.DoubleSide} />
      </mesh>

      <group ref={groupRef}>
        <mesh
          onClick={(e) => {
            e.stopPropagation();
            setSelectedAstro({ ...data, position: [...data.position] });
            setCardVisible(true);
          }}
        >
          <sphereGeometry args={[radius, 32, 32]} />

          <TextureErrorBoundary
            fallback={
              <meshStandardMaterial
                color={data.color}
                emissive={data.color}
                emissiveIntensity={isSelected ? 2.5 : 0.4}
                roughness={0.7}
              />
            }
          >
            <Suspense fallback={<meshStandardMaterial color={data.color} />}>
              <TexturedMaterial
                color={data.color}
                textureUrl={data.textureUrl}
                emissive={data.color}
                emissiveIntensity={isSelected ? 2.5 : 0.4}
                roughness={0.7}
              />
            </Suspense>
          </TextureErrorBoundary>
        </mesh>

        {/* Label */}
        <ObjectLabel
          position={[0, radius + 0.5, 0]}
          name={data.name}
          color={data.color}
          isSelected={isSelected}
        />
      </group>
    </>
  );
}

/* ── Helper for Blackhole Shape ───────────────── */
function BlackHoleShape({ radius, data }: { radius: number, data: CelestialObject }) {
  const diskRef = useRef<THREE.Mesh>(null!);
  useFrame(({ clock }) => {
    if (diskRef.current) diskRef.current.rotation.z = Math.sin(clock.getElapsedTime() * 0.5) * 0.05;
  });
  return (
    <group>
      {/* The black center to hide stars behind the shadow */}
      <mesh>
        <sphereGeometry args={[radius * 0.85, 32, 32]} />
        <meshBasicMaterial color="#000000" toneMapped={false} />
      </mesh>

      {/* The accretion disk from the photo */}
      <Billboard follow={true} lockX={false} lockY={false} lockZ={false}>
        <mesh ref={diskRef}>
          {/* Using a 16:9 roughly scaled rectangle for the texture */}
          <planeGeometry args={[radius * 5.3, radius * 3]} />
          <TextureErrorBoundary fallback={<meshBasicMaterial color={data.color || "#7c3aed"} transparent={true} blending={THREE.AdditiveBlending} depthWrite={false} side={THREE.DoubleSide} toneMapped={false} />}>
            <Suspense fallback={<meshBasicMaterial color={data.color || "#7c3aed"} transparent={true} blending={THREE.AdditiveBlending} depthWrite={false} side={THREE.DoubleSide} toneMapped={false} />}>
              <TransparentBasicMaterial color={data.color || "#7c3aed"} textureUrl={data.textureUrl} blending={THREE.AdditiveBlending} />
            </Suspense>
          </TextureErrorBoundary>
        </mesh>
      </Billboard>
    </group>
  );
}

/* ── Static Celestial Body ────────────────────── */
function CelestialBody({ data }: { data: CelestialObject }) {
  const groupRef = useRef<THREE.Group>(null!);
  const setSelectedAstro = useAstroStore((s) => s.setSelectedAstro);
  const setCardVisible = useAstroStore((s) => s.setCardVisible);
  const selectedAstro = useAstroStore((s) => s.selectedAstro);
  const isSelected = selectedAstro?.id === data.id;

  const shape = data.shape || 'sphere';

  const radius = useMemo(() => {
    if (data.id === 'sun') return 2.5;
    if (data.shape === 'tinyStar') return 0.7; // Plasma stars
    if (data.type === 'galaxy') return 8; // Increased from 4 to 8
    if (data.type === 'blackhole') return 8; // Make blackholes really big
    return 0.6;
  }, [data]);

  useFrame(({ clock }) => {
    if (!groupRef.current) return;
    const t = clock.getElapsedTime();
    if (shape !== 'tinyStar') {
      const pulse = 1 + Math.sin(t * 2 + data.position[0] * 0.1) * 0.04;
      groupRef.current.scale.setScalar(pulse);
    }
  });

  return (
    <group>
      <group
        ref={groupRef}
        position={data.position}
        onClick={(e) => {
          e.stopPropagation();
          setSelectedAstro(data);
          setCardVisible(true);
        }}
      >
        {shape === 'sphere' && (
          <mesh>
            <sphereGeometry args={[radius, 32, 32]} />

            <TextureErrorBoundary
              fallback={
                <meshStandardMaterial
                  color={data.color}
                  emissive={data.color}
                  emissiveIntensity={isSelected ? 3 : data.id === 'sun' ? 2 : 0.8}
                  roughness={0.6}
                  toneMapped={false}
                />
              }
            >
              <Suspense fallback={<meshStandardMaterial color={data.color} />}>
                <TexturedMaterial
                  color={data.color}
                  textureUrl={data.textureUrl}
                  emissive={data.color}
                  emissiveIntensity={
                    isSelected ? 3 : data.id === 'sun' ? 2 : 0.8
                  }
                  roughness={0.6}
                  toneMapped={false}
                  isStar={data.type === 'star'}
                />
              </Suspense>
            </TextureErrorBoundary>
          </mesh>
        )}

        {shape === 'disc' && (
          <Billboard follow={true} lockX={false} lockY={false} lockZ={false}>
            <mesh>
              <planeGeometry args={[radius * 4, radius * 4]} />
              <TextureErrorBoundary
                fallback={
                  <meshBasicMaterial color={data.color} transparent opacity={0.8} side={THREE.DoubleSide} toneMapped={false} />
                }
              >
                <Suspense fallback={<meshBasicMaterial color={data.color} transparent opacity={0.8} side={THREE.DoubleSide} toneMapped={false} />}>
                  <TransparentBasicMaterial color={data.color} textureUrl={data.textureUrl} />
                </Suspense>
              </TextureErrorBoundary>
            </mesh>
          </Billboard>
        )}

        {shape === 'blackhole' && (
          <BlackHoleShape radius={radius} data={data} />
        )}

        {shape === 'tinyStar' && (
          <mesh>
            <sphereGeometry args={[0.8, 32, 32]} />
            <TextureErrorBoundary
              fallback={
                <meshStandardMaterial color={data.color} emissive={data.color} emissiveIntensity={1.5} toneMapped={false} />
              }
            >
              <Suspense fallback={<meshStandardMaterial color={data.color} toneMapped={false} />}>
                <TinyStarMaterial color={data.color} textureUrl={data.textureUrl || '/textures/sun.jpg'} />
              </Suspense>
            </TextureErrorBoundary>
          </mesh>
        )}
      </group>

      {/* Label */}
      <ObjectLabel
        position={[data.position[0], data.position[1] + radius + 1, data.position[2]]}
        name={data.name}
        color={data.color}
        isSelected={isSelected}
      />
    </group>
  );
}

/* ── Constellation Lines 3D ───────────────────── */
function ConstellationLines3D() {
  const segments = useMemo(() => {
    const objMap = new Map(celestialObjects.map((o) => [o.id, o]));
    const segs: [THREE.Vector3, THREE.Vector3][] = [];
    for (const pairs of Object.values(constellationLines)) {
      for (const [fromId, toId] of pairs) {
        const a = objMap.get(fromId);
        const b = objMap.get(toId);
        if (a && b) {
          segs.push([new THREE.Vector3(...a.position), new THREE.Vector3(...b.position)]);
        }
      }
    }
    return segs;
  }, []);

  return (
    <group>
      {segments.map(([from, to], i) => {
        const geo = new THREE.BufferGeometry().setFromPoints([from, to]);
        return (
          <lineSegments key={i} geometry={geo}>
            <lineBasicMaterial color="#10b981" opacity={0.25} transparent />
          </lineSegments>
        );
      })}
    </group>
  );
}

/* ── Cinematic Camera Controller ──────────────── */
function CameraController({ planetPositions }: { planetPositions: React.MutableRefObject<Map<string, THREE.Vector3>> }) {
  const { camera } = useThree();
  const controlsRef = useRef<any>(null);
  const selectedAstro = useAstroStore((s) => s.selectedAstro);

  const targetPos = useRef(new THREE.Vector3(40, 30, 40));
  const targetLookAt = useRef(new THREE.Vector3(0, 0, 0));
  const lastLivePos = useRef(new THREE.Vector3(0, 0, 0));
  const tempDelta = useRef(new THREE.Vector3(0, 0, 0));
  const isAnimating = useRef(false);
  const isTracking = useRef(false);

  useEffect(() => {
    if (selectedAstro) {
      const livePos = planetPositions.current.get(selectedAstro.id);
      const pos = new THREE.Vector3(...(livePos ? [livePos.x, livePos.y, livePos.z] : selectedAstro.position));
      const dist = pos.length();
      const offsetScale = Math.max(8, Math.min(dist * 0.2, 40));
      const offset = new THREE.Vector3(offsetScale, offsetScale * 0.6, offsetScale);

      targetPos.current.copy(pos).add(offset);
      targetLookAt.current.copy(pos);
      lastLivePos.current.copy(pos);

      isAnimating.current = true;
      isTracking.current = false;
    } else {
      isAnimating.current = false;
      isTracking.current = false;
    }
  }, [selectedAstro, planetPositions]);

  useFrame(() => {
    if (!controlsRef.current) return;

    if (isAnimating.current) {
      let currentLivePos = undefined;
      if (selectedAstro) {
        currentLivePos = planetPositions.current.get(selectedAstro.id);
        if (currentLivePos) {
          targetLookAt.current.copy(currentLivePos);
          tempDelta.current.subVectors(currentLivePos, lastLivePos.current);
          targetPos.current.add(tempDelta.current);
          lastLivePos.current.copy(currentLivePos);
        }
      }

      camera.position.lerp(targetPos.current, 0.05);
      controlsRef.current.target.lerp(targetLookAt.current, 0.05);
      controlsRef.current.update();

      // Stop animating once close
      if (camera.position.distanceTo(targetPos.current) < 0.2 && controlsRef.current.target.distanceTo(targetLookAt.current) < 0.2) {
        isAnimating.current = false;
        if (selectedAstro && planetPositions.current.has(selectedAstro.id)) {
          isTracking.current = true;
          controlsRef.current.target.copy(targetLookAt.current);
          controlsRef.current.update();
        }
      }
    } else if (isTracking.current && selectedAstro) {
      const currentLivePos = planetPositions.current.get(selectedAstro.id);
      if (currentLivePos) {
        tempDelta.current.subVectors(currentLivePos, lastLivePos.current);
        camera.position.add(tempDelta.current);
        controlsRef.current.target.add(tempDelta.current);
        controlsRef.current.update();
        lastLivePos.current.copy(currentLivePos);
      }
    }
  });

  return (
    <OrbitControls
      ref={controlsRef}
      enableDamping
      dampingFactor={0.05}
      maxDistance={800}
      minDistance={0.5}
      onStart={() => {
        if (isAnimating.current) {
          isAnimating.current = false;
        }
        isTracking.current = false;
      }}
    />
  );
}

/* ── Main Scene ───────────────────────────────── */
export default function Scene3D() {
  const planetPositions = useRef<Map<string, THREE.Vector3>>(new Map());
  const currentView = useAstroStore((s) => s.currentView);

  // Filter out objects with hideIn3D flag
  const visibleObjects = celestialObjects.filter((o) => !o.hideIn3D);
  const planets = visibleObjects.filter((o) => o.type === 'planet' && o.orbitalRadius && !o.parentId);
  const moons = visibleObjects.filter((o) => o.type === 'planet' && o.orbitalRadius && o.parentId);
  const statics = visibleObjects.filter((o) => !(o.type === 'planet' && o.orbitalRadius));
  const blackholes = visibleObjects.filter((o) => o.type === 'blackhole');

  return (
    <div className="absolute inset-0">
      <Canvas
        frameloop={currentView === '3D' ? 'always' : 'never'}
        camera={{ position: [40, 30, 40], fov: 60, near: 0.1, far: 2000 }}
        gl={{ antialias: false, powerPreference: 'high-performance' }}
        dpr={[1, 1.5]}
      >
        <ambientLight intensity={0.6} />
        <pointLight position={[0, 0, 0]} intensity={100} decay={1.5} color="#fff1e0" distance={1500} />

        <TextureErrorBoundary fallback={<Stars radius={800} depth={200} count={4000} factor={6} saturation={0} fade={true} speed={0.3} />}>
          <Suspense fallback={<Stars radius={800} depth={200} count={4000} factor={6} saturation={0} fade={true} speed={0.3} />}>
            <CosmicBackground />
          </Suspense>
        </TextureErrorBoundary>

        <CameraController planetPositions={planetPositions} />

        {statics.map((obj) => (
          <CelestialBody key={obj.id} data={obj} />
        ))}

        {planets.map((obj) => (
          <OrbitingPlanet key={obj.id} data={obj} planetPositions={planetPositions} />
        ))}

        {moons.map((obj) => (
          <OrbitingMoon key={obj.id} data={obj} planetPositions={planetPositions} />
        ))}

        <ConstellationLines3D />
      </Canvas>
    </div>
  );
}
