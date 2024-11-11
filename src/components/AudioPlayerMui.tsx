import { useState, useEffect, useContext } from 'react';
import { Box, IconButton, Typography, Slider, Sheet, AspectRatio } from '@mui/joy';
import { Pause, VolumeUp, PlayCircle } from '@mui/icons-material';
import { DeezerColors, deezerData } from '../context/MusicContext';
import image from '../img/placeholder_img.png'
import { useFavoritesStore } from '../store/FavoritesStore';
export default function AudioPlayerMui() {
  const [volume, setVolume] = useState(0.5);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const {setIsPlaying, isPlaying, audioRef, handlePlayPause} = useContext(deezerData)
  const {trackData} = useFavoritesStore()

  //efecto que inicia el audio cuando se selecciona un nuevo track y cambia el icono de play
  useEffect(() => {
    if (trackData?.preview && audioRef?.current) {
    audioRef?.current.play();
    setIsPlaying(true);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [trackData?.preview]);
  //efecto que cambia el volumen del audio
  useEffect(() => {
    if (audioRef?.current) {
      audioRef.current.volume = volume;
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [volume]);

  

//funcion que actualiza el tiempo del audio cuando mueve el slider
  const handleTimeChange = (_event: Event, newValue: number | number[]) => {
    if (audioRef?.current) {
      audioRef.current.currentTime = newValue as number;
      setCurrentTime(newValue as number);
    }
  };
// funcion que actualiza el tiempo del audio al recibir un nuevo track
  const handleTimeUpdate = () => {
    if (audioRef?.current) {
      //verifico si el audio tiene una duracion valido
      if (isNaN(audioRef.current.duration)){
        setDuration(0)
      }else{
      setDuration(audioRef.current.duration)
      }
      setCurrentTime(audioRef.current.currentTime);
      //cuando el audio termine, cambia el estado del play/pause
      if(audioRef.current.currentTime === audioRef.current.duration){
        return setIsPlaying(false)
      }
    }
  };
  
  //funcion que actualiza el volumen del audio
  const handleVolumeChange = (_event: Event, newValue: number | number[]) => {
    setVolume(newValue as number);
  };

//funcion que formatea el tiempo del audio
  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };
  
  return (
    <Sheet
      variant="solid"
      invertedColors
      sx={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        height: '6em',
        display: 'flex',
        alignItems: 'center',
        px: 2,
        py: 1,
        bgcolor: DeezerColors.NORMAL,
        zIndex: 10
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', width: '100%', gap: 2 }}>
        <AspectRatio ratio="1" sx={{ width: '4.5rem', borderRadius: 'sm', flexShrink: 0, ml: 'auto' }}>
          <img
            src={trackData?.album.cover_small ? trackData?.album.cover_small : image}
           
            style={{ objectFit: 'cover', width: '100%', height: '100%' }}
          />
        </AspectRatio>
        <Box sx={{ minWidth: 0, flex: 1 }}>
          <Typography level="title-lg" noWrap>
            {trackData?.title_short ? trackData?.title_short : 'Nombre de la canción'}
          </Typography>
          <Typography level="body-lg" noWrap>
          {trackData?.artist.name ? trackData?.artist.name : 'Nombre del artista'}
          </Typography>
        </Box>
        <IconButton onClick={handlePlayPause} variant="plain" size="lg" sx={{borderRadius : '50%' }}>
        
          {isPlaying ? <Pause /> : <PlayCircle />}
       
        </IconButton>
        <Box sx={{flex: 1}}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Typography level="body-xs" sx={{ minWidth: '40px' }}>
            {formatTime(currentTime)}
          </Typography>
          <Slider
            aria-label="time-indicator"
            size="sm"
            value={currentTime}
            min={0}
            step={1}
            max={duration}
            onChange={handleTimeChange}
            sx={{ mx: 2 }}
          />
          <Typography level="body-xs" sx={{ minWidth: '40px' }}>
            { duration !== undefined ? formatTime(duration) : '0:00'}
          </Typography>
        </Box>
        </Box>
        <Box sx={{flex: 1}}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, justifyContent: 'center' }}>
          
            <VolumeUp sx={{fontSize: '25px'}} />
       
          <Slider
            aria-label="Volume"
            value={volume}
            min={0}
            max={1}
            step={0.01}
            onChange={handleVolumeChange}
            size="sm"
            sx={{maxWidth: '130px'}}
          />
        </Box>
        </Box>
      </Box>
      <audio
        ref={audioRef}
        onTimeUpdate={handleTimeUpdate}
        src={trackData?.preview}
      />
    </Sheet>
  );
}