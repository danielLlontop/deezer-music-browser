import { Container} from "@mui/joy"
import AudioPlayerMui from "./components/AudioPlayerMui"
import { MusicData } from "./components/MusicData"
import { Header } from "./components/Header"



function App() {

  return (
    <>
    <Container maxWidth="xl" sx={{ mt: 5 }}>
      <Header />
      <MusicData />
      
    </Container>
 
   <AudioPlayerMui />
  
    </>
  )
}

export default App
