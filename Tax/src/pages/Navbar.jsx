import { useState } from "react";
import { motion } from "framer-motion";
import "./styles.css";

export default function Navbar() {
  const [active, setActive] = useState("home");

  const navItems = [
    { name: "Home", id: "home" },
    { name: "About", id: "about" },
    { name: "Help", id: "help" },
  ];

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <h1 className="navbar-title">Tax Portal</h1>
        <ul className="navbar-menu">
          {navItems.map((item) => (
            <motion.li
              key={item.id}
              className={`navbar-item ${active === item.id ? "active" : ""}`}
              onClick={() => setActive(item.id)}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              {item.name}
            </motion.li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
