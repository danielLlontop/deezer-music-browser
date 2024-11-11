import {  Favorite, FavoriteBorder, Link as LinkIcon, Pause, PlayArrow } from "@mui/icons-material";
import { AspectRatio, Box, Card, CardContent, CardCover, IconButton, Typography } from "@mui/joy";
import { Grid2 } from "@mui/material";
import { useContext } from "react";
import { deezerData } from "../context/MusicContext";
import { Data } from "../types";
import { useFavoritesStore } from "../store/FavoritesStore";

export function SongCard({item}: {item: Data}) {
    const {handleTrackData,  isPlaying} = useContext(deezerData)
    const {addFavorite, removeFavorite, isOnFavorites,trackData} = useFavoritesStore() 
    return (
        <Grid2 size={{lg: 5,md: 5, sm: 4, xs: 6}} key={item.id} >
        <Card variant="plain" sx={{
          width: '100%',
          '&:hover': {
             background: '#171A1C',
             cursor: 'pointer',
             '& .img':{
               opacity: 0.9,
             }
          }
        }}>
          <AspectRatio ratio="1" > 
            <Box component='img' src={item.album.cover_big} className="img"/>
            <CardCover  sx={{
              display: 'flex',
              alignItems: 'flex-end',
              transition: '.1s ease-in-out',
              opacity: 0,
              '&:hover': {
                opacity: 1
              }
              }}>
          
                <>
                  <IconButton
                    size="lg"
                    onClick={()=> handleTrackData(item)}
                    variant="plain"
                    sx={{ '&:hover': {bgcolor: 'transparent'}, mb:1}}
                   >
                    {isPlaying && item.id === trackData?.id ?
                    <Pause sx={{fontSize: '45px', color: 'black', bgcolor: '#FDFCFE', borderRadius: '50%', p:.7}}/> 
                    : 
                    <PlayArrow sx={{fontSize: '45px', color: 'black', bgcolor: '#FDFCFE', borderRadius: '50%', p:.1}} />}
                  </IconButton >
                  <IconButton
                    size="lg"
                    variant="plain"
                    sx={{ '&:hover': {bgcolor: 'transparent'},mb:1}}
                    
                    {//si el track esta en la lista de favoritos el la funcion sera remover del favorito
                     //sino la funcion sera agregar al favorito
                      ...(isOnFavorites(item.id) ? {onClick: () => removeFavorite(item.id)} : {onClick: () => addFavorite(item)})}
                   >
                    {
                    //si el track esta en la lista de favoritos muestro el icono de favorito lleno (fill)
                    //sino muestro el icono de favorito vacio (border)
                    isOnFavorites(item.id) ? 
                    <Favorite sx={{fontSize: '45px', color: 'black', bgcolor: '#FDFCFE', borderRadius: '50%', p:.8}} /> 
                      : 
                    <FavoriteBorder sx={{fontSize: '45px', color: 'black', bgcolor: '#FDFCFE', borderRadius: '50%', p:.8}} />}
                  </IconButton >
                  <IconButton
                    component="a" 
                    href={item.link}
                    size="lg"
                    target="_blank"
                    variant="plain"
                    sx={{ '&:hover': {bgcolor: 'transparent'}, mb:1}}
                   >
                    
                    <LinkIcon sx={{fontSize: '45px', color: 'black', bgcolor: '#FDFCFE', borderRadius: '50%', p:.5}} />
                  </IconButton >
                  </>

            </CardCover>
            </AspectRatio>
            
            <Grid2 container >
             <Grid2  >
                <CardContent >
                  <Typography level="h4" >{item.title_short}</Typography>
                  <Typography level="body-lg" sx={{color: '#A9A6AA'}}>{item.artist.name}</Typography>
                </CardContent>
              </Grid2>
            </Grid2>
        </Card>
      </Grid2>
    
    )
}