import { useEffect, useState } from "react"

export function useIsMobile() {
  const [isMobile, setIsMobile] = useState<boolean | null>(null)

  useEffect(() => {
    const checkIsMobile = () => {
      const mobile = window.innerWidth < 768
      setIsMobile(mobile)
    }

    // Set initial value immediately to avoid hydration mismatch
    checkIsMobile()

    const mediaQuery = window.matchMedia('(max-width: 767px)')
    const handleChange = (e: MediaQueryListEvent) => {
      setIsMobile(e.matches)
    }

    // Use matchMedia for better performance
    mediaQuery.addEventListener('change', handleChange)

    return () => mediaQuery.removeEventListener('change', handleChange)
  }, [])

  // Return true by default on server to avoid layout shift
  return isMobile ?? true
}