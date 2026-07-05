import HeroScene from './three/HeroScene'

export default function Background3D() {
  return (
    <div className="fixed inset-0 -z-30 pointer-events-none">
      <HeroScene />
    </div>
  )
}
