import * as React from 'react';
import {Link, useParams, useLocation} from 'react-router-dom'
import {useEffect, useState, useMemo} from "react"
import axios from "axios"
import Radio from '@mui/material/Radio';
import Checkbox from '@mui/material/Checkbox';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import useLocalStorage from "./useLocalStorage";
import { Container } from '@mui/system';
import ButtonGroup from '@mui/material/ButtonGroup';


const Chapter = () => {
    const {textId} = useParams();
    // const [theme, setTheme] = useLocalStorage("theme", "dark");
    const [textIdLocal, setTextIdLocal] = useLocalStorage("textIdLocal", textId);
    const [chapter, setChapter] = useState(1);
    
    const textRecord = useLocation().state.item;
    const chapters = useMemo(() =>  Array(textRecord.number_chapters).fill(0).map((e,i)=>i+1));
    const [languages, setLanguages] = useState(textRecord.languages.toLowerCase().split(","));
    const [chapterData, setChapterData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [fromLanguage, setFromLanguage] = useState(languages[0]);
    const handleTopLang = (event) => {setFromLanguage(event.target.value);
        setToLanguages(toLanguages.filter((l) => l !== event.target.value));
    };

    const [toLanguages, setToLanguages] = useState([languages[1]]);
    const handleTargetLangs = (e) => {
        const {name, checked} = e.target;
        if (checked) {
            setToLanguages(toLanguages => [...toLanguages, name]);
        } else {
            setToLanguages(toLanguages.filter((l) => l !== name));
        }
    }
    const getSentences = async () => {
        if(textId !== textIdLocal){
            setTextIdLocal(textId);
           
        }
        setChapter(parseInt(chapter));
        try {
            const response = await axios.get(
                `http://127.0.0.1:8000/api/texts/${textId}/${chapter}`
            );
            setChapterData(response.data);
            setError(null);
        } catch (err) {
            setError(err.message);
            setChapterData(null);
        } finally {
            setLoading(false);
        }
    };

    const handleChapterButton = (e) =>{
        setChapter(e.target.textContent);
    }

    const scrollToTop = (() => window.scrollTo({top: 0, behavior: 'smooth'}));

    useEffect(() => {
        getSentences();
    }, [chapter]);

    return (
        <Container>
            <Grid container justify="flex-end" sx={{padding:2}}>

                <Grid item  xs={12} md={3} sx={{textAlign :{xs:"left", md:"right"}}}>
                    <Typography variant="h6" display="block">
                        Source language: &nbsp;&nbsp;&nbsp;
                    </Typography>
                </Grid>

                <Grid item xs={12} md={9} align="left" sx={{}}>
                    <FormControl >
                        <RadioGroup
                            row
                            aria-labelledby="demo-row-radio-buttons-group-label"
                            name="row-radio-buttons-group"
                            value={fromLanguage}
                            onChange={handleTopLang}>

                            {languages.map((l) => (
                                <FormControlLabel key={l} value={l} control={<Radio color='secondary'/>} label={l.toUpperCase()} />
                            ))}
                        </RadioGroup>
                    </FormControl>
                </Grid>
                <Grid item xs={12} md={3} sx={{textAlign :{xs:"left", md:"right"}}}>
                    <Typography variant="h6" display="block" gutterBottom sx={{align :{xs:"left", md:"right"}}}>
                        Target language(s): &nbsp;&nbsp;&nbsp;
                    </Typography>
                </Grid>
                <Grid item xs={12} md={9} align="left">
                    <Box>
                        {languages.map((l, i) => (
                            <FormControlLabel key={l} control={
                                <Checkbox disabled={fromLanguage === l} checked={toLanguages.some(target => target === l)} onChange={handleTargetLangs} name={l} color='secondary'/>
                            }
                                              label={l.toUpperCase()}
                            />
                        ))
                        }
                    </Box>
                </Grid>
            </Grid>

            <Typography variant="h3" sx={{ margin: 2}}>{textRecord.title}</Typography>
            
            <Box sx={{ margin: 2}}>
                {textRecord && chapters.map(
                    n =>
                        <Button color={n === chapter ? "primary" : "secondary"} sx={{minWidth: "18px",fontSize: "1rem", }}
                         key={n} onClick={handleChapterButton} size="small">{n}
                         </Button>
                )}
            </Box>

            {loading && <div>A moment please...</div>}
            {error && (
                <div>{`There is a problem fetching the post data - ${error}`}</div>
            )}
            <Box sx={{ textAlign: "left", margin: 0}}>
                {chapterData &&
                    chapterData.map((sentence) => {
                        const sTop = sentence[fromLanguage];
                        return (
                        <div key={sentence.sentence_id}>
                            <Typography sx={{ color: 'text.primary', }}>{sTop}</Typography>
                            {toLanguages &&
                                toLanguages.map((l, i) => {
                                    var sBottom = sentence[l];
                                    return <Typography key={i} sx={{ padding: 1, color: 'text.secondary' }}>{sBottom}</Typography>
                                })
                            }

                        </div>
                    )})}
            </Box>
            <Button 
            onClick={scrollToTop}
            color="secondary"
            size="large"
            aria-label="scroll back to top"
          >Back to top
          </Button> 
        </Container>
    );
}

export default Chapter
