const express = require('express');
const router = express.Router();
const Notes = require('../models/Notes');
const fetchuser = require('../middleware/fetchuser');
const { body, validationResult } = require('express-validator');


//ROUTE 1: get all the notes using: GET "/api/notes/fetchallnotes" no login required
router.get('/fetchallnotes', fetchuser, async (req, res) => {
	try {
		const notes = await Notes.find({ user: req.user.id })
		res.json(notes)
	} catch (error) {
		console.error(error.message);
		res.status(500).send("Internal server error");
	}
})

//ROUTE 2: add new notes using: POST "/api/notes/addnote" no login required
router.post('/addnotes', fetchuser, [

	body('title', 'Enter a valid title').isLength({ min: 3 }),
	body('description', 'description must be atleast 5 characters').isLength({ min: 5 }),

], async (req, res) => {
	try {
		const { title, description, tag } = req.body;
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.send({ errors: errors.array() });
		}
		const notes = new Notes({
			title, description, tag, user: req.user.id
		})
		const savedNote = await notes.save()
		//const notes = await Notes.find({ user: req.user.id })
		res.json(savedNote)
	} catch (error) {
		console.error(error.message);
		res.status(500).send("Internal server error");
	}
})

// ROUTE 3: Update an existing Note using: PUT "/api/notes/updatenote". Login required
router.put('/updatenote/:id', fetchuser, async (req, res) => {
	const { title, description, tag } = req.body;
	try {
		// Create a newNote object
		const newNote = {};
		if (title) { newNote.title = title };
		if (description) { newNote.description = description };
		if (tag) { newNote.tag = tag };

		// Find the note to be updated and update it
		let notes = await Notes.findById(req.params.id);
		if (!notes) { return res.status(404).send("Not Found") }

		if (notes.user.toString() !== req.user.id) {
			return res.status(401).send("Not Allowed");
		}
		notes = await Notes.findByIdAndUpdate(req.params.id, { $set: newNote }, { new: true })
		res.json({ notes });
	} catch (error) {
		console.error(error.message);
		res.status(500).send("Internal Server Error");
	}
})

// ROUTE 4: Delete an existing Note using: DELETE "/api/notes/deletenote". Login required
router.delete('/deletenote/:id', fetchuser, async (req, res) => {
	try {
		// Find the note to be delete and delete it
		let notes = await Notes.findById(req.params.id);
		if (!notes) { return res.status(404).send("Not Found") }

		// Allow deletion only if user owns this Note
		if (notes.user.toString() !== req.user.id) {
			return res.status(401).send("Not Allowed");
		}

		notes = await Notes.findByIdAndDelete(req.params.id)
		res.json({ "Success": "Note has been deleted", notes: notes });
	} catch (error) {
		console.error(error.message);
		res.status(500).send("Internal Server Error");
	}
})

module.exports = router