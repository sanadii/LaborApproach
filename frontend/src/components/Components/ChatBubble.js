import React, { useEffect, useState, useCallback, useRef } from "react";
import useWebSocket from 'react-use-websocket';

import { Button, Input, Row, Col, Card, CardBody } from "reactstrap";
import { Link } from "react-router-dom";
import { isEmpty, map } from "lodash";

import { UserAvatar } from 'components';

//redux
import { useSelector, useDispatch } from "react-redux";
import {
    addNewChat,
    getDirectContact as onGetDirectContact,
    getMessages,
    getChannels as onGetChannels,
    addMessage as onAddMessage,
    deleteMessage as onDeleteMessage
} from "store/actions";

import avatar2 from "assets/images/users/avatar-2.jpg";
import userDummayImage from "assets/images/users/avatar-2.jpg";

//Import Scrollbar
import PerfectScrollbar from "react-perfect-scrollbar";
import "react-perfect-scrollbar/dist/css/styles.css";
import { createSelector } from "reselect";

const ChatBubble = () => {
    const dispatch = useDispatch();

    const [isChatOpen, setIsChatOpen] = useState(false);
    const [isInChatRoom, setIsInChatRoom] = useState(false);
    const [chatName, setChatName] = useState(''); // State to store the user's name
    const [socketUrl, setSocketUrl] = useState(null);
    const [messageHistory, setMessageHistory] = useState([]);
    const [curMessage, setcurMessage] = useState("");
    const [currentUser, setCurrentUser] = useState({ name: '', isActive: true });
    const [currentRoomId, setCurrentRoomId] = useState(1);

    // Others
    const ref = useRef();
    const [Chat_Box_Username, setChat_Box_Username] = useState('');
    const [Chat_Box_Image, setChat_Box_Image] = useState(avatar2);
    const [messageBox, setMessageBox] = useState(null);
    const [reply, setreply] = useState("");


    console.log("Chat_Box_Image", Chat_Box_Image)

    // WebSocket connection
    const { lastMessage } = useWebSocket(socketUrl);

    // Redux state selectors
    const selectLayoutState = (state) => state.chat;
    const selectLayoutProperties = createSelector(
        selectLayoutState,
        (msg) => ({
            chats: msg.chats,
            messages: msg.messages,
            channels: msg.channels,

        })
    );

    const { chats, messages, channels } = useSelector(selectLayoutProperties);

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

    useEffect(() => {
        dispatch(onGetDirectContact());
        dispatch(onGetChannels());
        dispatch(getMessages(currentRoomId));
    }, [dispatch, currentRoomId]);

    useEffect(() => {
        if (!isEmpty(messages)) scrollToBottom();
    }, [messages, scrollToBottom]);


    const toggleChat = () => setIsChatOpen(!isChatOpen);

    const joinChat = () => {
        setIsInChatRoom(true);
        const chatRoomUuid = Math.random().toString(36).slice(2, 12);
        const chatWindowUrl = window.location.href;
        const newChatRoom = {
            uuid: chatRoomUuid,
            name: chatName,
            url: chatWindowUrl,
        }
        console.log("chatRoomUuid", chatRoomUuid)
        setCurrentUser({
            name: chatName,
            isActive: true,
        })
        setChat_Box_Username(chatName)
        setSocketUrl(`ws://127.0.0.1:8000/ws/${chatRoomUuid}/`); // Set the WebSocket URL
        dispatch(addNewChat(newChatRoom));
    };

    const addMessage = () => {
        if (!curMessage.trim()) return; // Prevent sending empty messages

        const message = {
            type: 'message',
            message: curMessage,
            name: currentUser.name,
            roomId: currentRoomId,
        };

        // Add message to history for instant UI update
        setMessageHistory(prev => [...prev, message]);

        // Send the message over WebSocket
        sendMessage(JSON.stringify(message));

        // Clear the input after sending
        setcurMessage("");
    };

    const backToUserChat = () => {
        userChatShow.current.classList.remove("user-chat-show");
    }








    const { sendMessage } = useWebSocket(socketUrl);




    const userChatShow = useRef();
    const [customActiveTab, setcustomActiveTab] = useState("1");








    // Inside your component



    // useEffect(() => {
    //   ref.current.recalculate();
    // });








    document.title = "Chat Fusion | Q8 Vision";


    return (
        <Card>
            <div className="customizer-setting d-none d-md-block">
                {isChatOpen ? (
                    <div className="max-w-[400px] max-h-[600px] fixed right-2 bottom-2 p-2 bg-white border border-gray-300 rounded-xl">
                        {!isInChatRoom ? (
                            // Name input area
                            <div id="chat_welcome">
                                <Input
                                    type="text"
                                    name="name"
                                    className="w-full mb-4 py-2 px-6 rounded-xl bg-gray-100"
                                    placeholder="Your name..."
                                    value={chatName}
                                    onChange={(e) => setChatName(e.target.value)} // Update state on change
                                />
                                <Button
                                    color="danger"
                                    className="py-2 px-6 rounded-xl text-white"
                                    onClick={joinChat}
                                >
                                    Join chat
                                </Button>
                            </div>
                        ) : (
                            // Chat message area
                            <div className="chat-wrapper d-lg-flex gap-1 mx-n4 mt-n4 py-1">
                                <div className="user-chat w-100 overflow-hidden" ref={userChatShow}>
                                    <div className="chat-content d-lg-flex">
                                        <div className="w-100 overflow-hidden position-relative">
                                            <div className="position-relative">
                                                <div className="p-3 user-chat-topbar">
                                                    <Row className="align-items-center">
                                                        <Col>
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
                                                                        <UserAvatar imagePath={Chat_Box_Image} />                                                                        <div className="flex-grow-1 overflow-hidden">
                                                                            <h5 className="text-truncate mb-0 fs-16">
                                                                                <a
                                                                                    className="text-reset username"
                                                                                    data-bs-toggle="offcanvas"
                                                                                    href="#userProfileCanvasExample"
                                                                                    aria-controls="userProfileCanvasExample"
                                                                                >
                                                                                    {currentUser.name}
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
                                                    </Row>
                                                </div>

                                                {/* Msg Box */}
                                                <div className="position-relative" id="users-chat">
                                                    <div className="chat-conversation p-3 p-lg-4" id="chat-conversation">
                                                        <PerfectScrollbar
                                                            containerRef={ref => setMessageBox(ref)} >
                                                            <div id="elmLoader"></div>
                                                            <ul className="list-unstyled chat-conversation-list" id="users-conversation">
                                                                {messageHistory &&
                                                                    messageHistory.map((message, key) => (
                                                                        <li
                                                                            className={message.sender === currentUser.name ? "chat-list left" : "chat-list right"}
                                                                            key={key}
                                                                        >
                                                                            <div className="conversation-list">
                                                                                {message.sender === currentUser.name && (
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
                                                </div>

                                                {/* Add Msg */}
                                                <div className="chat-input-section p-3 p-lg-4">
                                                    <form id="chatinput-form">
                                                        <Row className="g-0 align-items-center">
                                                            <input
                                                                type="text"
                                                                value={curMessage}
                                                                onKeyDown={e => e.key === 'Enter' && addMessage()}
                                                                onChange={e => setcurMessage(e.target.value)}
                                                                className="form-control chat-input bg-light border-light"
                                                                id="chat-input"
                                                                placeholder="Type your message..."
                                                            />
                                                            <div className="col-auto">
                                                                <div className="chat-input-links ms-2">
                                                                    <div className="links-list-item">
                                                                        <Button
                                                                            type="button"
                                                                            color="success"
                                                                            onClick={addMessage}
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
                            </div>
                        )}
                    </div>
                )
                    :
                    <Button color="success" className="rounded-pill shadow-lg btn-icon btn-lg p-2" onClick={toggleChat}>
                        <i className="mdi mdi-chat-outline fs-22"></i>
                    </Button>}
            </div>
        </Card>
    );
};

export default ChatBubble;
