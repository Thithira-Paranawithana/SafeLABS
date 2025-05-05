
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from 'react-redux';
import {
  fetchResources,
  fetchAllResourceTypes,
  submitNewResource,
  updateResource,
  selectResources,
  setSelectedRecord,
  setIsModalOpen,
  setIsUpdateModalOpen,
  setIsNewRecordOpen,
  setFilters,
  setCurrentPage,
  setItemsPerPage,
} from '../features/resource/resourceSlice';
import { selectUserId, selectRole } from '../features/auth/authSlice';
import '../features/resource/ResourcesPage.css';

const ResourcesPage = () => {
  const dispatch = useDispatch();
  const isCollapsed = useSelector((state) => state.sidebar.isCollapsed);
  const resources = useSelector(selectResources);
  const status = useSelector(state => state.resource.status);
  const error = useSelector(state => state.resource.error);
  const filters = useSelector(state => state.resource.filters);
  const currentPage = useSelector(state => state.resource.currentPage);
  const itemsPerPage = useSelector(state => state.resource.itemsPerPage);
  const isModalOpen = useSelector(state => state.resource.isModalOpen);
  const isUpdateModalOpen = useSelector(state => state.resource.isUpdateModalOpen);
  const isNewRecordOpen = useSelector(state => state.resource.isNewRecordOpen);
  const selectedRecord = useSelector(state => state.resource.selectedRecord);

  const resourceTypes = useSelector((state) => state.resource.resourceTypes);
  const [selectedResourceType, setSelectedResourceType] = useState('');

  const [price, setPrice] = useState('');
  const [brand, setBrand] = useState('');
  const userId = useSelector(selectUserId);
  const userRole = useSelector(selectRole);

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchResources());
      dispatch(fetchAllResourceTypes());
    }
  }, [dispatch, status]);

  useEffect(() => {
    if (selectedRecord) {
      setPrice(selectedRecord.price);
      setBrand(selectedRecord.brand);
      setSelectedResourceType(selectedRecord.resourceType);
    }
  }, [selectedRecord]);

  if (status === 'loading') {
    return <div className="resources-page">
      <div className="loading-state">Loading resources...</div>
    </div>;
  }

  if (status === 'failed') {
    return <div className="resources-page">
      <div className="error-state">Error: {error}</div>
    </div>;
  }

  const validateForm = () => {
    const newErrors = {};

    if (!selectedResourceType) newErrors.selectedResourceType = 'Resource type is required';
    if (!price) newErrors.price = 'Price is required';
    else if (!/^\d+(\.\d{1,2})?$/.test(price)) {
      newErrors.price = 'Price must be a valid number with up to two decimal places';
    }
    if (!brand) newErrors.brand = 'Brand name is required';

    return newErrors;
  };

  const handleResourceTypeChange = (event) => {
    const selectedRT = event.target.value;
    setSelectedResourceType(selectedRT);
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

    const newResource = {
      resourceType: selectedResourceType,
      price: price,
      brand: brand,
      insertBy: userId,
    };
  
    try {
      const result = await dispatch(submitNewResource(newResource)).unwrap();
      console.log("Resource submission successful:", result);
      alert('Resource Record Submitted');
  
      // Reset form fields after successful submission
      setSelectedResourceType('');
      setPrice('');
      setBrand('');
    } catch (error) {
      console.error("Resource submission error:", error);
    }
  };

  const handleUpdateRecord = async (e) => {
    e.preventDefault();

    console.log("SELECTED RECORD: ", selectedRecord);
    console.log("SELECTED RECORD ID: ", selectedRecord?.Id);

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

    const updatedResource = {
      resourceType: selectedResourceType,
      price: price,
      brand: brand,
      updateBy: userId,
      Id: Id,  // Ensure the correct Id is being assigned
    };

    console.log("Updated Resource Object: ", updatedResource);

    try {
      const result = await dispatch(updateResource(updatedResource)).unwrap();
      console.log("Resource update successful:", result);
      alert('Resource Record Updated Successfully');
    } catch (error) {
      console.error("Resource update error:", error);
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
    setSelectedResourceType('');
    setPrice('');
    setBrand('');
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

  const filteredResourceDetails = resources
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

  const totalItems = filteredResourceDetails.length;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredResourceDetails.slice(indexOfFirstItem, indexOfLastItem);

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(totalItems / itemsPerPage); i++) {
    pageNumbers.push(i);
  }

  const paginate = (pageNumber) => dispatch(setCurrentPage(pageNumber));

  return (
    <div className={`transition-all duration-300 ${isCollapsed ? "ml-20" : "ml-64"}`}>
    <div className="resources-page">
      <h1 className="resources-header">Resource Management</h1>
      <div className="resources-container">
        <div className="filter-container">
          <div className="search-filters">
            <select
              name="searchBy"
              value={filters.searchBy}
              onChange={handleSearchByChange}
            >
              <option value="Id">Id</option>
              <option value="resourceType">Resource Type</option>
              <option value="brand">Brand</option>
              <option value="price">Price</option>
            </select>
            <input
              type="text"
              placeholder={`Search by ${filters.searchBy}`}
              name={filters.searchBy}
              value={filters[filters.searchBy]}
              onChange={handleFilterChange}
            />
            <select
              name="status"
              value={filters.status}
              onChange={handleFilterChange}
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>

          {(userRole === "Admin" || userRole === "Lab Assistant") && (
            <button
              className="add-resource-btn"
              onClick={handleNewRecordClick}
            >
              <span>Add Resource</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                />
              </svg>
            </button>
          )}
        </div>

        <table className="resources-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Resource Type</th>
              <th>Brand</th>
              <th>Price (Rs.)</th>
              <th>Insert Date</th>
            </tr>
          </thead>
          <tbody>
            {currentItems.map((detail) => (
              <tr key={detail.id} onClick={() => handleRowClick(detail)}>
                <td>{detail.Id}</td>
                <td>{detail.resourceType}</td>
                <td>{detail.brand}</td>
                <td>{detail.price.toFixed(2)}</td>
                <td>{formatInsertDate(detail.insertDate)}</td>
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
            <h2 className="modal-header">Resource Details</h2>
            <table className="details-table">
              <tbody>
                <tr>
                  <td>ID:</td>
                  <td>{selectedRecord.Id}</td>
                </tr>
                <tr>
                  <td>Resource Type:</td>
                  <td>{selectedRecord.resourceType}</td>
                </tr>
                <tr>
                  <td>Brand:</td>
                  <td>{selectedRecord.brand}</td>
                </tr>
                <tr>
                  <td>Price (Rs.):</td>
                  <td>{selectedRecord.price.toFixed(2)}</td>
                </tr>
                <tr>
                  <td>Insert Date:</td>
                  <td>{formatInsertDate(selectedRecord.insertDate)}</td>
                </tr>
              </tbody>
            </table>
            <div className="modal-actions">
            {(userRole === "Admin" || userRole === "Lab Assistant") && (
              <button
                onClick={handleOpenUpdateModal}
                className="btn btn-primary"
              >
                Update
              </button>
            )}
              <button
                onClick={handleCloseModal}
                className="btn btn-secondary"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {isUpdateModalOpen && selectedRecord && (
        <div
          className="modal-overlay"
          onClick={handleCloseUpdateModal}
        >
          <div
            className="modal-content"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="modal-header">Update Resource Details</h2>
            <form>
              <div className="form-group">
                <label
                  className={`form-label ${errors.selectedResourceType ? 'error' : ''}`}
                  htmlFor="resourceSelect"
                >
                  Select Resource Type
                </label>
                <select
                  id="resourceSelect"
                  value={selectedResourceType || selectedRecord.resourceType}
                  onChange={handleResourceTypeChange}
                  className={`form-control ${errors.selectedResourceType ? 'error' : ''}`}
                >
                  <option value="" disabled>Select Resource Type</option>
                  {resourceTypes.map((resourceType) => (
                    <option key={resourceType.resourceType} value={resourceType.resourceType}>
                      {resourceType.resourceType}
                    </option>
                  ))}
                </select>
                {errors.selectedResourceType && (
                  <p className="error-message">{errors.selectedResourceType}</p>
                )}
              </div>

              <div className="form-group">
                <label
                  className={`form-label ${errors.brand ? 'error' : ''}`}
                  htmlFor="brand"
                >
                  Brand Name
                </label>
                <input
                  id="brand"
                  className={`form-control ${errors.brand ? 'error' : ''}`}
                  type="text"
                  placeholder="Enter Brand Name"
                  defaultValue={selectedRecord.brand}
                  onChange={(e) => setBrand(e.target.value)}
                />
                {errors.brand && (
                  <p className="error-message">{errors.brand}</p>
                )}
              </div>     

              <div className="form-group">
                <label
                  className={`form-label ${errors.price ? 'error' : ''}`}
                  htmlFor="price"
                >
                  Price (Rs.)
                </label>
                <input
                  id="price"
                  className={`form-control ${errors.price ? 'error' : ''}`}
                  type="text"
                  placeholder="Enter Price (Rs.)"
                  defaultValue={selectedRecord.price.toFixed(2)}
                  onChange={(e) => setPrice(e.target.value)}
                />
                {errors.price && (  
                  <p className="error-message">{errors.price}</p>
                )}
              </div>   

              <div className="modal-actions">
                <button
                  onClick={handleUpdateRecord}
                  className="btn btn-primary"
                >
                  Save
                </button>
                <button
                  onClick={handleCloseUpdateModal}
                  className="btn btn-secondary"
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
            <h2 className="modal-header">Add New Resource</h2>
            
            <div className="form-group">
              <label
                className={`form-label ${errors.selectedResourceType ? 'error' : ''}`}
                htmlFor="newResourceType"
              >
                Select Resource Type
              </label>
              <select
                id="newResourceType"
                value={selectedResourceType}
                onChange={handleResourceTypeChange}
                className={`form-control ${errors.selectedResourceType ? 'error' : ''}`}
              >
                <option value="" disabled>Select Resource Type</option>
                {resourceTypes.map((resourceType) => (
                  <option key={resourceType.resourceType} value={resourceType.resourceType}>
                    {resourceType.resourceType}
                  </option>
                ))}
              </select>
              {errors.selectedResourceType && (
                <p className="error-message">{errors.selectedResourceType}</p>
              )}
            </div>

            <div className="form-group">
              <label
                className={`form-label ${errors.brand ? 'error' : ''}`}
                htmlFor="newBrand"
              >
                Brand Name
              </label>
              <input
                id="newBrand"
                className={`form-control ${errors.brand ? 'error' : ''}`}
                type="text"
                placeholder="Enter Brand Name"
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
              />
              {errors.brand && (
                <p className="error-message">{errors.brand}</p>
              )}
            </div>

            <div className="form-group">
              <label
                className={`form-label ${errors.price ? 'error' : ''}`}
                htmlFor="newPrice"
              >
                Price (Rs.)
              </label>
              <input
                id="newPrice"
                className={`form-control ${errors.price ? 'error' : ''}`}
                type="text"
                placeholder="Enter Price (Rs.)"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
              {errors.price && (
                <p className="error-message">{errors.price}</p>
              )}
            </div>

            <div className="modal-actions">
              <button
                onClick={handleSubmitNewRecord}
                className="btn btn-primary"
              >
                Submit
              </button>
              <button
                onClick={handleCloseNewRecord}
                className="btn btn-secondary"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
    </div>
  );
};

export default ResourcesPage;