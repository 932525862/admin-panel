import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
export const tokens = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiNTczNzkzNTUtZDNjYi00NzY1LTgwMGEtNDZhOTU1NWJiOWQyIiwidG9rZW5fdHlwZSI6ImFjY2VzcyIsImlhdCI6MTcxNzc2NTU1MiwiZXhwIjoxNzQ5MzAxNTUyfQ.z1FBx3TE1xN2DDkZ_udVFGf5jmyCjbi0TSasTJVY0CA"
	

const ListEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState({ name_en: "", name_ru: "", images: null });
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(`https://autoapi.dezinfeksiyatashkent.uz/api/categories/${id}`);
        setUser(response.data?.data);
		console.log(response.data);
      } catch (error) {
        console.error("Error fetching user:", error);
        setError("Error fetching user data");
      }
    };

    fetchUser();
  }, [id]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files) {
      setUser((prevUser) => ({
        ...prevUser,
        [name]: files[0], 
      }));
    } else {
      setUser((prevUser) => ({
        ...prevUser,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("name_en", user.name_en);
      formData.append("name_ru", user.name_ru);
      if (user.images) {
        formData.append("images", user.images);
      }

      await axios.put(`https://autoapi.dezinfeksiyatashkent.uz/api/categories/${id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
		   "Authorization " : "Bearer " + tokens 
        },
      });
      navigate("/list");
    } catch (error) {
      console.error("Error editing user:", error);
      setError("Error editing user data");
    }
  };
console.log(user,"232333 	")
  return (
    <div>
      <div className="row">
        <div className="offset-lg-3 col-lg-6">
          <form className="container" onSubmit={handleSubmit}>
            <div className="card">
              <div className="card-title">
                <h2>List Editing</h2>
              </div>
              <div className="card-body">
                {error && <div className="alert alert-danger">{error}</div>}
                <div className="row">
                  <div className="col-lg-12">
                    <div className="form-group">
                      <label>name_en</label>
                      <input
                        type="text"
                        name="name_en"
                        value={user.name_en}
                        onChange={handleChange}
                        className="form-control"
                      />
                    </div>
                  </div>
                  <div className="col-lg-12">
                    <div className="form-group">
                      <label>name_ru</label>
                      <input
                        type="text"
                        name="name_ru"
                        value={user.name_ru}
                        onChange={handleChange}
                        className="form-control"
                      />
                    </div>
                  </div>
                  <div className="col-lg-12">
                    <div className="form-group">
                      <label>Image</label>
                      <input
                        type="file"
                        name="images"x
                        onChange={handleChange}
                        className="form-control"
                      />
                    </div>
                  </div>
                  <div className="col-lg-12">
                    <div className="form-group">
                      <button type="submit" className="btn btn-success mt-1">
                        Edit
                      </button>
                      <button type="button" className="btn btn-secondary mt-1 ms-2" onClick={() => navigate(-1)}>
                        Cancel
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ListEdit;
