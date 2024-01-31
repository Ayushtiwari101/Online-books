import { useState } from 'react';
import './RegistrationForm.css'

function Form() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    repeatPassword: '',
  });

  const [alerts, setAlerts] = useState({
    name: '',
    email: '',
    password: '',
    repeatPassword: '',
  });

  const [focusState, setFocusState] = useState({
    name: false,
    email: false,
    password: false,
    repeatPassword: false,
  });

  const [registrationSuccess, setRegistrationSuccess] = useState(false);

  const [submittedFormData, setSubmittedFormData] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleFocus = (name) => {
    setFocusState((prevFocusState) => ({ ...prevFocusState, [name]: true }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newAlerts = {};

    // Constraints for Name
    if (formData.name === '') {
      newAlerts.name = 'Please Enter Your Name.';
    } else if (formData.name.length < 3 || formData.name.length > 30) {
      newAlerts.name = 'Name should be between 3 and 30 characters';
    } else {
      newAlerts.name = '';
    }

    // Constraints for Email
    if (formData.email === '') {
      newAlerts.email = 'Please Enter Your Email.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newAlerts.email = 'Please enter a valid email address';
    } else {
      newAlerts.email = '';
    }

    // Constraints for Password
    if (formData.password === '') {
      newAlerts.password = 'Please Enter Your Password.';
    } else if (formData.password.length < 10 || !/[!@#$%^&*(),.?":{}|<>]/.test(formData.password)) {
      newAlerts.password = 'Password should be at least 10 characters long with at least one special character';
    } else {
      newAlerts.password = '';
    }

    // Constraints for Repeat Password
    if (formData.repeatPassword === '') {
      newAlerts.repeatPassword = 'Please Repeat Your Password.';
    } else if (formData.repeatPassword !== formData.password) {
      newAlerts.repeatPassword = 'Passwords do not match';
    } else {
      newAlerts.repeatPassword = '';
    }

    setAlerts(newAlerts);

    // Check if all constraints are met before setting registration success
    if (Object.values(newAlerts).every((alert) => alert === '')) {
      setRegistrationSuccess(true);
      // Store the filled form data in the state
      setSubmittedFormData(formData);
      // Display the form data in the console
      console.log('Submitted Form Data:', formData);
    } else {
      setRegistrationSuccess(false);
    }
  };

  return (
    <>
      <img src="./desktop-wallpaper-bookshelf.jpg" alt="" id='bg-img'/>
      {registrationSuccess && (
          <div id='registration-s'>
            Registration Successful!
          </div>
        )}
      <div className="Form">
        
        
        <h1 id='heading'>Create Account</h1>
        <form onSubmit={handleSubmit}>
          <label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter your Name"
              onFocus={() => handleFocus('name')}
              style={{ borderColor: focusState.name ? 'navy' : '#ccc' }}
            />
            <div className="alert">{alerts.name}</div>
          </label>
          <br />
          {/* For Email */}
          <label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your Email"
              onFocus={() => handleFocus('email')}
              style={{ borderColor: focusState.email ? 'navy' : '#ccc' }}
            />
            <div className="alert">{alerts.email}</div>
          </label>
          <br />
          {/* For Password */}
          <label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your Password"
              onFocus={() => handleFocus('password')}
              style={{ borderColor: focusState.password ? 'navy' : '#ccc' }}
            />
            <div className="alert">{alerts.password}</div>
          </label>
          <br />
          {/* For Repeat Password */}
          <label>
            <input
              type="password"
              name="repeatPassword"
              value={formData.repeatPassword}
              onChange={handleChange}
              placeholder="Repeat your Password"
              onFocus={() => handleFocus('repeatPassword')}
              style={{ borderColor: focusState.repeatPassword ? 'navy' : '#ccc' }}
            />
            <div className="alert">{alerts.repeatPassword}</div>
          </label>
          <br />
          {/* Submit button */}
          <button type="submit" >
            Sign Up
          </button>
        </form>
      </div>
    </>
  );
}

export default Form;
