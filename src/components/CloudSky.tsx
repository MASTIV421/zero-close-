import { useRef } from 'react'
import { motion } from 'framer-motion'

export default function CloudSky() {
  const containerRef = useRef<HTMLDivElement>(null)

  const clouds = [
    { id: 1, top: '10%', left: '5%', width: '300px', height: '120px', duration: 45, delay: 0 },
    { id: 2, top: '20%', left: '60%', width: '400px', height: '150px', duration: 55, delay: 5 },
    { id: 3, top: '35%', left: '25%', width: '250px', height: '100px', duration: 40, delay: 10 },
    { id: 4, top: '15%', left: '80%', width: '350px', height: '130px', duration: 50, delay: 15 },
    { id: 5, top: '45%', left: '10%', width: '280px', height: '110px', duration: 48, delay: 20 },
    { id: 6, top: '25%', left: '45%', width: '320px', height: '140px', duration: 52, delay: 8 },
    { id: 7, top: '55%', left: '70%', width: '260px', height: '105px', duration: 42, delay: 12 },
    { id: 8, top: '8%', left: '35%', width: '380px', height: '160px', duration: 58, delay: 18 },
  ]

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 w-full h-full overflow-hidden"
      style={{
        background: 'linear-gradient(180deg, #87CEEB 0%, #E0F6FF 50%, #FFFFFF 100%)',
      }}
    >
      {/* Sun glow */}
      <div
        className="absolute rounded-full"
        style={{
          top: '5%',
          right: '15%',
          width: '120px',
          height: '120px',
          background: 'radial-gradient(circle, rgba(255,255,255,0.9) 0%, rgba(255,255,255,0) 70%)',
          filter: 'blur(20px)',
        }}
      />

      {/* Clouds */}
      {clouds.map((cloud) => (
        <motion.div
          key={cloud.id}
          className="absolute rounded-full"
          style={{
            top: cloud.top,
            left: cloud.left,
            width: cloud.width,
            height: cloud.height,
            background: 'radial-gradient(ellipse at center, rgba(255,255,255,0.95) 0%, rgba(255,255,255,0.6) 40%, rgba(255,255,255,0) 70%)',
            filter: 'blur(8px)',
          }}
          animate={{
            x: ['-10%', '10%', '-10%'],
            y: ['-5%', '5%', '-5%'],
          }}
          transition={{
            duration: cloud.duration,
            repeat: Infinity,
            ease: 'linear',
            delay: cloud.delay,
          }}
        />
      ))}

      {/* Geometric pattern overlay */}
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `
            linear-gradient(30deg, #000 12%, transparent 12.5%, transparent 87%, #000 87.5%, #000),
            linear-gradient(150deg, #000 12%, transparent 12.5%, transparent 87%, #000 87.5%, #000),
            linear-gradient(30deg, #000 12%, transparent 12.5%, transparent 87%, #000 87.5%, #000),
            linear-gradient(150deg, #000 12%, transparent 12.5%, transparent 87%, #000 87.5%, #000),
            linear-gradient(60deg, #777 25%, transparent 25.5%, transparent 75%, #777 75%, #777),
            linear-gradient(60deg, #777 25%, transparent 25.5%, transparent 75%, #777 75%, #777)
          `,
          backgroundSize: '80px 140px',
          backgroundPosition: '0 0, 0 0, 40px 70px, 40px 70px, 0 0, 40px 70px',
        }}
      />
    </div>
  )
}
