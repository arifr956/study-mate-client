import  { useEffect, useState } from "react";
import { Document, Page } from "react-pdf";
import Swal from "sweetalert2"; 

const SubmittedAssignment = () => {
    const [assignments, setAssignments] = useState([]);
    const [filteredAssignments, setFilteredAssignments] = useState([]);
    const [selectedAssignment, setSelectedAssignment] = useState(null);
    const [marks, setMarks] = useState(0);
    const [feedback, setFeedback] = useState("");
    const [pdfNumPages, setPdfNumPages] = useState(null);

  

    //fetch from server
    useEffect(() => {
        fetch("http://localhost:5000/allsubmitted/")
            .then((response) => response.json())
            .then((data) => {
                setAssignments(data);
                // Filter the assignments
                const filtered = data.filter((assignment) => assignment.status === 'pending');
                setFilteredAssignments(filtered);
            })
            .catch((error) => console.error("Error fetching data: ", error));
    }, []);

    const openAssignment = (assignment) => {
        setSelectedAssignment(assignment);
    };

    const handleMarkAssignment = () => {
        
        //update marks in server 
        console.log(selectedAssignment._id);
        fetch(`http://localhost:5000/allsubmitted/${selectedAssignment._id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                obtainMarks: marks,
                status: 'completed',
            }),
        })
            .then((response) => response.json())
            .then((data) => {
                // ...
                if (data.modifiedCount > 0) {
                    Swal.fire({
                        title: 'Success!',
                        text: 'Assignment Examined Successfully',
                        icon: 'success',
                        confirmButtonText: 'Cool',
                    });
                   
                }
            })
            .catch((error) => console.error("Error marking assignment: ", error));
    };

    const onDocumentLoadSuccess = ({ numPages }) => {
        console.log("Number of pages:", numPages);
        setPdfNumPages(numPages);
    };

    return (
        <div className="text-center">
            <h2 className="text-5xl my-5">Total Pending Assignment</h2>
            <div className="overflow-x-auto w-full mx-auto">
                <table className="table w-full border-2 border-teal-400 text-center mb-4">
                    <thead>
                        <tr className="text-lg text-teal-600">
                            <th>Assignment Title</th>
                            <th>Examinee Email</th>
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
                                    <button
                                        className="btn bg-teal-500 border-t-emerald-500"
                                        onClick={() => openAssignment(submitted)}
                                    >
                                        Give Mark
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {selectedAssignment && (
                <div className="mb-4">
                    <h2 className="text-3xl my-2">{selectedAssignment.title}</h2>
                    <p>Examinee Email: {selectedAssignment.userEmail}</p>
                    <p>Google Drive Link (PDF File):</p>
                    {selectedAssignment.googleDriveLink && (
                        <div className="mb-4">
                            <Document
                            file={selectedAssignment.googleDriveLink}
                            onLoadSuccess={onDocumentLoadSuccess}
                        >
                            {Array.from(new Array(pdfNumPages), (el, index) => (
                                <Page
                                    key={`page_${index + 1}`}
                                    pageNumber={index + 1}
                                />
                            ))}
                        </Document>
                        </div>
                    )}
                   <div className="text-center gap-5 flex items-center justify-center "> <label htmlFor="marks">Marks:</label>
                    <input
                        type="number"
                        className=" border-2"
                        id="marks"
                        value={marks}
                        onChange={(e) => setMarks(e.target.value)}
                    />
                    <label htmlFor="feedback">Feedback: </label>
                    <textarea className=" border-2"
                        id="feedback"
                        value={feedback}
                        onChange={(e) => setFeedback(e.target.value)}
                    />
                    
                    <button className="btn bg-teal-500" onClick={handleMarkAssignment}>
                        Submit Mark
                    </button></div>
                </div>
            )}
        </div>
    );
};

export default SubmittedAssignment;
