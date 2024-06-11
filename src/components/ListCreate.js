import React, {useState} from "react";
import {useNavigate} from "react-router-dom";
import { tokens } from "./List";

const ListCreate = () => {
  const [name_en, setName_en] = useState("");
  const [name_ru, setName_ru] = useState("");
  const [images, setImages] = useState("");

  const navigate = useNavigate();


  //   const generateId = () => {
  // 	const min = 1;
  // 	const max = 999;
  // 	return Math.floor(Math.random() * (max - min + 1)) + min;
  //   };

  const handleSubmit = (e) => {
    e.preventDefault();
    // const id = generateId();
    const formdata = new FormData();
	formdata.append("name_en",name_en);
	formdata.append("name_ru",name_ru);
	formdata.append("images",images);

    fetch("https://autoapi.dezinfeksiyatashkent.uz/api/categories", {
      method: "POST",
      headers: {
		"Authorization": `Bearer ${tokens}`
	  },
      body:formdata,
    })
      .then((res) => res.json())
      .then((data) => {
        alert("Your data is sent");
        navigate("/list");
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  return (
    <div>
      <div className="row">
        <div className="offset-lg-3 col-lg-6">
          <form className="container" onSubmit={handleSubmit}>
            <div className="card">
              <div className="card-title">
                <h2>List Creating</h2>
              </div>
              <div className="card-body">
                <div className="row">
                  <div className="col-lg-12">
                    <div className="form-group">
                      <label>name_en</label>
                      <input
                        value={name_en}
                        placeholder="Chevrolet"
                        onChange={(e) => setName_en(e?.target.value)}
                        className="form-control"
                      />
                    </div>
                  </div>
                  <div className="col-lg-12">
                    <div className="form-group">
                      <label>name_ru</label>	
                      <input
                        value={name_ru}
                        placeholder="Chevrolet"
                        onChange={(e) => setName_ru(e?.target.value)}
                        className="form-control"
                      />
                    </div>
                  </div>

                  <div className="col-lg-12">
                    <div className="form-group">
                      <label>Images</label>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => setImages(e?.target?.files[0])}
                        className="form-control"
                      />
                     
                    </div>
                  </div>

                  <div className="col-lg-12">
                    <div className="form-group">
                      <button type="submit" className="btn btn-success mt-1">
                        Save
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

export default ListCreate;
