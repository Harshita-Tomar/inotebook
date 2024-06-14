import React, { useContext, useState } from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import NoteContext from "../context/notes/NoteContext"

const AddNote = (props) => {
	const context = useContext(NoteContext);
	const { addNote } = context;

	const [note, setNote] = useState({ title: "", description: "", tag: "" })

	const handleClick = (e) => {
		e.preventDefault();
		addNote(note.title, note.description, note.tag);
		setNote({ title: "", description: "", tag: "" })
		props.showAlert("Added Note Successfully", "Success")

	}

	const onChange = (e) => {
		setNote({ ...note, [e.target.name]: e.target.value })
	}

	return (
		<div>
			<div className="container my-3">
				<h2>Add a Note</h2>
				<Form>
					<Form.Group className="mb-3" controlId="title">
						<Form.Label> Title</Form.Label>
						<Form.Control type="text" name="title" placeholder="Enter Title" value={note.title} onChange={onChange} minLength={5} required />
					</Form.Group>

					<Form.Group className="mb-3" controlId="description">
						<Form.Label>Description</Form.Label>
						<Form.Control type="text" name="description" placeholder="Description" value={note.description} onChange={onChange} minLength={5} required />
					</Form.Group>

					<Form.Group className="mb-3" controlId="tag">
						<Form.Label>Tag</Form.Label>
						<Form.Control type="text" name="tag" placeholder="tag" value={note.tag} onChange={onChange} />
					</Form.Group>

					<Button variant="outline-info" type="submit" onClick={handleClick} disabled={note.title.length < 5 || note.description.length < 5}>
						Add note
					</Button>
				</Form>
			</div>
		</div>
	)
}

export default AddNote
