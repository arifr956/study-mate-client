import { useState, useContext } from 'react';
// import { parse } from 'date-fns';
import { Link, useNavigate, useLoaderData } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Swal from 'sweetalert2';
import { ToastContainer, toast } from "react-toastify";
import { AuthContext } from '../../providers/AuthProvder/AuthProvider';

const UpdateAssignment = () => {
    const newAssignment = useLoaderData();
    const { title, description, marks, thumbnailUrl, difficulty, email } = newAssignment;

    // Define state variables for the form fields
    const [updatedAssignment, setUpdatedAssignment] = useState({
        title: title || '',
        description: description || '',
        marks: marks || 0,
        thumbnailUrl: thumbnailUrl || '',
        difficulty: difficulty || 'easy',
        //dueDate: dueDate ? parse(dueDate, 'yyyy-MM-dd', new Date()) : new Date(),
    });


    const { user } = useContext(AuthContext);
    const { _id } = newAssignment;
    
    //to navigate after sucess
    const navigate = useNavigate();

    const handleDateChange = (date) => {
        setUpdatedAssignment({ ...updatedAssignment, dueDate: date });
    };

    const handleUpdateAssignment = (event) => {
        event.preventDefault();

        if (email === user.email) {
            // Send data to the server
            fetch(`https://study-mate-server-dfnqpg0e1-arifur-rahmans-projects.vercel.app/allAssignment/${_id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updatedAssignment),
            })
                .then((res) => res.json())
                .then((data) => {
                    if (data.modifiedCount > 0) {
                        Swal.fire({
                            title: 'Success!',
                            text: 'Product Updated Successfully',
                            icon: 'success',
                            confirmButtonText: 'Cool',

                        });
                        navigate('/allAssignment');
                    }
                })
                .catch((error) => {
                    console.error('Error updating assignment:', error);
                });

            // Reset the form
            event.target.reset();
        }
        else {
            toast.error('Not authorized to Update this assignment.', { position: 'top-center' });
        }
    };

    return (
        <div>
            <h3 className="text-4xl font-bold text-center my-5">
                Update
                <span className="bg-gradient-to-r from-cyan-500 to-blue-500 text-transparent bg-clip-text"> {title}</span>
            </h3>
            <div className="my-6">
                <Link to="/">
                    <button className="btn btn-ghost hover:red">Back To Home</button>
                </Link>
                <form onSubmit={handleUpdateAssignment} className="bg-gradient-to-r from-teal-400 to-blue-500 shadow-md rounded-md px-8 pt-6 pb-8 mb-4">
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="title">
                            Title <span className="text-red-600">*</span>
                        </label>
                        <input
                            className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-teal-100"
                            id="title"
                            type="text"
                            placeholder="Assignment Title"
                            value={updatedAssignment.title}
                            onChange={(e) => setUpdatedAssignment({ ...updatedAssignment, title: e.target.value })}
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="description">
                            Description <span className="text-red-600">*</span>
                        </label>
                        <textarea
                            className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-teal-100"
                            id="description"
                            placeholder="Assignment Description"
                            value={updatedAssignment.description}
                            onChange={(e) => setUpdatedAssignment({ ...updatedAssignment, description: e.target.value })}
                            required
                        ></textarea>
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="marks">
                            Marks <span className="text-red-600">*</span>
                        </label>
                        <input
                            className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-teal-100"
                            id="marks"
                            type="number"
                            placeholder="Assignment Marks"
                            value={updatedAssignment.marks}
                            onChange={(e) => setUpdatedAssignment({ ...updatedAssignment, marks: e.target.value })}
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="thumbnailUrl">
                            Thumbnail Image URL
                        </label>
                        <input
                            className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-teal-100"
                            id="thumbnailUrl"
                            type="url"
                            placeholder="Thumbnail Image URL"
                            value={updatedAssignment.thumbnailUrl}
                            onChange={(e) => setUpdatedAssignment({ ...updatedAssignment, thumbnailUrl: e.target.value })}
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="difficulty">
                            Assignment Difficulty
                        </label>
                        <select
                            className="block appearance-none w-full border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-teal-100"
                            id="difficulty"
                            value={updatedAssignment.difficulty}
                            onChange={(e) => setUpdatedAssignment({ ...updatedAssignment, difficulty: e.target.value })}
                        >
                            <option value="easy">Easy</option>
                            <option value="medium">Medium</option>
                            <option value="hard">Hard</option>
                        </select>
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="dueDate">
                            Due Date
                        </label>
                        <DatePicker
                            selected={updatedAssignment.dueDate}
                            onChange={handleDateChange}
                            dateFormat="yyyy-MM-dd" // Specify the date format
                            className="w-full border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-teal-100"
                        />
                    </div>
                    <div className="text-center">
                        <button
                            className="bg-teal-500 hover:bg-teal-600 text-white font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline"
                            type="submit"
                        >
                            Update Assignment
                        </button>
                    </div>
                </form>
            </div>
            <ToastContainer/>
        </div>
    );
};

export default UpdateAssignment;
