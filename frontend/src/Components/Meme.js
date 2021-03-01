import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import EditIcon from '@material-ui/icons/Edit';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import ThumbDownIcon from '@material-ui/icons/ThumbDown';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import axios from "axios"
import { Grid } from '@material-ui/core';
const isImageUrl = require('is-image-url');

const useStyles = makeStyles({
    cardactions: {
        justifyContent: 'space-evenly'
    },
    card:{
        backgroundColor: "#F5F5F5"
    }
});


export default function Meme({ setMemes, memes,meme }) {
    const classes = useStyles();
    const [open, setOpen] = useState(false);
    const [image, setImage] = useState(false);

    if(meme.url.startsWith('data:image/') || meme.url.startsWith('https://encrypted-tbn0.gstatic.com/images') || isImageUrl(meme.url)){
        meme.url=meme.url}
    else{
        meme.url='https://cdn.sstatic.net/Sites/stackoverflow/img/404.svg'
    }
    //  Below 2 functions are used to handle Edit Meme Dialog
    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    // Small images are pain in the eyes. so lets see them in full size
    const handleImageOpen = () => {
        setImage(true);
    };

    const handleImageClose = () => {
        setImage(false);
    };
    
    // we can update many things in individual memes so i made a general function instead of writing same request again and again 
    const APICall =(body)=>{
        axios({
            method: 'patch',
            url: process.env.REACT_APP_BASE_URL+'/api/memes/'+meme.id,
            headers: {
                'Content-type': 'application/json',
            },
            data: JSON.stringify(body)
        }).then((response) => {
			if(response.status>=200 && response.status<=299){
                let index
                for(index=0;index<memes.length;index++){
                    if(memes[index].id===meme.id){
                        const newMemes=[...memes]
                        newMemes[index]=response.data
                        setMemes(newMemes)
                        break
                    }
                }
            }
        })
    }
    // change likes,dislikes,caption,url or all of them :>
    const handleEdit =(evt)=>{
        evt.preventDefault()
        let body
        let caption = evt.target[0].value
        let url = evt.target[1].value
        body={ "url": url, "caption": caption }
        APICall(body)
        setOpen(false)
    }

    const handleLike =(evt)=>{
        evt.preventDefault()
        let body;
        body={ "likes": meme.likes + 1 }
        APICall(body)
    }
    const handleDislike = (evt) =>{
        evt.preventDefault()
        let body;
        body={ "dislikes": meme.dislikes + 1 }
        APICall(body)
    }

    return (
        <>
        {/* Handles responsiveness of cards and visually appealing by use of Cards */}
            <Grid item xs={12} sm={6} md={4} lg={3} xl={3}>
                <Card className="mdl-cell mdl-cell--3-col-desktop mdl-cell--4-col-tablet mdl-cell--6-col-phone" className={classes.card}>
                    <CardActionArea onClick={handleImageOpen}>
                        <CardMedia component="img" height="140" image={meme.url} />
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="h2">
                                {meme.name}
                            </Typography>
                            <Typography variant="body2" color="textSecondary" component="p">
                                {meme.caption}
                            </Typography>
                        </CardContent>
                    </CardActionArea>
                    <CardActions className={classes.cardactions}>
                        <Button onClick={handleClickOpen} ><EditIcon /></Button>
                        <Button onClick={handleLike}><ThumbUpIcon /> {meme.likes}</Button>
                        <Button onClick={handleDislike}><ThumbDownIcon /> {meme.dislikes}</Button>
                    </CardActions>
                </Card>
            </Grid>
            <Dialog open={open} onClose={handleClose} aria-labelledby="meme-update">
                <DialogTitle id="meme-update">Edit Meme</DialogTitle>
                <DialogContent>
                    <form onSubmit={handleEdit}>
                        <TextField
                            margin="dense"
                            id="caption"
                            label="Caption"
                            fullWidth
                            defaultValue={meme.caption}
                            required
                        />
                        <TextField
                            margin="dense"
                            id="url"
                            label="URL"
                            fullWidth
                            defaultValue={meme.url}
                            required
                        />
                        <Button type="submit" color="primary">
                            Update
                        </Button>
                    </form>
                </DialogContent>
            </Dialog>
            <Dialog open={image} onClose={handleImageClose} aria-labelledby="imgae-open">
                <DialogTitle id="image-open">{meme.name} | {meme.caption}</DialogTitle>
                <DialogContent>
                    <Card>
                        <CardActionArea>
                            <CardMedia component="img" image={meme.url} />
                        </CardActionArea>
                    </Card>
                </DialogContent>
            </Dialog>
        </>
    )
}
