import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./mainbody.css";

const MainBody = () => {

  const [courses, setCourses] = useState([]);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await fetch("https://courses-api-deployed-9k4x.onrender.com/api/courses");
        const data = await response.json();
        setCourses(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchCourses();
  }, []);

  return (
    <>
      <div className="Top-course-name">
        <h2>Explore Our Courses</h2>
      </div>
      <div className="Parent-div-mainbody">
        {courses.map((course, index) => (
          <div className="course-cards" key={index}>
            <div className="image-div">
              <img className="course-images" src={course.imgSrc} alt={course.title} />
            </div>
            <div className="name-view-detail">
              <h3 className="course-title">{course.title}</h3>
            </div>
            <div className="check-availble">
              <div>
                <h3 className="availble-check">{course.available}</h3>
              </div>
              <div className="view-btn-div">
                <Link to={`/courselist/${encodeURIComponent(course._id)}`}>
                  <button className="view-btn">View</button>
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default MainBody;
