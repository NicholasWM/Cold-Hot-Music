import { useEffect } from "react";
import { useState } from "react";
import { createContext, ReactNode, useContext } from "react";

interface NotifierContextData {
    toggleNotifier: ({}:ToggleNotifierProps)=>void,
    isNotifierActive: boolean
    message: string,
    status: Status
}
interface NotifierProviderProps {
    children: ReactNode;
}


type Status = "success" | "info" | "warning" | "error"

interface ToggleNotifierProps {
    message: string,
    status: Status
}
const NotifierContext = createContext<NotifierContextData>({} as NotifierContextData)

export function useNotifier() {
    return useContext(NotifierContext)
}

export function NotifierProvider({ children }: NotifierProviderProps): JSX.Element {
    const [isNotifierActive, setIsNotifierActive] = useState(false)
    const [message, setMessage] = useState("")
    const [status, setStatus] = useState<Status>("success")
    useEffect(()=>{
        if(isNotifierActive){
          setTimeout(()=>{
            setIsNotifierActive(false)
          },2000)
        }
    },[isNotifierActive])

    const toggleNotifier = ({message, status}:ToggleNotifierProps)=>{
        setMessage(message)
        setStatus(status)
        setIsNotifierActive(true)
    }

    return (
        <NotifierContext.Provider value={{ 
            toggleNotifier,
            isNotifierActive,
            message,
            status
        }}>
            {children}
        </NotifierContext.Provider>
    )
}