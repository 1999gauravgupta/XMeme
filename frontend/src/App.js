// React Hooks
import { useState, useEffect,useCallback } from 'react'
// Personal Components 
import MemeList from './Components/MemeList'
import SideBar from './Components/SideBar'
// Styling imports
import { ThemeProvider } from '@material-ui/styles'
import { createMuiTheme } from '@material-ui/core'
import { ChevronLeft, MenuRounded, ChevronRight } from '@material-ui/icons'
import { Root, Header, Nav, Content } from 'mui-layout'
import { makeStyles } from '@material-ui/core/styles'
// API Caller
import axios from 'axios'

const theme = createMuiTheme()
// Used for styling in js files
const useStyles = makeStyles({
    header: {
        backgroundColor: "#C0C0C0"
    },
	content:{
		padding: "15px"
	}
})

function App() {
	const classes = useStyles()
	const [memes, setMemes] = useState([])

	const loadMemes = useCallback(() => {
        axios.get(process.env.REACT_APP_BASE_URL+'/api/memes').then((response) => {
			if(response.status>=200 && response.status<=299){
                setMemes(response.data)
			}	
		})
	}, []);
	// This initially loads all memes(latest 100) by sending GET request at /memes
	useEffect(() => {
		loadMemes()
	}, [loadMemes])

	return (
		<>
			<ThemeProvider theme={theme}>
				<Root>
					<Header renderMenuIcon={open => (open ? <ChevronLeft /> : <MenuRounded />)} className={classes.header}>
						<h1>XMEME</h1>
					</Header>
					<Nav renderIcon={collapsed => collapsed ? <ChevronRight /> : <ChevronLeft />}>
						<SideBar memes={memes} setMemes={setMemes}/>
					</Nav>
					<Content className={classes.content}>
						{/* Main Code Starts From Here */}
						<MemeList setMemes={setMemes} memes={memes} />
					</Content>
				</Root>
			</ThemeProvider>
		</>
	)
}

export default App
