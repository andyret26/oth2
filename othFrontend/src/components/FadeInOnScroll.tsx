import { useEffect, useState, useRef } from "react"

interface FadeInOnScrollProps {
  children: React.ReactNode
}

export const FadeInOnScroll: React.FC<FadeInOnScrollProps> = ({ children }) => {
  const [isVisible, setVisible] = useState(false)
  const domRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => setVisible(entry.isIntersecting))
    })

    const currentDomRef = domRef.current

    if (currentDomRef) {
      observer.observe(currentDomRef)
    }

    return () => {
      if (currentDomRef) {
        observer.unobserve(currentDomRef)
      }
    }
  }, [])

  return (
    <div
      className={`fade-in-section ${isVisible ? "is-visible" : ""}`}
      ref={domRef}
    >
      {children}
    </div>
  )
}
