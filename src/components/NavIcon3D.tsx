import { useRef, useState, useEffect } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { MeshTransmissionMaterial, Environment } from '@react-three/drei'
import * as THREE from 'three'

function GlassMaterial() {
  return (
    <MeshTransmissionMaterial
      backside
      backsideThickness={10}
      thickness={0.5}
      chromaticAberration={0.5}
      anisotropy={0.1}
      distortion={0.1}
      distortionScale={0.3}
      temporalDistortion={0.1}
      ior={1.5}
      clearcoat={1}
      attenuationDistance={0.5}
      attenuationColor="#ffffff"
      color="#ffffff"
      roughness={0.05}
      transmission={0.9}
    />
  )
}

function IconMesh({ type, hovered }: { type: string; hovered: boolean }) {
  const meshRef = useRef<THREE.Group>(null)
  const targetRotation = useRef(new THREE.Euler(0, 0, 0))
  const currentRotation = useRef(new THREE.Euler(0, 0, 0))

  useFrame(() => {
    if (!meshRef.current) return
    const t = targetRotation.current
    const c = currentRotation.current
    c.x += (t.x - c.x) * 0.1
    c.y += (t.y - c.y) * 0.1
    c.z += (t.z - c.z) * 0.1
    meshRef.current.rotation.set(c.x, c.y, c.z)
    const scale = hovered ? 1.1 : 1
    meshRef.current.scale.lerp(new THREE.Vector3(scale, scale, scale), 0.1)
  })

  const renderIcon = () => {
    switch (type) {
      case 'search':
        return (
          <group>
            <mesh position={[0, 0, 0]}>
              <torusGeometry args={[0.3, 0.08, 16, 32]} />
              <GlassMaterial />
            </mesh>
            <mesh position={[0.25, -0.25, 0]} rotation={[0, 0, Math.PI / 4]}>
              <cylinderGeometry args={[0.06, 0.06, 0.4, 16]} />
              <GlassMaterial />
            </mesh>
          </group>
        )
      case 'heart':
        return (
          <group>
            <mesh position={[-0.15, 0.1, 0]}>
              <sphereGeometry args={[0.2, 16, 16]} />
              <GlassMaterial />
            </mesh>
            <mesh position={[0.15, 0.1, 0]}>
              <sphereGeometry args={[0.2, 16, 16]} />
              <GlassMaterial />
            </mesh>
            <mesh position={[0, -0.15, 0]}>
              <coneGeometry args={[0.25, 0.3, 16]} />
              <GlassMaterial />
            </mesh>
          </group>
        )
      case 'cart':
        return (
          <group>
            <mesh position={[0, 0, 0]}>
              <boxGeometry args={[0.5, 0.35, 0.3]} />
              <GlassMaterial />
            </mesh>
            <mesh position={[0, 0.25, 0]}>
              <boxGeometry args={[0.55, 0.08, 0.35]} />
              <GlassMaterial />
            </mesh>
            <mesh position={[-0.15, -0.2, 0]}>
              <cylinderGeometry args={[0.04, 0.04, 0.1, 16]} />
              <GlassMaterial />
            </mesh>
            <mesh position={[0.15, -0.2, 0]}>
              <cylinderGeometry args={[0.04, 0.04, 0.1, 16]} />
              <GlassMaterial />
            </mesh>
          </group>
        )
      case 'moon':
        return (
          <group>
            <mesh>
              <sphereGeometry args={[0.3, 32, 32]} />
              <GlassMaterial />
            </mesh>
            <mesh position={[0.15, 0, 0]}>
              <sphereGeometry args={[0.25, 32, 32]} />
              <meshBasicMaterial color="#ffffff" transparent opacity={0.9} />
            </mesh>
          </group>
        )
      default:
        return null
    }
  }

  return (
    <group ref={meshRef} scale={3}>
      {renderIcon()}
    </group>
  )
}

export default function NavIcon3D({ type, onClick, children }: { type: 'search' | 'heart' | 'cart' | 'moon'; onClick?: () => void; children?: React.ReactNode }) {
  const [hovered, setHovered] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768)
    const checkMotion = () => setPrefersReducedMotion(window.matchMedia('(prefers-reduced-motion: reduce)').matches)
    checkMobile()
    checkMotion()
    window.addEventListener('resize', checkMobile)
    window.matchMedia('(prefers-reduced-motion: reduce)').addEventListener('change', checkMotion)
    return () => {
      window.removeEventListener('resize', checkMobile)
      window.matchMedia('(prefers-reduced-motion: reduce)').removeEventListener('change', checkMotion)
    }
  }, [])

  if (isMobile || prefersReducedMotion) {
    return (
      <div onClick={onClick} className="p-2 text-mist-700 hover:text-mist-900 transition-colors cursor-pointer">
        {children}
      </div>
    )
  }

  return (
    <div
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="relative p-2 w-10 h-10 flex items-center justify-center cursor-pointer"
    >
      <Canvas
        camera={{ position: [0, 0, 3], fov: 50 }}
        gl={{ alpha: true, antialias: true }}
        style={{ width: 40, height: 40 }}
      >
        <ambientLight intensity={0.5} />
        <pointLight position={[5, 5, 5]} intensity={1} />
        <pointLight position={[-5, -5, -5]} intensity={0.5} />
        <IconMesh type={type} hovered={hovered} />
        <Environment preset="city" />
      </Canvas>
    </div>
  )
}
