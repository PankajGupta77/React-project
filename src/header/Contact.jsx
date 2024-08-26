import React from 'react';

const Contact = () => {
  return (
    <div className="container mt-5">
        <div className="row">
            <div className="col-12 text-center mb-4">
                <h2>Contact Us</h2>
                <p className="lead">We're here to help. Get in touch with us through the following channels:</p>
            </div>
        </div>
        <div className="row">
            <div className="col-md-4 mb-4">
                <div className="card border-primary">
                    <div className="card-body">
                        <h5 className="card-title">Contact Number</h5>
                        <p className="card-text">
                            <i className="fas fa-phone-alt"></i> +91 7737879061
                        </p>
                    </div>
                </div>
            </div>
            <div className="col-md-4 mb-4">
                <div className="card border-success">
                    <div className="card-body">
                        <h5 className="card-title">Email Address</h5>
                        <p className="card-text">
                            <i className="fas fa-envelope"></i> pankajgupta77378790@gmail.com
                        </p>
                    </div>
                </div>
            </div>
            <div className="col-md-4 mb-4">
                <div className="card border-info">
                    <div className="card-body">
                        <h5 className="card-title">Operating Address</h5>
                        <p className="card-text">
                            <i className="fas fa-map-marker-alt"></i> LearnXpert.<br />
                            42a Nanak Nagar Indore,<br />
                            Indore, M.P, 452001,<br />
                            India
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </div>
);

};

export default Contact;
