import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../providers/AuthProvder/AuthProvider";
import { motion } from 'framer-motion';

const container = {
  hidden: { opacity: 1, scale: 0 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      delayChildren: 0.3,
      staggerChildren: 0.2
    }
  }
}
  
const item = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1
  }
}

const MyAssignment = () => {
  const [assignments, setAssignments] = useState([]);
  const [filteredAssignments, setFilteredAssignments] = useState([]);
  const { user } = useContext(AuthContext);

  const url = `https://study-mate-server.vercel.app/allsubmitted/`;

  useEffect(() => {
    fetch(url, { credentials: "include" })
      .then((response) => response.json())
      .then((data) => {
        setAssignments(data);
        // Filter the assignments
        const filtered = data.filter((assignment) => assignment.userEmail === user.email);
        setFilteredAssignments(filtered);
      })
      .catch((error) => console.error("Error fetching data: ", error));
  }, [url]);

  return (
    <div>
      <h2 className="text-5xl text-center my-5">Your Submitted Assignment</h2>
      <motion.div initial="hidden" animate="visible" variants={container}>
      <div className="overflow-x-auto">
          <table className="table w-full border-2 border-teal-400 text-center mb-4">
            <thead>
              <tr className="text-lg text-teal-600 border-b-2 border-teal-400">
                <th>Assignment Title</th>
                <th> Image</th>
                <th>Total Marks</th>
                <th> Status</th>
                <th> Obtain Marks</th>
                <th> Feedback</th>
              </tr>
            </thead>
            <motion.tbody variants={container}>
              {filteredAssignments.map((submitted) => (
                <motion.tr variants={item} key={submitted.id}>
                  <td>{submitted.title}</td>
                  <td>
                    <div className="avatar">
                      <div className="w-24 h-24">
                        {submitted.thumbnailUrl && <img src={submitted.thumbnailUrl} alt="Title Thumbnail" />}
                      </div>
                    </div>
                  </td>
                  <td>{submitted.marks}</td>
                  <td>{submitted.status}</td>
                  <td>
                    {submitted.status === 'pending' ? "Not Marked" : submitted.obtainMarks}
                  </td>
                  <td>{submitted.feedback}</td>
                </motion.tr>
              ))}
            </motion.tbody>
          </table>
        </div>
      </motion.div>
    </div>
  );
};

export default MyAssignment;
