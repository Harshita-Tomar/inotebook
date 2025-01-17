import React, { useState } from "react";
import NoteContext from "./NoteContext";

const NoteState = (props) => {
	const host = "http://localhost:5000"
	const notesInitial = []

	const [notes, setNotes] = useState(notesInitial)

	//get a note
	const getNote = async () => {
		//api call
		const response = await fetch(`${host}/api/notes/fetchallnotes`, {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
				"auth-token": localStorage.getItem('token'),
			}
		});
		const json = await response.json();
		setNotes(json)
	}


	//Add a note
	const addNote = async (title, description, tag) => {
		//api call
		const response = await fetch(`${host}/api/notes/addnotes`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				"auth-token": localStorage.getItem('token'),
			},
			body: JSON.stringify({ title, description, tag }),
		});
		const note = await response.json();
		setNotes(notes.concat(note))
	}

	//edit note
	const editNote = async (id, title, description, tag) => {
		//api call
		const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
				"auth-token": localStorage.getItem('token'),
			},
			body: JSON.stringify({ title, description, tag }),
		});
		const json = response.json();
		console.log(json)

		let newNotes = JSON.parse(JSON.stringify(notes))
		//logic to edit note in frontend
		for (let index = 0; index < newNotes.length; index++) {
			const element = newNotes[index];
			if (element._id === id) {
				newNotes[index].title = title;
				newNotes[index].description = description;
				newNotes[index].tag = tag;
				break;
			}
		}
		setNotes(newNotes);
	}

	//Delete note
	const deleteNote = async (id) => {
		const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
			method: "DELETE",
			headers: {
				"Content-Type": "application/json",
				"auth-token": localStorage.getItem('token'),
			}
		});
		const json = response.json();
		console.log(json)
		const newNotes = notes.filter((note) => { return note._id !== id })
		setNotes(newNotes)

	}

	return (
		<NoteContext.Provider value={{ notes, addNote, editNote, deleteNote, getNote }}>
			{props.children}
		</NoteContext.Provider>
	)
}

export default NoteState;