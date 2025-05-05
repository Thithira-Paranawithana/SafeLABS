
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from 'react-redux';
import {
  fetchEmployeeRecords,
  fetchAllRoles,
  fetchAllEmployees,
  insertNewEmployee,
  updateEmployee,
  selectEmployeeRecords,
  setSelectedRecord,
  setIsModalOpen,
  setIsUpdateModalOpen,
  setIsNewRecordOpen,
  setFilters,
  setCurrentPage,
  setItemsPerPage,
} from '../features/database/databaseSlice';
import { selectUserId, selectRole } from '../features/auth/authSlice';
import '../features/database/DatabasePage.css'; 

const DatabasePage = () => {
  const dispatch = useDispatch();
  const employeeRecords = useSelector(selectEmployeeRecords);
  const status = useSelector(state => state.database.status);
  const error = useSelector(state => state.database.error);
  const filters = useSelector(state => state.database.filters);
  const currentPage = useSelector(state => state.database.currentPage);
  const itemsPerPage = useSelector(state => state.database.itemsPerPage);
  const isModalOpen = useSelector(state => state.database.isModalOpen);
  const isUpdateModalOpen = useSelector(state => state.database.isUpdateModalOpen);
  const isNewRecordOpen = useSelector(state => state.database.isNewRecordOpen);
  const isCollapsed = useSelector(state => state.sidebar.isCollapsed);

  const selectedRecord = useSelector(state => state.database.selectedRecord);

  const employees = useSelector((state) => state.database.employees); 
  const [selectedEmployee, setSelectedEmployee] = useState('');

  const roles = useSelector((state) => state.database.roles); 
  const [selectedRole, setSelectedRole] = useState('');

  const userRole = useSelector(selectRole);

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [nic, setNic] = useState('');
  const [addressLine1, setAddressLine1] = useState('');
  const [addressLine2, setAddressLine2] = useState('');
  const [city, setCity] = useState('');
  const [contactNo, setContactNo] = useState('');
  const userId = useSelector(selectUserId);

  const [errors, setErrors] = useState({});
  
  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchEmployeeRecords());
      dispatch(fetchAllRoles());
      dispatch(fetchAllEmployees());
    }
  }, [dispatch, status]);

  useEffect(() => {
    if (selectedRecord) {
      setSelectedRole(selectedRecord.role);
      setFirstName(selectedRecord.firstName);
      setLastName(selectedRecord.lastName);
      setEmail(selectedRecord.email);
      setPassword(selectedRecord.password);
      setNic(selectedRecord.nic);
      setAddressLine1(selectedRecord.addressLine1);
      setAddressLine2(selectedRecord.addressLine2);
      setCity(selectedRecord.city);
      setContactNo(selectedRecord.contactNo);
    }
  }, [selectedRecord]);

  if (status === 'loading') {
    return <div className="database-page"><div className="loading-state">Loading...</div></div>;
  }

  if (status === 'failed') {
    return <div className="database-page"><div className="database-container">Error: {error}</div></div>;
  }

  const validateForm = () => {
    const newErrors = {};

    if (!selectedRole) newErrors.selectedRole = 'Role name is required';
    if (!firstName) newErrors.firstName = 'First Name is required';
    if (!lastName) newErrors.lastName = 'Last Name is required';
    if (!email) {newErrors.email = 'Email is required';}
    else if (email && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(email)) {
      newErrors.email = 'Email must be a valid email address';
    } 
    
    if (!password) newErrors.password = 'Password is required';
    if (!nic) newErrors.nic = 'NIC is required';
    if (!addressLine1) newErrors.addressLine1 = 'Address is required';
    if (!city) newErrors.city = 'City is required';
    if (contactNo && !/^\d+$/.test(contactNo)) {
      newErrors.contactNo = 'Office Phone Number must contain only numbers';
    }

    return newErrors;
  };

  const handleRoleChange = (event) => {
    const selectedRl = event.target.value;
    setSelectedRole(selectedRl);
  };

  const handleSubmitNewRecord = async (e) => {
    e.preventDefault();
  
    // Perform validation
    const newErrors = validateForm();
  
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return; // Stop submission if there are errors
    } else {
      setErrors({});
    }
    
    const newEmployeeRecord = {
      role: selectedRole, 
      firstName: firstName,
      lastName: lastName,
      email: email, 
      password: password,
      nic: nic,
      addressLine1: addressLine1,
      addressLine2: addressLine2 === "" ? null : addressLine2,
      city: city,
      contactNo: contactNo === "" ? null : contactNo,
      insertBy: userId,
    };

    try {
      const result = await dispatch(insertNewEmployee(newEmployeeRecord)).unwrap();
      console.log("Employee insertion successful:", result);
      alert('Employee Record Inserted');
  
      setSelectedRole('');
      setFirstName('');
      setLastName('');
      setEmail('');
      setPassword('');
      setNic('');
      setAddressLine1('');
      setAddressLine2('');
      setCity('');
      setContactNo('');
      dispatch(setIsNewRecordOpen(false));

    } catch (error) {
      console.error("Employee insertion error:", error);
    }
  };

  const handleUpdateRecord = async (e) => {
    e.preventDefault();

    // Perform validation
    const newErrors = validateForm();
  
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return; // Stop submission if there are errors
    } else {
      setErrors({});
    }

    // Destructure selectedRecord for clarity
    const { Id } = selectedRecord;

    const updatedEmployee = {
      role: selectedRole, 
      firstName: firstName,
      lastName: lastName, 
      email: email, 
      nic: nic, 
      addressLine1: addressLine1, 
      addressLine2: addressLine2 === "" ? null : addressLine2, 
      city: city, 
      contactNo: contactNo === "" ? null : contactNo, 
      updateBy: userId, 
      Id: Id
    };

    try {
      const result = await dispatch(updateEmployee(updatedEmployee)).unwrap();
      console.log("Employee update successful:", result);
      alert('Employee Record Updated');
      dispatch(setIsUpdateModalOpen(false));
    } catch (error) {
      console.error("Employee update error:", error);
    }
  };   

  // Handler to open the update modal
  const handleOpenUpdateModal = () => {
    dispatch(setIsUpdateModalOpen(true));
  };

  // Handler to close the update modal
  const handleCloseUpdateModal = () => {
    dispatch(setIsUpdateModalOpen(false));
  };
 
  const handleFilterChange = (event) => {
    const { name, value } = event.target;
    dispatch(setFilters({ [name]: value }));
  };

  const handleSearchByChange = (event) => {
    dispatch(setFilters({ searchBy: event.target.value }));
  };

  const handleRowClick = (detail) => {
    dispatch(setSelectedRecord(detail));
    dispatch(setIsModalOpen(true));
  };

  const handleCloseModal = () => {
    dispatch(setIsModalOpen(false));
    dispatch(setSelectedRecord(null));
  };

  const handleNewRecordClick = () => {
    setSelectedRole('');
    setFirstName('');
    setLastName('');
    setEmail('');
    setPassword('');
    setNic('');
    setAddressLine1('');
    setAddressLine2('');
    setCity('');
    setContactNo('');
    dispatch(setIsNewRecordOpen(true));
  };

  const handleCloseNewRecord = () => {
    dispatch(setIsNewRecordOpen(false));
  };

  const formatInsertDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    const date = new Date(dateString);
    return date.toLocaleDateString(undefined, options);
  };

  const filteredEmployeeRecords = employeeRecords
    .filter((detail) => {
      if (filters.status !== 'inactive') {
        return true;
      }
      return detail.status === filters.status;
    })
    .filter((detail) => {
      const searchTerm = filters[filters.searchBy]?.toLowerCase() || '';
      const valueToSearch = detail[filters.searchBy] != null ? detail[filters.searchBy].toString().toLowerCase() : '';
      return valueToSearch.includes(searchTerm);
    })
    .filter((detail) => {
      if (filters.month && filters.year) {
        const date = new Date(detail.insertDate);
        const month = date.toLocaleString('default', { month: 'long' });
        const year = date.getFullYear().toString();
        return month === filters.month && year === filters.year;
      }
      return true;
    });

  const totalItems = filteredEmployeeRecords.length;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredEmployeeRecords.slice(indexOfFirstItem, indexOfLastItem);

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(totalItems / itemsPerPage); i++) {
    pageNumbers.push(i);
  }

  const paginate = (pageNumber) => dispatch(setCurrentPage(pageNumber));

  return (
    <div className={`transition-all duration-300 ${isCollapsed ? "ml-20" : "ml-64"}`}>
    <div className="database-page">
    <h1 className="database-header">User Management</h1>
      <div className="database-container">
        
        <div className="search-filters">
          <div className="filter-group">
            <select
              name="searchBy"
              value={filters.searchBy}
              onChange={handleSearchByChange}
              className="search-select"
            >
              <option value="Id">ID</option>
              <option value="firstName">First Name</option>
              <option value="lastName">Last Name</option>
              <option value="role">Role</option>
            </select>
            <input
              type="text"
              placeholder={`Search by ${filters.searchBy}`}
              name={filters.searchBy}
              value={filters[filters.searchBy] || ''}
              onChange={handleFilterChange}
              className="search-input"
            />
            <select
              name="status"
              value={filters.status}
              onChange={handleFilterChange}
              className="status-select"
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>
          
          {(userRole === "Admin" || userRole === "Lab Assistant") && (
            <button
              className="add-button"
              onClick={handleNewRecordClick}
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
              Add User
            </button>
          )}
        </div>
        
        <table className="database-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Role</th>
              <th>Email</th>
              <th>NIC</th>
            </tr>
          </thead>
          <tbody>
            {currentItems.map((detail) => (
              <tr key={detail.Id} onClick={() => handleRowClick(detail)}>
                <td>{detail.Id}</td>
                <td>{detail.name || `${detail.firstName} ${detail.lastName}`}</td>
                <td>{detail.role}</td>
                <td>{detail.email || 'NA'}</td>
                <td>{detail.nic}</td>
              </tr>
            ))}
          </tbody>
        </table>
        
        <div className="pagination-container">
          <div className="items-per-page">
            <label htmlFor="itemsPerPage">Items per page:</label>
            <select
              id="itemsPerPage"
              value={itemsPerPage}
              onChange={(e) => dispatch(setItemsPerPage(Number(e.target.value)))}
            >
              <option value={10}>10</option>
              <option value={25}>25</option>
              <option value={50}>50</option>
            </select>
          </div>
          <div className="page-numbers">
            {pageNumbers.map(number => (
              <li key={number} className="page-item">
                <button
                  onClick={() => paginate(number)}
                  className={currentPage === number ? 'active' : ''}
                >
                  {number}
                </button>
              </li>
            ))}
          </div>
        </div>
      </div>
      
      {isModalOpen && selectedRecord && (
        <div className="modal-overlay" onClick={handleCloseModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h2 className="modal-header">User Details</h2>
            <table className="modal-table">
              <tbody>
                <tr>
                  <td>ID:</td>
                  <td>{selectedRecord.Id}</td>
                </tr>
                <tr>
                  <td>First Name:</td>
                  <td>{selectedRecord.firstName}</td>
                </tr>
                <tr>
                  <td>Last Name:</td>
                  <td>{selectedRecord.lastName}</td>
                </tr>
                <tr>
                  <td>Role:</td>
                  <td>{selectedRecord.role}</td>
                </tr>
                <tr>
                  <td>Email:</td>
                  <td>{selectedRecord.email || 'NA'}</td>
                </tr>
                <tr>
                  <td>Contact No:</td>
                  <td>{selectedRecord.contactNo || 'NA'}</td>
                </tr>
                <tr>
                  <td>Address:</td>
                  <td>{selectedRecord.address || (selectedRecord.addressLine1 && `${selectedRecord.addressLine1}, ${selectedRecord.addressLine2 || ''}, ${selectedRecord.city}`) || 'NA'}</td>
                </tr>
                <tr>
                  <td>NIC:</td>
                  <td>{selectedRecord.nic}</td>
                </tr>
              </tbody>
            </table>
            <div className="modal-buttons">
            {(userRole === "Admin" || userRole === "Lab Assistant") && (
              <button
                onClick={handleOpenUpdateModal}
                className="modal-button update-button"
              >
                Update
              </button>
            )}
              <button
                onClick={handleCloseModal}
                className="cancel-button"
              >
                Close
              </button>
            </div>
    </div>
  </div>
)}

{isUpdateModalOpen && selectedRecord && (
  <div className="modal-overlay" onClick={handleCloseUpdateModal}>
  <div className="modal-content" onClick={(e) => e.stopPropagation()}>
    <h2 className="modal-header">Update User Details</h2>
      {/* <form onSubmit={handleUpdateSubmit}> */}
      <form >

      {/* First Name Input */}
      <div className={`form-field ${errors.firstName ? 'error' : ''}`}>
        <label htmlFor="firstName">First Name</label>
        <input
          type="text"
          placeholder="Enter First Name"
          defaultValue={selectedRecord.firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />
        {errors.firstName && (
          <p className="error-message">{errors.firstName}</p>
        )}
      </div>

      {/* Last Name Input */}
      <div className={`form-field ${errors.lastName ? 'error' : ''}`}>
      <label htmlFor="lastName">Last Name</label>
        <input
          type="text"
          placeholder="Enter Last Name"
          defaultValue={selectedRecord.lastName}
          onChange={(e) => setLastName(e.target.value)}
        />
        {errors.lastName && (
          <p className="error-message">{errors.lastName}</p>
        )}
      </div>

      {/* Nic Input */}
      <div className={`form-field ${errors.nic ? 'error' : ''}`}>
      <label htmlFor="nic">NIC</label>
        <input
          type="text"
          placeholder="Enter NIC"
          defaultValue={selectedRecord.nic}
          onChange={(e) => setNic(e.target.value)}
        />
        {errors.nic && (
          <p className="error-message">{errors.nic}</p>
        )}
      </div>

      {/* Address Line 1 Input */}
      <div className={`form-field ${errors.addressLine1 ? 'error' : ''}`}>
      <label htmlFor="addressLine1">Address Line 1</label>
        <input
          type="text"
          placeholder="Enter Address Line 1"
          defaultValue={selectedRecord.addressLine1}
          onChange={(e) => setAddressLine1(e.target.value)}
        />
        {errors.addressLine1 && (
          <p className="error-message">{errors.addressLine1}</p>
        )}
      </div>

      {/* Address Line 2 Input */}
      <div className={`form-field `}>
      <label htmlFor="addressLine2">Address Line 2</label>
        <input
          type="text"
          placeholder="Enter addressLine2"
          defaultValue={selectedRecord.addressLine2}
          onChange={(e) => setAddressLine2(e.target.value === "" ? null : e.target.value)}
        />
      </div>

      {/* City Name Input */}
      <div className={`form-field ${errors.city ? 'error' : ''}`}>
      <label htmlFor="city">City</label>
        <input
          type="text"
          placeholder="Enter City"
          defaultValue={selectedRecord.city}
          onChange={(e) => setCity(e.target.value)}
        />
        {errors.city && (
          <p className="error-message">{errors.city}</p>
        )}
      </div>

      {/*Personal Email Input */}
      <div className={`form-field ${errors.email ? 'error' : ''}`}>
      <label htmlFor="email">Email</label>
        <input
          type="text"
          placeholder="Enter Email"
          defaultValue={selectedRecord.email}
          onChange={(e) => setEmail(e.target.value)}
        />
        {errors.email && (
          <p className="error-message">{errors.email}</p>
        )}
      </div>

        {/* Role Name Dropdown */}
        <div className={`form-field ${errors.selectedRole ? 'error' : ''}`}>
        <label htmlFor="roleSelect">Select Role</label>
          <select
            value={selectedRole || selectedRecord.role}
            onChange={handleRoleChange}
          >
            <option value="" disabled>Select Role</option>
            {roles.map((role) => (
              <option key={role.role} value={role.role}>
                {role.role}
              </option>
            ))}
          </select>
          {errors.selectedRole && (
            <p className="error-message">{errors.selectedRole}</p>
          )}
        </div>

      {/*  Phone No Input */}
      <div className={`form-field ${errors.contactNo ? 'error' : ''}`}>
      <label htmlFor="contactNo">Contact No</label>
        <input
          type="text"
          placeholder="Enter Contact No"
          defaultValue={selectedRecord.contactNo}
          onChange={(e) => setContactNo(e.target.value === "" ? null : e.target.value)}
        />
        {errors.contactNo && (
          <p className="error-message">{errors.contactNo}</p>
        )}
      </div>

      <div className="form-buttons">
        <button
          onClick={handleUpdateRecord}
          className="submit-button"
        >
          Save
        </button>
        <button
          onClick={handleCloseUpdateModal}
          className="cancel-button"
        >
          Cancel
        </button>
      </div>
      </form>
    </div>
  </div>
)}


{isNewRecordOpen && (

  <div className="modal-overlay" onClick={handleCloseNewRecord}>
  <div className="modal-content" onClick={(e) => e.stopPropagation()}>
    <h2 className="modal-header">Add User</h2>

        {/* First Name Input */}
        <div className={`form-field ${errors.firstName ? 'error' : ''}`}>
        <label htmlFor="firstName">First Name</label>
        <input
          type="text"
          placeholder="Enter First Name"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />
        {errors.firstName && (
          <p className="error-message">{errors.firstName}</p>
        )}
      </div>

      {/* Last Name Input */}
      <div className={`form-field ${errors.lastName ? 'error' : ''}`}>
      <label htmlFor="lastName">Last Name</label>
        <input
          type="text"
          placeholder="Enter Last Name"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />
        {errors.lastName && (
          <p className="error-message">{errors.lastName}</p>
        )}
      </div>

      {/* Nic Input */}
      <div className={`form-field ${errors.nic ? 'error' : ''}`}>
      <label htmlFor="nic">NIC</label>
        <input
          type="text"
          placeholder="Enter NIC"
          value={nic}
          onChange={(e) => setNic(e.target.value)}
        />
        {errors.nic && (
          <p className="error-message">{errors.nic}</p>
        )}
      </div>

      {/* Address Line 1 Input */}
      <div className={`form-field ${errors.addressLine1 ? 'error' : ''}`}>
        <label htmlFor="addressLine1"> Address Line 1 </label>
        <input
          type="text"
          placeholder="Enter addressLine1"
          value={addressLine1}
          onChange={(e) => setAddressLine1(e.target.value)}
        />
        {errors.addressLine1 && (
          <p className="error-message">{errors.addressLine1}</p>
        )}
      </div>

      {/* Address Line 2 Input */}
      <div className={`form-field ${errors.addressLine2 ? 'error' : ''}`}>
      <label htmlFor="addressLine2"> Address Line 2 </label>
        <input
          type="text"
          placeholder="Enter addressLine2"
          value={addressLine2}
          onChange={(e) => setAddressLine2(e.target.value === "" ? null : e.target.value)}
        />
        
      </div>

      {/* City Name Input */}
      <div className={`form-field ${errors.city ? 'error' : ''}`}>
      <label htmlFor="city"> City </label>
        <input
          type="text"
          placeholder="Enter City"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        {errors.city && (
          <p className="error-message">{errors.city}</p>
        )}
      </div>

      {/*Personal Email Input */}
      <div className={`form-field ${errors.email ? 'error' : ''}`}>
      <label htmlFor="email"> Email </label>
        <input
          type="text"
          placeholder="Enter Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        {errors.email && (
          <p className="error-message">{errors.email}</p>
        )}
      </div>

        {/* Role Name Dropdown */}
        <div className={`form-field ${errors.selectedRole ? 'error' : ''}`}>
          <label htmlFor="roleSelect" >Select Role</label>
          <select
            value={selectedRole}
            onChange={handleRoleChange}
          >
            <option value="" disabled>Select Role</option>
            {roles.map((role) => (
              <option key={role.role} value={role.role}>
                {role.role}
              </option>
            ))}
          </select>
          {errors.selectedRole && (
            <p className="error-message">{errors.selectedRole}</p>
          )}
        </div>

      {/* Password Input */}
      <div className={`form-field ${errors.password ? 'error' : ''}`}>
      <label htmlFor="password"> Password </label>
        <input
          type="password"
          placeholder="Enter Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {errors.password && (
          <p className="error-message">{errors.password}</p>
        )}
      </div>

      {/*  Phone No Input */}
      <div className={`form-field ${errors.contactNo ? 'error' : ''}`}>
        <label htmlFor="contactNo">Contact No</label>
        <input         
          type="text"
          placeholder="Enter Contact No"
          value={contactNo}
          onChange={(e) => setContactNo(e.target.value === "" ? null : e.target.value)}
        />
        {errors.contactNo && (
          <p className="error-message">{errors.contactNo}</p>
        )}
      </div>

    <div className="form-buttons">
            <button
              onClick={handleSubmitNewRecord}
              className="submit-button"
            >
              Save
            </button>
            <button
              onClick={handleCloseNewRecord}
              className="cancel-button"
            >
              Cancel
            </button>
          </div>
  </div>
</div>
)}


    </div>
    </div>

  );
};

export default DatabasePage;

