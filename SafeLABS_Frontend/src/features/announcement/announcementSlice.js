
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../config/axiosConfig'; 

const initialState = {
  announcements: [],
  status: 'idle',
  error: null,
};

export const fetchAnnouncements = createAsyncThunk(
  'announcement/fetchAnnouncements',
  async () => {
    try {
      const response = await axiosInstance.post('/api/AnnouncementDetails/getAnnouncement', {});
      console.log('Announcements fetched successfully. Response:', response);
      return response.data;
    } catch (error) {
      console.error('Fetching announcements failed. Error:', error);
      throw error;
    }
  }
);

export const insertNewAnnouncement = createAsyncThunk(
  'announcement/insertNewAnnouncement',
  async (newAnnouncementData, { rejectWithValue, dispatch }) => {
    try {
      const payload = {
        description: newAnnouncementData.description.trim(),
        isToAll: newAnnouncementData.isToAll,
        insertBy: newAnnouncementData.insertBy
      };
      
      const response = await axiosInstance.post('/api/AnnouncementDetails/insertAnnouncement', payload);
      console.log('Announcement inserted successfully. Response:', response);
      
      // Fetch updated announcements after successful insertion
      dispatch(fetchAnnouncements());
      
      return response.data;
    } catch (error) {
      console.error('Announcement submission failed:', error);
      return rejectWithValue(error.response?.data || 'Failed to insert announcement');
    }
  }
);

const announcementSlice = createSlice({
  name: 'announcement',
  initialState,
  reducers: {
    setAnnouncements: (state, action) => {
      state.announcements = action.payload; 
    },
    addAnnouncement: (state, action) => {
      state.announcements.unshift(action.payload);
    },
    removeAnnouncement: (state, action) => {
      state.announcements = state.announcements.filter(
        (announcement) => announcement.Id !== action.payload
      );
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAnnouncements.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchAnnouncements.fulfilled, (state, action) => {
        state.status = 'succeeded';
        // Sort announcements by insertDate in descending order
        state.announcements = action.payload.sort((a, b) => 
          new Date(b.insertDate) - new Date(a.insertDate)
        );
      })
      .addCase(fetchAnnouncements.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(insertNewAnnouncement.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(insertNewAnnouncement.fulfilled, (state) => {
        state.status = 'succeeded';
      })
      .addCase(insertNewAnnouncement.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload || action.error.message;
      });
  },
});

export const { setAnnouncements, addAnnouncement, removeAnnouncement } = announcementSlice.actions;

export const selectAnnouncements = (state) => state.announcement.announcements;
export const selectAnnouncementStatus = (state) => state.announcement.status;
export const selectAnnouncementError = (state) => state.announcement.error;

export default announcementSlice.reducer;