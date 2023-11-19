import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { userSelector, chatSelector } from 'Selectors';

import {
    Button, UncontrolledTooltip,
    DropdownToggle, DropdownMenu, DropdownItem,
    UncontrolledDropdown,
    Nav, NavItem, NavLink, TabContent, TabPane
} from "reactstrap";

import { Link } from "react-router-dom";
import SimpleBar from "simplebar-react";
import classnames from "classnames";
import { chatContactData } from "data/chat";
import { getChatRooms, getDirectContact, getMessages } from "store/actions";


import avatar2 from "assets/images/users/avatar-2.jpg";


// Components
import SideBarChatRooms from "./SideBarChatRooms";


const ChatLeftSideBar = ({
    currentRoomId,
    setCurrentRoomId,
    setChatBoxUsername,
    userChatShow,
    setSocketUrl,
}) => {
    const dispatch = useDispatch();

    const [chatBoxImage, setChatBoxImage] = useState(avatar2);
    const { chatRooms } = useSelector(chatSelector);
    const [isInChatRoom, setIsInChatRoom] = useState(false);

    // Fetch Chat Rooms
    useEffect(() => {
        if (chatRooms.length === 0) {
            dispatch(getChatRooms());
        }
    }, [dispatch, chatRooms]);

    const userChatOpen = (chat) => {
        const { id, name, uuid: roomUuid, image } = chat;
        console.log("id", id, "name", name, "roomUuid", roomUuid, "image", image);
        setIsInChatRoom(true);
        setSocketUrl(`ws://127.0.0.1:8000/ws/${roomUuid}/`); // Use the passed roomUuid

        setChatBoxUsername(name);
        setCurrentRoomId(roomUuid);
        setChatBoxImage(image);
        dispatch(getMessages(id));

        if (window.innerWidth < 892) {
            userChatShow.current.classList.add("user-chat-show");
        }
    };

    //serach recent user
    const searchUsers = () => {
        var input, filter, ul, li, a, i, txtValue;
        input = document.getElementById("search-user");
        filter = input.value.toUpperCase();
        var userList = document.getElementsByClassName("users-list");
        Array.prototype.forEach.call(userList, function (el) {
            li = el.getElementsByTagName("li");
            for (i = 0; i < li.length; i++) {
                a = li[i].getElementsByTagName("a")[0];
                txtValue = a.textContent || a.innerText;
                if (txtValue.toUpperCase().indexOf(filter) > -1) {
                    li[i].style.display = "";
                } else {
                    li[i].style.display = "none";
                }
            }
        });
    };

    const [customActiveTab, setcustomActiveTab] = useState("1");

    const toggleCustom = (tab) => {
        if (customActiveTab !== tab) {
            setcustomActiveTab(tab);
        }
    };

    return (
        <div className="chat-leftsidebar">
            <div className="px-4 pt-4 mb-3">
                <div className="d-flex align-items-start">
                    <div className="flex-grow-1">
                        <h5 className="mb-4">Chats</h5>
                    </div>
                    <div className="flex-shrink-0">
                        <UncontrolledTooltip placement="bottom" target="addcontact">
                            Add Contact
                        </UncontrolledTooltip>

                        <Button
                            color=""
                            id="addcontact"
                            className="btn btn-soft-success btn-sm shadow-none"
                        >
                            <i className="ri-add-line align-bottom"></i>
                        </Button>
                    </div>
                </div>
                <div className="search-box">
                    <input
                        onKeyUp={searchUsers}
                        id="search-user"
                        type="text"
                        className="form-control bg-light border-light"
                        placeholder="Search here..."
                    />
                    <i className="ri-search-2-line search-icon"></i>
                </div>
            </div>


            <Nav tabs className="nav nav-tabs nav-tabs-custom nav-success nav-justified mb-3">
                <NavItem>
                    <NavLink
                        style={{ cursor: "pointer" }}
                        className={classnames({
                            active: customActiveTab === "1",
                        })}
                        onClick={() => {
                            toggleCustom("1");
                        }}
                    >
                        Chats
                    </NavLink>
                </NavItem>
                <NavItem>
                    <NavLink
                        style={{ cursor: "pointer" }}
                        className={classnames({
                            active: customActiveTab === "2",
                        })}
                        onClick={() => {
                            toggleCustom("2");
                        }}
                    >
                        Contacts
                    </NavLink>
                </NavItem>
            </Nav>

            <TabContent
                activeTab={customActiveTab}
                className="text-muted"
            >
                <TabPane tabId="1" id="chats">
                    <SimpleBar
                        className="chat-room-list pt-3"
                        style={{ margin: "-16px 0px 0px" }}
                    >
                        <div className="d-flex align-items-center px-4 mb-2">
                            <div className="flex-grow-1">
                                <h4 className="mb-0 fs-11 text-muted text-uppercase">
                                    Direct Messages
                                </h4>
                            </div>
                            <div className="flex-shrink-0">
                                <UncontrolledTooltip placement="bottom" target="addnewmsg">
                                    New Message
                                </UncontrolledTooltip>

                                <button
                                    type="button"
                                    id="addnewmsg"
                                    className="btn btn-soft-success btn-sm"
                                >
                                    <i className="ri-add-line align-bottom"></i>
                                </button>
                            </div>
                        </div>

                        <div className="chat-message-list">
                            <ul
                                className="list-unstyled chat-list chat-user-list users-list"
                                id="userList"
                            >
                                {(chatRooms || []).map((chat) => (
                                    <SideBarChatRooms
                                        key={chat.id}
                                        chat={chat}
                                        currentRoomId={currentRoomId}
                                        userChatOpen={userChatOpen}
                                    />
                                ))}
                          
                            </ul>
                        </div>

                        <div className="d-flex align-items-center px-4 mt-4 pt-2 mb-2">
                            <div className="flex-grow-1">
                                <h4 className="mb-0 fs-11 text-muted text-uppercase">
                                    Channels
                                </h4>
                            </div>
                            <div className="flex-shrink-0">
                                <UncontrolledTooltip
                                    placement="bottom"
                                    target="createnewmsg"
                                >
                                    Create group
                                </UncontrolledTooltip>
                                <Button
                                    color=""
                                    id="createnewmsg"
                                    className="btn btn-soft-success btn-sm"
                                >
                                    <i className="ri-add-line align-bottom"></i>
                                </Button>
                            </div>
                        </div>

                        <div className="chat-message-list">
                            <ul
                                className="list-unstyled chat-list chat-user-list mb-0 users-list"
                                id="channelList"
                            >
                                {/* {channels.map((channel, key) => (
                            <React.Fragment key={key}>
                                <li>
                                    <Link to="#" className="unread-msg-user">
                                        <div className="d-flex align-items-center">
                                            <div className="flex-shrink-0 chat-user-img online align-self-center me-2 ms-0">
                                                <div className="avatar-xxs">
                                                    <div className="avatar-title bg-light rounded-circle text-body">
                                                        #
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="flex-grow-1 overflow-hidden">
                                                <p className="text-truncate mb-0">
                                                    {channel.name}
                                                </p>
                                            </div>
                                            {channel.unReadMessage && (
                                                <div className="flex-shrink-0">
                                                    <span className="badge bg-dark-subtle text-body rounded p-1">
                                                        {channel.unReadMessage}
                                                    </span>
                                                </div>
                                            )}
                                        </div>
                                    </Link>
                                </li>
                            </React.Fragment>
                        ))} */}
                            </ul>
                        </div>
                    </SimpleBar>

                </TabPane>
                <TabPane tabId="2" id="contacts">
                    <SimpleBar className="chat-room-list pt-3" style={{ margin: "-16px 0px 0px" }}>
                        <div className="sort-contact">
                            {(chatContactData || []).map((item, key) => (<div className="mt-3" key={key}>
                                <div className="contact-list-title">{item.title}</div>
                                <ul id={"contact-sort-" + item.title} className="list-unstyled contact-list">
                                    {item.contacts.map((item, key) => (<li key={key}>
                                        <div className="d-flex align-items-center">
                                            <div className="flex-shrink-0 me-2">
                                                <div className="avatar-xxs">
                                                    {item.image ? <img src={item.image} className="img-fluid rounded-circle" alt="" /> :
                                                        <span className="avatar-title rounded-circle bg-primary fs-10">
                                                            {item.name.charAt(0) + item.name.split(" ").slice(-1).toString().charAt(0)}
                                                        </span>}
                                                </div>
                                            </div>
                                            <div className="flex-grow-1" onClick={(e) => {
                                                userChatOpen(
                                                    item.id,
                                                    item.name,
                                                    item.status,
                                                    item.roomUuid,
                                                    item.image
                                                );
                                            }}>
                                                <p className="text-truncate contactlist-name mb-0">{item.name}</p>
                                            </div>
                                            <div className="flex-shrink-0">
                                                <UncontrolledDropdown>
                                                    <DropdownToggle tag="a" className="text-muted">
                                                        <i className="ri-more-2-fill" />
                                                    </DropdownToggle>
                                                    <DropdownMenu className="dropdown-menu-end">
                                                        <DropdownItem><i className="ri-pencil-line text-muted me-2 align-bottom" />Edit</DropdownItem>
                                                        <DropdownItem><i className="ri-forbid-2-line text-muted me-2 align-bottom" />Block</DropdownItem>
                                                        <DropdownItem><i className="ri-delete-bin-6-line text-muted me-2 align-bottom" /> Remove</DropdownItem>
                                                    </DropdownMenu>
                                                </UncontrolledDropdown>
                                            </div>
                                        </div>
                                    </li>))}
                                </ul>
                            </div>))}
                        </div>
                    </SimpleBar>
                </TabPane>

            </TabContent>
        </div>
    )
}

export default ChatLeftSideBar;