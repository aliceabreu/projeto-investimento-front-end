import React, { useState } from "react";
import { Menu, X } from "lucide-react";
import "./Header.css";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="header">
      <div className="logo" alt="Logo"></div>

      {/* Botão Menu Mobile */}
      <button className="menu-button" onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? <X size={28} /> : <Menu size={28} />}
      </button>

      {/* Menu de navegação */}
      <nav className={`right-side-header ${isOpen ? "open" : ""}`}>
        <ul>
          <li><a href="#home">Home</a></li>
          <li><a href="#about">Quem somos</a></li>
          <li><a href="#services">Consultoria</a></li>
          <li><a href="#faq">Tire suas dúvidas</a></li>
        </ul>
        <button className="cta-button">Entrar em Contato</button>
      </nav>
    </header>
  );
};

export default Header;
