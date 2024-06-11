import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";

const Detail = () => {
  const { id } = useParams(); 
  const navigate = useNavigate();
  const [user, setUser] = useState(null);


  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await fetch(`http://localhost:8080/users/${id}`);
        if (!response.ok) {
          throw new Error("Failed to fetch user details");
        }
        const userData = await response.json();
        setUser(userData);
      } catch (error) {
        console.error("Error fetching user details:", error);
      }
    };

    fetchUserDetails();
  }, [id]);

  return (
    <div className="container">
      <div className="card">
        <div className="card-title">
          <h2>Detail</h2>
        </div>
        <div className="card-body">
          <table className="table table-bordered">
            <thead className="bd-dark text-white">
              <tr>
                <th>Id</th>
                <th>Surname</th>
                <th>Name</th>
                <th>Email</th>
                <th>Button</th>
              </tr>
            </thead>
            <tbody>
              <tr key={user?.id}>
                <td>{user?.id}</td>
                <td>{user?.surname}</td>
                <td>{user?.name}</td>
                <td>{user?.email}</td>
                <td>
                  <Button onClick={() => navigate(-1)} variant="primary">
                    Go back
                  </Button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Detail;






