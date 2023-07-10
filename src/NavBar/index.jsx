import { useState } from "react";
import Logo from "../assets/Logo.svg";
import UserCase1 from "../UserCase1";
import UserCase3 from "../UserCase3";
import "./style.css";

const tabs = [
  {
    name: "Technical Use Cases",
    data: <UserCase1 />,
  },
  {
    name: "Business Use Cases",
    data: <UserCase3 />,
  },
];

const NavBar = () => {
  const [activeTab, setActiveTab] = useState(0);
  const handleTabClick = (index) => {
    setActiveTab(index);
  };
  return (
    <div className="main-container">
      <div className="nav-bar">
        <img src={Logo} className="company-logo" />

        <div className="nav-bar-items">
          {tabs.map((tab, index) => (
            <div key={index} className="navbar-items">
              <a
                className={
                  activeTab === index ? "color-text active" : "normal-text"
                }
                key={index}
                onClick={() => handleTabClick(index)}
              >
                {tab.name}
              </a>

              <div className="animation"></div>
            </div>
          ))}
        </div>
      </div>
      <div>{tabs[activeTab].data}</div>
    </div>
  );
};

export default NavBar;
