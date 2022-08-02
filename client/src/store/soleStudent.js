import axios from 'axios';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

export const getStudent = createAsyncThunk(
  'student/getStudent',
  async (id) => {
    try {
      const student = await axios.get(`/api/students/${id}`)
      return student.data
    } catch (e) { return Promise.reject(e) }
  }
)

const initialState = {
  sole: {},
  error: ''
}

const soleStudentSlice = createSlice({
  name: 'student',
  initialState,
  reducers: {
    resetStudent (state, action) {
      state.sole = initialState.sole
    }
  },
  extraReducers: {
    [getStudent.fulfilled] : (state, action) => {
      state.sole = action.payload
    },
    [getStudent.rejected] : (state, action) => {
      state.error = action.error
    }
  }
})

export const { resetStudent } = soleStudentSlice.actions
export default soleStudentSlice.reducer
