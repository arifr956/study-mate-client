import { useEffect, useState } from "react";

const SubmittedAssignment = () => {
    const [assignments, setAssignments] = useState([]);
    const [filteredAssignments, setFilteredAssignments] = useState([]);
    console.log(assignments);

    useEffect(() => {
        fetch("http://localhost:5000/allsubmitted/")
            .then((response) => response.json())
            .then((data) => {
                setAssignments(data);
                // Filter the assignments and set the filteredAssignments state here
                const filtered = data.filter((assignment) => assignment.status === 'pending');
                setFilteredAssignments(filtered);
            })
            .catch((error) => console.error("Error fetching data: ", error));
    }, []);

    return (
        <div>
            <h2 className="text-5xl text-center my-5">Total Pending Assignment</h2>
            <div className="overflow-x-auto w-full mx-auto">
                <table className="table w-full border-2 border-teal-400 text-center mb-4">
                    <thead>
                        <tr className="text-lg text-teal-600">
                            <th>Assignment Title</th>
                            <th> Examinee Email</th>
                            <th>Marks</th>
                            <th>Examine?</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredAssignments.map((submitted) => (
                            <tr key={submitted.id}>
                                <td>{submitted.title}</td>
                                <td>{submitted.userEmail}</td>
                                <td>{submitted.marks}</td>
                               
                                <td>
                                    <button className="btn bg-teal-500 border-t-emerald-500">Give Mark</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default SubmittedAssignment;
