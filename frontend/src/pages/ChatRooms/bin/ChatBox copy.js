import React, { useState, useEffect, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { userSelector, chatSelector } from 'Selectors';
import useWebSocket from 'react-use-websocket';
import { Button, Input, DropdownToggle, DropdownMenu, Dropdown, DropdownItem, Row, Col, Card, CardBody, UncontrolledDropdown } from "reactstrap";
import { Link } from "react-router-dom";
import Picker from 'emoji-picker-react';
import { isEmpty } from "lodash";
import FeatherIcon from "feather-icons-react";
import {
    getDirectContact as onGetDirectContact,
    getMessages,
    getChatChannels as onGetChannels,
    addMessage as onAddMessage,
    deleteMessage as onDeleteMessage
} from "store/actions";

import avatar2 from "assets/images/users/avatar-2.jpg";
import PerfectScrollbar from "react-perfect-scrollbar";
import "react-perfect-scrollbar/dist/css/styles.css";

import userDummayImage from "assets/images/users/avatar-2.jpg";


const ChatBox = ({ userChatShow, backToUserChat, Chat_Box_Image, Chat_Box_Username, currentRoomId }) => {
    const dispatch = useDispatch();
    const { messages } = useSelector(chatSelector);
    const { currentUser } = useSelector(userSelector);

    const [messageBox, setMessageBox] = useState(null);
    const [curMessage, setcurMessage] = useState("");
    const [messageHistory, setMessageHistory] = useState([]);
    const [emojiPicker, setemojiPicker] = useState(false);
    const [emojiArray, setemojiArray] = useState("");

    const [search_Menu, setsearch_Menu] = useState(false);
    const [settings_Menu, setsettings_Menu] = useState(false);
    const [isInfoDetails, setIsInfoDetails] = useState(false);
    const [reply, setreply] = useState("");

    const socketUrl = `ws://127.0.0.1:8000/ws/${currentRoomId}/`;
    const { sendMessage, lastMessage } = useWebSocket(socketUrl, { shouldReconnect: () => true });

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

    // ChatBox - Add Message
    const addMessage = () => {
        if (!curMessage.trim()) return; // Prevent sending empty messages

        const message = {
            type: 'message',
            message: curMessage,
            name: user.name,
            roomUuid: currentRoomId,
        };

        // Add message to history for instant UI update
        setMessageHistory(prev => [...prev, message]);

        // Send the message over WebSocket
        sendMessage(JSON.stringify(message));

        // Clear the input after sending
        setcurMessage("");
    };

    const scrollToBottom = useCallback(() => {
        if (messageBox) {
            messageBox.scrollTop = messageBox.scrollHeight + 1000;
        }
    }, [messageBox]);

    useEffect(() => {
        if (lastMessage !== null) {
            const receivedMessage = JSON.parse(lastMessage.data);
            setMessageHistory(prev => [...prev, receivedMessage]);
        }
    }, [lastMessage]);

    // Ensure messages is always an array
    const safeMessages = Array.isArray(messages) ? messages : [];

    // Combine historical and WebSocket messages
    const combinedMessages = [...safeMessages, ...messageHistory];


    useEffect(() => {
        if (!isEmpty(messages)) scrollToBottom();
    }, [messages, scrollToBottom]);

    const onKeyPress = (e) => {
        const { key, value } = e;
        if (key === "Enter") {
            e.preventDefault();
            setcurMessage(value);
            addMessage(currentRoomId, currentUser.name);
        }
    };

    const onEmojiClick = (event, emojiObject) => {
        setemojiArray([...emojiArray, emojiObject.emoji]);
        let emoji = [...emojiArray, emojiObject.emoji].join(" ");
        setcurMessage(curMessage + event.emoji);
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

    // Copy Message
    const handleCkick = (ele) => {
        var copy = ele.closest(".chat-list").querySelector('.ctext-content').innerHTML;
        navigator.clipboard.writeText(copy);

        document.getElementById("copyClipBoard").style.display = "block";
        setTimeout(() => {
            document.getElementById("copyClipBoard").style.display = "none";
        }, 2000);
    };

    return (
        <div className="user-chat w-100 overflow-hidden" ref={userChatShow}>
            <div className="chat-content d-lg-flex">
                <div className="w-100 overflow-hidden position-relative">
                    <div className="position-relative">
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
                                                    {Chat_Box_Image === undefined ? (
                                                        <img
                                                            src={userDummayImage}
                                                            className="rounded-circle avatar-xs"
                                                            alt=""
                                                        />
                                                    ) : (
                                                        <img
                                                            src={Chat_Box_Image}
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

                        {/* Msg Box */}
                        <div className="position-relative" id="users-chat">
                            <div className="chat-conversation p-3 p-lg-4" id="chat-conversation">
                                <PerfectScrollbar
                                    containerRef={ref => setMessageBox(ref)} >
                                    <div id="elmLoader"></div>
                                    <ul
                                        className="list-unstyled chat-conversation-list"
                                        id="users-conversation"
                                    >
                                        {combinedMessages &&
                                            map(combinedMessages, (message, key) => (
                                                <li
                                                    className={
                                                        message.sentBy === Chat_Box_Username
                                                            ? " chat-list left"
                                                            : "chat-list right"
                                                    }
                                                    key={key}
                                                >
                                                    <div className="conversation-list">
                                                        {message.sentBy === Chat_Box_Username && (
                                                            <div className="chat-avatar">
                                                                {Chat_Box_Image === undefined ?
                                                                    <img
                                                                        src={userDummayImage}
                                                                        alt=""
                                                                    />
                                                                    :
                                                                    <img
                                                                        src={Chat_Box_Image}
                                                                        alt=""
                                                                    />
                                                                }
                                                            </div>
                                                        )}

                                                        <div className="user-chat-content">
                                                            <div className="ctext-wrap">
                                                                <div className="ctext-wrap-content">
                                                                    <p className="mb-0 ctext-content">
                                                                        {message.message}
                                                                    </p>
                                                                </div>
                                                                <UncontrolledDropdown className="align-self-start message-box-drop">
                                                                    <DropdownToggle
                                                                        href="#"
                                                                        className="btn nav-btn"
                                                                        tag="a"
                                                                    >
                                                                        <i className="ri-more-2-fill"></i>
                                                                    </DropdownToggle>
                                                                    <DropdownMenu>
                                                                        <DropdownItem href="#" className="reply-message" onClick={() => setreply(message)}>
                                                                            <i className="ri-reply-line me-2 text-muted align-bottom"></i>
                                                                            Reply
                                                                        </DropdownItem>
                                                                        <DropdownItem href="#">
                                                                            <i className="ri-share-line me-2 text-muted align-bottom"></i>
                                                                            Forward
                                                                        </DropdownItem>
                                                                        <DropdownItem href="#" onClick={(e) => handleCkick(e.target)}>
                                                                            <i className="ri-file-copy-line me-2 text-muted align-bottom"></i>
                                                                            Copy
                                                                        </DropdownItem>
                                                                        <DropdownItem href="#">
                                                                            <i className="ri-bookmark-line me-2 text-muted align-bottom"></i>
                                                                            Bookmark
                                                                        </DropdownItem>
                                                                        <DropdownItem href="#" onClick={() => dispatch(onDeleteMessage(message.id))}>
                                                                            <i className="ri-delete-bin-5-line me-2 text-muted align-bottom"></i>
                                                                            Delete
                                                                        </DropdownItem>
                                                                    </DropdownMenu>
                                                                </UncontrolledDropdown>
                                                            </div>
                                                            <div className="conversation-name">
                                                                <small className="text-muted time">
                                                                    09:07 am
                                                                </small>{" "}
                                                                <span className="text-success check-message-icon">
                                                                    <i className="ri-check-double-line align-bottom"></i>
                                                                </span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </li>
                                            ))}
                                    </ul>
                                </PerfectScrollbar>
                            </div>
                            <div
                                className="alert alert-warning alert-dismissible copyclipboard-alert px-4 fade show "
                                id="copyClipBoard"
                                role="alert"
                            >
                                Message copied
                            </div>
                            {emojiPicker && <div className="alert pickerEmoji">
                                <Picker disableSearchBar={true} onEmojiClick={onEmojiClick} />
                            </div>}
                        </div>

                        <div className="chat-input-section p-3 p-lg-4">
                            <form id="chatinput-form">
                                <Row className="g-0 align-items-center">
                                    <div className="col-auto">
                                        <div className="chat-input-links me-2">
                                            <div className="links-list-item">
                                                <button
                                                    type="button"
                                                    className="btn btn-link text-decoration-none emoji-btn"
                                                    id="emoji-btn"
                                                    onClick={() => setemojiPicker(!emojiPicker)}
                                                >
                                                    <i className="bx bx-smile align-middle"></i>
                                                </button>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="col">
                                        <div className="chat-input-feedback">
                                            Please Enter a Message
                                        </div>
                                        <input
                                            type="text"
                                            value={curMessage}
                                            onKeyDown={onKeyPress}
                                            onChange={e => setcurMessage(e.target.value)}
                                            className="form-control chat-input bg-light border-light"
                                            id="chat-input"
                                            placeholder="Type your message..."
                                        />
                                    </div>
                                    <div className="col-auto">
                                        <div className="chat-input-links ms-2">
                                            <div className="links-list-item">
                                                <Button
                                                    type="button"
                                                    color="success"
                                                    onClick={() => { addMessage(currentRoomId, currentUser.name); setemojiPicker(false); setemojiArray(""); }}
                                                    className="chat-send waves-effect waves-light"
                                                >
                                                    <i className="ri-send-plane-2-fill align-bottom"></i>
                                                </Button>
                                            </div>
                                        </div>
                                    </div>
                                </Row>
                            </form>
                        </div>

                        <div className={reply ? "replyCard show" : "replyCard"}>
                            <Card className="mb-0">
                                <CardBody className="py-3">
                                    <div className="replymessage-block mb-0 d-flex align-items-start">
                                        <div className="flex-grow-1">
                                            <h5 className="conversation-name">{reply && reply.sender}</h5>
                                            <p className="mb-0">{reply && reply.message}</p>
                                        </div>
                                        <div className="flex-shrink-0">
                                            <button
                                                type="button"
                                                id="close_toggle"
                                                className="btn btn-sm btn-link mt-n2 me-n3 fs-18"
                                                onClick={() => setreply("")}
                                            >
                                                <i className="bx bx-x align-middle"></i>
                                            </button>
                                        </div>
                                    </div>
                                </CardBody>
                            </Card>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ChatBox;