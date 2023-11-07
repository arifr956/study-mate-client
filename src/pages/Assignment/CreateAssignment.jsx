import { useContext, useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Swal from 'sweetalert2'
import { AuthContext } from '../../providers/AuthProvder/AuthProvider';

const CreateAssignment = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [marks, setMarks] = useState('');
    const [thumbnailUrl, setThumbnailUrl] = useState('');
    const [difficulty, setDifficulty] = useState('easy');
    const [dueDate, setDueDate] = useState(null);
    const { user } = useContext(AuthContext);
    const email = user.email;
    const handleDateChange = (date) => {
        setDueDate(date);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle the form submission here, e.g., send data to an API
        console.log('Form submitted with the following data:');
        console.log('Title:', title);
        console.log('Description:', description);
        console.log('Marks:', marks);
        console.log('Thumbnail URL:', thumbnailUrl);
        console.log('Difficulty:', difficulty);
        console.log('Due Date:', dueDate);

        const newAssignment = {title, description, marks, thumbnailUrl, difficulty, dueDate, email}
        console.log(newAssignment);

        //send data to server
        fetch('http://localhost:5000/allAssignment/', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(newAssignment)
        })
        .then(res=> res.json())
        .then(data => {
            console.log(data);
            if(data.insertedId){
                Swal.fire({
                    title: 'Success!',
                    text: 'Assignment Added Successfully',
                    icon: 'success',
                    confirmButtonText: 'Cool'
                    
                  })
            }
        })
       

        // Reset the form fields if needed
        setTitle('');
        setDescription('');
        setMarks('');
        setThumbnailUrl('');
        setDifficulty('easy');
        setDueDate(null);
    };

    return (
        <div className="w-full max-w-md m-auto p-6">
            <form onSubmit={handleSubmit} className="bg-gradient-to-r from-teal-400 to-blue-500 shadow-md rounded-md px-8 pt-6 pb-8 mb-4">
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="title">
                        Title <span className="text-red-600">*</span>
                    </label>
                    <input
                        className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-teal-100"
                        id="title"
                        type="text"
                        placeholder="Assignment Title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
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
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
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
                        value={marks}
                        onChange={(e) => setMarks(e.target.value)}
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
                        value={thumbnailUrl}
                        onChange={(e) => setThumbnailUrl(e.target.value)}
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="difficulty">
                        Assignment Difficulty
                    </label>
                    <select
                        className="block appearance-none w-full border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-teal-100"
                        id="difficulty"
                        value={difficulty}
                        onChange={(e) => setDifficulty(e.target.value)}
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
                        selected={dueDate}
                        onChange={handleDateChange}
                        className="w-full border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-teal-100"
                    />
                </div>
                <div className="text-center">
                    <button
                        className="bg-teal-500 hover:bg-teal-600 text-white font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline"
                        type="submit"
                    >
                        Submit
                    </button>
                </div>
            </form>
        </div>
    );
};

export default CreateAssignment;
