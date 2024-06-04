import { useDispatch } from "react-redux";
import TodoForm from "./TodoForm";
import { postRequestTodo } from "../store/asunkThunk/asunkThunk";

const Wrapper = () => {
	const dispatch = useDispatch();

	const addValueHandler = (data) => {
		dispatch(postRequestTodo(data));
	};

	return (
		<div>
			<TodoForm onSubmit={addValueHandler} />
		</div>
	);
};

export default Wrapper;
