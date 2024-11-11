import { useEffect, useState } from "react"
import axios from "axios"
import { IDeezerTracks } from "../types"

export const useTracks = (query: string) => {
    const [data, setData] = useState<IDeezerTracks>({data:[], total: 0})
    const [isLoading, setIsLoading] = useState(false)
    
    useEffect(()=>{
        setIsLoading(true)
        axios.get(`https://api.deezer.com/search?q=${query}`)
        .then(res=> {
            setData(res.data)
            setIsLoading(false)
        })
    },[query])

    return {data, setData, isLoading, setIsLoading}
}
