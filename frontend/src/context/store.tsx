'use client'
import { createContext, useContext, Dispatch, SetStateAction, useState, ReactNode } from 'react'

interface ContextProps {
  userPermissions: any
  setUserPermissions: Dispatch<SetStateAction<any>>
}

const GlobalContext = createContext<ContextProps>({
  userPermissions: [],
  setUserPermissions: (): any => []
})

interface Props {
  children?: ReactNode
}

export const GlobalContextProvider = ({ children }: Props) => {
  const [userPermissions, setUserPermissions] = useState(['create_types'])

  return (
    <GlobalContext.Provider value={{ userPermissions, setUserPermissions }}>
      <>{children}</>
    </GlobalContext.Provider>
  )
}

export const useGlobalContext = () => useContext(GlobalContext)
