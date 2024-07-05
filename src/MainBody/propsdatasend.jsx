import React, { useEffect, useState } from 'react';
import "./mainbody.css";

const PropsDataSend = () => {
  const [purchases, setPurchases] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPurchases = async () => {
      try {
        const userId = localStorage.getItem('_id');
        const response = await fetch('https://courses-api-deployed-9k4x.onrender.com/api/purchases/my-purchases', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ userId }),
        });

        if (response.ok) {
          const data = await response.json();
          setPurchases(data);
        } else {
          const errorData = await response.json();
          setError(errorData.message);
        }
      } catch (error) {
        setError('Error fetching purchases');
      }
    };

    fetchPurchases();
  }, []);

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  if (purchases.length === 0) {
    return <div className="loading-message">Loading purchases...</div>;
  }

  return (
    <div className="">
      <div className="">
        {purchases.map(purchase => (
        //   <div key={purchase._id} className="">
        //     <div className="">
        //       <div className="">
        //         <img src={purchase.courseId.imgSrc || "https://cdn.freebiesupply.com/logos/large/2x/sketch-2-logo-png-transparent.png"} className="main" alt={purchase.courseId.title} />
        //         <img src={purchase.courseId.imgSrc || "https://cdn.freebiesupply.com/logos/large/2x/sketch-2-logo-png-transparent.png"} className="layered" alt={purchase.courseId.title} />
        //       </div>
        //       <div className="">
        //         <h4>{purchase.courseId.title}</h4>
        //         <h6>₹ {purchase.amount}</h6>
        //       </div>
        //     </div>
        //   </div>
        <div key={purchase._id}>
            <div className=''>
                <img className='purchedImg' src={purchase.courseId.imgSrc}/>
                    <div className="">
              <h4>{purchase.courseId.title}</h4>
              <h6>₹ {purchase.amount}</h6>
            </div>
            </div>
        </div>
        ))}
      </div>
    </div>
  );
};

export default PropsDataSend;
