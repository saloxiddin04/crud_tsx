import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {travel} from "../../interfaces/user";
import axios from "axios";

interface UserState {
    travels: travel[] | null,
    travel: {} | null
    loading: boolean,
    errors: any
}

const initialState: UserState = {
    travels: [],
    travel: {},
    loading: false,
    errors: null
}

export const getUsers = createAsyncThunk<travel[]>(
    "travels/get",
    async (_, thunkAPI) => {
        try {
            const response = await axios.get("https://mern-app-travel-crud.herokuapp.com/api/travel")
            return response.data.travels
        } catch (error) {
            thunkAPI.rejectWithValue(error)
        }
    }
)

export const deleteTravel = createAsyncThunk(
    "travels/delete",
    async (id: string, thunkAPI) => {
        try {
            const res = await axios.delete(`https://mern-app-travel-crud.herokuapp.com/api/travel/${id}`)
            thunkAPI.dispatch(getUsers())
            return res.data.travels
        } catch (e) {
            thunkAPI.rejectWithValue(e)
        }
    }
)

export const addTravel = createAsyncThunk(
    "travels/add",
    async (item: object, thunkAPI) => {
        try {
            const res = await axios.post("https://mern-app-travel-crud.herokuapp.com/api/travel/add", item)
            thunkAPI.dispatch(getUsers())
            return res.data.travels
        } catch (e) {
            thunkAPI.rejectWithValue(e)
        }
    }
)

export const getSingleTravel = createAsyncThunk(
    "travel/getSingle",
    async (id: any, thunkAPI) => {
        try {
            const res = await axios.get(`https://mern-app-travel-crud.herokuapp.com/api/travel/${id}`)
            return res.data.travel
        } catch (e) {
            thunkAPI.rejectWithValue(e)
        }
    }
)

export const updateTravel = createAsyncThunk(
    "travel/update",
    async (item:travel, thunkAPI) => {
        try {
            const res = await axios.put(`https://mern-app-travel-crud.herokuapp.com/api/travel/${item._id}`, item)
            thunkAPI.dispatch(getUsers())
            return res.data.travel
        } catch (e) {
            console.log(e)
        }
    }
)


export const travelSlice = createSlice({
    name: 'travels',
    initialState,
    reducers: {
        setUsers: (state, action: PayloadAction<travel[]>) => {
            state.travels = action.payload
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getUsers.pending, (state) => {
            state.loading = true
        })
        builder.addCase(getUsers.fulfilled, (state, {payload}: PayloadAction<travel[]>) => {
            state.travels = payload
            state.loading = false
        })
        builder.addCase(getUsers.rejected, (state, action) => {
            state.loading = false
            state.errors = action.payload
        })
        builder.addCase(deleteTravel.pending, (state) => {
            state.loading = true
        })
        builder.addCase(deleteTravel.fulfilled, (state, {payload}: PayloadAction<travel[]>) => {
            state.travels = payload
            state.loading = false
        })
        builder.addCase(addTravel.pending, (state) => {
            state.loading = true
        })
        builder.addCase(addTravel.fulfilled, (state, {payload}) => {
            state.loading = false
        })
        builder.addCase(getSingleTravel.pending, (state, _) => {
            state.loading = true
        })
        builder.addCase(getSingleTravel.fulfilled, (state, {payload}) => {
            state.travel = payload
            state.loading = false
        })
        builder.addCase(updateTravel.pending, (state, _) => {
            state.loading = true
        })
        builder.addCase(updateTravel.fulfilled, (state, {payload}) => {
            state.travels = payload
            state.loading = false
        })
    }
})

export default travelSlice.reducer
// export const {setUsers} = travelSlice.actions
