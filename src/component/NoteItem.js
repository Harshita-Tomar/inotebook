import React, { useContext } from 'react'
//import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import NoteContext from "../context/notes/NoteContext"

const NoteItem = (props) => {
	const context = useContext(NoteContext);
	const { deleteNote } = context;

	const { note, updateNote } = props;
	return (
		<>

			<div className="col-lg-3 d-flex">
				<Card className='my-3'>
					{/*<Card.Img variant="top" src="holder.js/100px180" />*/}
					<Card.Body style={{ width: '18rem' }}>

						<Card.Title>{note.title}</Card.Title>
						<Card.Text>
							{note.description}

						</Card.Text>
						<i className="fa-regular fa-trash-can" onClick={() => {
							deleteNote(note._id); props.showAlert("Deleted Successfully", "Success")
						}}></i>
						<i className="fa-regular fa-pen-to-square ms-3" onClick={() => { updateNote(note); }}></i>
						{/*<Button variant="primary">Go somewhere</Button>*/}
					</Card.Body>
				</Card>
			</div>
		</>
	)
}

export default NoteItem
