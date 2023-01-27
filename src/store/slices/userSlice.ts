import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {travel} from "../../interfaces/user";
import axios from "axios";

interface UserState {
    travels: travel[] | null,
    travel: travel | null
    loading: boolean,
    errors: any
}

const initialState: UserState = {
    travels: [],
    travel: null,
    loading: false,
    errors: null
}

export const getUsers = createAsyncThunk<travel[]>(
    "travels/get",
    async (_, thunkAPI) => {
        try {
            const response = await axios.get("https://travels-7b04.onrender.com/api/travel")
            return response.data.travels
        } catch (error) {
            thunkAPI.rejectWithValue(error)
        }
    }
)

export const deleteTravel = createAsyncThunk<string, string>(
    "travels/delete",
    async (id: string, thunkAPI) => {
        try {
            const res = await axios.delete(`https://travels-7b04.onrender.com/api/travel/${id}`)
            thunkAPI.dispatch(getUsers())
            return res.data.travels
        } catch (e) {
            thunkAPI.rejectWithValue(e)
        }
    }
)

export const addTravel = createAsyncThunk<travel, Object>(
    "travels/add",
    async (item: object, thunkAPI) => {
        try {
            const res = await axios.post("https://travels-7b04.onrender.com/api/travel/add", item)
            thunkAPI.dispatch(getUsers())
            return res.data.travels
        } catch (e) {
            thunkAPI.rejectWithValue(e)
        }
    }
)

export const getSingleTravel = createAsyncThunk<travel, string>(
    "travel/getSingle",
    async (id, thunkAPI) => {
        try {
            const res = await axios.get(`https://travels-7b04.onrender.com/api/travel/${id}`)
            return res.data.travel
        } catch (e) {
            thunkAPI.rejectWithValue(e)
        }
    }
)

export const updateTravel = createAsyncThunk<travel, Object | any>(
    "travel/update",
    async (item, thunkAPI) => {
        try {
            const res = await axios.put(`https://travels-7b04.onrender.com/api/travel/${item._id}`, item)
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
        builder.addCase(addTravel.pending, (state) => {
            state.loading = true
        })
        builder.addCase(addTravel.fulfilled, (state, _) => {
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
            state.travel = payload
            state.loading = false
        })
    }
})

export default travelSlice.reducer
// export const {setUsers} = travelSlice.actions
