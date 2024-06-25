import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./mainbody.css";

const CourseDetail = () => {
  const { name } = useParams();
  const navigate = useNavigate();
  const [course, setCourse] = useState(null);
  console.log(name)
  useEffect(() => {
    fetch(`https://courses-api-deployed-9k4x.onrender.com/api/courses/${name}`)
      .then(response => response.json())
      .then(data => {
        const courseList = data;
        // const foundCourse = courseList.find(course => course.title === name);
        setCourse(courseList);
      })
      .catch(error => console.error('Error fetching course data:', error));
  }, [name]);

  const handlePayment = () => {
    const options = {
      key: "rzp_test_AatFqUebhi8vA1", 
      amount: course.Price * 100,
      currency: "INR",
      name: "My company",
      description: `Payment for ${course}`,
      handler: function (response) {
        navigate("/order-confirmation", { state: { course, paymentId: response.razorpay_payment_id } });
      },
      prefill: {
        name: "Your Name",
        email: "pg007135@gmail.com",
        contact: "+917737879061",
      },
      theme: {
        color: "#3399cc",
      },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  if (!course) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div className="course-details">
        <div className="course-details-adding-css">
          <div className="image-css">
            <img className="image-css" src={course.imgSrc} alt={course.title} />
          </div>
          <div>
            <div className="title-discription">
              <h2 className="course-title">{course.title}</h2>
            </div>
            {course.author && (
              <div>
                <h2 className="course-title-author">Author: <span className="">{course.author}</span></h2>
              </div>
            )}
            <div>
              <h2 className="course-title-author">Price: ₹{course.Price}</h2>
            </div>
            <div>
              <h2 className="course-title-author">This is a dummy response</h2>
            </div>
          </div>
        </div>
      </div>
      <div className="button-container">
        <button className="processpayment" onClick={handlePayment}>Proceed to checkout</button>
      </div>
    </>
  );
};

export default CourseDetail;
