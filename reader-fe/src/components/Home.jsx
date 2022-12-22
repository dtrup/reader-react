import {useEffect, useState} from "react";
import Texts from "./Texts"
import Typography from '@mui/material/Typography';

const Home = () => {

    return (
        <div>
            <Typography sx={{paddingTop: 3}} variant="h2">Bilingual or multilingual reader of</Typography>
            <Texts />
        </div>
    )
}

export default Home
