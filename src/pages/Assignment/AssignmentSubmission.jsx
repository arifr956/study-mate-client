import { useContext, useState } from 'react';

import Swal from 'sweetalert2';
import { AuthContext } from '../../providers/AuthProvder/AuthProvider';
import {useNavigate, useLoaderData } from 'react-router-dom';

const AssignmentSubmission = () => {
    const [pdfLink, setPdfLink] = useState('');
    const [notes, setNotes] = useState('');
    const newAssignment = useLoaderData();
    const {  title, description, marks, thumbnailUrl, difficulty, email,  } = newAssignment;


    const { user } = useContext(AuthContext);
    console.log(user);

    const navigate = useNavigate();

    const handleSubmit = () => {
        const submission = {
            title: title || '',
            description: description || '',
            marks: marks || 0,
            thumbnailUrl: thumbnailUrl || '',
            difficulty: difficulty || 'easy',
            creatorEmail: email || '',
            userEmail: user.email,
            name: user.displayName,
            pdfLink,
            notes,
            feedback: 'No Feedback',
            status: 'pending',
            obtainMarks: 0,
        };

        fetch('https://study-mate-server.vercel.app/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(submission)
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                if (data.insertedId) {
                    Swal.fire({
                        title: 'Success!',
                        text: 'Assignment submitted Successfully',
                        icon: 'success',
                        confirmButtonText: 'Cool'
                    });
                    navigate('/allAssignment');
                }
            })
            .catch(error => {
                console.error('Error submitting assignment:', error);
            });


    };

    return (
        <div className="min-h-screen flex items-center justify-center">
            <div className="bg-white w-96 p-8 rounded shadow-lg border-2 border-teal-500">
                <h2 className="text-2xl font-bold mb-4">Assignment Submission</h2>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="pdfLink">
                        PDF Link
                    </label>
                    <input
                        className="w-full px-3 py-2 border rounded focus:outline-none focus:border-blue-500"
                        type="text"
                        id="pdfLink"
                        placeholder="Enter PDF Link"
                        value={pdfLink}
                        required
                        onChange={(e) => setPdfLink(e.target.value)}
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="notes">
                        Notes
                    </label>
                    <textarea
                        className="w-full px-3 py-2 border rounded focus:outline-none focus:border-blue-500"
                        id="notes"
                        placeholder="Enter Notes"
                        value={notes}
                        
                        onChange={(e) => setNotes(e.target.value)}
                    />
                </div>
                <div className="flex justify-center">
                    <button
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        onClick={handleSubmit}
                    >
                        Submit
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AssignmentSubmission;
