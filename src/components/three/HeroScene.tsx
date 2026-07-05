import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, Environment } from '@react-three/drei'
import { useRef } from 'react'
import { type Mesh } from 'three'

export default function HeroScene() {
  return (
    <Canvas camera={{ position: [0, 0, 8] }} className="absolute inset-0">
      <ambientLight intensity={0.3} />
      <directionalLight position={[10, 10, 5]} intensity={1} />
      <FloatingTorus />
      <OrbitControls enableZoom={false} enablePan={false} />
      <Environment preset="city" />
    </Canvas>
  )
}

function FloatingTorus() {
  const meshRef = useRef<Mesh>(null!)
  useFrame((state) => {
    meshRef.current.rotation.x += 0.005
    meshRef.current.rotation.y += 0.005
    meshRef.current.position.y = Math.sin(state.clock.getElapsedTime() * 0.5) * 0.2
  })
  return (
    <mesh ref={meshRef}>
      <torusGeometry args={[1.2, 0.4, 16, 32]} />
      <meshStandardMaterial color="#ffffff" metalness={0.8} roughness={0.2} />
    </mesh>
  )
}