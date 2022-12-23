import { Typography } from "@mui/material"
import { Box } from "@mui/system"

const About = () => {
    return (
        
        <Box sx={{padding:7}}>
            <Typography variant="h3">About this site: how you see is what you get</Typography>
            <p className="aboutText">If you are not into foreign languages or do not need to learn one, probably you won't be late for your next meeting engrossed in this website. The intended audience is made of either individuals who would fancy a useful distraction while learning a foreign language or polyglots who enjoy finding expressive subtleties in the original texts or their translations. </p>
            <p className="aboutText">The site is trying to provide a natural, flexible, bilingual or multilingual reading experience. Quite a mouthful, so let's break it down and start with the end.</p>
            <p className="aboutText">The original texts are accompanied by one or more translations. <i> The Portrait of Dorian Gray</i>, for instance, is can be read in English, French and German. The Bible, while not (yet?) available in Old Greek or Hebrew, is waiting for the reader in more than 10 languages, which include, in addition to the above, Dutch, Indonesian or Romanian. </p>
            <p className="aboutText">We also mentioned natural. Unlike the other available bilingual reading options, on two cumbersome columns, making it annoying for the reader to move from one side to the other until they eventually loses track,  <b> X-lingual </b> text flows naturally, sentence after sentence, with translations rendered discreetly in between. Not to mention that, on smaller screens, the two-columned experience deteriorates even more. Here, on the other hand, the reading experience remains unchanged no matter if you are on a 20+ inch screen or a mobile device.</p>
            <p className="aboutText">The flexibility goes at least three ways. First the reader can choose which language stands on top. They might keep the original on top or might want to read the translation first and then, armed with that understanding, start approaching the original. Or they might want to add more than one translation and that’s just one checkbox away. And for late nights and tired eyes, one can pick the cool dark mode.</p>
            <p className="aboutText">A final word about the source of the texts. They are all public domain and already largely available. What is different is the way these texts are presented. </p>
        </Box>
    )
}

export default About
