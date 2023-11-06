import { Outlet } from "react-router-dom";
import Footer from "../HomePage/Footer";
import Navbar from "./Navbar";

const Root = () => {
    return (
        <div className="font-roboto">
            <Navbar></Navbar>
            <Outlet></Outlet>
            <Footer></Footer>
        </div>
    );
};

export default Root;