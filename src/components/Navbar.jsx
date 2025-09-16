// menu olusturma dosyasi 
import { useState } from "react";

export default function Navbar({ user, onLogout, onToggleTheme, theme }) {
  const [isOpen, setIsOpen] = useState(false); // menü açık mı kapalı mı

  return (
    <nav
      className={`navbar navbar-expand-lg ${
        theme === "light" ? "navbar-light bg-light" : "navbar-dark bg-dark"
      }`}
    >
      <div className="container">
        <a className="navbar-brand" href="#">
          Quiz App
        </a>

        {/* 3 çizgili menü butonu */}
        <button
          className="navbar-toggler"
          type="button"
          onClick={() => setIsOpen(!isOpen)} // menüyü aç kapa
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Açılır kapanır menü */}
        <div className={`collapse navbar-collapse ${isOpen ? "show" : ""}`}>
          <ul className="navbar-nav ms-auto align-items-center">
            <li className="nav-item me-2">
              <button className="btn btn-outline-info" onClick={onToggleTheme}>
                {theme === "light" ? "🌙 Dark Mode" : "☀️ Light Mode"}
              </button>
            </li>
            {user ? (
              <>
                <li className="nav-item">
                  <span className="nav-link">👤 {user}</span>
                </li>
                <li className="nav-item">
                  <button
                    className="btn btn-outline-danger ms-2"
                    onClick={onLogout}
                  >
                    Çıkış Yap 🚪
                  </button>
                </li>
              </>
            ) : (
              <li className="nav-item">
                <span className="nav-link">Giriş Yapınız</span>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}
