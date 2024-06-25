import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import "./mainbody.css";
const OrderConfirmation = () => {
  const location = useLocation();
  const { course, paymentId } = location.state;
  const navigate = useNavigate();
function goTocourse(){
    navigate('/Allcourses')
}
  return (
    
    <>
    <div className="payment-confirmation-screen">
       <div className="data-confirmation">
           <div className='confiramtion-screen-img'>
              <img className='image-icon-confirmation' src="https://zeuxinnovation.com/wp-content/uploads/2023/04/maximising-user-satisfaction-1.jpg" />
              <div className="">
      <h1>Order Confirmation</h1>
      <p>Thank you for purchasing {course.title}!</p>
      <p>Payment ID: {paymentId}</p>
      <p>We have sent a confirmation email to your registered email address.</p>
      <button className='gotocourse' onClick={goTocourse}>Go To Courses</button>
    </div>
           </div>
         
       </div>
    </div>
    </>
  );
};

export default OrderConfirmation;
