import { createContext, ReactNode, useRef, useState } from "react"
import { useDebounce } from "../hooks/useDebounce";
import { useTracks } from "../hooks/useTracks";
import { ContextProps, Data} from "../types"
import { useTop100Tracks } from "../hooks/useTop100Tracks";
import axios from "axios";
import { useFavoritesStore } from "../store/FavoritesStore";
// eslint-disable-next-line react-refresh/only-export-components
export enum DeezerColors  {
  HOVER = '#612199',
  NORMAL = '#7127B2',
} 
// eslint-disable-next-line react-refresh/only-export-components
export const deezerData = createContext<ContextProps>(
  {
    data:{data:[], total: 0}, 
    handleChange: ()=>{}, 
    handleTrackData: ()=>{}, 
   
    isPlaying: false,
    setIsPlaying: ()=>{},
    audioRef: null,
    handlePlayPause: ()=>{},
    top100Tracks: {data:[], total: 0},
    search: '',
    resetData: ()=>{},
    fetchNextPage: ()=> Promise.resolve(),
    hasNextPage: true, 
    isLoading: false,
    isLoadingTopTracks: false,
    buttonLoading: false

    }
)  

export const ContextProvideer = ({children}: {children: ReactNode}) =>{
    //estado que controla el estado del play/pause
    const [isPlaying, setIsPlaying] = useState(false);
    //estado que controla el input del search
    const [search, setSearch] = useState('')
    //estado que controla la data del track seleccionado
    const {setTrackData} = useFavoritesStore()
    //debounce que recibe el search y lo procesa
    const debouncedSearch = useDebounce(search, 500);
    //custom hook que realiza una peticion a la api de deezer y devuelve la data
    const {data, setData,isLoading,setIsLoading} = useTracks(debouncedSearch)
    //estado que controla si hay mas paginas
    const [hasNextPage, setHasNextPage] = useState(true)
    //estado que controla el estado del boton de cargar mas
    const [buttonLoading, setButtonLoading] = useState(false)
    //custom hook que realiza una peticion a la api de deezer y devuelve la data del top100tracks
    const {top100Tracks,  isLoadingTopTracks} = useTop100Tracks()
    //estado que controla el audio
    const audioRef = useRef<HTMLAudioElement | null>(null);

    //actuliza el estado del input del search 
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>{
      const newQuery = e.target.value
      setSearch(newQuery)
    }
    //funcion que resea el estado cuando doy click en el boton del titulo
    const resetData = ()=>{  
      setIsLoading(false)
      setSearch('')
      setData({data:[], total: 0})
      setIsLoading(false)
      
    }
    //funcion que hace fetch de la sig pagina
    const fetchNextPage = async (nextPage? : string)=>{
      //si no hay sig pagina seteo el estado de hasNextPage a false y termino
      if(!nextPage){
        setHasNextPage(false)
        return
      }
      //si hay sig pagina
      setButtonLoading(true)
      const res = await axios.get(nextPage)
      //actualizo el estado de data con los resultados de la siguiente pagina
      setData(prevState=>({...prevState,data: [...prevState.data, ...res.data.data], next: res.data.next}))
      //actualizo el estado de hasNextPage si existe la siguiente pagina
      //sino existe sera undefined (false)
      setHasNextPage(res.data.next !== undefined)
      setButtonLoading(false)
    }

    //funcion que envia el track al dar click en el boton play de la card
    const handleTrackData = (trackData: Data) => {
      //actualiza el estado del track seleccionado
        setTrackData(trackData)
      //actualiza el estado del play/pause en el card y en el audio player
        handlePlayPause()
    }
    //funcion que actualiza el play/pause
    const handlePlayPause = () => {
      if (audioRef.current) {
        if (isPlaying) {
          audioRef.current.pause();
        } else {
          audioRef.current.play();
        }
        setIsPlaying(!isPlaying);
      }
    };
     return(    
    <deezerData.Provider value={{data, handleChange, handleTrackData, resetData, isPlaying, setIsPlaying, audioRef, handlePlayPause, 
    top100Tracks, search ,fetchNextPage, hasNextPage, isLoading, isLoadingTopTracks,buttonLoading}}>
        {children}
    </deezerData.Provider>
)}
