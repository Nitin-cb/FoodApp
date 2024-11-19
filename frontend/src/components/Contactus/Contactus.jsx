import React, { useState } from 'react'
import { assets } from '../../assets/assets'
import './Contactus.css'
import emailjs from "emailjs-com"

const Contactus = () => {

    const [formData, setFormData] = useState({
        name: "",
        phone: "",
        email: "",
        subject: "",
      });

      const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
      };

      const handleSubmit = (e) => {
        e.preventDefault();
    
        emailjs
          .send(
            "service_z7d13zb", 
            "template_597j7bq", 
            formData,
            "NuQgh3GZGpWwSFJ4z" 
          )
          .then(
            (response) => {
              console.log("SUCCESS!", response.status, response.text);
              setFormData({
                name: '',
                phone: '',
                email: '',
                subject: '',
              });
              alert("Message sent successfully!");
            },
            (error) => {
              console.error("FAILED...", error);
              alert("Failed to send message. Please try again.");
            }
          );
      };
    

  return (
    <div className='contact' id='contact'>
    <div className="contact-content">
      <div className="contact-content-left">
          <img src={assets.logo} alt="" />
          <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p>
          <div className="contact-content-right">
          <h2>GET IN TOUCH WITH US</h2>
          <ul>
                <h3>Phone</h3>
              <li>+1-212-456-7890</li>
              <h3>E-mail</h3>
              <li>contact@tomato.com</li>
          </ul>
      </div>
          <div className="contact-social-icons">
            <h2>Follow Us On</h2>
            <div className='icons'>
              <img src={assets.facebook_icon} alt="" />
              <img src={assets.twitter_icon} alt="" />
              <img src={assets.linkedin_icon} alt="" />
              </div>
          </div>
      </div>
      
      
    </div>
    <div className="contact-form">
          <h1>Let's Talk Business...</h1>
          <form onSubmit={handleSubmit}>
          <div className="form-row">
            
            <input type="text" id="name" name="name" placeholder="Your Name" value={formData.name}
            onChange={handleChange} required />
          
          
            
            <input type="tel" id="phone" name="phone" placeholder="Your Phone Number" value={formData.phone}
            onChange={handleChange} required />
            </div>
          <div className="form-group">
            
            <input type="email" id="email" name="email" placeholder="Your Email Address" value={formData.email}
            onChange={handleChange} required />
          </div>
          <div className="form-group">
            
            <textarea type="text" id="subject" name="subject" placeholder="Why you want to work with us" value={formData.subject}
            onChange={handleChange} required />
          </div>
          <button type="submit"  className="submit-button">Submit</button>
        </form>
      </div>
  </div>
  )
}

export default Contactus
