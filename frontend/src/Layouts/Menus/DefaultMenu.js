// Layouts/Menus/AdminMenu.js
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export function useDefaultMenu(isCurrentState, setIscurrentState) {
  const history = useNavigate();

  useEffect(() => {
    // State management
    // if (isCurrentState === "adminDashboard") {
    //   history("/dashboard");
    //   document.body.classList.add("twocolumn-panel");
    // }
    if (isCurrentState === "adminElections") {
      history("/elections");
      document.body.classList.add("twocolumn-panel");
    }
    if (isCurrentState === "adminCandidates") {
      history("/candidates");
      document.body.classList.add("twocolumn-panel");
    }
    if (isCurrentState === "adminCampaigns") {
      history("/campaigns");
      document.body.classList.add("twocolumn-panel");
    }
    if (isCurrentState === "adminUsers") {
      history("/admin/users");
      document.body.classList.add("twocolumn-panel");
    }
  }, [history, isCurrentState]);

  return [
    {
      label: "قائمة الإدارة",
      isHeader: true,
    },
    // {
    //   id: "adminDashboard",
    //   label: "لوحة التحكم",
    //   icon: "ri-dashboard-line",
    //   link: "/dashboard",
    //   click: function (e) {
    //     e.preventDefault();
    //     setIscurrentState("adminDashboard");
    //   },
    // },
    {
      id: "messeges",
      label: "Messeges",
      icon: "ri-dashboard-line",
      link: "/admin/messeges",
      click: function (e) {
        e.preventDefault();
        setIscurrentState("messeges");
      },
    },
    {
      id: "Users",
      label: "Users",
      icon: "ri-dashboard-line",
      link: "/admin/users",
      click: function (e) {
        e.preventDefault();
        setIscurrentState("users");
      },
    },
    {
      id: "chat-room-grid",
      label: "Chat Room Grid",
      icon: "ri-dashboard-line",
      link: "/admin/chat-room-grid",
      click: function (e) {
        e.preventDefault();
        setIscurrentState("ChatRoomGrid");
      },
    },
    {
      id: "chat-rooms",
      label: "Chat Rooms",
      icon: "ri-dashboard-line",
      link: "/admin/chat-rooms",
      click: function (e) {
        e.preventDefault();
        setIscurrentState("ChatRooms");
      },
    },
  ];
}
