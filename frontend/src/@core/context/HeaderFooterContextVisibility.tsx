import { usePathname } from 'next/navigation'
import { useRouter } from 'next/router'
import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react'

type Search = {
  location: string | null
  jobTitle: string | null
}

type HeaderFooterVisibilityContextType = {
  isVisible: boolean
  setVisibility: (visible: boolean) => void
  searchValue: Search
  setSearchVisible: (value: Search) => void
}

const HeaderFooterVisibilityContext = createContext<HeaderFooterVisibilityContextType | undefined>(undefined)

export const HeaderFooterVisibilityProvider = ({ children }: { children: ReactNode }) => {
  const [isVisible, setIsVisible] = useState(false)
  const pathname = usePathname()
  const setVisibility = (visible: boolean) => {
    setIsVisible(visible)
  }
  const router = useRouter()
  const { id } = router.query
  const [searchValue, setSearchValue] = useState<Search>({ location: null, jobTitle: null })
  const setSearchVisible = (value: Search) => {
    setSearchValue(value)
  }

  useEffect(() => {
    const visiblePathnames = [`/sign-up/`, `/sign-in/`]
    setVisibility(visiblePathnames.includes(pathname))
  }, [pathname])

  return (
    <HeaderFooterVisibilityContext.Provider value={{ isVisible, setVisibility, searchValue, setSearchVisible }}>
      {children}
    </HeaderFooterVisibilityContext.Provider>
  )
}

export const useHeaderFooterVisibility = () => {
  const context = useContext(HeaderFooterVisibilityContext)
  if (!context) {
    throw new Error('useHeaderFooterVisibility must be used within a HeaderFooterVisibilityProvider')
  }

  return context
}
