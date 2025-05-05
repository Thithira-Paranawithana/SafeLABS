
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/16/solid/index.js";
import { selectUserId } from "../auth/authSlice";

import {
  setIsResetPasswordOpen,
  updateNewPassword,
  checkPassword,
} from "../employees/employeeDetailsSlice";

import "./ResetButton.css";

const ResetButton = () => {
  const isResetPasswordOpen = useSelector(
    (state) => state.employeeDetails.isResetPasswordOpen
  );

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [retypePassword, setRetypePassword] = useState("");

  const [currentPasswordVisible, setCurrentPasswordVisible] = useState(false);
  const [newPasswordVisible, setNewPasswordVisible] = useState(false);
  const [retypePasswordVisible, setRetypePasswordVisible] = useState(false);

  const [errors, setErrors] = useState({});
  const userId = useSelector(selectUserId);

  const dispatch = useDispatch();

  const toggleCurrentPasswordVisibility = () => {
    setCurrentPasswordVisible(!currentPasswordVisible);
  };

  const toggleNewPasswordVisibility = () => {
    setNewPasswordVisible(!newPasswordVisible);
  };

  const toggleRetypePasswordVisibility = () => {
    setRetypePasswordVisible(!retypePasswordVisible);
  };

  const validateForm = () => {
    const newErrors = {};

    if (!currentPassword) {
      newErrors.currentPassword = "Current Password is required";
    }
    if (!newPassword) {
      newErrors.newPassword = "New Password is required";
    } else if (
      !/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#%&!$*])[a-zA-Z0-9@#%&!$*]{8,15}$/.test(
        newPassword
      )
    ) {
      newErrors.newPassword =
        "Password must be 8-15 characters long, contain at least one uppercase letter, one lowercase letter, one number, and one special character (@, #, %, &, !, $, *)";
    }

    if (!retypePassword) {
      newErrors.retypePassword = "Re-Type the new password";
    } else if (retypePassword != newPassword) {
      newErrors.retypePassword = "Password does not match";
    }

    return newErrors;
  };

  const handleUpdatePassword = async (e) => {
    e.preventDefault();
    console.log("current password: ", currentPassword);
    console.log("new password: ", newPassword);
    console.log("Id: ", userId);

    // Perform validation
    const newErrors = validateForm();

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return; // Stop submission if there are errors
    } else {
      setErrors({});
    }

    //First, check if the current password is correct
    try {
      const passwordData = { currentPassword, userId };
      const checkResult = await dispatch(checkPassword(passwordData)).unwrap();

      if (checkResult !== "EQUAL") {
        setErrors({ currentPassword: "Current password is incorrect" });
        return; // Stop if the password doesn't match
      }

      // If password is correct, proceed to update the password
      const updatedNewPassword = {
        currentPassword: currentPassword,
        newPassword: newPassword,
        Id: userId,
      };

      const result = await dispatch(
        updateNewPassword(updatedNewPassword)
      ).unwrap();
      alert("Password Updated Successfully");
      setCurrentPassword("");
      setNewPassword("");
      setRetypePassword("");
      handleCloseResetPassword();
    } catch (error) {
      console.error("Password update error:", error);
    }
  };

  const handleResetPassword = () => {
    dispatch(setIsResetPasswordOpen(true));
  };

  const handleCloseResetPassword = () => {
    dispatch(setIsResetPasswordOpen(false));
    setErrors({});
    setCurrentPassword("");
    setNewPassword("");
    setRetypePassword("");
  };

  return (
    <div>
      <button
        className="reset-password-button"
        onClick={handleResetPassword}
      >
        Change Password
      </button>

      {isResetPasswordOpen && (
        <div
          className="modal-overlay"
          onClick={handleCloseResetPassword}
        >
          <div
            className="modal-content reset-password-modal"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="modal-header">Reset Password</h2>

            <div className="form-container reset-form">
              <div className={`form-field ${errors.currentPassword ? "error" : ""}`}>
                <label htmlFor="currentPassword">Current Password</label>
                <div className="password-input-container">
                  <input
                    id="currentPassword"
                    type={currentPasswordVisible ? "text" : "password"}
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    placeholder="Enter Current Password"
                  />
                  <button
                    type="button"
                    onClick={toggleCurrentPasswordVisibility}
                    className="password-toggle-button"
                  >
                    {currentPasswordVisible ? (
                      <EyeSlashIcon className="eye-icon" />
                    ) : (
                      <EyeIcon className="eye-icon" />
                    )}
                  </button>
                </div>
                {errors.currentPassword && (
                  <p className="error-message">{errors.currentPassword}</p>
                )}
              </div>

              <div className={`form-field ${errors.newPassword ? "error" : ""}`}>
                <label htmlFor="newPassword">New Password</label>
                <div className="password-input-container">
                  <input
                    id="newPassword"
                    type={newPasswordVisible ? "text" : "password"}
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="Enter New Password"
                  />
                  <button
                    type="button"
                    onClick={toggleNewPasswordVisibility}
                    className="password-toggle-button"
                  >
                    {newPasswordVisible ? (
                      <EyeSlashIcon className="eye-icon" />
                    ) : (
                      <EyeIcon className="eye-icon" />
                    )}
                  </button>
                </div>
                {errors.newPassword && (
                  <p className="error-message">{errors.newPassword}</p>
                )}
              </div>

              <div className={`form-field ${errors.retypePassword ? "error" : ""}`}>
                <label htmlFor="retypePassword">Re-Type Password</label>
                <div className="password-input-container">
                  <input
                    id="retypePassword"
                    type={retypePasswordVisible ? "text" : "password"}
                    value={retypePassword}
                    onChange={(e) => setRetypePassword(e.target.value)}
                    placeholder="Re-Type Password"
                  />
                  <button
                    type="button"
                    onClick={toggleRetypePasswordVisibility}
                    className="password-toggle-button"
                  >
                    {retypePasswordVisible ? (
                      <EyeSlashIcon className="eye-icon" />
                    ) : (
                      <EyeIcon className="eye-icon" />
                    )}
                  </button>
                </div>
                {errors.retypePassword && (
                  <p className="error-message">{errors.retypePassword}</p>
                )}
              </div>

              <div className="form-buttons">
                <button
                  onClick={handleCloseResetPassword}
                  className="cancel-button"
                >
                  Cancel
                </button>
                <button
                  onClick={handleUpdatePassword}
                  className="submit-button"
                >
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ResetButton;