import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { Music } from "../pages/api/shazam";
import { getPlaylist } from "../services/api";
import { useLocation } from "./Location";

type Genres = 'rock' |'pop' |'classica' |'lofi'
interface PlaylistsContextData {
    getPlaylistByTemperature: (temperature:number)=>void,
    playlists?: Music[],
    selectedGenre: Genres,
    hasPlaylist: boolean,
    nextPage: ()=>void,
    savePlaylist: ()=>void,
    loadingNextPage:boolean,
    savedPlaylists: Music[][],
    removeSavedPlaylistByIndex: (index:number) => void;
}

interface PlaylistsProviderProps {
    children: ReactNode
}

const PlaylistsContext = createContext<PlaylistsContextData>({} as PlaylistsContextData)

export function usePlaylists(){
    return useContext(PlaylistsContext)
}

export default function PlaylistsProvider({children}:PlaylistsProviderProps):JSX.Element{
    const [playlists, setPlaylists] = useState<Music[]>([])
    const [savedPlaylists, setSavedPlaylists] = useState<Music[][]>([])
    const [selectedGenre, setSelectedGenre] = useState<Genres>("" as Genres)
    const [page, setPage] = useState(100)
    const [hasPlaylist, setHasPlaylist] = useState(false)
    const [loadingNextPage, setLoadingNextPage] = useState(false)
    const {temperature} = useLocation()

    useEffect(()=>{
        getPlaylistByTemperature(temperature)
    },[temperature])

    useEffect(()=>{
        const storagedCart = localStorage.getItem(`@ColdHotMusic:${selectedGenre}:SavedPlaylists`)
        if (storagedCart) {
            setSavedPlaylists(JSON.parse(storagedCart));
        }else{
            setSavedPlaylists([]);
        }
    },[temperature, selectedGenre])

    const nextPage = function(){
        setLoadingNextPage(true)
        setPage(page+Math.floor(Math.random() * 101))
    }

    const savePlaylist = function(){
        setSavedPlaylists([...savedPlaylists, playlists])
        nextPage()
        localStorage.setItem(`@ColdHotMusic:${selectedGenre}:SavedPlaylists`, JSON.stringify([...savedPlaylists, playlists]))
    }

    const removeSavedPlaylistByIndex = function(index:number){
        const playlistsUpdated = savedPlaylists.filter((playlist, indexPlaylist)=> {
            if(indexPlaylist != index){
                return playlist
            }
        })
        
        setSavedPlaylists(playlistsUpdated)
        localStorage.setItem(`@ColdHotMusic:${selectedGenre}:SavedPlaylists`, JSON.stringify(playlistsUpdated))
        
    }

    const getPlaylistByTemperature = async function(temperature:number){
        if(temperature > 32){
            setSelectedGenre('rock')
        }else if(temperature > 24){
            setSelectedGenre('pop')
        }else if(temperature > 16){
            setSelectedGenre('classica')
        }else{
            setSelectedGenre('lofi')
        }
    }
    useEffect(()=>{
        if(selectedGenre){
            getPlaylist(page, selectedGenre).then(({data})=>{
                setPlaylists(data)
                setHasPlaylist(true)
                setLoadingNextPage(false)
            })
        }
    },[selectedGenre, page])
    return (
        <PlaylistsContext.Provider value={
            {
                playlists,
                getPlaylistByTemperature,
                selectedGenre,
                hasPlaylist,
                nextPage,
                loadingNextPage,
                savePlaylist,
                savedPlaylists,
                removeSavedPlaylistByIndex,
            }}>
            {children}
        </PlaylistsContext.Provider>
    )
}