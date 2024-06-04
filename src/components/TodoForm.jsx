/* eslint-disable react/prop-types */
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import scss from "./TodoForm.module.scss";
import {
	deleteRequestTodo,
	togglesCheckBox,
	updateRequestTodo,
} from "../store/asunkThunk/asunkThunk";
// import { Button } from "@mui/material";

const TodoForm = ({ onSubmit }) => {
	const [text, setText] = useState("");
	const [editingId, setEditingId] = useState(null);
	const [editText, setEditText] = useState("");
	const { todos } = useSelector((state) => state.todo);
	const dispatch = useDispatch();

	const submitHandler = (e) => {
		e.preventDefault();
		const newValue = {
			title: text,
			isCompleted: false,
		};
		onSubmit(newValue);
		setText("");
	};

	const editHandler = (item) => {
		setEditingId(item._id);
		setEditText(item.title);
	};

	const saveHandler = (_id) => {
		dispatch(updateRequestTodo({ _id, title: editText }));
		setEditingId(null);
		setEditText("");
	};

	const deleteHandler = (_id) => {
		dispatch(deleteRequestTodo(_id));
	};

	const toogleSearch = (_id) => {
		const toggleCheck = todos.find((item) => item._id === _id);
		if (toggleCheck) {
			dispatch(togglesCheckBox(toggleCheck));
		} else {
			console.log("Todo item not found!");
		}
	};
	return (
		<div className={scss.TodoForm}>
			<div className="container">
				<div className={scss.content}>
					<div className={scss.cardsContent}>
						<h1>Get Things Done!</h1>
						<form onSubmit={submitHandler}>
							<input
								onChange={(e) => setText(e.target.value)}
								placeholder="What is the task today?"
								type="text"
								value={text}
							/>
							<button>Add Task</button>
						</form>

						{/* Map List */}
						{todos.map((item) => (
							<div key={item._id}>
								{editingId === item._id ? (
									<>
										<input
											value={editText}
											onChange={(e) => setEditText(e.target.value)}
											type="text"
										/>
										<button onClick={() => saveHandler(item._id)}>Save</button>
									</>
								) : (
									<>
										<h1
											style={{
												textDecoration: item.isCompleted ? "line-through" : "",
											}}>
											{item.title}
										</h1>
										<button onClick={() => editHandler(item)}>Edit</button>
										<button onClick={() => deleteHandler(item._id)}>
											Delete
										</button>
										<button onClick={() => toogleSearch(item._id)}>
											{item.isCompleted ? "UnCompleted" : "Completed"}
										</button>
									</>
								)}
							</div>
						))}
					</div>
				</div>
			</div>
		</div>
	);
};

export default TodoForm;
