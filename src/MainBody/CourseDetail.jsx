import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./mainbody.css";

const CourseDetail = () => {
  const { name } = useParams();
  const navigate = useNavigate();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true)
    fetch(`https://courses-api-deployed-9k4x.onrender.com/api/courses/${name}`)
      .then(response => response.json())
      .then(data => {
        setCourse(data);
        setLoading(false);

      })
      .catch(error => console.error('Error fetching course data:', error));
  }, [name]);

  const handlePayment = () => {
    const options = {
      key: "rzp_test_AatFqUebhi8vA1", 
      amount: course.Price * 100,
      currency: "INR",
      name: "My company",
      description: `Payment for ${course.title}`,
      handler: async function (response) {
        try {
          const purchaseResponse = await fetch('https://courses-api-deployed-9k4x.onrender.com/api/purchases/buy', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({   
              userId: localStorage.getItem('_id'),
              courseId: name,
              paymentId: response.razorpay_payment_id,
              amount: course.Price,
              status: 'completed' }),
          });
          if (purchaseResponse.ok) {
            navigate("/order-confirmation", { state: { course, paymentId: response.razorpay_payment_id } });
          } else {
            const data = await purchaseResponse.json();
            alert(data.message);
          }
        } catch (error) {
          console.error('Error:', error);
        }
      },
      prefill: {
        email: localStorage.getItem('email'),
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
      {loading && <div className="loader"></div>}
        <div className="course-details-adding-css">
          <div className="image-css">
            <img className="image-css" src={course.imgSrc} alt={course.title} />
          </div>
          <div className="text-alignment">
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
