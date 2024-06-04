import { createSlice } from "@reduxjs/toolkit";
import {
	getRequestTodo,
	updateRequestTodo,
	deleteRequestTodo,
} from "../asunkThunk/asunkThunk";

const initialState = {
	todos: [],
	isLoading: false,
	error: null,
};

const todoSlice = createSlice({
	name: "todo",
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(getRequestTodo.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(getRequestTodo.fulfilled, (state, { payload }) => {
				state.todos = payload;
				state.isLoading = false;
			})
			.addCase(getRequestTodo.rejected, (state, { payload }) => {
				state.error = payload;
			})
			.addCase(updateRequestTodo.fulfilled, (state, { payload }) => {
				const index = state.todos.findIndex((todo) => todo.id === payload.id);
				if (index !== -1) {
					state.todos[index].title = payload.title;
				}
			})
			.addCase(deleteRequestTodo.fulfilled, (state, { payload }) => {
				state.todos = state.todos.filter((todo) => todo.id !== payload);
			});
	},
});

export default todoSlice.reducer;
