import React, { useState, useRef } from "react";

import Card from "../UI/Card";
import Button from "../UI/Button";

import classes from "./AddUser.module.css";
import ErrorModal from "../UI/ErrorModal";

const AddUser = (props) => {
	const nameInputRef = useRef();
	const ageInputRef = useRef();

	const [error, setError] = useState();

	const addUserHandler = (event) => {
		event.preventDefault();
		const enteredName = nameInputRef.current.value;
		const enteredUserAge = ageInputRef.current.value;

		if (enteredName.trim().length === 0 || enteredUserAge.trim().length === 0) {
			setError({
				title: "Invalid Input",
				message: "Please Enter A Valid NAME and AGE (non-empty values)",
			});

			return;
		}
		if (+enteredUserAge < 1) {
			setError({
				title: "Invalid Age",
				message: "Please Enter A Valid Age (>0).",
			});
			return;
		}

		props.onAddUser(enteredName, enteredUserAge);
		nameInputRef.current.value = "";
		ageInputRef.current.value = "";
	};

	const errorHandler = () => {
		setError(null);
	};

	return (
		<div>
			{error && (
				<ErrorModal
					title={error.title}
					message={error.message}
					onConfirm={errorHandler}
				/>
			)}
			<Card className={classes.input}>
				<form onSubmit={addUserHandler}>
					<label htmlFor="username">Username</label>
					<input id="username" type="text" ref={nameInputRef}></input>
					<label htmlFor="age">Age (Years)</label>
					<input id="age" type="number" ref={ageInputRef} />
					<Button type="submit">Add User</Button>
				</form>
			</Card>
		</div>
	);
};

export default AddUser;
