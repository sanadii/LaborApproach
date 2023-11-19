import React, { useState, useEffect, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { userSelector, chatSelector } from 'Selectors';
import useWebSocket from 'react-use-websocket';
import { Button, Input, DropdownToggle, DropdownMenu, Dropdown, DropdownItem, Row, Col, Card, CardBody, UncontrolledDropdown } from "reactstrap";
import { Link } from "react-router-dom";
import Picker from 'emoji-picker-react';
import { isEmpty, map } from "lodash";



const ChatInput = ({ socketUrl, currentRoomId }) => {

    // State Declarations
    const { messages } = useSelector(chatSelector);
    const { currentUser } = useSelector(userSelector);

    // Constants
    const [emojiPicker, setemojiPicker] = useState(false);
    const [emojiArray, setemojiArray] = useState("");
    const [curMessage, setcurMessage] = useState("");
    const [messageBox, setMessageBox] = useState(null);
    const [messageHistory, setMessageHistory] = useState([]);
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


    const onEmojiClick = (event, emojiObject) => {
        setemojiArray([...emojiArray, emojiObject.emoji]);
        let emoji = [...emojiArray, emojiObject.emoji].join(" ");
        setcurMessage(curMessage + event.emoji);
    };


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
    return (
        <>
            {emojiPicker && <div className="alert pickerEmoji">
                <Picker disableSearchBar={true} onEmojiClick={onEmojiClick} />
            </div>}
            <div className="chat-input-section p-3 p-lg-4" >
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
            </div >
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
        </>
    )
}

export default ChatInput;

