import React, {useState, useEffect} from 'react';
import {SERVER_URL} from '../constants';
import {Link} from 'react-router-dom';


function ListAssignment(props) {

  const [assignments, setAssignments] = useState([]);
  const [message, setMessage] = useState('');

  useEffect(() => {
   // called once after intial render
   fetchAssignments();
  }, [] )
 
  const fetchAssignments = () => {
    console.log("fetchAssignments");
    fetch(`${SERVER_URL}/assignment`)
    .then((response) => response.json() ) 
    .then((data) => { 
      console.log("assignment length "+data.length);
      setAssignments(data);
     }) 
    .catch(err => console.error(err)); 
  }
  
  const dropAssingment = (event) => {
    const row_id = event.target.parentNode.parentNode.rowIndex - 1;
    console.log("Drop Assingment "+row_id);
    const assignments = assignments[row_id].id
    if (window.confirm('Are you sure you wish to drop the assignment?')){
      fetch('http://localhost:8081/assignment/' + id,
      {
        method: 'DELETE',
      }
    ) 
    .then((response) => { 
      if (response.ok) {
          setMessage('Assignment deleted.');
          fetchAssignments();
      } else {
          setMessage("Assignment delete failed.");
      }
   })
  }

  const addAssignment = (assignment) => {
 fetch('http://localhost:8081/assignment',
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', }, 
        body: JSON.stringify(assignment)
      }
   )
   .then((response) => { 
    if (response.ok) {
        setMessage('Assignment added.');
        fetchAssignments();
    } else {
        setMessage("Assignment add failed.");
    }
 })
  }
  
    const headers = ['Assignment Name', 'Course Title', 'Due Date', ' ', ' ', ' '];
    
    return (
      <div>
        <h3>Assignments</h3>
        <div margin="auto" >
          <h4>{message}&nbsp;</h4>
              <table className="Center"> 
                <thead>
                  <tr>
                    {headers.map((title, idx) => (<th key={idx}>{title}</th>))}
                  </tr>
                </thead>
                <tbody>
                  {assignments.map((row, idx) => (
                    <tr key={idx}>
                      <td>{row.assignmentName}</td>
                      <td>{row.courseTitle}</td>
                      <td>{row.dueDate}</td>
                      <td>
                        <Link to={`/gradeAssignment/${assignments[idx].id}`} >Grade</Link>
                      </td>
                      <td>Edit</td>
                      <td>Delete</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <AddAssignment f1={addAssignment}>
                
                </AddAssignment>
          </div>
      </div>
    )
}  
}
export default ListAssignment;