import React, { useEffect, useState } from 'react';
import './mainbody.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const PropsDataSend = () => {
  const [purchases, setPurchases] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showIframe, setShowIframe] = useState(false);
  const [iframeSrc, setIframeSrc] = useState('');

  const videoUrls = {
    video1: 'https://www.blogger.com/video.g?token=AD6v5dyA13u3CEPODLi8NK1DRFBVtoI1ugWXRqajI_EThRY0x1cPK_iiRRUvJOqDfK5ngurB9gcxVNsxgyYD4JYTTZNVR2bhHJ7H_afcdCsZ47ufj8bTVxzO8HAAZiYbMe73pJa5u-Q',
    video2: 'https://www.blogger.com/video.g?token=AD6v5dzVrozDYZKXZtfL1TOGrjANTbCBp1QU5656iV77181PDCrgXqKwzCnKVJEqS5O1trQq7s65depfNQXhuO9eB0Y6gKwWQk5rQIEtm_AsN-23VXzpWBEiLIaq5x7DD0ghETlZ0qgz',
    video3: 'https://www.blogger.com/video.g?token=AD6v5dyPUf_YbhZJEwXR1NuzZo2PJ0h4nwfT7dY8sSeCHCqpKi_Y8aXQZ5AIO5XICY1hPA8SVqLrl3xg3VbSPU78euszO4eTv_PvqV1kXDWwNOiL8iWnCilk4SxpwoIe-7bZmNw_Bpw',
    video4: 'https://www.blogger.com/video.g?token=AD6v5dwMBgH9brdsPJUlFQzumacWmJ3p2KhL-a544lE6Z32REnte5LFfhbMt9kEMMzrFgPe2F6wtQ8UMnVRysFAev7I2U4AzP_a6WzRsvkV7sIagFcKmp4BNQJBque9ZALiZYX2IMqEO',
    video5: 'https://www.blogger.com/video.g?token=AD6v5dwaMZ7sevOYBV9bLtzUkBBDQmCNEF0Kq4OJ79kntrWp4bA0oZzRtRjzqz7vgLfTgBEvLVQ_sy5wo72yC3JCX_lv8Zo8LP9YRhJ6_jlFB-zFw1hPn0sdelx0fwVArZARhAxwD6I',
  };

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

  const Learn = (videoKey) => {
    setIframeSrc(videoUrls[videoKey]);
    setShowIframe(true);
  };

  const handleClose = () => {
    setShowIframe(false);
    setIframeSrc('');
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
        {purchases.map((purchase, index) => (
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
                <button className="processpayment" onClick={() => Learn(`video${index + 1}`)}>
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
                <iframe
                  width="100%"
                  height="400px"
                  src={iframeSrc}
                  title="Course Video"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  referrerPolicy="strict-origin-when-cross-origin"
                  allowFullScreen
                ></iframe>
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
