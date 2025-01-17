import {useColorScheme, IconButton} from "@mui/joy";
import DarkModeRoundedIcon from '@mui/icons-material/DarkModeRounded';
import LightModeRoundedIcon from '@mui/icons-material/LightModeRounded';

function ColorSchemeToggle() {
	const {mode, setMode} = useColorScheme();

	return (
		<IconButton
			aria-label="toggle light/dark mode"
			size="sm"
			variant="outlined"
			onClick={() => {
				setMode(mode === 'light' ? 'dark' : 'light');
			}}
		>
			{mode === 'light' ? <DarkModeRoundedIcon/> : <LightModeRoundedIcon/>}
		</IconButton>
	)
}

export default ColorSchemeToggle