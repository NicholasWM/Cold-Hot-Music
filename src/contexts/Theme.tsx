import { createContext, ReactNode, useContext, useEffect, useState } from "react";

export type ThemeTypes = 'rock' |'pop' |'classica' |'lofi'

interface ThemeContextData {
    theme: ThemeTypes,
    toggleTheme: (genre:ThemeTypes)=> void,
    themeColors: ThemeColors,
}
interface ThemeProviderProps {
    children: ReactNode;
}


const ThemeContext = createContext<ThemeContextData>({} as ThemeContextData)

interface ThemeColors {
    borderColor?: string,
    textColor?: string,
    buttonColor?: string,
    temperature?: string,
    hoverButton?: string,
}

export function useTheme() {
    return useContext(ThemeContext)
}

export function ThemeProvider({ children }: ThemeProviderProps): JSX.Element {
    const [theme, setTheme] = useState<ThemeTypes>('lofi')
    const [themeColors, setThemeColors] = useState<ThemeColors>({
        borderColor:'white',
        textColor:'white',
        buttonColor:'white',
        temperature:'white',
    })

    useEffect(()=>{
        setThemeColors(colors[theme])
    },[theme])

    const colors = {
        rock:{
            borderColor: 'red.600',
            textColor: 'red',
            buttonColor: 'red.600',
            temperature: 'red.600',
            hoverButton: 'red.700'
        },
        lofi:{
            borderColor: 'cyan.300',
            textColor: 'cyan',
            buttonColor: 'cyan.300',
            temperature: 'cyan.300',
            hoverButton: 'cyan.400'
        },
        classica:{
            borderColor: 'cyan.700',
            textColor: 'white',
            buttonColor: 'cyan.700',
            temperature: 'cyan.700',
            hoverButton: 'cyan.800'
        },
        pop:{
            borderColor: 'orange.400',
            textColor: 'orange',
            buttonColor: 'orange.400',
            temperature: 'orange.400',
            hoverButton: 'orange.500'
        },
    }

    const toggleTheme = (genre:ThemeTypes) => {
        setTheme(genre)
    } 

    return (
        <ThemeContext.Provider value={{theme, toggleTheme, themeColors}}>
            {children}
        </ThemeContext.Provider>
    )
}