
import axios from 'axios';

const getAll =  async (req, res) => {
    try {

        const result = await axios.get(`https://gnews.io/api/v4/top-headlines?category=general&lang=hi&country=in&max=10&apikey=${process.env.API_KEY}`);

        if (result) {
            const articals = result.data.articles
            res.json({ success: true, articals })
        }
        else {
            res.json({ success: false, message: "Something went wroungh in api" })
        }

    }
    catch (err) {
        console.log(err)
        res.json({ success: false, message: err.message })
    }

}


const getArticalByCategory = async (req, res) => {
    const { category } = req.headers

    try {
        const result = await axios.get(`https://gnews.io/api/v4/top-headlines?category=${category}&lang=hi&max=10&apikey=${process.env.API_KEY}`);
        if (result) {
            res.json({ success: true, articals: result.data.articles })
        }
        else {
            res.json({ success: false, message: "Something went wroungh in category API" })
        }
    }
    catch (err) {
        console.log(err)
        res.json({ success: false, message: err.message })
    }
}

export {getAll, getArticalByCategory}