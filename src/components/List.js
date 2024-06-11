import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import "./Component.css";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
export const tokens = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiNTczNzkzNTUtZDNjYi00NzY1LTgwMGEtNDZhOTU1NWJiOWQyIiwidG9rZW5fdHlwZSI6ImFjY2VzcyIsImlhdCI6MTcxNzc2NTU1MiwiZXhwIjoxNzQ5MzAxNTUyfQ.z1FBx3TE1xN2DDkZ_udVFGf5jmyCjbi0TSasTJVY0CA"
const List = () => {
  const [data, setData] = useState([]);
  const navigate = useNavigate();
  

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("https://autoapi.dezinfeksiyatashkent.uz/api/categories");
        if (!response.ok) {
          throw new Error("Failed to fetch user data");
        }
        const userData = await response.json();
        console.log("Fetched data:", userData);  

        
        if (Array.isArray(userData.data)) {
          setData(userData.data);
        } else {
          console.error("Fetched data is not an array:", userData.data);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchData();
  }, []);

  const handleEdit = (id) => {
    navigate(`/edit/${id}`);
	
  };

  const handleDetail = (id) => {
    navigate(`/detail/${id}`);
  };

  const handleDelete = async (id) => {
	try {
	  await fetch(`https://autoapi.dezinfeksiyatashkent.uz/api/categories/${id}`, {
		method: "DELETE",
		headers: {
			"Authorization": `Bearer ${tokens}`
		  },
	  });
	  setData(data.filter((item) => item.id !== id)); 
	} catch (error) {
	  console.error("Error deleting user:", error);
	}
  };

  return (
    <div className="container">
      <div className="card">
        <div className="card-title">
          <h2>Listing items</h2>
        </div>
        <div className="card-body">
          <table className="table table-bordered">
            <thead className="bd-dark text-white">
              <tr>
			  <td>#</td>
                <td>Name_ru</td>
                <td>Name_uz</td>
                <td>Image</td>
              </tr>
            </thead>
            <tbody>
              {Array.isArray(data) ? (
                data.map((item, index) => (
                  <tr key={item.id}>
                    <td>{index + 1}</td>
                    <td>{item.name_ru}</td>
                    <td>{item.name_en}</td>
                    <td><img className="imgs-api" src={`https://autoapi.dezinfeksiyatashkent.uz/api/uploads/images/${item.image_src}`}></img> </td>
                    <td>
                      <Button variant="primary" onClick={() => handleEdit(item.id)}>
                        Edit
                      </Button>
                      <Button variant="success" onClick={() => handleDetail(item.id)}>
                        Detail
                      </Button>
                      <Button variant="danger" onClick={() => handleDelete(item.id)}>
                        Delete
                      </Button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5">No data available</td>
                </tr>
              )}
            </tbody>
          </table>
          <Link to={`/create`} className="creatbtn">
            <Button className="listcret" variant="success">
              List Create
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default List;
