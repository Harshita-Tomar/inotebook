import React from 'react'
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useNavigate } from "react-router-dom"
import { Link } from "react-router-dom";

const Signin = (props) => {

	const [credentials, setCredentials] = useState({ email: "", password: "" })
	let navigate = useNavigate();

	const handleSubmit = async (e) => {
		e.preventDefault();
		const response = await fetch("http://localhost:5000/api/auth/login", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ email: credentials.email, password: credentials.password }),
		});
		const json = await response.json();
		console.log(json)

		if (json.success) {
			localStorage.setItem('token', json.authtoken);
			navigate('/');
			props.showAlert("Logged in Succssfully", "success")
		} else {
			props.showAlert("invalid Details", "danger")
		}
	}
	const onChange = (e) => {
		setCredentials({ ...credentials, [e.target.name]: e.target.value })
	}

	return (
		<div>
			<h1 className='text-center mt-4'>Sign In</h1>
			<Form onSubmit={handleSubmit}>
				<Form.Group className="mb-3" controlId="email">
					<Form.Label>Email address</Form.Label>
					<Form.Control type="email" name="email" onChange={onChange} value={credentials.email} />
				</Form.Group>

				<Form.Group className="mb-3" controlId="password">
					<Form.Label>Password</Form.Label>
					<Form.Control type="password" name="password" onChange={onChange} value={credentials.password} />
				</Form.Group>

				<Button variant="outline-info" type="submit" >
					Submit
				</Button>
			</Form>
			New to iNotebook? Create your account<Link to="/signup" className="btn btn-outline-info me-3 ms-3" type="submit">Sign up</Link>
		</div>
	)
}

export default Signin
