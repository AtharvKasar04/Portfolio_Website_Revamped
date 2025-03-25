import { useState } from "react";
import "../assets/styles/Contact.css";

const Contact: React.FC = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        message: "",
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log("Form Submitted:", formData);
        // Add form submission logic here (e.g., API call)
        
        setFormData({
            name: "",
            email: "",
            message: "",
        });
    };

    return (
        <div className="contactMainContainer" id="contact">

            <h2 className="contactHeading">Contact Me</h2>

            <div className="form-container">

                <form className="form" onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="name">Full Name</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            placeholder="Your Name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            placeholder="Your Email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="message">Leave a Message</label>
                        <textarea
                            id="message"
                            name="message"
                            rows={4}
                            placeholder="Your Message"
                            value={formData.message}
                            onChange={handleChange}
                            required
                            minLength={25}
                        ></textarea>
                    </div>

                    <button className="form-submit-btn" type="submit">
                        Send Message
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Contact;
