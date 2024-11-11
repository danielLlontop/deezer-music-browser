import {IconButton, useColorScheme } from '@mui/joy';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
export function ModeToggle() {
  const { mode, setMode } = useColorScheme();

    const toggleMode = () => {
        setMode(mode === 'light' ? 'dark' : 'light');
      };


  return (
    <IconButton size='lg' onClick={toggleMode} >
      {mode === 'light' ? <DarkModeIcon /> : <LightModeIcon />}
    </IconButton>
  );
}
