import React from 'react'
import Notes from './Notes';
//import { useState } from 'react';

export const Dashboard = (props) => {
	const { showAlert } = props
	return (
		<div >
			<Notes showAlert={showAlert} />
		</div>
	)
}