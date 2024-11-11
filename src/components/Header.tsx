import { DeezerColors, deezerData } from "../context/MusicContext";
import { Box, Button, Input, Typography } from "@mui/joy";
import DeezerLogo from "./DeezerLogo";
import { useContext } from "react";
import FavoriteModal from "./FavoritesModal";

export function Header() {
    const {handleChange, resetData, search} = useContext(deezerData)
    return (
        <Box sx={{ display: 'flex', gap: 2, maxHeight: 100}}>
        <Button
         sx={{ flexGrow: 1, flexShrink: 0, gap: 1, 
         justifyContent: 'flex-start', 
         '&:hover' : {background: 'transparent'}}}  
         variant="plain" 
         size="sm"
         onClick={()=>resetData()}>
           <DeezerLogo />
          <Typography level="h1">Deezer Music Browser</Typography>
        </Button>
       
        <Input 
        size='lg' 
        value={search}
        sx={{ flexGrow: 1, flexShrink: 0, mr:2,
          '&:focus-within::before': { 
            boxShadow: `0px 0px 0px 2px ${DeezerColors.NORMAL}`} 
          }}
        placeholder="Ingrese Busqueda…" 
        onChange={handleChange} 
        variant="soft" 
        />

       
       <FavoriteModal />
          
      
      </Box>
    )
}