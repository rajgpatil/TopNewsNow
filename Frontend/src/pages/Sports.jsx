import React, { useEffect, useState } from "react";
import NewsCart from "../components/NewsCart";
import Box from "@mui/material/Box";
import NewsCardSkeleton from "../components/NewsCardSkeleton"

import axios from "axios"

const Sports = () => {
    const [loading, setLoading] = useState(true);
    const [sportsNews, setSportsNews] = useState([])
    const backendUrl = import.meta.env.VITE_BACKEND_URL

    const renderSkeletons = () => Array.from(new Array(8)).map((item, index) => <NewsCardSkeleton key={index} />);

    const fetchNews = async () => {
        try {
            const category = "sports"
            const res = await axios.get(backendUrl + "/category/specific", { headers: { category } });
            if (res.data.success === true) {
                setSportsNews(res.data.articals)
            }
            else {
                console.log(res.data.message)
            }
        }
        catch (err) {
            console.log(err.message)
        }
        finally{
            setLoading(false)
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
                {loading ? renderSkeletons() :
                    sportsNews.map((artical, key) => {
                        return <NewsCart key={key} id={artical.id} artical={artical} />
                    })
                }

            </Box>

        </>
    )
}

export default Sports