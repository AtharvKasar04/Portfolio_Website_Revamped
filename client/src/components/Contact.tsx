import { useState, useEffect, useRef } from "react";
import { motion, useAnimation } from "framer-motion";
import "../assets/styles/Contact.css";
import axios from "axios";

const Contact: React.FC = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        message: "",
    });

    const controls = useAnimation();
    const formRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    controls.start("visible");
                } else {
                    controls.start("hidden");
                }
            },
            { threshold: 0.3 }
        );

        if (formRef.current) {
            observer.observe(formRef.current);
        }

        return () => {
            if (formRef.current) {
                observer.unobserve(formRef.current);
            }
        };
    }, [controls]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            const response = await axios.post("http://localhost:5001/api/contact", formData);
            if (response.status === 200) {
                setFormData({
                    name: "",
                    email: "",
                    message: "",
                });

                alert("Email sent successfully!");
            }
        } catch (error) {
            console.error("Error sending email:", error);
            alert("Failed to send email. Please try again.");
        }

        console.log("Form Submitted:", formData);
    };

    return (
        <motion.div
            className="contactMainContainer"
            id="contact"
            ref={formRef}
            initial="hidden"
            animate={controls}
            variants={{
                hidden: { opacity: 0, y: 30 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
            }}
        >
            <motion.h2 className="contactHeading"
                variants={{
                    hidden: { opacity: 0, y: -20 },
                    visible: { opacity: 1, y: 0, transition: { delay: 0.1, duration: 0.5 } }
                }}
            >
                Contact Me
            </motion.h2>

            <motion.div className="form-container"
                variants={{
                    hidden: { opacity: 0, scale: 0.9 },
                    visible: { opacity: 1, scale: 1, transition: { delay: 0.2, duration: 0.5 } }
                }}
            >
                <form className="form" onSubmit={handleSubmit}>
                    <motion.div className="form-group"
                        variants={{
                            hidden: { opacity: 0, x: -30 },
                            visible: { opacity: 1, x: 0, transition: { delay: 0.3, duration: 0.5 } }
                        }}
                    >
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
                    </motion.div>

                    <motion.div className="form-group"
                        variants={{
                            hidden: { opacity: 0, x: 30 },
                            visible: { opacity: 1, x: 0, transition: { delay: 0.4, duration: 0.5 } }
                        }}
                    >
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
                    </motion.div>

                    <motion.div className="form-group"
                        variants={{
                            hidden: { opacity: 0, y: 30 },
                            visible: { opacity: 1, y: 0, transition: { delay: 0.5, duration: 0.5 } }
                        }}
                    >
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
                    </motion.div>

                    <motion.button
                        className="form-submit-btn"
                        type="submit"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        variants={{
                            hidden: { opacity: 0, y: 20 },
                            visible: { opacity: 1, y: 0, transition: { delay: 0.2, duration: 0.5 } }
                        }}
                    >
                        Send Message
                    </motion.button>
                </form>
            </motion.div>
        </motion.div>
    );
};

export default Contact;
