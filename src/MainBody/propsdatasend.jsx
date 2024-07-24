import React, { useEffect, useState } from 'react';
import "./mainbody.css";

const PropsDataSend = () => {
  const [purchases, setPurchases] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchPurchases = async () => {
      setLoading(true)
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
      finally{
        setLoading(false);
      }
    };

    fetchPurchases();
  }, []);

  const formatDate = (isoString) => {
    const date = new Date(isoString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  if (purchases.length === 0) {
       {loading && <div className="loader"></div>}
    return <div className="loading-message">Not Found</div>;
  }

  return (
    <div className="">
      {loading && <div className="loader"></div>}

      <div className="">
        {purchases.map(purchase => (
      <div key={purchase._id} className='order-page'>
      {/* card div */}
      <div className="order-page-card shadow-2xl flex gap-10 flex-nowrap">
        {/* image tag */}
        <div className='order-image'>
          <img className='order-page-image' src={purchase.courseId.imgSrc} alt={purchase.courseId.title} />
        </div>
        <div className='ml-2 flex flex-col transction-details'>
          <div className='order-details'>
            <p className='font-bold'>Title:</p>
            <span>{purchase.courseId.title}</span>
          </div>
          <div className='order-details'>
            <p className='font-bold'>Order Id:</p>
            <span>{purchase._id}</span>
          </div>
          <div className='order-details'>
            <p className='font-bold'>Payment Id:</p>
            <span>{purchase.paymentId}</span>
          </div>
          <div className='order-details'>
            <p className='font-bold'>Amount:</p>
            <span>{purchase.amount}</span>
          </div>
          <div className='order-details'>
            <p className='font-bold'>Status:</p>
            <span>{purchase.status}</span>
          </div>
          <div className='order-details'>
            <p className='font-bold'>Purchase Date:</p>
            <span>{formatDate(purchase.purchaseDate)}</span>
          </div>
          <div className='order-details'>
  <p className='font-bold'>Expire Date:</p>
  <span>{purchase.expireDate ? formatDate(purchase.expireDate) : 'N/A'}</span>
</div>
        </div>
        <div className='Start-Learning'>
      <button className='processpayment'>Learn</button>
      </div>
      </div>
    </div>
    
        ))}
      </div>
    </div>
  );
};

export default PropsDataSend;
