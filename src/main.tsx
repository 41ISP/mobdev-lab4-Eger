import {createRoot} from 'react-dom/client'
import {RouterProvider} from "react-router-dom";
import router from "./app/routers/router.tsx";
import ColorSchemeToggle from "./widgets/ModeToggle/ColorSchemeToggle.tsx";
import {CssBaseline, CssVarsProvider} from "@mui/joy";

createRoot(document.getElementById('root')!).render(
	<CssVarsProvider>
		<ColorSchemeToggle/>
		<CssBaseline/>
		<RouterProvider router={router}/>
	</CssVarsProvider>
)
