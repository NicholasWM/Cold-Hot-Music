import { useEffect } from "react";
import { useState } from "react";
import { createContext, ReactNode, useContext } from "react";
import { Address } from "../pages/api/geolocation";
import { getLocation, getWeather } from "../services/api";

interface LocationContextData {
    userLocation: UserLocation,
    address:Address,
    temperature: number
}
interface LocationProviderProps {
    children: ReactNode;
}

type UserLocation = {
    latitude: number,
    longitude: number,
}

const LocationContext = createContext<LocationContextData>({} as LocationContextData)

export function useLocation() {
    return useContext(LocationContext)
}

export function LocationProvider({ children }: LocationProviderProps): JSX.Element {
    const [userLocation, setUserLocation] = useState<UserLocation>({} as UserLocation)
    const [address, setAddress] = useState<Address>({} as Address)
    const [temperature, setTemperature] = useState<number>(0)

    useEffect(() => {
        navigator.geolocation.getCurrentPosition((pos) => {
            setUserLocation({ latitude: pos.coords.latitude, longitude: pos.coords.longitude })
        })
    }, [])

    useEffect(()=>{
        getLocation(userLocation.latitude, userLocation.longitude)
          .then(({address})=> {
              if(address){
                setAddress(address)
              }
        })
        getWeather(userLocation.latitude, userLocation.longitude)
          .then(({temperature})=> {
            if(temperature){
                setTemperature(temperature)
            }
          })
      }, [userLocation])
    return (
        <LocationContext.Provider value={{ userLocation, address, temperature }}>
            {children}
        </LocationContext.Provider>
    )
}