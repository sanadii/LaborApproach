import React, { useState, useEffect, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { userSelector, chatSelector } from 'Selectors';
import useWebSocket from 'react-use-websocket';
import { Button, Input, DropdownToggle, DropdownMenu, Dropdown, DropdownItem, Row, Col, Card, CardBody, UncontrolledDropdown } from "reactstrap";
import { Link } from "react-router-dom";
import { isEmpty, map } from "lodash";
import FeatherIcon from "feather-icons-react";
import {
    // getDirectContact as onGetDirectContact,
    // getChannels as onGetChannels,
    // addMessage as onAddMessage,
    deleteMessage as onDeleteMessage
} from "store/actions";

import PerfectScrollbar from "react-perfect-scrollbar";
import "react-perfect-scrollbar/dist/css/styles.css";

import userDummayImage from "assets/images/users/avatar-2.jpg";

import ChatInput from "./ChatInput";
import ChatTopBar from "./ChatTopBar";

const ChatBox = ({
    userChatShow,
    backToUserChat,
    Chat_Box_Username,
    currentRoomId,
    socketUrl,
}) => {

    const dispatch = useDispatch();

    // State Declarations
    const { messages } = useSelector(chatSelector);
    const { currentUser } = useSelector(userSelector);
    const [messageBox, setMessageBox] = useState(null);
    const [curMessage, setcurMessage] = useState("");
    const [messageHistory, setMessageHistory] = useState([]);

    const [search_Menu, setsearch_Menu] = useState(false);
    const [settings_Menu, setsettings_Menu] = useState(false);
    const [isInfoDetails, setIsInfoDetails] = useState(false);
    const [reply, setreply] = useState("");
    const [user, setUser] = useState({
        name: currentUser.name,
        id: currentUser.id,
        isActive: true,
    });

    // WebSocket Setup
    const { sendMessage, lastMessage } = useWebSocket(socketUrl, {
        shouldReconnect: (closeEvent) => true,
    });


    // Handle incoming WebSocket messages
    useEffect(() => {
        if (lastMessage !== null) {
            const incomingMessage = JSON.parse(lastMessage.data);
            setMessageHistory(prev => [...prev, incomingMessage]);
        }
    }, [lastMessage]);



    // ChatBox - Add Message
    const addMessage = () => {
        if (!curMessage.trim()) return; // Prevent sending empty messages
        const message = {
            type: 'message',
            message: curMessage,
            name: user.name,
            roomUuid: currentRoomId,
            createdBy: user.id
        };
        console.log("message", message)
        setMessageHistory(prev => [...prev, message]);
        sendMessage(JSON.stringify(message));
        setcurMessage("");
    };


    // Scrolling
    const scrollToBottom = useCallback(() => {
        if (messageBox) {
            messageBox.scrollTop = messageBox.scrollHeight + 1000;
        }
    }, [messageBox]);

    // Scroll to bottom on new messages
    useEffect(() => {
        if (!isEmpty(messages)) scrollToBottom();
    }, [messages, scrollToBottom]);


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




    // Ensure messages is always an array
    const safeMessages = Array.isArray(messages) ? messages : [];

    // Combine historical and WebSocket messages
    const combinedMessages = [...safeMessages, ...messageHistory];

    console.log("messageHistory", messageHistory)

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
                        {/* Chat Top Bar */}
                        <ChatTopBar
                            backToUserChat={backToUserChat}
                            Chat_Box_Username={Chat_Box_Username}
                            currentRoomId={currentRoomId}
                            socketUrl={socketUrl}
                        />

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
                                                        message.createdBy !== user.id
                                                            ? " chat-list left"
                                                            : "chat-list right"
                                                    }
                                                    key={key}
                                                >
                                                    <div className="conversation-list">
                                                        {message.createdBy !== user.id && (
                                                            <div className="chat-avatar">
                                                                {/* TODO: To put if at the top to assign the image if not defined */}
                                                                <img
                                                                    src={userDummayImage}
                                                                    alt=""
                                                                />
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
                                                                    {message.createdBy}
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
                        </div>

                        <ChatInput
                            socketUrl={socketUrl}
                            currentRoomId={currentRoomId}
                        />
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