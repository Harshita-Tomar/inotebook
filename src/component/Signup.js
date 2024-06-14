import React from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useNavigate } from "react-router-dom"
import { useState } from 'react';

const Signup = (props) => {
	const [credentials, setCredentials] = useState({ name: "", email: "", password: "", cpassword: "" })
	let navigate = useNavigate();

	const handleSubmit = async (e) => {
		e.preventDefault();
		//const { name, email, password } = credentials;
		const response = await fetch("http://localhost:5000/api/auth/createuser", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ name: credentials.name, email: credentials.email, password: credentials.password, cpassword: credentials.cpassword }),
		});
		const json = await response.json();
		//console.log(json)

		if (json.success) {
			localStorage.setItem('token', json.authtoken);
			props.showAlert("Account created Succssfully", "success")
			navigate('/');
		} else {
			props.showAlert("invalid credentials", "danger")
		}
	}
	const onChange = (e) => {
		setCredentials({ ...credentials, [e.target.name]: e.target.value })
	}

	return (
		<div className='container'>
			<h1 className='text-center mt-4'>Sign Up</h1>
			<Form onSubmit={handleSubmit}>
				<Form.Group className="mb-3" controlId="name">
					<Form.Label>Name</Form.Label>
					<Form.Control type="text" name='name' onChange={onChange} />
				</Form.Group>

				<Form.Group className="mb-3" controlId="email">
					<Form.Label>Email address</Form.Label>
					<Form.Control type="email" name='email' onChange={onChange} />
				</Form.Group>

				<Form.Group className="mb-3" controlId="password">
					<Form.Label>Password</Form.Label>
					<Form.Control type="password" name='password' onChange={onChange} required />
				</Form.Group>

				<Form.Group className="mb-3" controlId="cpassword">
					<Form.Label>Confirm Password</Form.Label>
					<Form.Control type="password" name='cpassword' onChange={onChange} required />
				</Form.Group>
				<Button variant="outline-info" type="submit">
					Submit
				</Button>
			</Form>
		</div>
	)
}

export default Signup
