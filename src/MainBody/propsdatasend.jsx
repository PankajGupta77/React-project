import React, { useEffect, useState } from 'react';
import './mainbody.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const PropsDataSend = () => {
  const [purchases, setPurchases] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showIframe, setShowIframe] = useState(false);

  useEffect(() => {
    const fetchPurchases = async () => {
      setLoading(true);
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
      } finally {
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

  const Learn = () => {
    setShowIframe(true);
  };

  const handleClose = () => {
    setShowIframe(false);
  };

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  if (purchases.length === 0) {
    return (
      <div>
        {loading && <div className="loader"></div>}
        <div className="loading-message">Not Found</div>
      </div>
    );
  }

  return (
    <div>
      {loading && <div className="loader"></div>}
      <div>
        {purchases.map((purchase) => (
          <div key={purchase._id} className="order-page">
            <div className="order-page-card shadow-2xl flex gap-10 flex-nowrap">
              <div className="order-image">
                <img
                  className="order-page-image"
                  src={purchase.courseId.imgSrc}
                  alt={purchase.courseId.title}
                />
              </div>
              <div className="ml-2 flex flex-col transction-details">
                <div className="order-details">
                  <p className="font-bold">Title:</p>
                  <span>{purchase.courseId.title}</span>
                </div>
                <div className="order-details">
                  <p className="font-bold">Order Id:</p>
                  <span>{purchase._id}</span>
                </div>
                <div className="order-details">
                  <p className="font-bold">Payment Id:</p>
                  <span>{purchase.paymentId}</span>
                </div>
                <div className="order-details">
                  <p className="font-bold">Amount:</p>
                  <span>{purchase.amount}</span>
                </div>
                <div className="order-details">
                  <p className="font-bold">Status:</p>
                  <span>{purchase.status}</span>
                </div>
                <div className="order-details">
                  <p className="font-bold">Purchase Date:</p>
                  <span>{formatDate(purchase.purchaseDate)}</span>
                </div>
                <div className="order-details">
                  <p className="font-bold">Expire Date:</p>
                  <span>{purchase.expireDate ? formatDate(purchase.expireDate) : 'N/A'}</span>
                </div>
              </div>
              <div className="Start-Learning">
                <button className="processpayment" onClick={Learn}>
                  Learn
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

     
      {showIframe && (
        <div className="modal show d-block" tabIndex="-1" role="dialog">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Course Video</h5>
                <button type="button" className="close" aria-label="Close" onClick={handleClose}>
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
              <iframe   width="100%"
                  height="400px" src="https://www.youtube.com/embed/HVjjoMvutj4?si=0uA20xPKqL73S-Z9"
                   title="YouTube video player" frameborder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                    referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={handleClose}>
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
        
      )}
    
    </div>
    
  );
};

export default PropsDataSend;
