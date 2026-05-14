"use client"

import React, { createContext, useContext, useState, ReactNode } from "react"

interface UIContextType {
  isProjectsPopupOpen: boolean
  openProjectsPopup: () => void
  closeProjectsPopup: () => void
}

const UIContext = createContext<UIContextType | undefined>(undefined)

export const UIProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isProjectsPopupOpen, setIsProjectsPopupOpen] = useState(false)

  const openProjectsPopup = () => setIsProjectsPopupOpen(true)
  const closeProjectsPopup = () => setIsProjectsPopupOpen(false)

  return (
    <UIContext.Provider value={{ isProjectsPopupOpen, openProjectsPopup, closeProjectsPopup }}>
      {children}
    </UIContext.Provider>
  )
}

export const useUI = () => {
  const context = useContext(UIContext)
  if (context === undefined) {
    throw new Error("useUI must be used within a UIProvider")
  }
  return context
}
