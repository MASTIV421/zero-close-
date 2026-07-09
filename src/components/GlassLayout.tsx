import { type PropsWithChildren } from 'react'
import Background3D from './Background3D'

export default function GlassLayout({ children }: PropsWithChildren) {
  return (
    <div className="relative min-h-screen w-full overflow-hidden">
      {/* 3D Background */}
      <Background3D />

      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  )
}
