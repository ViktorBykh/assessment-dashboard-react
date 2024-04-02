import React, { useEffect, useState } from "react";
import { User } from "../../types/User";
import { getUsers } from "../../services/api";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";

export const UsersTable: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    getUsers().then((users: User[]) => setUsers(users));
  }, []);

  const handleGoToDashboard = () => {
    navigate("/api/userassessments");
  };

  return (
    <>
      <Helmet>
        <title>Users</title>
      </Helmet>
      <div className="section">
        <div className="container">
          <div className="is-flex is-justify-content-space-between">
            <h1 className="title">Users Table</h1>
            <div className="buttons" style={{ marginBottom: "10px" }}>
              <button className="button is-link" onClick={handleGoToDashboard}>
                Go Back
              </button>
            </div>
          </div>
          <table
            className="table
          is-striped
          is-hoverable
          is-fullwidth"
          >
            <thead>
              <tr>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Date Of Birth</th>
                <th>Education</th>
                <th>Position</th>
                <th>Role</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id}>
                  <td>{user.name}</td>
                  <td>{user.lastName}</td>
                  <td>{user.dateOfBirth}</td>
                  <td>{user.education}</td>
                  <td>{user.position}</td>
                  <td>{user.role}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};
