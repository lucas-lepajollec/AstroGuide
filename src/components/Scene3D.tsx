import { OrbitControls, Stars, Line, Html } from '@react-three/drei';
import { Canvas, useFrame } from '@react-three/fiber';
import { useRef, useState, useMemo } from 'react';
import * as THREE from 'three';
import { CelestialObject, celestialObjects } from '../mockData';

interface Scene3DProps {
  onSelectObject: (obj: CelestialObject | null) => void;
  selectedObjectId: string | null;
}

const CelestialBody = ({
  data,
  onSelect,
  isSelected,
}: {
  data: CelestialObject;
  onSelect: (data: CelestialObject | null) => void;
  isSelected: boolean;
}) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);

  // Simple orbit logic
  useFrame(({ clock }) => {
    if (data.orbitRadius && data.orbitSpeed && meshRef.current) {
      const t = clock.getElapsedTime() * data.orbitSpeed * 100;
      meshRef.current.position.x = Math.cos(t) * data.orbitRadius;
      meshRef.current.position.z = Math.sin(t) * data.orbitRadius;
    }
  });

  const isSun = data.id === 'sun';

  return (
    <group>
      {/* Orbit Path */}
      {data.orbitRadius && (
        <Line
          points={useMemo(() => {
            const points = [];
            for (let i = 0; i <= 64; i++) {
              const angle = (i / 64) * Math.PI * 2;
              points.push(
                new THREE.Vector3(
                  Math.cos(angle) * data.orbitRadius!,
                  0,
                  Math.sin(angle) * data.orbitRadius!
                )
              );
            }
            return points;
          }, [data.orbitRadius])}
          color="#ffffff"
          opacity={0.1}
          transparent
          lineWidth={1}
        />
      )}

      <mesh
        ref={meshRef}
        position={data.position}
        onPointerOver={(e) => {
          e.stopPropagation();
          setHovered(true);
          document.body.style.cursor = 'pointer';
        }}
        onPointerOut={(e) => {
          setHovered(false);
          document.body.style.cursor = 'auto';
        }}
        onClick={(e) => {
          e.stopPropagation();
          onSelect(data);
        }}
      >
        <sphereGeometry args={[data.size, 32, 32]} />
        <meshStandardMaterial
          color={data.color}
          emissive={data.color}
          emissiveIntensity={isSun ? 2 : hovered || isSelected ? 0.8 : 0.2}
          roughness={0.4}
          metalness={0.1}
        />
        {(hovered || isSelected) && (
          <Html distanceFactor={100} position={[0, data.size + 1, 0]} center>
            <div className="px-2 py-1 text-xs font-mono text-white bg-black/60 backdrop-blur-md border border-white/20 rounded-md whitespace-nowrap pointer-events-none">
              {data.name}
            </div>
          </Html>
        )}
      </mesh>
    </group>
  );
};

const ConstellationLines = () => {
  const lines: { start: THREE.Vector3; end: THREE.Vector3 }[] = [];
  const processed = new Set<string>();

  celestialObjects.forEach((obj) => {
    if (obj.connections) {
      obj.connections.forEach((connId) => {
        const target = celestialObjects.find((o) => o.id === connId);
        if (target) {
          const pairId = [obj.id, target.id].sort().join('-');
          if (!processed.has(pairId)) {
            lines.push({
              start: new THREE.Vector3(...obj.position),
              end: new THREE.Vector3(...target.position),
            });
            processed.add(pairId);
          }
        }
      });
    }
  });

  return (
    <group>
      {lines.map((line, i) => (
        <Line
          key={i}
          points={[line.start, line.end]}
          color="#4ade80"
          opacity={0.3}
          transparent
          lineWidth={1}
        />
      ))}
    </group>
  );
};

export default function Scene3D({ onSelectObject, selectedObjectId }: Scene3DProps) {
  return (
    <div className="w-full h-full absolute inset-0 bg-black">
      <Canvas camera={{ position: [0, 20, 60], fov: 60 }}>
        <color attach="background" args={['#050505']} />
        <ambientLight intensity={0.1} />
        <pointLight position={[0, 0, 0]} intensity={2} color="#FDB813" />
        
        <Stars radius={300} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
        
        <ConstellationLines />

        {celestialObjects.map((obj) => (
          <CelestialBody
            key={obj.id}
            data={obj}
            onSelect={onSelectObject}
            isSelected={selectedObjectId === obj.id}
          />
        ))}

        <OrbitControls
          enableDamping
          dampingFactor={0.05}
          maxDistance={500}
          minDistance={5}
        />
      </Canvas>
    </div>
  );
}
