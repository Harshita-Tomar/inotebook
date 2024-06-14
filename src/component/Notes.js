import React, { useContext, useEffect, useRef, useState } from 'react'
import NoteContext from "../context/notes/NoteContext"
import NoteItem from './NoteItem';
import AddNote from './AddNote';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useNavigate } from "react-router-dom"

const Notes = (props) => {
	const context = useContext(NoteContext);
	let navigate = useNavigate();
	const { notes, getNote, editNote } = context;

	useEffect(() => {
		if (localStorage.getItem('token')) {
			getNote()
		} else {
			navigate('/signin');
		}
		// eslint-disable-next-line
	}, [])


	const ref = useRef(null)
	const refClose = useRef(null)

	const [note, setNote] = useState({ id: "", etitle: "", edescription: "", etag: "default" })
	const [show, setShow] = useState(false);

	const handleClose = (e) => {
		refClose.current.click();
		setShow(false);
	}
	const handleShow = () => setShow(true);

	const updateNote = (currentNote) => {
		ref.current.click();
		setNote({ id: currentNote._id, etitle: currentNote.title, edescription: currentNote.description, etag: currentNote.tag })
	}

	const handleClick = (e) => {
		console.log("updating", note)
		editNote(note.id, note.etitle, note.edescription, note.etag)
		refClose.current.click();
		props.showAlert("Updated Successfully", "Success")

	}

	const onChange = (e) => {
		setNote({ ...note, [e.target.name]: e.target.value })
	}

	return (
		<>
			<AddNote showAlert={props.showAlert} />
			<Button ref={ref} variant="outline-info d-none" onClick={handleShow} >
				Update note
			</Button>

			<Modal show={show} onHide={handleClose} aria-labelledby="contained-modal-title-vcenter" centered >
				<Modal.Header closeButton>
					<Modal.Title>Edit Note</Modal.Title>
				</Modal.Header>
				<Modal.Body>

					<Form>
						<Form.Group className="mb-3" controlId="etitle">
							<Form.Label> Title</Form.Label>
							<Form.Control type="text" name="etitle" placeholder="Enter Title" value={note.etitle} onChange={onChange} minLength={5} required />
						</Form.Group>

						<Form.Group className="mb-3" controlId="edescription">
							<Form.Label>Description</Form.Label>
							<Form.Control type="text" name="edescription" placeholder="Description" value={note.edescription} onChange={onChange} minLength={5} required />
						</Form.Group>

						<Form.Group className="mb-3" controlId="etag">
							<Form.Label>Tag</Form.Label>
							<Form.Control type="text" name="etag" placeholder="tag" value={note.etag} onChange={onChange} />
						</Form.Group>
					</Form>

				</Modal.Body>
				<Modal.Footer>
					<Button variant="outline-secondary" onClick={handleClose} ref={refClose}>
						Close
					</Button>
					<Button variant="outline-info" onClick={handleClick} >
						Update note
					</Button>
				</Modal.Footer>
			</Modal>

			<div className="row my-3 mx-1">
				<h2> Your Note</h2>
				<div className='container'>
					{notes.length === 0 && "No notes to display"}
				</div>
				{notes.map((note) => {
					return <NoteItem key={note._id} note={note} updateNote={updateNote} showAlert={props.showAlert} />
				})}
			</div>
		</>
	)
}

export default Notes
