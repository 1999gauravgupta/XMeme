import React from 'react'
import Meme from './Meme'
import Grid from '@material-ui/core/Grid';

export default function MemeList({ setMemes, memes }) {
    return (
        <>
            <Grid container spacing={2}>
                {/* Presents Memes in form of Material UI Cards */}
            {   
                memes.map(meme => {
                    return <Meme key={meme.id} setMemes={setMemes} memes={memes} meme={meme} />
                })
            }
            </Grid>
        </>
    )
}
