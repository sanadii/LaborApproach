import React, { useState, useEffect, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { userSelector, chatSelector } from 'Selectors';
import useWebSocket from 'react-use-websocket';
import { Button, Input, DropdownToggle, DropdownMenu, Dropdown, DropdownItem, Row, Col, Card, CardBody, UncontrolledDropdown } from "reactstrap";
import { Link } from "react-router-dom";
import { isEmpty, map } from "lodash";
import FeatherIcon from "feather-icons-react";

import userDummayImage from "assets/images/users/avatar-2.jpg";

const ChatMainTopBar = ({
    backToUserChat,
    Chat_Box_Username,
    currentRoomId,
    socketUrl,
}) => {

    const dispatch = useDispatch();

    // State Declarations
    const { messages } = useSelector(chatSelector);
    const { currentUser } = useSelector(userSelector);

    const [search_Menu, setsearch_Menu] = useState(false);
    const [settings_Menu, setsettings_Menu] = useState(false);
    const [isInfoDetails, setIsInfoDetails] = useState(false);
    const [user, setUser] = useState({
        name: currentUser.name,
        id: currentUser.id,
        isActive: true,
    });


    // ChatBox Upper Control
    const toggleSearch = () => {
        setsearch_Menu(!search_Menu);
    };

    const toggleSettings = () => {
        setsettings_Menu(!settings_Menu);
    };

    //Info details offcanvas
    const toggleInfo = () => {
        setIsInfoDetails(!isInfoDetails);
    };



    //Search Message
    const searchMessages = () => {
        var searchInput, searchFilter, searchUL, searchLI, a, i, txtValue;
        searchInput = document.getElementById("searchMessage");
        searchFilter = searchInput.value.toUpperCase();
        searchUL = document.getElementById("users-conversation");
        searchLI = searchUL.getElementsByTagName("li");
        Array.prototype.forEach.call(searchLI, function (search) {
            a = search.getElementsByTagName("p")[0] ? search.getElementsByTagName("p")[0] : '';
            txtValue = a.textContent || a.innerText ? a.textContent || a.innerText : '';
            if (txtValue.toUpperCase().indexOf(searchFilter) > -1) {
                search.style.display = "";
            } else {
                search.style.display = "none";
            }
        });
    };



    return (
        <div className="p-3 user-chat-topbar">
            <Row className="align-items-center">
                <Col sm={4} xs={8}>
                    <div className="d-flex align-items-center">
                        <div className="flex-shrink-0 d-block d-lg-none me-3">
                            <Link
                                to="#"
                                onClick={backToUserChat}
                                className="user-chat-remove fs-18 p-1"
                            >
                                <i className="ri-arrow-left-s-line align-bottom"></i>
                            </Link>
                        </div>
                        <div className="flex-grow-1 overflow-hidden">
                            <div className="d-flex align-items-center">
                                <div className="flex-shrink-0 chat-user-img online user-own-img align-self-center me-3 ms-0">
                                    {userDummayImage === undefined ? (
                                        <img
                                            src={userDummayImage}
                                            className="rounded-circle avatar-xs"
                                            alt=""
                                        />
                                    ) : (
                                        <img
                                            src={userDummayImage}
                                            className="rounded-circle avatar-xs"
                                            alt=""
                                        />
                                    )}
                                    <span className="user-status"></span>
                                </div>
                                <div className="flex-grow-1 overflow-hidden">
                                    <h5 className="text-truncate mb-0 fs-16">
                                        <a
                                            className="text-reset username"
                                            data-bs-toggle="offcanvas"
                                            href="#userProfileCanvasExample"
                                            aria-controls="userProfileCanvasExample"
                                        >
                                            {Chat_Box_Username}
                                        </a>
                                    </h5>
                                    <p className="text-truncate text-muted fs-14 mb-0 userStatus">
                                        <small>Online</small>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </Col>
                <Col sm={8} xs={4}>
                    <ul className="list-inline user-chat-nav text-end mb-0">
                        <li className="list-inline-item m-0">
                            <Dropdown
                                isOpen={search_Menu}
                                toggle={toggleSearch}
                            >
                                <DropdownToggle
                                    className="btn btn-ghost-secondary btn-icon"
                                    tag="button"
                                >
                                    <FeatherIcon
                                        icon="search"
                                        className="icon-sm"
                                    />
                                </DropdownToggle>
                                <DropdownMenu className="p-0 dropdown-menu-end dropdown-menu-lg">
                                    <div className="p-2">
                                        <div className="search-box">
                                            <Input
                                                onKeyUp={searchMessages}
                                                type="text"
                                                className="form-control bg-light border-light"
                                                placeholder="Search here..."
                                                id="searchMessage"
                                            />
                                            <i className="ri-search-2-line search-icon"></i>
                                        </div>
                                    </div>
                                </DropdownMenu>
                            </Dropdown>
                        </li>

                        <li className="list-inline-item d-none d-lg-inline-block m-0">
                            <button
                                type="button"
                                className="btn btn-ghost-secondary btn-icon"
                                onClick={toggleInfo}
                            >
                                <FeatherIcon icon="info" className="icon-sm" />
                            </button>
                        </li>

                        <li className="list-inline-item m-0">
                            <Dropdown
                                isOpen={settings_Menu}
                                toggle={toggleSettings}
                            >
                                <DropdownToggle
                                    className="btn btn-ghost-secondary btn-icon"
                                    tag="button"
                                >
                                    <FeatherIcon
                                        icon="more-vertical"
                                        className="icon-sm"
                                    />
                                </DropdownToggle>
                                <DropdownMenu>
                                    <DropdownItem
                                        href="#"
                                        className="d-block d-lg-none user-profile-show"
                                    >
                                        <i className="ri-user-2-fill align-bottom text-muted me-2"></i>{" "}
                                        View Profile
                                    </DropdownItem>
                                    <DropdownItem href="#">
                                        <i className="ri-inbox-archive-line align-bottom text-muted me-2"></i>{" "}
                                        Archive
                                    </DropdownItem>
                                    <DropdownItem href="#">
                                        <i className="ri-mic-off-line align-bottom text-muted me-2"></i>{" "}
                                        Muted
                                    </DropdownItem>
                                    <DropdownItem href="#">
                                        {" "}
                                        <i className="ri-delete-bin-5-line align-bottom text-muted me-2"></i>{" "}
                                        Delete
                                    </DropdownItem>
                                </DropdownMenu>
                            </Dropdown>
                        </li>
                    </ul>
                </Col>
            </Row>
        </div>
    )
}

export default ChatMainTopBar;