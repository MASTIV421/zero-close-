import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

export default function ZeroBackground() {
  const meshRef = useRef<THREE.Mesh>(null)
  const clockRef = useRef<THREE.Clock | null>(null)

  if (!clockRef.current) {
    clockRef.current = new THREE.Clock()
  }

  const texture = useMemo(() => {
    const loader = new THREE.TextureLoader()
    return loader.load('https://i.ibb.co/N2Crjf4Q/image.jpg')
  }, [])

  useFrame(() => {
    if (meshRef.current && clockRef.current) {
      const elapsed = clockRef.current.getElapsedTime()
      meshRef.current.rotation.y = elapsed * 0.05
    }
  })

  return (
    <mesh ref={meshRef}>
      <sphereGeometry args={[5, 64, 64]} />
      <meshBasicMaterial map={texture} side={THREE.BackSide} />
    </mesh>
  )
}
