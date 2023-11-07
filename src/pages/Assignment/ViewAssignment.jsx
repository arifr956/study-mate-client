import { Link, useLoaderData } from "react-router-dom";
import { FaMarker } from "react-icons/fa";
import { BsCalendarDate } from "react-icons/bs";

const ViewAssignment = () => {
    const newAssignment = useLoaderData();
    const { _id, title, description, marks, thumbnailUrl, difficulty, email, dueDate } = newAssignment;



    return (
        <div>
            <h3 className="text-4xl font-bold text-center my-5">Details of
                <span className="bg-gradient-to-r from-cyan-500 to-blue-500 text-transparent bg-clip-text"> {' '}
                    {newAssignment.title}
                </span>
            </h3>
            <div>
                <section className="text-gray-700 body-font overflow-hidden bg-white">
                    <div className="container px-5 py-24 mx-auto">
                        <div className="lg:w-4/5 mx-auto flex flex-wrap">
                            <img alt="ecommerce" className="lg:w-1/2 w-full object-cover object-center rounded border border-gray-200" src={thumbnailUrl}></img>
                            <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
                                <h2 className="text-sm title-font text-gray-500 tracking-widest">SUBJECT NAME</h2>
                                <h1 className="text-gray-900 text-3xl title-font font-medium mb-1">{title}</h1>
                                <h2 className="text-sm title-font text-gray-500 tracking-widest">Creator Email</h2>
                                <h1 className="text-gray-900 text-3xl title-font font-medium mb-1">{email}</h1>
                                <div className="flex mb-4">
                                    <span className="flex items-center">
                                        <span className="text-gray-600 ml-3 font-medium flex items-center gap-3"><FaMarker />Marks :{' '}{marks}</span>
                                    </span>
                                    <span className="flex ml-3 pl-3 py-2 border-l-2 border-gray-200">
                                        <span className="title-font font-medium text-2xl text-gray-900 flex items-center gap-2"><BsCalendarDate />{' '}{dueDate}</span>
                                    </span>
                                </div>
                                <h2 className="text-sm title-font text-gray-500 tracking-widest">Description</h2>
                                <p className="leading-relaxed">{description}</p>
                                <div className="flex mt-6 items-center pb-5 border-b-2 border-gray-200 mb-5">
                                    <div className="">
                                        <h2 className="text-sm title-font text-gray-500 tracking-widest">Difficulty</h2>
                                        <p className="leading-relaxed border-md border border-red-300 py-2 px-3">{difficulty}</p>
                                    </div>
                                </div>
                                <div className="flex">
                                   <Link to = {`/submitAssignment/${_id}`}> <button className="btn text-white bg-teal-600 rounded-l-lg" style={{ borderTopRightRadius: 0, borderTopLeftRadius: 0 }}>
                                        Take Assignment
                                    </button></Link>
                                    
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
};

export default ViewAssignment;
