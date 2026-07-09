import { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, Environment } from '@react-three/drei'
import * as THREE from 'three'

function MorphableMannequin({ height, weight, bodyType }: { height: number; weight: number; bodyType: string }) {
  const meshRef = useRef<THREE.Group>(null)

  const bmi = weight / ((height / 100) ** 2)

  const chestScale = useMemo(() => {
    if (bodyType === 'slim') return 0.9
    if (bodyType === 'athletic') return 1.1
    if (bodyType === 'plus') return 1.2
    if (bmi > 25) return 1.15
    if (bmi < 18.5) return 0.85
    return 1.0
  }, [bodyType, bmi])

  const waistScale = useMemo(() => {
    if (bodyType === 'slim') return 0.85
    if (bodyType === 'athletic') return 0.95
    if (bodyType === 'plus') return 1.25
    if (bmi > 25) return 1.2
    if (bmi < 18.5) return 0.8
    return 1.0
  }, [bodyType, bmi])

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.3) * 0.3
    }
  })

  return (
    <group ref={meshRef} position={[0, -0.5, 0]}>
      {/* Head */}
      <mesh position={[0, 2.2, 0]}>
        <sphereGeometry args={[0.25, 32, 32]} />
        <meshStandardMaterial color="#e0e0e0" roughness={0.3} metalness={0.1} />
      </mesh>

      {/* Neck */}
      <mesh position={[0, 1.9, 0]}>
        <cylinderGeometry args={[0.08, 0.1, 0.2, 16]} />
        <meshStandardMaterial color="#e0e0e0" roughness={0.3} metalness={0.1} />
      </mesh>

      {/* Torso / Chest */}
      <mesh position={[0, 1.4, 0]} scale={[1, 1, chestScale]}>
        <capsuleGeometry args={[0.35, 0.6, 4, 16]} />
        <meshStandardMaterial color="#e0e0e0" roughness={0.3} metalness={0.1} />
      </mesh>

      {/* Waist */}
      <mesh position={[0, 0.8, 0]} scale={[1, 1, waistScale]}>
        <capsuleGeometry args={[0.28, 0.4, 4, 16]} />
        <meshStandardMaterial color="#e0e0e0" roughness={0.3} metalness={0.1} />
      </mesh>

      {/* Hips */}
      <mesh position={[0, 0.3, 0]}>
        <capsuleGeometry args={[0.32, 0.3, 4, 16]} />
        <meshStandardMaterial color="#e0e0e0" roughness={0.3} metalness={0.1} />
      </mesh>

      {/* Left Arm */}
      <mesh position={[-0.5, 1.4, 0]} rotation={[0, 0, 0.15]}>
        <capsuleGeometry args={[0.1, 0.7, 4, 16]} />
        <meshStandardMaterial color="#e0e0e0" roughness={0.3} metalness={0.1} />
      </mesh>

      {/* Right Arm */}
      <mesh position={[0.5, 1.4, 0]} rotation={[0, 0, -0.15]}>
        <capsuleGeometry args={[0.1, 0.7, 4, 16]} />
        <meshStandardMaterial color="#e0e0e0" roughness={0.3} metalness={0.1} />
      </mesh>

      {/* Left Leg */}
      <mesh position={[-0.2, -0.3, 0]}>
        <capsuleGeometry args={[0.14, 0.9, 4, 16]} />
        <meshStandardMaterial color="#e0e0e0" roughness={0.3} metalness={0.1} />
      </mesh>

      {/* Right Leg */}
      <mesh position={[0.2, -0.3, 0]}>
        <capsuleGeometry args={[0.14, 0.9, 4, 16]} />
        <meshStandardMaterial color="#e0e0e0" roughness={0.3} metalness={0.1} />
      </mesh>
    </group>
  )
}

export default function Mannequin3D({
  height,
  weight,
  bodyType,
}: {
  height: number
  weight: number
  bodyType: string
}) {
  return (
    <div className="w-full h-[400px] rounded-2xl overflow-hidden border border-white/10">
      <Canvas camera={{ position: [0, 1, 3], fov: 50 }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[5, 5, 5]} intensity={1} />
        <pointLight position={[-5, 5, -5]} intensity={0.5} />

        <MorphableMannequin height={height} weight={weight} bodyType={bodyType} />

        <OrbitControls enableZoom={false} enablePan={false} minPolarAngle={Math.PI / 4} maxPolarAngle={Math.PI / 1.5} />
        <Environment preset="city" />
      </Canvas>
    </div>
  )
}
