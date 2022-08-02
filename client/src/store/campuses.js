import axios from 'axios'
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'



//Thunks
export const getCampuses = createAsyncThunk(
  'campuses/getCampuses',
  async() => {
    try{
      const campuses = await axios.get('/api/campuses')
      return campuses.data
    } catch(e) { return Promise.reject(e) }
  }
)
export const createCampus = createAsyncThunk(
  'campuses/createCampus',
  async(obj) => {
    try{
      const newCampus = await axios.post('/api/campuses', obj);
      if(newCampus.status === 201){
        const id = newCampus.data.id
        const campus = await axios.get(`/api/campuses/${id}`)
        return campus.data
      }
    } catch (e) { return Promise.reject(e)}
  }
)
export const deleteCampus = createAsyncThunk(
  'campuses/deleteCampus',
  async(id) => {
    try {
      const campusDeleted = await axios.delete(`/api/campuses/${id}`);
      return campusDeleted.data
    } catch (e) {
      return Promise.reject(e)
    }
  }
)

// Initial State
const initialState = {
  all: [],
  error: ''
}

const campusesSlice = createSlice({
  name: 'campuses',
  initialState,
  reducers: {
    resetCampuses (state, a) {
      state.all = initialState.all
    }
  },
  extraReducers: {
    [getCampuses.fulfilled] : (state, action) => {
      state.all = action.payload
    },
    [getCampuses.rejected] : (state, action) => {
      state.error = action.error
    },
    [createCampus.fulfilled] : (state, action) => {
      console.log('triggers')
      state.all.push(action.payload)
    },
    [createCampus.rejected] : (state, action) => {
      state.error = action.error
    },
    [deleteCampus.fulfilled] : (state, action) => {
      state.all = state.all.filter(campus => {
        return campus.id !== action.payload.id
      })
    },
    [deleteCampus.rejected] : (state, action) => {
      state.error = action.error
    }
  }
})

export const { resetCampuses } = campusesSlice.actions
export default campusesSlice.reducer
