import React from 'react'

import { Link } from 'react-router-dom';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';


import pic1 from './pictures/pic1.jpg';
import pic2 from './pictures/pic2.jpg';
import pic3 from './pictures/pic3.jpeg';
import pic4 from './pictures/pic4.jpeg';
import pic5 from './pictures/pic5.jpeg';
import pic6 from './pictures/pic6.jpeg';
import pic7 from './pictures/pic7.jpeg';
import pic8 from './pictures/pic8.jpg';
import pic9 from './pictures/pic9.png';
import pic41 from './pictures/pic41.jpg';

function AdminHomePage() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll:1,
    autoplay: true,
    autoplaySpeed: 1000
  };

  return (
    <div>
      <header>
        <nav>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><a href="#about">About Us</a></li>
            <li><a href="#services">Services</a></li>
            <li><a href="#contact">Contact</a></li>
            <li><Link to="/dashboard">dashboard</Link></li>
          </ul>
        </nav>
      </header>

      <section id="home">
        <h3>Welcome to the Company where Your dream<b>Z</b> get matched</h3>
        <h1>MK Tech</h1>
        <Slider {...settings}>
        <div>
            <img src={pic1} alt="Slide 1"className="slider-image" />
          </div>
          <div>
            <img src={pic2} alt="Slide 1"className="slider-image" />
          </div>
          <div>
            <img src={pic3} alt="Slide 2"className="slider-image" />
          </div>
          <div>
            <img src={pic4} alt="Slide 3"className="slider-image" />
          </div>
          <div>
            <img src={pic5} alt="Slide 4"className="slider-image" />
          </div>
          <div>
            <img src={pic6} alt="Slide 5"className="slider-image" />
          </div>
          <div>
            <img src={pic7} alt="Slide 6"className="slider-image" />
          </div>
          <div>
            <img src={pic8} alt="Slide 1"className="slider-image" />
          </div><div>
            <img src={pic9} alt="Slide 1"className="slider-image" />
          </div><div>
            <img src={pic41} alt="Slide 1"className="slider-image" />
          </div>
        </Slider>
      
      </section>

      <section id="about"className="content">
        <h2>About Us</h2>
        <p>Welcome to our company! We are a dedicated team of professionals committed to providing the best services to our clients. Our mission is to deliver high-quality solutions that meet the needs and expectations of our customers. With years of experience in the industry, we pride ourselves on our expertise, reliability, and customer satisfaction.</p>
      </section>

      <section id="services"className="content">
        <h2>Services</h2>
        <ul>
          <li><strong>Consulting:</strong> Expert advice to help you achieve your business goals.</li>
          <li><strong>Project Management:</strong> Efficient management of your projects from start to finish.</li>
          <li><strong>Software Development:</strong> Custom software solutions designed to fit your specific requirements.</li>
          <li><strong>Support and Maintenance:</strong> Ongoing support to ensure your systems run smoothly.</li>
        </ul>
      </section>
      <section id="dashboard"className="content">
        <h2>DashBoard </h2>

        <Link to="/dashboard"><button className="buttonStyle">Click here!</button></Link>
        
      </section>
      <footer id="contact">
        <h2>Contact</h2>
        <ul>
          <li><strong>Email:</strong> mktech@gmail.com</li>
          <li><strong>Phone:</strong> 9245677890</li>
          <li><strong>Address:</strong></li>
          <ul>
            <li>12th Cross Park</li>
            <li>IT park</li>
            <li>Chennai, TamilNadu, 12345</li>
          </ul>
        </ul>
      </footer>
    </div>
  );
}

export default AdminHomePage
