
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../config/axiosConfig';

const initialState = {
  employeeRecords: [],
  employees: [],
  roles: [],
  status: 'idle',
  error: null,
  selectedRecord: null,
  isModalOpen: false,
  isUpdateModalOpen: false,
  isNewRecordOpen: false,

  filters: {
    searchBy: 'Id',
    status: 'all',
    id: '',
    employeeId: '',
    firstName: '',
    lastName: '',
    department: '',
    contractType: '',
    unit: '',
    role: '',
  },
  currentPage: 1,
  itemsPerPage: 10,
};

export const fetchEmployeeRecords = createAsyncThunk(
  'database/fetchEmployeeRecords',
  async () => {
    try {
      const response = await axiosInstance.post('/api/UserDetails/getAllUsers', {});
      console.log('Request successful. Response:', response);
      return response.data;
    } catch (error) {
      console.error('Request failed. Error:', error);
      throw error;
    }
  }
);


export const fetchAllRoles = createAsyncThunk(
  'database/fetchAllRoles',
  async () => {
    try {
      const response = await axiosInstance.post('/api/RoleDetails/getAllRoles', {});
      console.log('Request successful. Response:', response);
      return response.data;
    } catch (error) {
      console.error('Request failed. Error:', error);
      throw error;
    }
  }
);

export const fetchAllEmployees = createAsyncThunk(
  'database/fetchAllEmployees',
  async () => {
    try {
      const response = await axiosInstance.post('/api/UserDetails/getAllUsers', {});
      console.log('Request successful. Response:', response);
      return response.data;
    } catch (error) {
      console.error('Request failed. Error:', error);
      throw error;
    }
  }
);

export const insertNewEmployee = createAsyncThunk(
  'database/insertNewEmployee',
  async (NewEmployeeData, { rejectWithValue }) => {
    try {
     
      const payload = {
        ...NewEmployeeData,

      };
      
      const response = await axiosInstance.post('/api/UserDetails/insertNewUser', payload);
      return response.data;
    } catch (error) {
      console.error('Employee insertion failed:', error);
      return rejectWithValue(error.response.data);
    }
  }
);

export const updateEmployee = createAsyncThunk(
  'database/updateEmployee',
  async (UpdateEmployeeData, { rejectWithValue }) => {
    try {
     
      const payload = {
        ...UpdateEmployeeData,

      };
      
      const response = await axiosInstance.put('/api/UserDetails/updateUser', payload);
      console.log('Update successfull', response.data);
      return response.data;
    } catch (error) {
      console.error('Employee update failed:', error);
      return rejectWithValue(error.response.data);
    }
  }
);

const databaseSlice = createSlice({
  name: 'database',
  initialState,
  reducers: {
    setSelectedRecord: (state, action) => {
      state.selectedRecord = action.payload;
    },
    setIsModalOpen: (state, action) => {
      state.isModalOpen = action.payload;
    },
    setIsUpdateModalOpen: (state, action) => {
      state.isUpdateModalOpen = action.payload;
    },
    setIsNewRecordOpen: (state, action) => {
      state.isNewRecordOpen = action.payload;
    },
    
    setFilters: (state, action) => {
      state.filters = { ...state.filters, ...action.payload };
    },
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    },
    setItemsPerPage: (state, action) => {
      state.itemsPerPage = action.payload;
    },
    setEmployeeRecords: (state, action) => {
      state.employeeRecords = action.payload;
    },
    addEmployeeRecord: (state, action) => {
      state.employeeRecords.push(action.payload);
    },
    selectEmployeeRecords: (state) => state.database,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchEmployeeRecords.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchEmployeeRecords.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.employeeRecords = action.payload;
      })
      .addCase(fetchAllRoles.fulfilled, (state, action) => { 
        state.status = 'succeeded';
        state.roles = action.payload;
      })
      .addCase(fetchAllEmployees.fulfilled, (state, action) => { 
        state.status = 'succeeded';
        state.employees = action.payload;
      })
      
      .addCase(fetchEmployeeRecords.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export const {
  setSelectedRecord,
  setIsModalOpen,
  setIsUpdateModalOpen,
  setIsNewRecordOpen,
  setFilters,
  setCurrentPage,
  setItemsPerPage,
  setEmployeeRecords,
  addEmployeeRecord,
} = databaseSlice.actions;

export const selectEmployeeRecords = (state) => state.database.employeeRecords;
export const selectSelectedRecord = (state) => state.database.selectedRecord;
export const selectIsModalOpen = (state) => state.database.isModalOpen;
export const selectIsUpdateModalOpen = (state) => state.database.isUpdateModalOpen;
export const selectIsNewRecordOpen = (state) => state.database.isNewRecordOpen;

export default databaseSlice.reducer;
