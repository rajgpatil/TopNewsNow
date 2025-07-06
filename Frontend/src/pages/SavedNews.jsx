import React, { useEffect, useState } from "react";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import axios from "axios";
import { useNavigate } from "react-router-dom";

import NewsCardSkeleton from "../components/NewsCardSkeleton"

//alert
import {useSnackbar } from 'notistack';


const SavedNews = () => {
    const [loading, setLoading] = useState(true);

    //for alert
    const { enqueueSnackbar } = useSnackbar();

    const navigate = useNavigate()
    const backendUrl = import.meta.env.VITE_BACKEND_URL

    const [articals, setArticals] = useState([])

    const renderSkeletons = () => Array.from(new Array(8)).map((item, index) => <NewsCardSkeleton key={index} />);

    const handleClick = (artical)=>{
         window.open(artical.url, '_blank');
    }

    const fetchSavedArticals = async() => {
        if (!localStorage.getItem('token')) {
            enqueueSnackbar('Login First to See Saved Articals',{variant: 'error'})
            return navigate('/login')
        }
        try {
            const response = await axios.get(backendUrl + "/artical/get", { headers: { token: localStorage.getItem('token') } })
            
            if (response.data.success === true) {
                setArticals(response.data.articals)
            }
            else {
                enqueueSnackbar(response.data.message,{variant: 'error'})
            }
        }
        catch (err) {
            console.log(err.message)
             enqueueSnackbar(err.message,{variant: 'error'})
        }
        finally{
            setLoading(false)
        }
    }

    const handelOnDelete = async(url)=>{
        const token = localStorage.getItem('token')
        if(!token){
              enqueueSnackbar('Token is expired please login again',{variant: 'error'})
            return navigate('/login')
        }
        try{
            console.log(url)
            const response = await axios.delete(backendUrl + '/artical/remove',{data:{url:url},headers:{token:token}})
            if(response.data.success){
                enqueueSnackbar(response.data.message,{variant: 'success'})
                window.location.reload();
            }
            else{
                enqueueSnackbar(response.data.message,{variant: 'error'})
            }
        }
        catch(err){
              enqueueSnackbar(err.message,{variant: 'error'})
        }
    }

    useEffect(() => {
        setTimeout(()=>{
            fetchSavedArticals()
        },1000)
        
    },[])

    return (
        <>
            <Box
                sx={{
                    display: "flex",
                    flexWrap: "wrap",     // Allows wrapping to next line
                    justifyContent: "center", // Center align cards
                    // justifyContent: { xs:"center", md: "center", lg: "initial" },
                }}
            >

                {loading ? renderSkeletons() :
                    articals && articals.length > 0 ? (

                        articals.map((artical, key) => (
                            <Box key={key}>
                                <Card elevation={0} sx={{ maxWidth: 345, margin: '2rem', width: 300, border: 'none' }}>
                                    <CardMedia
                                        sx={{ height: 300, borderRadius: 5 }}
                                        image={artical.image}
                                        title="green iguana"
                                    />

                                    <CardContent>
                                        <Typography gutterBottom variant="h5" fontWeight="bold" component="div" onClick={()=>handleClick(artical)} sx={{ cursor: 'pointer' }}>
                                            {artical.title}
                                        </Typography>
                                        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                                            Discription: {artical.description}
                                        </Typography>
                                        <Button onClick={()=>handelOnDelete(artical.url)} sx={{ color: "black", borderRadius: 2, fontWeight: "normal" }}>Delete</Button>
                                    </CardContent>

                                </Card>
                            </Box>
                        ))
                    ) : (
                        <Typography variant="h6" fontWeight="bold" component="div" sx={{ color: 'text.secondary', paddingTop: 5, textAlign:"center", width: "100%"}}>
                            You dont have any saved articals......
                        </Typography>)
                }

            </Box>
        </>
    )
}

export default SavedNews