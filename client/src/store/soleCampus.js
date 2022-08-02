import axios from 'axios';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

export const getCampus = createAsyncThunk(
  'campus/getCampus',
  async (id) => {
    try {
      const campus = await axios.get(`/api/campuses/${id}`)
      return campus.data
    } catch (e) { return Promise.reject(e)}
  }
)

const initialState = {
  sole: {},
  error: ''
}

const soleCampusSlice = createSlice({
  name: 'campus',
  initialState,
  reducers: {
    resetCampus (state, action) {
      state.sole = initialState.sole
    }
  },
  extraReducers: {
    [getCampus.fulfilled] : (state, action) => {
      state.sole = action.payload
    },
    [getCampus.rejected] : (state, action) => {
      state.error = action.error
    }
  }
})

export const { resetCampus } = soleCampusSlice.actions
export default soleCampusSlice.reducer
