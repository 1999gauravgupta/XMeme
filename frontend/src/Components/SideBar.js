import React from 'react'
import axios from "axios"
import Button from '@material-ui/core/Button';
import MemeUploadForm from './MemeUploadForm'

export default function SideBar({memes,setMemes}) {
    // gets the best memes which have max(likes-dislikes)
    const handleStarboard = (evt) => {
		evt.preventDefault()
		axios.get(process.env.REACT_APP_BASE_URL+'/api/starboard').then((response) => {
			if(response.status>=200 && response.status<=299){
                setMemes(response.data)
			}	
		})
	}
    // shows latest 100 memes
	const handleAll = (evt) => {
        evt.preventDefault()
		axios.get(process.env.REACT_APP_BASE_URL+'/api/memes').then((response) => {
			if(response.status>=200 && response.status<=299){
                setMemes(response.data)
			}	
		})
	}
    // calls an api which clears bad memes having dislikes-likes>5
    const handleCleanup= (evt)=>{
        evt.preventDefault()
        axios.delete(process.env.REACT_APP_BASE_URL+'/api/cleanup')
    }

    return (
        // All the content(elements) in collapsible sidebar
        <>
            <Button onClick={handleAll}>View All</Button><br />
            <Button onClick={handleStarboard}>Starboard</Button><br />
            <Button onClick={handleCleanup}>Cleanup</Button><br />
            <MemeUploadForm memes={memes} setMemes={setMemes} />
        </>
    )
}
