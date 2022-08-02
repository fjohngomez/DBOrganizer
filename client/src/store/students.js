import axios from 'axios'
import { createSlice, createAsyncThunk} from '@reduxjs/toolkit'

//thunks
export const getStudents = createAsyncThunk(
  'students/getStudents',
  async() => {
    try {
      const students = await axios.get('/api/students')
      return students.data
    } catch(e) { return Promise.reject(e) }
  }
)

export const createStudent = createAsyncThunk(
  'students/createStudent',
  async(obj) => {
    try {
      const newStudent = await axios.post('/api/students', obj);
      if(newStudent.status === 201){
        const id = newStudent.data.id
        const student = await axios.get(`/api/students/${id}`)
        return student.data
      }
    } catch (e) {
      return Promise.reject(e)
    }
  }
)

export const deleteStudent = createAsyncThunk(
  'students/deleteStudent',
  async(id) => {
    try {
      const studentDeleted = await axios.delete(`/api/students/${id}`);
      return studentDeleted.data
    } catch (e) {
      return Promise.reject(e)
    }
  }
)


//initialState
const initialState = {
  all: [],
  error: ''
}

const studentsSlice = createSlice({
  name: 'students',
  initialState,
  reducers : {
    resetStudents (state, a) {
      state.all = initialState.all
    }
  },
  extraReducers: {
    [getStudents.fulfilled] : (state, action) => {
      state.all = action.payload
    },
    [getStudents.rejected] : (state, action) => {
      state.error = action.error
    },
    [createStudent.fulfilled] : (state, action) => {
      state.all.push(action.payload)
    },
    [createStudent.rejected] : (state, action) => {
      state.error = action.error
    },
    [deleteStudent.fulfilled] : (state, action) => {
      state.all = state.all.filter(student => {
        return student.id !== action.payload.id
      })
    },
    [deleteStudent.rejected] : (state, action) => {
      state.error = action.error
    }
  }
})

export const { resetStudents } = studentsSlice.actions
export default studentsSlice.reducer
