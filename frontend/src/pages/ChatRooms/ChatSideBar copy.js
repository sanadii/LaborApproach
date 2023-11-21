import React, { useState, useEffect, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { userSelector, chatSelector } from 'Selectors';

import {
    Button, UncontrolledTooltip,
    DropdownToggle, DropdownMenu, DropdownItem,
    UncontrolledDropdown,
    Nav, NavItem, NavLink, TabContent, TabPane,
    Modal, ModalHeader,

} from "reactstrap";

import SimpleBar from "simplebar-react";
import classnames from "classnames";
import { chatContactData } from "data/chat";
import { getChatRooms, getDirectContact, getMessages } from "store/actions";
import avatar2 from "assets/images/users/avatar-2.jpg";


// Components
import ChatSideBarRooms from "./ChatSideBarRooms";
import ChatChannelModal from "./ChatChannelModal";

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


    // Modal
    const [modal_grid, setmodal_grid] = useState(false);

    function tog_grid() {
        setmodal_grid(!modal_grid);
    }
    const [modal, setModal] = useState(false);
    const [isEdit, setIsEdit] = useState(false);

    const toggle = useCallback(() => {
        if (modal) {
            setModal(false);
        } else {
            setModal(true);
        }
    }, [modal]);

    // Fetch Chat Rooms
    useEffect(() => {
        if (chatRooms.length === 0) {
            dispatch(getChatRooms());
        }
    }, [dispatch, chatRooms]);

    const userChatOpen = (chat) => {
        const { id, name, uuid: roomUuid, image } = chat;
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

    const [customActiveTab, setCustomActiveTab] = useState("1");

    const toggleCustom = (tab) => {
        if (customActiveTab !== tab) {
            setCustomActiveTab(tab);
        }
    };

    return (
        <>
            <ChatChannelModal
                modal={modal}
                toggle={toggle}
                isEdit={isEdit}
                setModal={setModal}
            />


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
                            Channels
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
                                        <ChatSideBarRooms
                                            key={chat.id}
                                            chat={chat}
                                            currentRoomId={currentRoomId}
                                            userChatOpen={userChatOpen}
                                        />
                                    ))}

                                </ul>
                            </div>
                        </SimpleBar>

                    </TabPane>
                    <TabPane tabId="2" id="channels">
                        <SimpleBar
                            className="chat-room-list pt-3"
                            style={{ margin: "-16px 0px 0px" }}
                        >
                            <div className="d-flex align-items-center px-4 mb-2">
                                <div className="flex-grow-1">
                                    <h4 className="mb-0 fs-11 text-muted text-uppercase">
                                        Channels
                                    </h4>
                                </div>
                                <div className="flex-shrink-0">

                                    <Button color="primary" onClick={() => toggle(true)}>
                                        Launch Demo Modal
                                    </Button>
                                </div>
                            </div>
                        </SimpleBar>
                    </TabPane>

                </TabContent>

            </div>
        </>
    )
}

export default ChatLeftSideBar;