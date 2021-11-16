import { Introduction } from "../components/sections/Introduction";
import { AboutMe } from "../components/sections/AboutMe";
import { Projects } from "../components/sections/Projects";
import { Footer } from "../components/sections/Footer";
import { Navbar } from "../components/Navbar";

export const App = () => {
    return (
        <div className="app">
            <Navbar/>
            <Introduction/>
            <AboutMe/>
            <Projects/>
            <Footer/>
        </div>
    )
}

export default App;