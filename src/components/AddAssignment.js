import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';


// properties addCoure is required, function called when Add clicked.
function AddAssignment(props) { 

  const [open, setOpen] = useState(false);
  const [assignment, setAssignment] = useState({ assignmentName: '', dueDate: ' ', courseId: 0});
 
  
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (event) => {
    setAssignment( {...assignment, [event.target.name]: event.target.value });
  }

// Save course and close modal form
  const handleAdd = () => {
      props.f1(assignment);
      handleClose();
  }

  return (
      <div>
        <Button id="addAssignment" variant="outlined" color="primary" style={{margin: 10}} onClick={handleClickOpen}>
          Add Assignment
        </Button>
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle>Add Assignment</DialogTitle>
            <DialogContent  style={{paddingTop: 20}} >
              <TextField id="assignmentName" autoFocus fullWidth label="Name" name="assignmentName" onChange={handleChange}  /> 
			  <TextField id="dueDate" autoFocus fullWidth label="Due Date" name="dueDate" onChange={handleChange}  /> 
			  <TextField id="courseID" autoFocus fullWidth label="Course ID" name="courseId" onChange={handleChange}  /> 
            </DialogContent>
            <DialogActions>
              <Button color="secondary" onClick={handleClose}>Cancel</Button>
              <Button id="add" color="primary" onClick={handleAdd}>Add</Button>
            </DialogActions>
          </Dialog>      
      </div>
  ); 
}

// required property:  addCourse is a function to call to perform the Add action
AddAssignment.propTypes = {
  addAssignment : PropTypes.func.isRequired
}

export default AddAssignment;