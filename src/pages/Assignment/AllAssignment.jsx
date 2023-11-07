import { useEffect, useState } from "react";
import SingleAssignment from "./SingleAssignment";
const AllAssignment = () => {
    const [assignments, setAssignments] = useState([]);

    useEffect(() => {
        // Make an HTTP GET request to fetch assignments data
        fetch("http://localhost:5000/allAssignment/")
            .then((response) => response.json())
            .then((data) => setAssignments(data))
            .catch((error) => console.error("Error fetching data: ", error));
    }, []);

    return (
        // <div>
        //     <h3>All Assignments Here</h3>
        //     <ul>
        //         {assignments.map((assignment) => (
        //             <li key={assignment._id}>{assignment.title}</li>
        //         ))}
        //     </ul>
        // </div>


        <div className="md:m-5 lg:m-10">
           
            {assignments.length > 0 ? (
                <div>
                    

                    {/* Product grid */}
                    <div className="grid md:grid-cols-2 xl:grid-cols-4 my-3 gap-5">
                        {assignments.map(assignment => (
                            <SingleAssignment key={assignment._id} assignment={assignment} />
                        ))}
                    </div>
                </div>
            ) : (
                <div className="flex justify-center items-center p-3 md:p-6 lg:p-10">
                    <img src="https://i.ibb.co/bs2CfF2/download-1.png" alt="" />
                </div>
            )}
        </div>
    );
};

export default AllAssignment;
