import "../../App.css";
import { useParams, useNavigate } from "react-router-dom";
// import { mastersArray } from "../Constants/Masters";
import { useState, useEffect } from "react";
import { SERVER_LOCATION } from "../Constants/Server";

function TableMast() {
  const navigate = useNavigate();
  const [masteraArray, setMasteraArray] = useState([]);

  useEffect(() => {
    fetch(`${SERVER_LOCATION}/masters`, {
      method: "GET",
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        console.log({ data });
        setMasteraArray(data.data.Masters);
      });
  }, []);

  // console.log({ masteraArray });

  // Ensure mastersArray is defined and is an array
  // if (!Array.isArray(mastersArray)) {
  //   console.error("mastersArray is not defined or not an array");
  //   return null; // Or return some fallback UI
  // }

  return (
    // Added a common section class if you want consistent vertical padding/backgrounds
    <section className="masters_about section-padding">
      {" "}
      <div className="container">
        <h1 className="masters_heading">Мастера студии</h1>
        <p className="subheading_masters">
          Опытные мастера. Креативное мышление.
        </p>
        <div className="table_panels">
          {masteraArray?.map((master, index) => (
            <div
              key={index}
              className="table_panel"
              onClick={() => navigate(`/masters/${index + 1}`)}
              role="button"
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ")
                  navigate(`/masters/${index + 1}`);
              }}
            >
              <div className="table_panel_image_wrapper">
                {" "}
                <img
                  src={master.image}
                  alt={`Мастер ${master.name}`}
                  className="table_images"
                />
              </div>
              {/* Separated content div for better structure and styling */}
              <div className="table_panel_content">
                {/* Correct structure: h3 is not inside p */}
                <h3 className="name_name">{master.name}</h3>
                {/* Use a p tag for the experience text */}
                <p className="experience_text">
                  Стаж более {master.experience} лет
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default TableMast;
