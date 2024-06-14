import React, { useEffect } from 'react'
import { Link, useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom"

const Navbar = () => {
	let navigate = useNavigate();
	const handleLogout = () => {
		localStorage.removeItem('token')
		navigate('/signin')
	}
	let location = useLocation();
	useEffect(() => {
		console.log(location.pathname);
	}, [location]);

	return (
		<>
			<nav className="navbar navbar-expand-lg " style={{ backgroundColor: "#062f318c", fontFamily: "'Chakra Petch', sans-serif" }}>
				<div className="container-fluid">
					<Link className="navbar-brand fw-bold fs-2 ms-lg-4" to="/" style={{ color: "#01B691" }}>iNotebook</Link>
					<button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
						<span className="navbar-toggler-icon"></span>
					</button>
					<div className="collapse navbar-collapse" id="navbarSupportedContent">
						<ul className="navbar-nav ms-auto mb-2 mb-lg-0 justify-content-end me-lg-5">
							<li className="nav-item">
								<Link className={`fs-5 nav-link ${location.pathname === "/" ? "active" : ""}`} aria-current="page" to="/">Home</Link>
							</li>
							<li className="nav-item">
								<Link className={`fs-5 nav-link ${location.pathname === "/about" ? "active" : ""}`} to="/about">About</Link>
							</li>
						</ul>
						{!localStorage.getItem('token') ? <form className="d-flex" role="search">
							<Link to="/signin" className="btn btn-outline-info me-3" type="submit">Sign in</Link>
						</form> : <button className="btn btn-outline-info" type="submit" onClick={handleLogout}>Logout</button>}
					</div>
				</div>
			</nav>
		</>
	)
}

export default Navbar
