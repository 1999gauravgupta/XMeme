import React from 'react'
import { useState } from 'react'
import axios from "axios"
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';

export default function MemeUploadForm({ memes,setMemes }) {
    const [open, setOpen] = useState(false);
    // These 2 functions are just for dialog handling of submit form
    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    // requirement to send post request to server to store that meme
    const handleSubmit = (evt) => {
        evt.preventDefault()
        let name=evt.target[0].value
        let caption = evt.target[1].value
        let url = evt.target[2].value
        let body={ "name":name,"url": url, "caption": caption }
        axios({
            method: 'post',
            url: process.env.REACT_APP_BASE_URL+'/api/memes',
            headers: {
                'Content-type': 'application/json',
            },
            data: JSON.stringify(body)
        }).then((response) => {
			if(response.status>=200 && response.status<=299){
                setMemes([response.data,...memes])
            }
        })
        setOpen(false)
    }

    return (
        <>
            <Button onClick={handleClickOpen} >Submit Meme</Button>
            {/* Dialogs are way of Material Ui to give feature similar to modals. Popup overlay additional functionality */}
            <Dialog open={open} onClose={handleClose} aria-labelledby="meme-create">
                <DialogTitle id="meme-create">Submit Meme</DialogTitle>
                <DialogContent>
                    <form onSubmit={handleSubmit}>
                        <TextField
                            margin="dense"
                            id="name"
                            label="Name"
                            fullWidth
                            required
                        />
                        <TextField
                            margin="dense"
                            id="caption"
                            label="Caption"
                            fullWidth
                            required
                        />
                        <TextField
                            margin="dense"
                            id="url"
                            label="URL"
                            fullWidth
                            required
                        />
                        <Button type="submit" color="primary">
                            Submit
                        </Button>
                    </form>
                </DialogContent>
            </Dialog>
        </>
    )
}
