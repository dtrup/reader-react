import { Link } from 'react-router-dom'
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Box from '@mui/material/Box';
import { useEffect, useState } from "react";
import { Container } from '@mui/system';
import Grid from '@mui/material/Grid';




const Texts = () => {
    const [texts, setTexts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchTexts = async () => {
        const res = await fetch('http://127.0.0.1:8000/api/texts/')
        const data = await res.json()
        return data
    }

    useEffect(() => {
        const getTexts = async () => {
            const txts = await fetchTexts()
            setTexts(txts)
        }

        getTexts()
    }, [])

    return (
        <Container>
            <Box>
                <Typography sx={{ padding: 2 }} variant="h2">classical texts</Typography>
                <Box sx={{ padding: 2 }}>
                    {texts.filter((item) => item.collection !== 'bible').map((item) => (
                        <div key={item.text_id} >
                            <Link to={`/text/${item.text_id}`} state={{ item }} className="text-link">{item.author} - {item.title} </Link>

                        </div>
                    ))}
                </Box>
                <Accordion sx={{ backgroundColor: "secondary" }}>
                    <AccordionSummary
                        // expandIcon={<ExpandMoreIcon/>}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                    >
                        <Typography variant="h3" align="center" sx={{ width: '100%' }}>...and the Bible in more than 10 languages - {texts.length > 0 && texts.filter((item) => item.collection === 'bible')[0].languages.split(",").join(" ")}</Typography>
                    </AccordionSummary>
                    <AccordionDetails sx={{}}>

                        <Grid container sx={{}}>
                            {texts.filter((item) => item.collection === 'bible').map((item) => (
                                <Grid item key={item.text_id} sx={{ padding: 0.6 }}>
                                    <Link to={`/text/${item.text_id}`} state={{ item }} className="text-link">{item.title} </Link>

                                </Grid>
                            ))}
                        </Grid>

                    </AccordionDetails>
                </Accordion>
            </Box>
        </Container>


    );
}

export default Texts