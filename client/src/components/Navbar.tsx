import "../assets/styles/Navbar.css";
import profileImg from "../assets/images/IMG_7547.jpg";
import { useEffect, useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";

const Navbar: React.FC = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    const [scrollWidth, setScrollWidth] = useState(0);

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    const scrollToSection = (id: string) => {
        const section = document.getElementById(id);
        if (section) {
            section.scrollIntoView({ behavior: "smooth" });
        }
        setMenuOpen(false);
    };

    useEffect(() => {
        const handleScroll = () => {
            const scrollTop = window.scrollY;
            const docHeight = document.documentElement.scrollHeight - window.innerHeight;
            const scrollPercent = (scrollTop / docHeight) * 100;
            setScrollWidth(scrollPercent);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <>
            <div className="navbar">
                <div className="navbarLeft">
                    <img src={profileImg} alt="profileImg" className="profile-img"/>
                </div>

                <ul className={menuOpen ? "nav-links open" : "nav-links"}>
                    <li onClick={() => scrollToSection("home")}>Home</li>
                    <li onClick={() => scrollToSection("profile")}>Profile</li>
                    <li onClick={() => scrollToSection("work")}>Work</li>
                    <li onClick={() => scrollToSection("skills")}>Skills</li>
                    <li onClick={() => scrollToSection("contact")}>Contact</li>
                </ul>

                <div className="menu-icon" onClick={toggleMenu}>
                    {menuOpen ? <FaTimes /> : <FaBars />}
                </div>

                <div className="scroll-progress" style={{ width: `${scrollWidth}%` }}></div>
            </div>
        </>
    )
}

export default Navbar
