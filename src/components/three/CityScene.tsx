import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

export default function CityScene() {
  const roadRef = useRef<THREE.Mesh>(null)

  useFrame(() => {
    if (roadRef.current) {
      const material = roadRef.current.material as THREE.MeshStandardMaterial
      material.roughness = 0.2
      material.metalness = 0.8
    }
  })

  return (
    <group>
      {/* Fog for depth */}
      <fog attach="fog" args={['#0a0a1a', 5, 30]} />

      {/* Ambient light */}
      <ambientLight intensity={0.3} />

      {/* TEMP: red background to verify canvas renders */}
      <color attach="background" args={['red']} />

      {/* Street/Road */}
      <mesh ref={roadRef} rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.01, 0]}>
        <planeGeometry args={[4, 40]} />
        <meshStandardMaterial color="#111122" roughness={0.2} metalness={0.8} />
      </mesh>

      {/* Center line on road */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]}>
        <planeGeometry args={[0.1, 40]} />
        <meshStandardMaterial color="#333355" emissive="#222244" emissiveIntensity={0.5} />
      </mesh>

      {/* Buildings - Left side */}
      {Array.from({ length: 12 }).map((_, i) => (
        <Building key={`left-${i}`} position={[-3.5, 0, -18 + i * 3]} height={3 + Math.random() * 6} />
      ))}

      {/* Buildings - Right side */}
      {Array.from({ length: 12 }).map((_, i) => (
        <Building key={`right-${i}`} position={[3.5, 0, -18 + i * 3]} height={3 + Math.random() * 6} />
      ))}

      {/* Storefront placeholder in the middle */}
      <group position={[0, 0, 0]}>
        <mesh position={[0, 1.5, 0]}>
          <boxGeometry args={[3, 3, 0.5]} />
          <meshStandardMaterial color="#1a1a2e" emissive="#16213e" emissiveIntensity={0.3} transparent opacity={0.8} />
        </mesh>
        <pointLight position={[0, 2, 2]} intensity={2} color="#8b5cf6" distance={8} />
        <pointLight position={[0, 1, 1]} intensity={1} color="#3b82f6" distance={6} />
      </group>

      {/* Blue/Purple point light near center */}
      <pointLight position={[0, 3, -2]} intensity={1.5} color="#8b5cf6" distance={12} />
    </group>
  )
}

function Building({ position, height }: { position: [number, number, number]; height: number }) {
  const meshRef = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    if (meshRef.current) {
      const material = meshRef.current.material as THREE.MeshStandardMaterial
      material.emissiveIntensity = 0.3 + Math.sin(state.clock.elapsedTime * 0.5) * 0.1
    }
  })

  return (
    <mesh ref={meshRef} position={[position[0], height / 2, position[2]]}>
      <boxGeometry args={[1.5, height, 1.5]} />
      <meshStandardMaterial color="#0f0f1a" roughness={0.3} metalness={0.7} emissive="#1a1a2e" emissiveIntensity={0.3} />
    </mesh>
  )
}
