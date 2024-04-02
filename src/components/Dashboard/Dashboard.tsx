import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getUserAssessments } from "../../services/api";
import { Assessment } from "../../types/Assessment";
import { Helmet } from "react-helmet";

export const Dashboard: React.FC = () => {
  const [assessments, setAssessments] = useState<Assessment[]>([]);
  const userRole = localStorage.getItem("role");
  const navigate = useNavigate();

  useEffect(() => {
    getUserAssessments().then((assessment: Assessment[]) =>
      setAssessments(assessment)
    );
  }, []);

  const handleGoToAssessment = (assessmentId: number) => {
    navigate(`/api/userassessments/graph/${assessmentId}`);
  };

  const handleGoToViewUsers = () => {
    navigate("/api/users");
  };

  const handleGoToLogout = () => {
    localStorage.clear();
    navigate("/api/login");
  };

  return (
    <>
      <Helmet>
        <title>Dashboard</title>
      </Helmet>
      <section className="section">
        <div className="container">
          <div className="is-flex is-justify-content-space-between">
            <h1 className="title">Dashboard</h1>
            <div className="buttons" style={{ marginBottom: "10px" }}>
              {userRole === "Admin" && (
                <button
                  className="button is-link"
                  onClick={handleGoToViewUsers}
                >
                  View Users
                </button>
              )}
              <button className="button is-link" onClick={handleGoToLogout}>
                Logout
              </button>
            </div>
          </div>
          <div className="columns is-multiline">
            {assessments.map((assessment) => (
              <div
                key={assessment.id}
                className="column is-one-quarter"
                onClick={() => handleGoToAssessment(assessment.id)}
                style={{ cursor: "pointer" }}
              >
                <div className="card">
                  <div className="card-image">
                    <figure className="image is-4by3">
                      <img src={assessment.image_url} alt={assessment.name} />
                    </figure>
                  </div>
                  <div className="card-content">
                    <div className="content">
                      <p className="title is-4">{assessment.name}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};
