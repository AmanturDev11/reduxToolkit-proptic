import { createAsyncThunk } from "@reduxjs/toolkit";
import { BASE_URL } from "../../utils/constants";

// const url = import.meta.env.VITE_BACKEND_URL;


export const getRequestTodo = createAsyncThunk(
	"todo/getRequestTodo",
	async (_, { rejectWithValue }) => {
		try {
			const response = await fetch(BASE_URL);
			const data = await response.json();

			return data;
		} catch (error) {
			return rejectWithValue(error);
		}
	}
);

export const postRequestTodo = createAsyncThunk(
	"todo/postRequestTodo",
	async (data, { rejectWithValue, dispatch }) => {
		try {
			await fetch(BASE_URL, {
				method: "POST",
				headers: {
					"Content-type": "application/json",
				},
				body: JSON.stringify(data),
			});
			dispatch(getRequestTodo());
		} catch (error) {
			return rejectWithValue(error);
		}
	}
);

export const updateRequestTodo = createAsyncThunk(
	"todo/updateRequestTodo",
	async ({ _id, title }, { rejectWithValue, dispatch }) => {
		try {
			await fetch(`${BASE_URL}/${_id}`, {
				method: "PUT",
				headers: {
					"Content-type": "application/json",
				},
				body: JSON.stringify({ title }),
			});
			dispatch(getRequestTodo());
		} catch (error) {
			return rejectWithValue(error);
		}
	}
);

export const deleteRequestTodo = createAsyncThunk(
	"todo/deleteRequestTodo",
	async (_id, { rejectWithValue, dispatch }) => {
		try {
			await fetch(`${BASE_URL}/${_id}`, {
				method: "DELETE",
			});
			dispatch(getRequestTodo());
		} catch (error) {
			return rejectWithValue("Error deleting todo item.");
		}
	}
);

export const togglesCheckBox = createAsyncThunk(
	"todo/togglesCheckBox",
	async (data, { rejectWithValue, dispatch }) => {
		try {
			const response = await fetch(`${BASE_URL}/${data._id}`, {
				method: "PATCH",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ isCompleted: !data.isCompleted }),
			});

			if (!response.ok) {
				throw new Error("Network response was not ok");
			}

			const result = await response.json();
			console.log("Toggle response:", result);

			dispatch(getRequestTodo());
			return result;
		} catch (error) {
			console.error("Error toggling checkbox:", error);
			return rejectWithValue(error.message);
		}
	}
);

// import { createAsyncThunk } from "@reduxjs/toolkit";
// import { BASE_URL } from "../../utils/constants";

// export const getRequestTodo = createAsyncThunk(
// 	"todo/getRequestTodo",
// 	async (_, { rejectWithValue }) => {
// 		try {
// 			const response = await fetch(BASE_URL);
// 			const data = await response.json();
// 			return data;
// 		} catch (error) {
// 			return rejectWithValue(error.message);
// 		}
// 	}
// );

// export const postRequestTodo = createAsyncThunk(
// 	"todo/postRequestTodo",
// 	async (data, { rejectWithValue, dispatch }) => {
// 		try {
// 			await fetch(BASE_URL, {
// 				method: "POST",
// 				headers: {
// 					"Content-type": "application/json",
// 				},
// 				body: JSON.stringify(data),
// 			});
// 			dispatch(getRequestTodo());
// 		} catch (error) {
// 			return rejectWithValue(error.message);
// 		}
// 	}
// );

// export const updateRequestTodo = createAsyncThunk(
// 	"todo/updateRequestTodo",
// 	async ({ _id, title }, { rejectWithValue, dispatch }) => {
// 		try {
// 			await fetch(`${BASE_URL}/${_id}`, {
// 				method: "PUT",
// 				headers: {
// 					"Content-type": "application/json",
// 				},
// 				body: JSON.stringify({ title }),
// 			});
// 			dispatch(getRequestTodo());
// 		} catch (error) {
// 			return rejectWithValue(error.message);
// 		}
// 	}
// );

// export const deleteRequestTodo = createAsyncThunk(
// 	"todo/deleteRequestTodo",
// 	async (_id, { rejectWithValue, dispatch }) => {
// 		try {
// 			await fetch(`${BASE_URL}/${_id}`, {
// 				method: "DELETE",
// 			});
// 			dispatch(getRequestTodo());
// 		} catch (error) {
// 			return rejectWithValue(error.message);
// 		}
// 	}
// );

// export const togglesCheckBox = createAsyncThunk(
// 	"todo/togglesCheckBox",
// 	async (data, { rejectWithValue, dispatch }) => {
// 		try {
// 			await fetch(`${BASE_URL}/${data._id}`, {
// 				method: "PATCH",
// 				headers: {
// 					"Content-Type": "application/json",
// 				},
// 				body: JSON.stringify({ ...data, isCompleted: !data.isCompleted }),
// 			});
// 			dispatch(getRequestTodo());
// 		} catch (error) {
// 			return rejectWithValue(error.message);
// 		}
// 	}
// );
