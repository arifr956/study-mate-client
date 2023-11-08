import { useEffect, useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import Swal from "sweetalert2";
//import simplePdf from "../../assets/sample.pdf"

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`;

const SubmittedAssignment = () => {
    const [assignments, setAssignments] = useState([]);
    const [filteredAssignments, setFilteredAssignments] = useState([]);
    const [selectedAssignment, setSelectedAssignment] = useState(null);
    const [marks, setMarks] = useState(0);
    const [feedback, setFeedback] = useState("");
    const [pdfNumPages, setPdfNumPages] = useState(null);

    

    useEffect(() => {
        fetch("https://study-mate-server-qmpse44ck-arifur-rahmans-projects.vercel.app//")
            .then((response) => response.json())
            .then((data) => {
                setAssignments(data);
                const filtered = data.filter((assignment) => assignment.status === 'pending');
                setFilteredAssignments(filtered);
            })
            .catch((error) => console.error("Error fetching data: ", error));
    }, []);

    const openAssignment = (assignment) => {
        setSelectedAssignment(assignment);
    };

    const handleMarkAssignment = () => {
        fetch(`https://study-mate-server-qmpse44ck-arifur-rahmans-projects.vercel.app//${selectedAssignment._id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                obtainMarks: marks,
                status: 'completed',
                feedback: feedback,
            }),
        })
            .then((response) => response.json())
            .then((data) => {
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
        setPdfNumPages(numPages);
    };

    return (
        <div className="text-center">
            <h2 className="text-5xl my-5">Total Pending Assignment</h2>
            <div className="overflow-x-auto w-full mx-auto">
                <table className="table w-full border-2 border-teal-400 text-center mb-4">
                    <thead>
                        <tr className="text-lg text-teal-600 border-b-2 border-teal-400">
                            <th>Assignment Title</th>
                            <th>Examinee Name</th>
                            <th>Marks</th>
                            <th>Examine?</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredAssignments.map((submitted) => (
                            <tr key={submitted._id}>
                                <td>{submitted.title}</td>
                                <td>{submitted.name}</td>
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
                    <p>Drive Link (PDF File):  {selectedAssignment.pdfLink}</p>
                    
                    {selectedAssignment.pdfLink && (

                        <div>
                        <button className="btn" onClick={()=>document.getElementById('my_modal_4').showModal()}>View PDF</button>
                        <dialog id="my_modal_4" className="modal">
                          <div className="modal-box w-11/12 max-w-5xl">
                          <div className="mb-4">
                            <Document
                                file={selectedAssignment.pdfLink}
                                onLoadSuccess={onDocumentLoadSuccess}
                                onLoadError={(error) => console.error("Error loading PDF:", error)}
                            >
                                {Array.from(new Array(pdfNumPages || 0), (el, index) => (
                                    <Page
                                        key={`page_${index + 1}`}
                                        pageNumber={index + 1}
                                    />
                                ))}
                            </Document>
                        </div>
                            <div className="modal-action fixed right-0 top-0">
                              <form method="dialog">
                                {/* if there is a button, it will close the modal */}
                                <button className="btn bg-red-500 text-white">Close</button>
                              </form>
                            </div>
                          </div>
                        </dialog></div>
                        
                     
                    )}
                    <p className="mb-3 border-dashed border-2 border-teal-600">Examinee Note: {selectedAssignment.notes}</p>
                    <div className="text-center gap-5 flex items-center justify-center">
                        <label htmlFor="marks">Marks:</label>
                        <input
                            type="number"
                            className="border-2"
                            id="marks"
                            value={marks}
                            onChange={(e) => setMarks(e.target.value)}
                        />
                        <label htmlFor="feedback">Feedback: </label>
                        <textarea
                            className="border-2"
                            id="feedback"
                            value={feedback}
                            onChange={(e) => setFeedback(e.target.value)}
                        />

                        <button className="btn bg-teal-500" onClick={handleMarkAssignment}>
                            Submit Mark
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default SubmittedAssignment;
