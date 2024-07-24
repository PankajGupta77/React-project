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

      {/* Modal */}
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
                  src="https://rr1---sn-aigl6nl7.googlevideo.com/videoplayback?expire=1721838646&ei=1tegZq7tObSJp-oPlpC5qA0&ip=202.47.62.33&id=o-AG1XTNPZs5y5lpV1xxaSTNHwEI4N1Hok2KelvyTiiAz1&itag=18&source=youtube&requiressl=yes&xpc=EgVo2aDSNQ%3D%3D&bui=AXc671J3jcqHia79Y-ojqEj4YqDSbBuPf4F392KYXtoJFl1CGUSh7x1nFQFUd8wIJHlFWRFURHFzNaDo&vprv=1&mime=video%2Fmp4&rqh=1&gir=yes&clen=3382644059&ratebypass=yes&dur=101807.426&lmt=1721177164015751&c=ANDROID_CREATOR&txp=4438434&sparams=expire%2Cei%2Cip%2Cid%2Citag%2Csource%2Crequiressl%2Cxpc%2Cbui%2Cvprv%2Cmime%2Crqh%2Cgir%2Cclen%2Cratebypass%2Cdur%2Clmt&sig=AJfQdSswRAIgSuYXZqROsa0ZN_IM5w4YVNwSqhIH7hB2Ukq2L6SmF0oCIA3pvY7Ex7fGuGcqZ5lrG0xjMMNb868IP5BplHYNRj6l&title=Web%20Development%20Full%20Course%20%5B28%20HOURS%5D%20%7C%20Learn%20Full-Stack%20Web%20Development%20in%202024&rm=sn-jtcxg-3ipy7s,sn-hjuk7l&rrc=79,104&fexp=24350516,24350517&req_id=1b85664cb1dfa3ee&redirect_counter=2&cms_redirect=yes&cmsv=e&ipbypass=yes&mh=9n&mip=223.236.5.121&mm=29&mn=sn-aigl6nl7&ms=rdu&mt=1721823198&mv=D&mvi=1&pl=0&lsparams=ipbypass,mh,mip,mm,mn,ms,mv,mvi,pl&lsig=AGtxev0wRgIhAJGneNJVBJXvN6mSibSpmPN2CfoRb3eBE7VnXFK_7OrYAiEAgX2KCfcyyCVF9ViRbhyQ_JZ_0fd9MLC6e3Ut4Gyxftg%3D"
                  title="Web Development Full Course"
                  width="100%"
                  height="400px"
                  frameBorder="0"
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
