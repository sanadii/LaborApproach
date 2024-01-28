// Layouts/Menus/AdminMenu.js
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export function useAdminMenu(isCurrentState, setIscurrentState) {
  const history = useNavigate();

  useEffect(() => {
    // State management
    if (isCurrentState === "attendance") {
      history("/attendance");
      document.body.classList.add("twocolumn-panel");
    }
  }, [history, isCurrentState]);

  return [
    {
      id: "attendance",
      label: "الحضور",
      icon: "ri-honour-line",
      link: "/attendance",
      click: function (e) {
        e.preventDefault();
        setIscurrentState("attendance");
      },
    },
  ];
}
