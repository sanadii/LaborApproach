// Layouts/LayoutMenuData.js
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux"; // Don't forget to import useSelector
import { useNavigate } from "react-router-dom";
import { updateIconSidebar } from './Menus/utils';  // adjust the path according to your directory structure
import { userSelector } from 'Selectors';

// Menus
import { useAdminMenu } from './Menus/AdminMenu';
import { useDefaultMenu } from './Menus/DefaultMenu';
import { useSettingsMenu } from './Menus/SettingsMenu';

const Navdata = () => {
  const history = useNavigate();
  //state for collapsable menus

  const { isStaff } = useSelector(userSelector);
  const [isCurrentState, setIscurrentState] = useState("Dashboard");

 
  const [isSettings, setIsSettings] = useState(false);

  useEffect(() => {
    document.body.classList.remove("twocolumn-panel");

    if (isCurrentState !== "settings") {
      setIsSettings(false);
    }
  }, [history, isCurrentState, isSettings]);

  // Menus Constants
  const DefaultMenu = useDefaultMenu(setIscurrentState);
  const AdminMenu = useAdminMenu(setIscurrentState);
  const SettingsMenu = useSettingsMenu(isCurrentState, setIscurrentState, setIsSettings, isSettings);

  const menuItems = [
    ...DefaultMenu,
    ...(isStaff ? AdminMenu : []),
    // ...(isAdmin || isEditor ? EditorMenu : []),
    // ...(isAdmin || isModerator ? ModeratorMenu : []),
    // ...(isAdmin || isContributor ? ContributorMenu : []),
    // ...(canViewCampaign || isSubscriber ? CampaignMenu : []),

  ];

  return <React.Fragment>{menuItems}</React.Fragment>;
};
export default Navdata;