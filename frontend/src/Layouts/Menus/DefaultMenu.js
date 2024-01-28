// Layouts/Menus/AdminMenu.js
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export function useDefaultMenu(isCurrentState, setIscurrentState) {
  const history = useNavigate();

  useEffect(() => {
    if (isCurrentState === "home") {
      history("/");
      document.body.classList.add("twocolumn-panel");
    }
    if (isCurrentState === "about") {
      history("/about");
      document.body.classList.add("twocolumn-panel");
    }
    if (isCurrentState === "contact") {
      history("/contact");
      document.body.classList.add("twocolumn-panel");
    }
  }, [history, isCurrentState]);

  return [
     {
      id: "home",
      label: "الرئيسية",
      icon: "ri-dashboard-line",
      link: "/",
      click: function (e) {
        e.preventDefault();
        setIscurrentState("home");
      },
    },
    {
      id: "about",
      label: "عن القائمة",
      icon: "ri-dashboard-line",
      link: "/about",
      click: function (e) {
        e.preventDefault();
        setIscurrentState("about");
      },
    },
    {
      id: "contact",
      label: "تواصل معنا",
      icon: "ri-dashboard-line",
      link: "/contact",
      click: function (e) {
        e.preventDefault();
        setIscurrentState("contact");
      },
    },
    
  ];
}
