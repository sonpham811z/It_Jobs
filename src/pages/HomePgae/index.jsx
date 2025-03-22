import { Container } from "@mui/material"
import { Divider } from "@mui/material"
// import HomePage from "./HomePgae";
import AppBar from "~/components/AppBar/AppBar"
import JobSearchBar from "~/components/HomePages/JobSearch"
import Employers from "~/components/HomePages/Employers"
import JobHighlight from "~/components/HomePages/ItJobs/index"
import UserReviews from "~/components/HomePages/userReviewer/index"
import Banner from "~/components/HomePages/Banner/index"
import Footer from "~/components/HomePages/Footer/index"


function HomePage() {
    return (
        <Container disableGutters maxWidth={false} sx={{ height: '100%' ,backgroundColor: 'primary.second', gap: 3}}>
                <AppBar />
                <Divider sx={{borderColor: 'white'}}/>
                <JobSearchBar/>
                <Employers/>
                <JobHighlight />
                <UserReviews/>
                <Banner/>
                <Divider sx={{borderColor: 'white'}}/>
                <Footer/>
                {/* <HomePage/> */}
        </Container>
    )
}

export default HomePage
