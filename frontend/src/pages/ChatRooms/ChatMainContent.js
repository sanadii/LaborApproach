import React, { useState, useEffect, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { userSelector, chatSelector } from 'Selectors';
import { DropdownToggle, DropdownMenu, DropdownItem, UncontrolledDropdown } from "reactstrap";
import { isEmpty, map } from "lodash";
import { deleteMessage as onDeleteMessage } from "store/actions";

import PerfectScrollbar from "react-perfect-scrollbar";
import "react-perfect-scrollbar/dist/css/styles.css";

import userDummayImage from "assets/images/users/avatar-2.jpg";

const ChatMainContent = ({
    combinedMessages,
}) => {

    const dispatch = useDispatch();

    // State Declarations
    const { messages } = useSelector(chatSelector);
    const { currentUser } = useSelector(userSelector);

    const [messageBox, setMessageBox] = useState(null);
    const [reply, setreply] = useState("");
    const [user, setUser] = useState("");

    useEffect(() => {
        setUser({
            name: currentUser.name,
            id: currentUser.id,
            isActive: true,
        });
    }, [currentUser]);


    // Scrolling
    const scrollToBottom = useCallback(() => {
        if (messageBox) {
            messageBox.scrollTop = messageBox.scrollHeight + 1000;
        }
    }, [combinedMessages, messageBox]);

    // Scroll to bottom on new messages
    useEffect(() => {
        if (!isEmpty(messages)) scrollToBottom();
    }, [messages, scrollToBottom]);



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

    )
}

export default ChatMainContent;