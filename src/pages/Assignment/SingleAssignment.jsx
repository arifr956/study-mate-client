
import { Link } from "react-router-dom";


const SingleAssignment = ({ assignment, handleDelete }) => {
    const { _id, title, marks, thumbnailUrl, difficulty, email } = assignment;
    

   

    return (
        <div className="card card-side bg-base-100 shadow-xl">
            <figure className="w-full">
                <img src={thumbnailUrl} alt="Assignment Thumbnail" />
            </figure>
            <div className="flex justify-between items-center">
                <div className="card-body">
                    <h2 className="card-title">{title}</h2>
                    <p>Marks: {marks}</p>
                    <p>Difficulty: {difficulty}</p>
                </div>
                <div className="card-actions justify-end">
                    <div className="btn-group btn-group-vertical space-y-5">
                        <Link to={`/viewassignment/${_id}`}>
                            <button className="btn btn-active">View Assignment</button>
                        </Link>
                        <Link to={`/updateassignment/${_id}`}>
                            <button className="btn">Update Assignment</button>
                        </Link>
                        <button onClick={()=> handleDelete ( _id, email)} className="btn">Delete Assignment</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SingleAssignment;
