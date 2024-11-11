import axios from "axios"
import { useEffect, useState } from "react"
import { IDeezerTracks } from "../types"

export function useTop100Tracks() {
    const [top100Tracks, setTopTracks] = useState<IDeezerTracks>({data:[], total: 0})
    const [isLoadingTopTracks, setIsLoadingTopTracks] = useState(false)
    useEffect(()=>{
        setIsLoadingTopTracks(true)
        axios.get(`https://api.deezer.com/chart/top?limit=100`)
        .then(res=> {
            setTopTracks(res.data.tracks)
            setIsLoadingTopTracks(false)
        })
        
    },[])

    return {top100Tracks, isLoadingTopTracks}
}