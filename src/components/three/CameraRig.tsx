import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { useScrollProgress } from '../../store/useScrollProgress'

export default function CameraRig() {
  const { progress } = useScrollProgress()
  const curveRef = useRef<THREE.CatmullRomCurve3 | null>(null)

  // Create curve with 3 waypoints
  if (!curveRef.current) {
    curveRef.current = new THREE.CatmullRomCurve3([
      new THREE.Vector3(0, 1.5, 8),   // Start of street
      new THREE.Vector3(0, 1.5, 0),   // In front of storefront
      new THREE.Vector3(0, 1.5, -18), // End of street
    ])
  }

  useFrame((state) => {
    if (!curveRef.current) return

    const curve = curveRef.current
    let t = progress

    // Slow down camera near storefront (40%-60% range)
    if (t > 0.4 && t < 0.6) {
      const localT = (t - 0.4) / 0.2
      const eased = localT < 0.5 
        ? 2 * localT * localT 
        : 1 - Math.pow(-2 * localT + 2, 2) / 2
      t = 0.4 + eased * 0.2
    }

    const point = curve.getPointAt(t)
    if (point) {
      state.camera.position.set(point.x, point.y + Math.sin(state.clock.elapsedTime * 2) * 0.02, point.z)
      state.camera.lookAt(0, 1.5, point.z - 5)
    }
  })

  return null
}
