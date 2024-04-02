import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getAssessmentGraph } from "../../services/api";
import { GraphData } from "../../types/GraphData";
import { Helmet } from "react-helmet";

export const AssessmentReport: React.FC = () => {
  const { id } = useParams();
  const [graphData, setGraphData] = useState<GraphData | null>(null);
  const [noData, setNoData] = useState<boolean>(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      getAssessmentGraph(Number(id)).then((data: GraphData) => {
        setGraphData(data);
        setNoData(!data || !data.data || Object.keys(data.data).length === 0);
      });
    }
  }, [id]);

  const handleGoToDashboard = () => {
    navigate("/api/userassessments");
  };

  return (
    <>
      <Helmet>
        <title>Assessment Report</title>
      </Helmet>
      <div className="section">
        <div className="is-flex is-justify-content-space-between">
          <h1 className="title">Assessment Report</h1>
          <div className="buttons" style={{ marginBottom: "10px" }}>
            <button className="button is-link" onClick={handleGoToDashboard}>
              Go Back
            </button>
          </div>
        </div>
        {noData ? (
          <div className="has-text-danger">There is no data available</div>
        ) : (
          graphData && (
            <div className="content">
              <p>Graph Type: {graphData.type}</p>
              <ul>
                {Object.entries(graphData.data).map(([key, value]) => (
                  <li key={key}>
                    <strong>{key}:</strong> {value}
                  </li>
                ))}
              </ul>
            </div>
          )
        )}
      </div>
    </>
  );
};
