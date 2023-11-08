import { useContext, useEffect, useState } from "react";
import SingleAssignment from "./SingleAssignment";
import Swal from "sweetalert2";
import { AuthContext } from "../../providers/AuthProvder/AuthProvider";
import { Navigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";


const AllAssignment = () => {
    const [assignments, setAssignments] = useState([]);
    const [selectedDifficulty, setSelectedDifficulty] = useState("all");
    const [currentPage, setCurrentPage] = useState(1);
    const [filteredAssignments, setFilteredAssignments] = useState([]);
    const { user } = useContext(AuthContext);

    useEffect(() => {
        fetch("https://study-mate-server-dfnqpg0e1-arifur-rahmans-projects.vercel.app/allAssignment/")
            .then((response) => response.json())
            .then((data) => {
                setAssignments(data);
                setFilteredAssignments(data);
            })
            .catch((error) => console.error("Error fetching data: ", error));
    }, []);

    const handleDifficultyChange = (event) => {
        const selected = event.target.value;
        setSelectedDifficulty(selected);
        setCurrentPage(1);
        const filtered = selected === "all" ? assignments : assignments.filter((assignment) => assignment.difficulty === selected);
        setFilteredAssignments(filtered);
    };

    const paginate = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const assignmentsPerPage = 9;
    const indexOfLastAssignment = currentPage * assignmentsPerPage;
    const indexOfFirstAssignment = indexOfLastAssignment - assignmentsPerPage;
    const currentAssignments = filteredAssignments.slice(indexOfFirstAssignment, indexOfLastAssignment);

    const handleDelete = (id, email) => {
        if (!user) {
            // User is not authenticated, redirect to login
            return <Navigate to="/login"></Navigate>
        }

        console.log(id,email);

        if (email === user.email) {

            Swal.fire({
                title: "Are you sure?",
                text: "You won't be able to revert this!",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Yes, delete it!"
              }).then((result) => {
                if (result.isConfirmed) {
                    
                        fetch(`https://study-mate-server-dfnqpg0e1-arifur-rahmans-projects.vercel.app/allAssignment/${id}`, {
                            method: 'DELETE'
                        })
                            .then((res) => res.json())
                            .then((data) => {
                                console.log(data.deletedCount);
                                if (data.deletedCount > 0) {
                                    Swal.fire({
                                        title: "Deleted!",
                                        text: "Your Assignment has been deleted.",
                                        icon: "success"
                                      });
                                    const remaining = assignments.filter((assignment) => assignment._id !== id);
                                    setFilteredAssignments(remaining);
                                }
                            });
                    
                
                }
              });
            
        } else {
            toast.error('Not authorized to delete this assignment.', { position: 'top-center' });
        }
    };

    return (
        <div className="md:m-5 lg:m-10">
            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="difficultyFilter">
                    Filter by Difficulty:
                </label>
                <select
                    className="block appearance-none w-full border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="difficultyFilter"
                    value={selectedDifficulty}
                    onChange={handleDifficultyChange}
                >
                    <option value="all">All</option>
                    <option value="easy">Easy</option>
                    <option value="medium">Medium</option>
                    <option value="hard">Hard</option>
                </select>
            </div>

            {currentAssignments.length > 0 ? (
                <div>
                    <div className="grid lg:grid-cols-2 xl:grid-cols-3 my-3 gap-5">
                        {currentAssignments.map((assignment) => (
                            <SingleAssignment key={assignment._id} handleDelete={handleDelete} assignment={assignment} />
                        ))}
                    </div>
                    <div className="m-3 text-2xl font-medium text-teal-700 text-center">Pagination</div>
                    <div className="flex justify-center">
                        <div className="pagination items-center gap-3">
                            <button
                                onClick={() => setCurrentPage(currentPage - 1)}
                                className={`pagination-button btn-secondary p-2 ${currentPage === 1 ? "hidden" : ""}`}
                            >
                                Previous
                            </button>
                            {Array.from({ length: Math.ceil(filteredAssignments.length / assignmentsPerPage) }).map((_, index) => (
                                <button
                                    key={index}
                                    onClick={() => paginate(index + 1)}
                                    className={`pagination-button btn-secondary p-2 ${currentPage === index + 1 ? "active" : ""}`}
                                >
                                    {index + 1}
                                </button>
                            ))}
                            <button
                                onClick={() => setCurrentPage(currentPage + 1)}
                                className={`pagination-button btn-secondary p-2 ${currentPage === Math.ceil(filteredAssignments.length / assignmentsPerPage) ? "hidden" : ""}`}
                            >
                                Next
                            </button>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="flex justify-center items-center p-3 md:p-6 lg:p-10">
                    <img src="https://i.ibb.co/bs2CfF2/download-1.png" alt="" />
                </div>
            )}
            <ToastContainer />
        </div>
    );
};

export default AllAssignment;
