import { useEffect, useRef, useState } from "react";
import "./navigation.scss";
import { Link } from "react-router-dom";

export function Menubar({ showMenu }) {
  const menuContainer = useRef(null);
  const mainMenu = useRef(null);
  const systemMenu = useRef(null);
  const [menuItems, setMenuItems] = useState(["", "", ""]);
  const [systemItems, setSystemItems] = useState([""]);
  const [linkName, setLinkName] = useState([
    "dashboard",
    "profit",
    "transactions",
    "invest",
    "refer",
  ]);

  const [systemLink, setSystemLink] = useState(["settings", "login"]);

  useEffect(() => {
    if (showMenu) {
      spread();
    } else {
      unSpread();
    }
  }, [showMenu]);
  useEffect(() => {
    if (mainMenu.current && sessionStorage.getItem("mainmenu")) {
      mainMenu.current.children[
        sessionStorage.getItem("mainmenu")
      ].firstChild.classList = "mainMenuItemsIcon activeMenu";
      mainMenu.current.children[sessionStorage.getItem("mainmenu")].classList =
        "mainMenuItems activeMenu";
    }
    if (systemMenu.current && sessionStorage.getItem("systemmenu")) {
      systemMenu.current.children[
        sessionStorage.getItem("systemmenu")
      ].firstChild.classList = "mainMenuItemsIcon activeMenu";
      systemMenu.current.children[
        sessionStorage.getItem("systemmenu")
      ].classList = "mainMenuItems activeMenu";
    }
  }, [menuItems]);

  const [menuIcons, setMenuIcons] = useState([
    "home_app_logo",
    "monitoring",
    "settings",
  ]);
  const [systemIcons, setSystemIcons] = useState(["light_mode"]);

  const spread = () => {
    menuContainer.current.id = "spread";
    menuContainer.current.parentElement.id = "spreadParent";
    // setTimeout(() => {
    setMenuItems(["Dashboard", "Task Insight", "Settings"]);
    setSystemItems(["Light Mode"]);
  };
  const [browserWidth, setBrowserWidth] = useState(window.innerWidth);
  useEffect(() => {
    window.addEventListener("resize", () => {
      setBrowserWidth(window.innerWidth);
    });
    if (browserWidth >= 1240) {
      spread();
    } else {
      unSpread();
    }
  }, [browserWidth]);

  const unSpread = () => {
    if (browserWidth < 1240 && !showMenu) {
      menuContainer.current.id = "";
      menuContainer.current.parentElement.id = "";
      setMenuItems(["", "", ""]);
      setSystemItems([""]);
    }
  };

  return (
    <div className="dashboardMenuContainer">
      <div
        ref={menuContainer}
        className="dashboardMenu"
        onMouseEnter={spread}
        onMouseLeave={unSpread}
      >
        <div className="logo">
          <i className="fa-solid fa-check-double"></i>
        </div>
        <div className="mainMenu" ref={mainMenu}>
          {menuItems.map((name, index) => (
            <Link
              to={`/${linkName[index]}`}
              className="mainMenuItems"
              key={name + index.toString()}
            >
              <div className="mainMenuItemsIcon">
                <span className="material-symbols-outlined">
                  {menuIcons[index]}
                </span>
              </div>
              <div className="mainMenuItemsText">{name}</div>
            </Link>
          ))}
        </div>
        <div className="systemMenu" ref={systemMenu}>
          {systemItems.map((name, index) => (
            <Link
              className="mainMenuItems"
              key={name + index}
              to={`/${systemLink[index]}`}
            >
              <div className="mainMenuItemsIcon">
                <span className="material-symbols-outlined">
                  {systemIcons[index]}
                </span>
              </div>
              <div className="mainMenuItemsText">{name}</div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

export function Head({ showMenu }) {
  const [browserWidth, setBrowserWidth] = useState(window.innerWidth);
  const [menuState, setMenuState] = useState(false);
  const menuElement = useRef(null);
  useEffect(() => {
    window.addEventListener("resize", () => {
      setBrowserWidth(window.innerWidth);
    });
  }, [browserWidth]);

  const clickedMenu = (e) => {
    showMenu(!menuState);
    setMenuState(!menuState);
  };
  const customBlur = (e) => {
    if (
      menuElement.current &&
      e.target !== menuElement.current &&
      !menuElement.current.contains(e.target)
    ) {
      showMenu(false);
      setMenuState(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", customBlur);

    return () => {
      document.removeEventListener("click", customBlur);
    };
  }, []);

  return (
    <div className="dashboardHead">
      
      {browserWidth < 1240 && (
        <div ref={menuElement} className="headMenuBar" onClick={clickedMenu}>
          <i className="fa-solid fa-bars"></i>{" "}
        </div>
      )}
      <div className="top-header">
        <label className="search">
          <input
            type="text"
            name="search"
            id="searchbox"
            placeholder={"Search Task"}
          />
          <i className="fa-solid fa-magnifying-glass"></i>
        </label>
        <div className="notification">
          <span className="notification-number">2</span>
          <i className="fa-regular fa-bell"></i>
        </div>
      </div>
    </div>
  );
}

export default function Navbar() {
  const [browserWidth, setBrowserWidth] = useState(window.innerWidth);
  const [ShowMenu, setShowMenu] = useState(false);
  window.addEventListener("resize", () => {
    setBrowserWidth(window.innerWidth);
  });
  const showmenu = (e) => {
    setShowMenu(e);
  };

  return (
    <>
      <Head showMenu={showmenu} />
      <Menubar showMenu={ShowMenu} />
    </>
  );
}
