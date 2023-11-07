import React, { useEffect } from "react";
import AOS from 'aos';
import 'aos/dist/aos.css';
import { IoIosCreate, IoIosDocument } from "react-icons/io";
import { FaRegEdit, FaRegEye } from "react-icons/fa";
import { MdGrade } from "react-icons/md";
import { FiSend } from "react-icons/fi";


const features = [
    {
        "id": 1,
        "title": "Create Assignment",
        "description": "Easily create and customize assignments with a user-friendly interface.",
        "icon": <IoIosCreate />
    },
    {
        "id": 2,
        "title": "View All Assignments",
        "description": "Browse and access a wide range of assignments from various subjects and topics.",
        "icon": <FaRegEye />
    },
    {
        "id": 3,
        "title": "Update Assignments",
        "description": "Edit and modify assignments as needed, ensuring they are always up to date.",
        "icon": <FaRegEdit />
    },
    {
        "id": 4,
        "title": "Grade Assignments",
        "description": "Effortlessly assign marks and provide feedback to student submissions.",
        "icon": <MdGrade />
    },
    {
        "id": 5,
        "title": "Submit Assignments",
        "description": "Students can easily submit their completed assignments through our platform.",
        "icon": <FiSend />
    },
    {
        "id": 6,
        "title": "Preview in PDF",
        "description": "Get a quick preview of assignments in PDF format for easy reference.",
        "icon": <IoIosDocument />
    }
];

const styles = {
    card: {
        backgroundColor: '#6EE7B7',
        border: '2px solid #4FD1C5',
        borderRadius: '0px',
        padding: '20px',
        height: '300px',
    },


};

const Feature = () => {
    useEffect(() => {
        AOS.init({
            duration: 2000,
            once: true,
        });
    }, []);

    return (
        <div>
            <h1 className="text-3xl font-bold text-center my-5">
                <span className="bg-gradient-to-r from-cyan-500 to-blue-500 text-transparent bg-clip-text">
                    Features of Our Online Study Platform
                </span>
            </h1>
            <h3 className="text-lg text-slate-400 mb-8 text-center font-semibold">
                Explore the key features that our online study platform offers to enhance your learning experience.
            </h3>
            <div className="p-10 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {features.map((feature, index) => (
                    <div key={feature.id} className="my-6 mx-2 p-4" data-aos="fade-up">
                        <div className="flex justify-center flex-col items-center text-center" style={styles.card}>
                            <div className="text-center text-7xl mb-4">
                                {feature.icon}
                            </div>
                            <h2 className="text-2xl font-semibold mb-2">{feature.title}</h2>
                            <p className="text-lg">{feature.description}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Feature;
