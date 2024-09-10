import React, { useState, useEffect } from "react";
import { Select } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { LogoutOutlined } from "@ant-design/icons";
import { decodeToken } from "../utils/functions";
import Products from "./Products";

import "./styles.css";

export const Navbar = () => {
  const [showNavbar, setShowNavbar] = useState(false);
  const { t, i18n } = useTranslation();
  const [admin, setAdmin] = useState(null);
  const navigate = useNavigate();

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  useEffect(() => {
    try {
      setAdmin(decodeToken());
    } catch (e) {
      console.error(e);
    }
  }, []);

  const logOut = () => {
    localStorage.removeItem("access_token");
    navigate("/login");
  };

  const handleShowNavbar = () => setShowNavbar(!showNavbar);

  const flags = ["flag_de", "flag_ru", "flag_en-US"];

  const options = [
    {
      label: (
        // eslint-disable-next-line jsx-a11y/alt-text
        <img
          style={{
            width: "25px",
          }}
          src="/images/flags/flag_de.svg"
        />
      ),
      value: "de",
    },
    {
      label: (
        // eslint-disable-next-line jsx-a11y/alt-text
        <img
          style={{
            width: "25px",
          }}
          src="/images/flags/flag_ru.svg"
        />
      ),
      value: "ru",
    },
    {
      label: (
        // eslint-disable-next-line jsx-a11y/alt-text
        <img
          style={{
            width: "25px",
          }}
          src="/images/flags/flag_en-US.svg"
        />
      ),
      value: "en",
    },
  ];

  return (
    <nav className="navbar">
      <div className="container">
        <div className="logo">
          <Logo />
        </div>
        <div className="menu-icon" id="Rectangle0" onClick={handleShowNavbar}>
          <Hamburger />
        </div>
        <div className={`nav-elements  ${showNavbar && "active"}`}>
          <ul>
            <li>
              <Link to="/" onClick={handleShowNavbar}>
                {t("Home")}
              </Link>
            </li>
            <li>
              <Link to="/about" onClick={handleShowNavbar}>
                {t("About")}
              </Link>
            </li>
            <li>
              <Products handleShowNavbar={handleShowNavbar} />
            </li>
            <li>
              <Link to="/catalogue" onClick={handleShowNavbar}>
                {t("Catalogue")}
              </Link>
            </li>
            {admin ? (
              <>
                <li>
                  <Link to="/admin" onClick={handleShowNavbar}>
                    {t("Admin")}
                  </Link>
                </li>
                <li onClick={logOut}>
                  <Link to="/admin" onClick={handleShowNavbar}>
                    {t("Log out")} <LogoutOutlined />
                  </Link>
                </li>
              </>
            ) : (
              <li>
                <Link to="/login" onClick={handleShowNavbar}>
                  {t("Login")}
                </Link>
              </li>
            )}
            <li>
              <Select
                placeholder={
                  // eslint-disable-next-line jsx-a11y/alt-text
                  <img
                    style={{
                      width: "25px",
                    }}
                    src={`/images/flags/flag_${!!flags[i18n?.language] ? i18n?.language : "en-US"}.svg`}
                  />
                }
                onChange={changeLanguage}
                options={options}
              />
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

const Hamburger = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="52"
    height="24"
    viewBox="0 0 52 24"
  >
    <g id="Group_9" data-name="Group 9" transform="translate(-294 -47)">
      <rect
        id="Rectangle_3"
        data-name="Rectangle 3"
        width="42"
        height="4"
        rx="2"
        transform="translate(304 47)"
        fill="#574c4c"
      />
      <rect
        id="Rectangle_5"
        data-name="Rectangle 5"
        width="42"
        height="4"
        rx="2"
        transform="translate(304 67)"
        fill="#574c4c"
      />
      <rect
        id="Rectangle_4"
        data-name="Rectangle 4"
        width="52"
        height="4"
        rx="2"
        transform="translate(294 57)"
        fill="#574c4c"
      />
    </g>
  </svg>
);

const Logo = () => (
  <img
    src="/images/logo.png"
    alt=""
    style={{
      width: "150px",
    }}
  />
);
