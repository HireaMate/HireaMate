import React, { useState } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material';
import AddCircleIcon from '@mui/icons-material/AddCircle';

const Posts = () => {
  const [formObject, setFormObject] = useState({
    name: '',
    //creator: '',
    expirationDate: 0,
    description: '',
    price: 0,
    links: []
  });

  const [open, setOpen] = useState(false);
  const [errors, setErrors] = useState({
    name: '',
    // Add other fields here if needed
  });

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    // Clear errors when the modal is closed
    setErrors({
      name: '',
      // Clear other fields here if needed
    });
  };

  const handleSave = () => {
    // Validate and save form data
    if (isValidForm()) {
      console.log('formObject:', formObject);
      // Close the modal
      handleClose();
    } else {
      // Handle validation error, you can show a message to the user
      console.error('Form validation failed.');
    }
  };

  const formatPriceInput = (value) => {
	// Remove spaces and add a space every three digits
	const formattedValue = value.replace(/\s/g, '').replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
  
	// Set the formatted value to the form object
	setFormObject({
	  ...formObject,
	  price: formattedValue,
	});
  
	return formattedValue;
  };
  

  const isValidForm = () => {
	// Validate individual fields using patterns
	const isNameValid = formObject.name.length <= 30 && formObject.name.match(/^[A-Za-z][A-Za-z\s]*$/);
	const isDateValid = formObject.expirationDate.match(/^\d{2}-\d{2}-\d{4}$/);
  
	// Validate the description with a minimum length of 10 characters
	const isDescriptionValid =
	  formObject.description.length >= 10 &&
	  formObject.description.length <= 500 &&
	  formObject.description.match(/^[A-Za-z0-9\s]*$/);
  
	// Validate the price with at most two decimal places
	const isPriceValid =
	  formObject.price.length <= 7 &&
	  /^(\d+(\.\d{0,2})?)?$/.test(formObject.price.replace(/\s/g, '')) && // Allow up to two decimal places
	  parseFloat(formObject.price.replace(/\s/g, '')) > 0; // Remove spaces and ensure the price is greater than 0
  
	// Check if the expiration date is at least 1 week more than the current date
	const currentDate = new Date();
	const selectedDate = new Date(formObject.expirationDate.replace(/(\d{2})-(\d{2})-(\d{4})/, '$2/$1/$3'));
  
	const isExpirationDateValid =
	  isDateValid &&
	  selectedDate > currentDate &&
	  selectedDate.getTime() - currentDate.getTime() >= 7 * 24 * 60 * 60 * 1000 && // 1 week in milliseconds
	  selectedDate.getTime() - currentDate.getTime() <= 8 * 7 * 24 * 60 * 60 * 1000; // 8 weeks in milliseconds
  
	setErrors({
	  name: isNameValid ? '' : 'Invalid job name',
	  expirationDate: isDateValid
		? isExpirationDateValid
		  ? ''
		  : 'Expiration date must be at least 1 week more and at most 8 weeks more than the current date'
		: 'Invalid date format (dd-mm-yyyy)',
	  description: isDescriptionValid
		? ''
		: 'Description must be alphanumeric, contain at least 10 characters, and contain at most 500 characters',
	  price: isPriceValid
		? ''
		: 'Invalid price. Must be greater than 0, at most 7 digits, and have at most two decimal places',
	  // Add other fields here if needed
	});
  
	// Check if all fields are valid
	return isNameValid && isExpirationDateValid && isDescriptionValid && isPriceValid;
  };
  
  
  
  
  const handleChange = (field, value) => {
    setFormObject({
      ...formObject,
      [field]: value
    });

    // Clear the error message when the user types in the field
    setErrors({
      ...errors,
      [field]: '',
    });
  };

  return (
    <div>
      <Button startIcon={<AddCircleIcon />} onClick={handleOpen}>
        Submit
      </Button>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Enter Job Details</DialogTitle>
        <DialogContent>
		<TextField
  label="Job Name"
  value={formObject.name}
  onChange={(e) => handleChange('name', e.target.value)}
  fullWidth
  margin="normal"
  inputProps={{
    maxLength: 30,
  }}
  pattern="^[A-Za-z][A-Za-z\s]*$"
  onChange={(e) => {
    const value = e.target.value;
    // Ensure the first character is uppercase
    const formattedValue = value.charAt(0).toUpperCase() + value.slice(1);
    handleChange('name', formattedValue);
  }}
  helperText={errors.name} // Display error message
  error={Boolean(errors.name)} // Highlight the field in red if there's an error
/>
          {/* Add similar sections for other fields with helperText and error props */}
          {/* <TextField
            label="Creator Address"
            value={formObject.creator}
            onChange={(e) => handleChange('creator', e.target.value)}
            fullWidth
            margin="normal"
          /> */}
          <TextField
			label="Expiration Date (dd-mm-yyyy)"
			value={formObject.expirationDate}
			onChange={(e) => handleChange('expirationDate', e.target.value)}
			fullWidth
			margin="normal"
			inputProps={{
				maxLength: 10,
			}}
			pattern="^\d{2}-\d{2}-\d{4}$"
			helperText={errors.expirationDate} // Display error message
			error={Boolean(errors.expirationDate)} // Highlight the field in red if there's an error
			/>

			<TextField
			label="Job Description"
			value={formObject.description}
			onChange={(e) => handleChange('description', e.target.value)}
			fullWidth
			margin="normal"
			inputProps={{
			minLength: 10,
			maxLength: 500,
			}}
			pattern="^[A-Za-z0-9\s]*$"
			helperText={errors.description} // Display error message
			error={Boolean(errors.description)} // Highlight the field in red if there's an error
			/>

			<TextField
			label="Job Price"
			value={formObject.price}
			onChange={(e) => handleChange('price', formatPriceInput(e.target.value))}
			fullWidth
			margin="normal"
			inputProps={{
				minLength: 1,
				maxLength: 7,
			}}
			helperText={errors.price} // Display error message
			error={Boolean(errors.price)} // Highlight the field in red if there's an error
			/>



          <TextField
            label="Job Links (comma-separated)"
            value={formObject.links.join(',')}
            onChange={(e) => handleChange('links', e.target.value.split(','))}
            fullWidth
            margin="normal"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSave}>Save</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Posts;
