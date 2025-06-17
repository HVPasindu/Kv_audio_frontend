import { Route,Routes } from "react-router-dom";
import Header from "../../Component/header";
import Home from "./home";
import Contact from "./contact";
import Gallery from "./gallery";
import Item from "./item";
import Items from "./item";
import Errorss from "./error";
import ProductOverview from "./productOverview";

export default function HomePage(){
    return(
        <>
            <Header/>
            <div className="h-[calc(100vh-100px)] w-full bg-primary ">
                <Routes path="/*">
                    <Route path="/contact" element={<Contact/>}/>
                    <Route path="/gallery" element={<Gallery/>}/>
                    <Route path="/items" element={<Items/>}/>
                    <Route path="/product/:key" element={<ProductOverview/>}/>
                    <Route path="/" element={<Home/>}/>
                    <Route path="/*" element={<Errorss/>}/>
                    

                </Routes>
            </div>
        </>
    )

}