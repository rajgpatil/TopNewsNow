import React from "react";
import { Box, Typography } from '@mui/material';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useState } from "react";

import axios from 'axios';
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

import {useSnackbar } from 'notistack';

const Login = () => {

     const { enqueueSnackbar } = useSnackbar();

    const navigate = useNavigate()

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [token, setToken] = useState("")
    const backendUrl = import.meta.env.VITE_BACKEND_URL

    const handelOnSubmit = async (e) => {
        e.preventDefault()
        try {
            const response = await axios.post(backendUrl + "/user/login", { email, password })
            
            if (response.data.success) {
                setToken(response.data.token)
                localStorage.setItem('token', response.data.token)
                enqueueSnackbar('Welcome back to TopNewsNow.',{variant: 'success'})
            }
            else {
                console.log(response.data.message)
                enqueueSnackbar(response.data.message,{variant: 'error'})
            }
        }
        catch (err) {
            console.log(err.message)
            enqueueSnackbar(err.message,{variant: 'error'})
        }
    }

    useEffect(() => {
        if (token) {
            navigate('/')
        }
    }, [token])

    return (
        <>
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',    
                    minHeight: '80vh',       
                }}
            >
                <Box sx={{ maxWidth: 500, margin: 'auto', padding: 2, textAlign: "center", display: "block" }}
                    component="form" onSubmit={handelOnSubmit}
                >
                    <Typography sx={{ mb: 5 }} variant="h5" fontWeight="bold" gutterBottom>
                        Login
                    </Typography>

                    <TextField label="Email" variant="filled" fullWidth
                        sx={{ mb: 2 }} onChange={(e) => setEmail(e.target.value)} value={email} />
                    <TextField label="Password" variant="filled" fullWidth type="password"
                        sx={{ mb: 5 }} onChange={(e) => setPassword(e.target.value)} value={password} />

                    <Button type="submit" sx={{ backgroundColor: "black", color: "white" }} variant="contained">Login</Button>
                    <Link to={'/register'} style={{textDecoration:"none"}}>
                    <Typography component="div" sx={{ cursor: 'pointer',color:"blue", paddingTop: 2 }}>
                        Create New Account
                    </Typography>
                    </Link>
                </Box>
            </Box>
        </>
    )
}

export default Login;