import Button from '@mui/joy/Button';
import Modal from '@mui/joy/Modal';
import ModalClose from '@mui/joy/ModalClose';
import Typography from '@mui/joy/Typography';
import { useContext, useState } from 'react';
import { Delete, Pause, PlayArrow, PlaylistAdd } from '@mui/icons-material';
import { DeezerColors, deezerData } from '../context/MusicContext';
import { AspectRatio,Box,CardCover,IconButton, ModalDialog } from '@mui/joy';
import { Grid2 } from '@mui/material';
import { useFavoritesStore } from '../store/FavoritesStore';
import { Data } from '../types';
export default function FavoriteModal() {
  const [open, setOpen] = useState<boolean>(false);
  const {removeFavorite, favorites, trackData,clearFavorites} = useFavoritesStore()
  const {isPlaying, handleTrackData } = useContext(deezerData)
  return (
    <>
       <Button startDecorator={<PlaylistAdd sx={{fontSize: '34.83px'}}/>} 
        sx={{bgcolor: DeezerColors.NORMAL, flexShrink: 0,'&:hover' : {background: DeezerColors.HOVER}}} 
        onClick={()=>setOpen(true)}
        variant="soft" 
        size="lg" >
            Mis Favoritos
        </Button>
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
      >
        <ModalDialog size='lg' variant='soft' 
        sx={{ minWidth: 450, borderRadius: 'md', p: 3, boxShadow: 'lg', overflow: 'auto'}}>
        <ModalClose variant="soft" sx={{ m: 1 }} />
           
            <Typography
            component="h4"
            id="modal-title"
            level="h4"
            textColor="inherit"
            sx={{ fontWeight: 'lg', mb: 1, textAlign: 'center'}}
          >
            Favoritos
          </Typography>
          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <Typography
                component="h4"
                id="modal-title"
                level="h4"
                textColor="inherit"
                sx={{ fontWeight: 'lg', mb: 1, flexGrow: 1}}
            >
                Total: {favorites.length}
            </Typography>
           {favorites.length > 0 ?  
             <Button
                onClick={clearFavorites}
                sx={{bgcolor: DeezerColors.NORMAL, flexShrink: 0,'&:hover' : {background: DeezerColors.HOVER}}}
                >
                    Eliminar Todo
             </Button> 
                : ''}
            </Box>
            
          
         
            {
                favorites.map((item : Data)=>(

                    <Grid2 container  columns={12} spacing={2} 
                    sx={{ alignItems: 'center', textAlign: 'center'}}>
                        <Grid2 size={4} sx={{ justifySelf: 'center'}}> 
                         
                            <AspectRatio ratio="1" sx={{ '&:hover': {opacity: '0.9'}}}>
                            <img
                                src={item.album.cover_big}
                                style={{ objectFit: 'cover',  height: '100%' }}
                            />
                                <CardCover  
                                sx={{ opacity: 0,
                                     display: 'flex',
                                     alignItems: 'center', 
                                     justifyContent: 'center',
                                    '&:hover': {opacity: 1}
                               }}>
                                   <>
                                   <IconButton 
                                     sx={{ '&:hover': {bgcolor: 'transparent'}}}
                                     onClick={()=> handleTrackData(item)}
                                     >
                                        {isPlaying && item.id === trackData?.id ?
                                        <Pause sx={{fontSize: '45px', color: 'black', bgcolor: '#FDFCFE', borderRadius: '50%', p:.7}}/> 
                                        : 
                                        <PlayArrow sx={{fontSize: '45px', color: 'black', bgcolor: '#FDFCFE', borderRadius: '50%', p:.1}} />}
                                    </IconButton>
                                   </>
                                </CardCover>
                            </AspectRatio>
                          
                        </Grid2>

                        <Grid2 size={6} sx={{ textAlign: 'left'}}> 
                        
                            <Typography level="title-lg" noWrap>
                               {item.title_short}
                            </Typography>
                            <Typography level="body-lg" noWrap>
                            {item.artist.name}
                            </Typography>
                        </Grid2>

                        <Grid2 size={2} >
                            <IconButton
                                size="lg"
                                variant="plain"
                                sx={{}}
                                onClick={()=>removeFavorite(item.id)}
                                >
                                
                                
                             
                                <Delete sx={{ p:0}} />
                            </IconButton >
                        </Grid2>
                        </Grid2>
                ))
            }
          
        </ModalDialog>
         

      </Modal>
    </>
  );
}