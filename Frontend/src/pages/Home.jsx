import React, { useContext, useEffect, useState } from "react";
import NewsCart from "../components/NewsCart";
import Box from "@mui/material/Box";
import NewsCardSkeleton from "../components/NewsCardSkeleton"

import axios from "axios"

const Home = () => {
    const [loading, setLoading] = useState(true);
    const [articals, setArticals] = useState([])

    const backendUrl = import.meta.env.VITE_BACKEND_URL

     const renderSkeletons = () => Array.from(new Array(8)).map((item, index) => <NewsCardSkeleton key={index} />);

    const fetchNews = async () => {
        try {
            const res = await axios.get(backendUrl + "/category/all");
            
            if (res.data.success === true) {
              
                setArticals(res.data.articals)
            }
            else {
                console.log(res.data.message)
            }

        }
        catch (err) {
            console.log(err.message)
        }
        finally{
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchNews();
    }, [])


    return (
        <>
            <Box
                sx={{
                    display: "flex",
                    flexWrap: "wrap",    
                    justifyContent: "center", 
                }}
            >
                {/* {console.log(articals)} */}
                {loading ? renderSkeletons() :
                    articals.map((artical, key) => {
                        return <NewsCart key={key} artical={artical} />
                    })
                }

            </Box>

        </>
    )
}

export default Home;