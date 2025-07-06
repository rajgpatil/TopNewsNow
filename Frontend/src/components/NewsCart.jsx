import React from "react";

import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

import {useSnackbar } from 'notistack';

const NewsCart = ({artical}) => {
     const { enqueueSnackbar } = useSnackbar();

    const backendUrl = import.meta.env.VITE_BACKEND_URL
    const navigate = useNavigate()

    const handleClick = ()=>{
         window.open(artical.url, '_blank');
    }
    const handelOnSave = async()=>{
        try{
            const token = localStorage.getItem('token')
            if(!token){
                enqueueSnackbar('Please login first to save news',{variant: 'error'})
                return navigate('/login')
            }
            const response = await axios.post(backendUrl + "/artical/add",{artical},{headers: {token}})
            if(response.data.success){
                  enqueueSnackbar(response.data.message,{variant: 'success'})
            }
            else{
                  enqueueSnackbar(response.data.message,{variant: 'error'})
            }
        }
        catch(err){
            console.log(err)
              enqueueSnackbar(err.message,{variant: 'error'})
        }
    }

    return (
        <>
            <Box
               
            >
                <Card elevation={0} sx={{ maxWidth: 345, margin: '2rem', width: 300, border: 'none' }}>
                    <CardMedia
                        sx={{ height: 300, borderRadius: 5 }}
                        image={artical.image}
                        title="green iguana"
                    />
                   
                    <CardContent>
                        <Typography gutterBottom variant="h5" fontWeight="bold" component="div" onClick={handleClick} sx={{ cursor: 'pointer' }}>
                            {artical.title}
                        </Typography>
                        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                            Discription: {artical.description}
                        </Typography>
                          <Button onClick={handelOnSave} sx={{color:"black", borderRadius:2, fontWeight:"normal"}}>Save This....</Button>
                    </CardContent>
                   
                </Card>
            </Box>

        </>
    )
}

export default NewsCart;