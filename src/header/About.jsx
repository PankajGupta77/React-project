import React from 'react';

const About = () => {
  return (
    <div className="container mt-5">
        <div className="row">
            <div className="col-12 text-center mb-4">
                <h1>About Us</h1>
                <p className="lead">Learn more about our journey and our commitment to education.</p>
            </div>
        </div>
        <div className="row">
            <div className="col-md-6">
                <h2>Our Mission</h2>
                <p>
                    At LearnXpert, our mission is to provide high-quality, accessible, and affordable online courses that empower learners to achieve their goals. We believe in the power of education to transform lives and are dedicated to offering courses that are both engaging and effective.
                </p>
            </div>
            <div className="col-md-6">
                <h2>Why Choose Us?</h2>
                <ul className="list-unstyled">
                    <li><i className="fas fa-check-circle"></i> Expert Instructors: Learn from industry leaders and experienced educators.</li>
                    <li><i className="fas fa-check-circle"></i> Flexible Learning: Access courses anytime, anywhere, at your own pace.</li>
                    <li><i className="fas fa-check-circle"></i> Comprehensive Content: Courses designed to cover all essential topics with practical insights.</li>
                    <li><i className="fas fa-check-circle"></i> Community Support: Join a vibrant community of learners and get support when you need it.</li>
                </ul>
            </div>
        </div>
        <div className="row mt-5">
            <div className="col-12 text-center">
                <h2>Meet Our Team</h2>
                <div className="row">
                    <div className="col-md-4">
                        <div className="card">
                            <div className="card-body">
                                <h5 className="card-title">Pankaj Gupta</h5>
                                <p className="card-text">Founder & CEO</p>
                                <p className="card-text">PAnkaj is a passionate educator with over 4 years of experience in the industry. He leads our team with a vision to revolutionize online learning.</p>
                            </div>
                        </div>
                    </div>
                 
                </div>
            </div>
        </div>
    </div>
);
};

export default About;
