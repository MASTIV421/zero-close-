import { type PropsWithChildren } from 'react'
import Background3D from './Background3D'

export default function GlassLayout({ children }: PropsWithChildren) {
  return (
    <div className="relative min-h-screen w-full overflow-hidden flex items-center justify-center p-6">
      {/* 3D Background */}
      <Background3D />

      {/* Glass Layer */}
      <div className="relative z-10 w-full max-w-5xl mx-auto p-10 bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl shadow-2xl text-white min-h-[70vh] flex flex-col items-center justify-center">
        {children}
      </div>
    </div>
  )
}
