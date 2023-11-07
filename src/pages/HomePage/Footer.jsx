import { Link } from "react-router-dom";
import logo from "../../../public/studymate.jpg";

const Footer = () => {
    return (
        <div className="">
            <footer className="relative fixed bottom-0 w-full py-10 flex flex-col items-center bg-gradient-to-t from-cyan-900 via-blue-900 to-purple-900 overflow-hidden md:py-20">
                <div className="relative z-10 container m-auto px-6 md:px-12">
                    <div className="m-auto md:w-10/12 lg:w-8/12 xl:w-6/12">
                        <div className="flex flex-wrap items-center justify-between md:flex-nowrap">
                            <div className="w-full space-x-12 flex justify-center text-white sm:w-7/12 md:justify-start">
                                <ul className="list-disc list-inside space-y-6">
                                    <li><Link to="/">Home</Link></li>
                                    <li><Link to="/allassignment">All Assignment</Link></li>
                                    <li><Link to="/createassignment">Create Assignment</Link></li>
                                    <li><Link to="/">Terms of Use</Link></li>
                                </ul>
                            </div>
                            <div className="w-10/12 m-auto mt-16 space-y-6 text-center sm:text-left sm:w-5/12 sm:mt-auto">
                                <div className="flex gap-3 items-center">
                                    <img src={logo} alt="StudyMate" className="w-16 h-16 rounded-full mx-auto" />
                                    <span className="block text-white font-semibold text-2xl">Study Mate</span>
                                </div>
                                <span className="block text-gray-300">Your Online Study Partner!</span>
                                <span className="block text-gray-300">&copy; 2023 Study Mate</span>
                                <span className="flex justify-between text-white">
                                    <Link to="/terms" className="font-semibold">Terms of Use</Link>
                                    <Link to="/privacy" className="font-semibold">Privacy Policy</Link>
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
                <div aria-hidden="true" className="absolute h-full inset-0 flex items-center">
                    <div aria-hidden="true" className="bg-layers bg-scale w-56 h-56 m-auto blur-xl bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 rounded-full md:w-[30rem] md:h-[30rem] md:blur-3xl"></div>
                </div>
                <div aria-hidden="true" className="absolute inset-0 w-full h-full bg-teal-500 opacity-80"></div>
            </footer>
        </div>
    );
};

export default Footer;
