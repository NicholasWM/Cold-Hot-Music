import type { GetServerSideProps, NextPage } from 'next'
import { useEffect } from 'react'
import { api } from './services/api'

const Home: NextPage = () => {
  
  useEffect(()=>{
    navigator.geolocation.getCurrentPosition((pos)=> {
      api.get('geolocation', {
        params:{
          latitude: pos.coords.latitude,
          longitude: pos.coords.longitude,
        }
      }).then(({data}) => console.log(data))
    })
  },[])
  return (
    <h1>Home</h1>
  )
}

export default Home

export const getServerSideProps:GetServerSideProps = async ()=>{

  
  return {
    props:{
      
    }
  }
} 