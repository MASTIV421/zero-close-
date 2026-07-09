import { useRef, useState } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap } from 'gsap'
import { ChevronLeft, ChevronRight } from 'lucide-react'

type Slide = {
  id: string
  image: string
  title?: string
  subtitle?: string
}

type ImageSliderProps = {
  slides: Slide[]
  autoPlayInterval?: number
}

export default function ImageSlider({ slides, autoPlayInterval = 5000 }: ImageSliderProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const sectionsRef = useRef<HTMLDivElement[]>([])
  const imagesRef = useRef<HTMLImageElement[]>([])
  const slideImagesRef = useRef<HTMLDivElement[]>([])
  const outerWrappersRef = useRef<HTMLDivElement[]>([])
  const innerWrappersRef = useRef<HTMLDivElement[]>([])
  const countRef = useRef<HTMLDivElement>(null)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)
  const methodsRef = useRef<{
    next: () => void
    prev: () => void
    goToSlide: (index: number) => void
  } | null>(null)

  const wrap = (index: number) => {
    const len = slides.length
    return ((index % len) + len) % len
  }

  useGSAP(() => {
    if (slides.length === 0) return

    const sections = sectionsRef.current
    const outerWrappers = outerWrappersRef.current
    const innerWrappers = innerWrappersRef.current

    if (!sections.length || !outerWrappers.length || !innerWrappers.length) return

    // Initial setup matching vanilla JS logic
    gsap.set(outerWrappers, { xPercent: 100 })
    gsap.set(innerWrappers, { xPercent: -100 })
    gsap.set(sections[0].querySelector('.slide__outer') as HTMLElement, { xPercent: 0 })
    gsap.set(sections[0].querySelector('.slide__inner') as HTMLElement, { xPercent: 0 })

    const gotoSection = (index: number) => {
      if (isAnimating) return
      setIsAnimating(true)

      index = wrap(index)

      const tl = gsap.timeline({
        defaults: { duration: 1, ease: 'expo.inOut' },
        onComplete: () => {
          setIsAnimating(false)
        },
      })

      const currentSection = sections[currentIndex]
      const nextSection = sections[index]

      const currentOuter = currentSection.querySelector('.slide__outer') as HTMLElement
      const currentInner = currentSection.querySelector('.slide__inner') as HTMLElement
      const nextOuter = nextSection.querySelector('.slide__outer') as HTMLElement
      const nextInner = nextSection.querySelector('.slide__inner') as HTMLElement

      // Determine direction
      const direction = index > currentIndex ? 1 : -1

      // Animate out current
      tl.to(currentOuter, { xPercent: direction > 0 ? -100 : 100 }, 0)
      tl.to(currentInner, { xPercent: direction > 0 ? 100 : -100 }, 0)

      // Animate in next
      tl.set(nextOuter, { xPercent: direction > 0 ? 100 : -100 }, 0)
      tl.set(nextInner, { xPercent: direction > 0 ? -100 : 100 }, 0)
      tl.to(nextOuter, { xPercent: 0 }, 0)
      tl.to(nextInner, { xPercent: 0 }, 0)

      // Update count
      if (countRef.current) {
        gsap.to(countRef.current, {
          innerText: index + 1,
          duration: 0.5,
          snap: { innerText: 1 },
        })
      }

      setCurrentIndex(index)
    }

    const next = () => gotoSection(currentIndex + 1)
    const prev = () => gotoSection(currentIndex - 1)

    methodsRef.current = { next, prev, goToSlide: gotoSection }

    // Auto play
    const autoPlay = setInterval(next, autoPlayInterval)

    return () => {
      clearInterval(autoPlay)
    }
  }, [slides, currentIndex, isAnimating, autoPlayInterval])

  const handlePrev = () => methodsRef.current?.prev()
  const handleNext = () => methodsRef.current?.next()
  const handleDotClick = (index: number) => methodsRef.current?.goToSlide(index)

  if (!slides.length) return null

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-50 w-full h-full overflow-hidden"
    >
      {/* Slides */}
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          ref={(el) => {
            if (el) sectionsRef.current[index] = el
          }}
          className="slide absolute inset-0 w-full h-full"
        >
          <div
            ref={(el) => {
              if (el) outerWrappersRef.current[index] = el
            }}
            className="slide__outer absolute inset-0 w-full h-full overflow-hidden"
          >
            <div
              ref={(el) => {
                if (el) innerWrappersRef.current[index] = el
              }}
              className="slide__inner absolute inset-0 w-full h-full flex items-center justify-center"
            >
              <img
                ref={(el) => {
                  if (el) {
                    imagesRef.current[index] = el
                    slideImagesRef.current[index] = el
                  }
                }}
                src={slide.image}
                alt={slide.title || `Slide ${index + 1}`}
                className="image slide__img w-full h-full object-cover"
                loading={index === 0 ? 'eager' : 'lazy'}
              />
              {(slide.title || slide.subtitle) && (
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-8 bg-black/30">
                  {slide.title && (
                    <h3 className="text-5xl md:text-7xl font-sans text-white mb-4 drop-shadow-lg">
                      {slide.title}
                    </h3>
                  )}
                  {slide.subtitle && (
                    <p className="text-xl md:text-2xl text-white/80 font-sans drop-shadow-md">
                      {slide.subtitle}
                    </p>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      ))}

      {/* Count */}
      <div
        ref={countRef}
        className="fixed top-8 right-8 text-white text-2xl font-sans z-50"
      >
        {String(currentIndex + 1).padStart(2, '0')} / {String(slides.length).padStart(2, '0')}
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={handlePrev}
        className="fixed left-8 top-1/2 -translate-y-1/2 z-50 p-4 rounded-full bg-white/10 backdrop-blur-md text-white hover:bg-white/20 transition-all border border-white/10"
        aria-label="Previous slide"
      >
        <ChevronLeft size={32} />
      </button>
      <button
        onClick={handleNext}
        className="fixed right-8 top-1/2 -translate-y-1/2 z-50 p-4 rounded-full bg-white/10 backdrop-blur-md text-white hover:bg-white/20 transition-all border border-white/10"
        aria-label="Next slide"
      >
        <ChevronRight size={32} />
      </button>

      {/* Dot Indicators */}
      <div className="fixed bottom-8 left-1/2 -translate-x-1/2 flex gap-3 z-50">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => handleDotClick(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentIndex
                ? 'bg-white scale-125'
                : 'bg-white/40 hover:bg-white/60'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  )
}
