import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../config/axiosConfig";

// Async thunk to fetch occupancy data
export const fetchOccupancy = createAsyncThunk(
  "occupancy/fetchOccupancy",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post("/api/AttendanceDetails/getOccupancy", {});
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Failed to fetch data");
    }
  }
);

const occupancySlice = createSlice({
  name: "occupancy",
  initialState: {
    data: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchOccupancy.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchOccupancy.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchOccupancy.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default occupancySlice.reducer;
