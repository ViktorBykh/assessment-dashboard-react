import React from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import { Dashboard } from "./components/Dashboard/Dashboard";
import { UsersTable } from "./components/UserTable/UsersTable";
import { AssessmentReport } from "./components/AssessmentReport/AssessmentReport";
import { LoginForm } from "./components/LoginForm/LoginForm";

export const App: React.FC = () => {
  const userRole = localStorage.getItem("role");
  return (
    <Router basename="/assessment-dashboard-react">
      <div className="section">
        <Routes>
          <Route path="/" element={<Navigate to="/api/login" />} />
          <Route path="/api/login" element={<LoginForm />} />
          <Route path="/api/userassessments" element={<Dashboard />} />
          {userRole === "Admin" && <Route path="/api/users" element={<UsersTable />} />}
          <Route path="/api/userassessments/graph/:id" element={<AssessmentReport />} />
        </Routes>
      </div>
    </Router>
  );
};
