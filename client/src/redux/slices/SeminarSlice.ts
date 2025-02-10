import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "../store";

import axios from "axios";
import * as yup from "yup";

export type Event = {
    id: string;
    title: string;
    description: string;
    date: string; 
    time: string;
    photo: string;
    [key: string]: string; 
};

interface SeminarsState {
    seminars: Event[];
    loading: boolean;
    error: string | null;
    selectedIds: number[];
    openModal: boolean;
    updatedSeminar: Event;
    validationErrors: string[] | null;
    pagination: {
        page: number;
        rowsPerPage: number;
    };
  }
  
const initialState: SeminarsState = {
    seminars: [],
    loading: false,
    error: null,
    selectedIds: [],
    openModal: false,
    updatedSeminar: {
        id: '0',
        title: '',
        description: '',
        date: '', 
        time: '',
        photo: ''   
    },
    validationErrors:null,
    pagination: {
        page: 0,
        rowsPerPage: 5,
    },
    
  };

  export const fetchSeminars = createAsyncThunk<Event[]>(
    "seminars/fetchSeminars",
    async () => {
      const response = await axios.get("http://localhost:3001/seminars/");
      return response.data;
    }
  )

  export const deleteSeminar = createAsyncThunk(
    "seminars/deleteSeminar",
    async (ids: string[], { rejectWithValue })  => {
      try {
        await Promise.all(ids.map(id => axios.delete(`http://localhost:3001/seminars/${id}`)));
        return ids; //
      } catch (error) {
        console.error("Error with delete semminars:", error);
        return rejectWithValue("Cant delete semminars");
      }
    }
  )

  export const updateSeminar = createAsyncThunk(
    "seminars/updateSeminar",
    async (updatedSeminar: Event) => {

      const response = await axios.put(`http://localhost:3001/seminars/${updatedSeminar.id}`, updatedSeminar);
      return response.data;
    }
  );
  
  export const validateAndUpdateSeminar = createAsyncThunk<Event, void, { state: RootState }>(
    "seminars/validateAndUpdateSeminar",
    async (_, { getState, dispatch }) => {
      const state = getState() as RootState;
      const { updatedSeminar } = state.semminar;
  
      try {
        await updatedSeminarSchema.validate(updatedSeminar, { abortEarly: false });
        const response = await dispatch(updateSeminar(updatedSeminar)).unwrap();
        dispatch(validationUpdatedObjectData(null));
        return response;
      } catch (error) {
        if (error instanceof yup.ValidationError) {
          dispatch(validationUpdatedObjectData(error.errors));
          throw new Error("Validation failed");
        }
        throw error;
      }
    }
  );


  const updatedSeminarSchema = yup.object({
    title: yup.string().max(50, "Title must be no longer than 50 characters").required("Title required"),
    description: yup.string().max(100, "Description should not exceed 100 characters").required("Description required"),
    date: yup.string().matches(/^\d{2}\.\d{2}\.\d{4}$/, "The date must be in the format DD.MM.YYYY").required("Date required"),
    time: yup.string().matches(/^\d{2}:\d{2}$/, "Time must be in HH:mm format").required("Time required"),
    photo: yup.string().url("Invalid image URL. Please please insert the full address starting with http:// or https://").required("Image required"),
  });

const registrationSlice = createSlice({
    name: 'registration',
    initialState,
    reducers:{
        setSelected: (state, action: PayloadAction<number[]>) => {
          state.selectedIds = action.payload;
        },
        setPage: (state, action: PayloadAction<number>) => {
          state.pagination.page = action.payload;
        },
        setRowsPerPage: (state, action: PayloadAction<number>) => {
          state.pagination.rowsPerPage = action.payload;
          state.pagination.page = 0;
        },
        setSelectedObject:(state) =>{
          state.updatedSeminar = state.seminars[Number(state.selectedIds) - 1]
        },
        setUpdatedObject: (state, action: PayloadAction<{ key: string; value: string }>) =>{
          state.updatedSeminar[action.payload.key] = action.payload.value;
        },
        setOpenModal:(state, action: PayloadAction<boolean>) =>{
          state.validationErrors = null;
          if(state.validationErrors === null && action.payload === false){
            state.openModal = action.payload;
            state.updatedSeminar = state.seminars[Number(state.selectedIds) - 1];
          }else{
            state.openModal = action.payload;
          }
        },
        validationUpdatedObjectData: (state, action: PayloadAction<string[] | null>) =>  {
          
          state.validationErrors = action.payload;
          if (action.payload === null) {
            state.openModal = false;
            state.updatedSeminar = state.seminars[Number(state.selectedIds) - 1];
          }
        },
        
    },
    extraReducers: (builder) => {
        builder
          .addCase(fetchSeminars.pending, (state) => {
            state.loading = false;
            state.error = null;
          })
          .addCase(fetchSeminars.fulfilled, (state, action: PayloadAction<Event[]>) => {
            state.seminars = action.payload;
            state.loading = true;
          })
          .addCase(fetchSeminars.rejected, (state) => {
            state.loading = true;
            state.error = "Error loading data";
          });

          builder
          .addCase(updateSeminar.pending, (state) => {
            state.loading = false;
            state.error = null;
          })
          .addCase(updateSeminar.fulfilled, (state, action) => {
            const index = state.seminars.findIndex((seminar) => seminar.id === action.payload.id);
            if (index !== -1) {
              state.seminars[index] = action.payload;
            }
            state.loading = true;
            state.error = null;
            state.openModal = false;
            state.validationErrors = null;
          })
          .addCase(updateSeminar.rejected, (state, action) => {
            state.loading = true;
            state.error = action.error.message || "Validation or update failed";
          });

         builder
          .addCase(deleteSeminar.fulfilled, (state, action) => {
            state.seminars = state.seminars.filter(seminar => !action.payload.includes(seminar.id));
          })
          .addCase(deleteSeminar.rejected, (state, action) => {
            state.error = action.payload as string;
          });
      },
});
export const selectEvent =  (state: RootState) => state.semminar;

export const {setPage, setRowsPerPage, setSelected, setSelectedObject, setUpdatedObject,validationUpdatedObjectData, setOpenModal} = registrationSlice.actions;
export default registrationSlice.reducer;



