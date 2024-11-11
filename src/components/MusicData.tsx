import { useContext } from "react"
import { DeezerColors, deezerData } from "../context/MusicContext"
import { Grid2 } from "@mui/material"
import { SongCard } from "./SongCard"
import { Button, Skeleton, Typography } from "@mui/joy"
import { SkeletonTrack } from "./SkeletonTrack"
//data?.data?.map((item)=>(
  
 // <SongCard key={item.id} item={item}/>

//))
export function MusicData() {
  const {data, top100Tracks, search, fetchNextPage, hasNextPage, isLoadingTopTracks, isLoading, buttonLoading} = useContext(deezerData)
  return (
    <>
    {
      //si el input no esta vacio y no hay resultados
      search.trim() !== '' && data?.data?.length === 0 ?
      
      <Typography level="h1" sx={{mt:5, ml:1}}>
        {
          //consulto si estan cargando los resultados
        isLoading ?   
          <Skeleton>Lorem ipsum is placeholder </Skeleton>
            :
          'No se encontraron resultados'
        }
      </Typography>	
      
      :
      //si el input esta vacio o la longitud de la data es mayor a 0
      //si esta vacio el fetch de '' asiganara undefined a data.total y mostrara el top 100 tracks
      //si la longitud de la data es mayor a 0 mostrara el numero de resultados encontrados
      <Typography level="h1" sx={{mt:5, ml:1}}>{data?.total ? `${data?.total} resultados` : `Top 100 Tracks`}</Typography>
     
    }	

    <Grid2 sx={{mt:5, mb:20}} container columns={{lg: 25,md: 20, sm: 16, xs: 12}} spacing={1}>
     
      {
        //consulto si ya cargo el top 100 tracks y el input esta vacio
      !isLoadingTopTracks && search.trim() === '' ?
      //muestro el top 100 tracks
      top100Tracks?.data?.map((item)=>(
        <SongCard key={item.id} item={item}/>
      ))
      
      : 
      (
        //consulto si la data de la busqueda ya cargo y el input no esta vacio
        !isLoading && search.trim() !== '' ? 
        //muestro los resultados de la busqueda
          data?.data?.map((item)=>(
            <SongCard key={item.id} item={item}/>
          )) 
         :
         //sino muestro el skeleton mientras carga los resultados 
         //aplica para la primera carga de la pagina y para las busquedas
         Array.from( new Array(10)).map((_, index)=>(<SkeletonTrack key={index}/>))
      )
    }	
  
        <Grid2 size={{lg: 25,md: 20, sm: 16, xs: 12}} sx={{ textAlign: 'center', mt:5, }}>
      { 
      //consulto si la data existe y su longitud es mayor a 0 y si hay mas paginas
      data?.data && data?.data?.length > 0 && hasNextPage && 
      //renderiza el boton para cargar mas paginas
      <Button  
          sx={{bgcolor: DeezerColors.NORMAL, flexShrink: 0,'&:hover' : {background: DeezerColors.HOVER}}} 
          variant="soft" 
          size="lg" 
          loading={buttonLoading}
          //funcion que envia el string del fetch de la siguiente pagina
          onClick={()=>fetchNextPage(data?.next)}
          >
              Cargar más
          </Button> 
        }

        </Grid2>
      </Grid2>
     
      
      
      </>   
  )
}
  