import { createRoot } from 'react-dom/client'
import './index.css'
import { CssVarsProvider } from '@mui/joy/styles';
import { CssBaseline } from '@mui/joy';
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import App from './App';
import { ContextProvideer } from "./context/MusicContext"
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

createRoot(document.getElementById('root')!).render(
  
   <CssVarsProvider
  // the local storage key to use.
  modeStorageKey="demo_identify-system-mode"
  // set as root provider
  disableNestedContext>
      <CssBaseline />
      <ContextProvideer>
      <App />
      </ContextProvideer>
    </CssVarsProvider>
 
)
