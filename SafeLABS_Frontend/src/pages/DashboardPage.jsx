
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchOccupancy } from "../features/attendance/occupancySlice";
import { 
  fetchAnnouncements, 
  insertNewAnnouncement, 
  selectAnnouncements, 
  selectAnnouncementStatus, 
  selectAnnouncementError 
} from "../features/announcement/announcementSlice";
import { selectUserId, selectRole } from '../features/auth/authSlice';
import '../features/dashboard/Dashboard.css'

const Dashboard = () => {
  const dispatch = useDispatch();
  const { data, loading, error } = useSelector((state) => state.occupancy);
  const announcements = useSelector(selectAnnouncements);
  const announcementStatus = useSelector(selectAnnouncementStatus);
  const announcementError = useSelector(selectAnnouncementError);
  const isCollapsed = useSelector((state) => state.sidebar.isCollapsed);
  const userId = useSelector(selectUserId);
  const role = useSelector(selectRole);
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newAnnouncement, setNewAnnouncement] = useState({
    description: '',
    isToAll: 1,
    insertBy: userId
  });
  const [dateFilter, setDateFilter] = useState('today'); // Default filter is 'today'

  useEffect(() => {
    dispatch(fetchOccupancy());
    dispatch(fetchAnnouncements());
  }, [dispatch]);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setNewAnnouncement({
      description: '',
      isToAll: 1,
      insertBy: userId
    });
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setNewAnnouncement(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (checked ? 1 : 0) : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (newAnnouncement.description.trim()) {
      await dispatch(insertNewAnnouncement(newAnnouncement));
      handleCloseModal();
    }
  };

  const handleDateFilterChange = (e) => {
    setDateFilter(e.target.value);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString();
  };

  // Function to filter announcements based on date
  const getFilteredAnnouncements = () => {
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const yesterday = new Date(now.getFullYear(), now.getMonth(), now.getDate() - 1);
    const thisMonthStart = new Date(now.getFullYear(), now.getMonth(), 1);
    const lastMonthStart = new Date(now.getFullYear(), now.getMonth() - 1, 1);
    const lastMonthEnd = new Date(now.getFullYear(), now.getMonth(), 0);

    // First filter by role: show all announcements where isToAll=1 OR user is Admin/Lab Assistant
    const roleFilteredAnnouncements = announcements.filter(announcement => 
      announcement.isToAll === 1 || role === "Admin" || role === "Lab Assistant"
    );

    // Then filter by date
    return roleFilteredAnnouncements.filter(announcement => {
      const announcementDate = new Date(announcement.insertDate);
      
      switch (dateFilter) {
        case 'today':
          return announcementDate >= today;
        case 'yesterday':
          return announcementDate >= yesterday && announcementDate < today;
        case 'thisMonth':
          return announcementDate >= thisMonthStart;
        case 'lastMonth':
          return announcementDate >= lastMonthStart && announcementDate <= lastMonthEnd;
        default:
          return true;
      }
    });
  };

  // Get filtered announcements based on role and date
  const filteredAnnouncements = getFilteredAnnouncements();

  return (
    <div className={`transition-all duration-300 ${isCollapsed ? "ml-20" : "ml-64"}`}>
      <div className="safelabs-dashboard-page">
        <h1 className="safelabs-dashboard-header">SafeLABS</h1>
        <div className="safelabs-dashboard-container">
          
          {/* Occupancy Section */}
          <div className="safelabs-dashboard-section">
            <h2 className="safelabs-section-header">Currently Present in Lab</h2>
            {loading && <div className="safelabs-loading-state">Loading...</div>}
            {error && <p className="safelabs-error-message">Error: {error}</p>}
            {!loading && !error && data.length > 0 ? (
              <table className="safelabs-data-table">
                <thead>
                  <tr>
                    <th>User ID</th>
                    <th>Name</th>
                    <th>Role</th>
                    <th>Check-In Time</th>
                  </tr>
                </thead>
                <tbody>
                  {data.map((person) => (
                    <tr key={person.Id}>
                      <td>{person.userId}</td>
                      <td>{person.firstName} {person.lastName}</td>
                      <td>{person.role}</td>
                      <td>{person.checkInTime}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              !loading && <p className="safelabs-empty-state">No occupancy data available</p>
            )}
          </div>
        </div>
        
        <div className="safelabs-dashboard-spacer"></div>
        
        {/* Announcements Section */}
        <div className="safelabs-dashboard-container">
        <div className="safelabs-dashboard-section">
          <div className="safelabs-section-header-container">
            <h2 className="safelabs-section-header">Announcements</h2>
            <div className="safelabs-announcement-controls">
              <select 
                value={dateFilter} 
                onChange={handleDateFilterChange}
                className="safelabs-date-filter-select"
              >
                <option value="today">Today</option>
                <option value="yesterday">Yesterday</option>
                <option value="thisMonth">This Month</option>
                <option value="lastMonth">Last Month</option>
              </select>
              {(role === "Admin" || role === "Lab Assistant") && (
                <button 
                  onClick={handleOpenModal}
                  className="safelabs-add-button"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="12" y1="5" x2="12" y2="19"></line>
                    <line x1="5" y1="12" x2="19" y2="12"></line>
                  </svg>
                  New Announcement
                </button>
              )}
            </div>
          </div>
          
          {announcementStatus === 'loading' && <div className="safelabs-loading-state">Loading announcements...</div>}
          {announcementError && <p className="safelabs-error-message">Error: {announcementError}</p>}
          
          {announcementStatus !== 'loading' && !announcementError && filteredAnnouncements.length > 0 ? (
            <div 
              className="safelabs-announcements-container"
              style={{
                maxHeight: filteredAnnouncements.length > 3 ? 'calc(3 * var(--announcement-item-height, 100px))' : 'auto',
                overflowY: filteredAnnouncements.length > 3 ? 'auto' : 'visible'
              }}
            >
              {filteredAnnouncements.map((announcement) => (
                <div key={announcement.Id} className="safelabs-announcement-item">
                  <p className="safelabs-announcement-description">{announcement.description}</p>
                  <p className="safelabs-announcement-date">
                    Posted on: {formatDate(announcement.insertDate)}
                  </p>
                </div>
              ))}
            </div>
          ) : (
            announcementStatus !== 'loading' && <p className="safelabs-empty-state">No announcements available for the selected period</p>
          )}
        </div>
      </div>
        
      </div>
      
      {/* Modal for adding new announcement */}
      {isModalOpen && (
        <div className="safelabs-modal-overlay">
          <div className="safelabs-modal-content">
            <h3 className="safelabs-modal-header">Add New Announcement</h3>
            <form onSubmit={handleSubmit}>
              <div className="safelabs-form-field">
                <label htmlFor="description">Announcement Description</label>
                <textarea
                  id="description"
                  name="description"
                  value={newAnnouncement.description}
                  onChange={handleInputChange}
                  rows="4"
                  required
                />
              </div>
              
              <div className="safelabs-form-field safelabs-checkbox-field">
                <input
                  type="checkbox"
                  id="isToAll"
                  name="isToAll"
                  checked={newAnnouncement.isToAll === 1}
                  onChange={handleInputChange}
                />
                <label htmlFor="isToAll">
                  Announce to All Users
                </label>
              </div>
              
              <div className="safelabs-form-buttons">
                <button
                  type="button"
                  onClick={handleCloseModal}
                  className="safelabs-cancel-button"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="safelabs-submit-button"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;