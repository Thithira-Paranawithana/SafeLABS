import { configureStore } from '@reduxjs/toolkit';
import announcementSlice from '../features/announcement/announcementSlice';
import authReducer from '../features/auth/authSlice';
import { thunk } from 'redux-thunk';
import employeeDetailsReducer from '../features/employees/employeeDetailsSlice';
import securityQuestionsReducer from '../features/employees/employeeSecurityQuestionSlice';
import resourceReducer from '../features/resource/resourceSlice';
import occupancyReducer from "../features/attendance/occupancySlice";
import databaseReducer from '../features/database/databaseSlice';
import forgotPasswordReducer from '../features/auth/forgotPassword';
import sidebarReducer from '../features/navbar/sidebarSlice';
import employeeSecurityQuestionSlice from '../features/employees/employeeSecurityQuestionSlice';



export const store = configureStore({
    reducer: {
        announcement: announcementSlice,
        auth: authReducer,
        employeeDetails: employeeDetailsReducer,
        employeeSecurityQuestions : employeeSecurityQuestionSlice,
        resource: resourceReducer,
        occupancy: occupancyReducer,
        forgotPassword: forgotPasswordReducer,
        database: databaseReducer,
        sidebar: sidebarReducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk),
});
