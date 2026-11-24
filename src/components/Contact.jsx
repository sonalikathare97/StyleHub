import {useRef} from "react";
import emailjs from "@emailjs/browser";


function Contact() {
  const form =useRef();

  const sendEmail =(e) => {
e.preventDefault();

emailjs
 .sendForm(
  "service_lcvy46y",
  "template_smumelw",
   form.current,
   {
    publicKey: "Pl9O2L519aJgZMZWx",
    
   }
 )
 .then(
  () =>{
    alert("Message sent successfully!");
    e.target.reset();
  },
  (error) => {
     console.log(error);
     alert("Failed to send message. Please try again.");
  }
 );

  };


  return (
    <div className="contact-page">

      <section className="contact-hero">
        <h1>CONTACT US</h1>
        <p>We would love to hear from you!</p>
      </section>

      <section className="contact-content">

        <div className="contact-info">
          <h2>Get In Touch</h2>
          <p>
            Have a question about our products or your order?
            Feel free to contact us.
          </p>

          <div className="contact-details">
            <p>📍 Pune, Maharashtra</p>
            <p>📞 +91 98765 43210</p>
            <p>✉️ stylehub@gmail.com</p>
          </div>
        </div>

        <form ref={form}
          onSubmit={sendEmail}
          className="contact-form">
        
       
          <h2>Send Us a Message</h2>

          <input type="text" name ="name" placeholder="Your Name" required/>
          <input type="email" name="email" placeholder="Your Email" required/>
          <input type="text" name="subject"  placeholder="Subject" required/>
          <textarea name="message" placeholder="Your Message" required></textarea>

          <button type="submit">Send Message</button>
          </form>
        

      </section>

    </div>
  );
}

export default Contact;