import React, { useState, useEffect, useMemo, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { userSelector, chatSelector } from 'Selectors';

import ChatMainInput from "./ChatMainInput";
import ChatMainTopBar from "./ChatMainTopBar";
import ChatMainContent from "./ChatMainContent";
import ChatMainReply from "./ChatMainReply";

const ChatBox = ({
    userChatShow,
    backToUserChat,
    Chat_Box_Username,
    currentRoomId,
    socketUrl,
}) => {

    // State Declarations
    const { messages } = useSelector(chatSelector);
    const { currentUser } = useSelector(userSelector);
    const [messageHistory, setMessageHistory] = useState([]);
    const [reply, setreply] = useState("");
    const [user, setUser] = useState("");


    console.log("messageHistory", messageHistory)
    const setUserCallback = useCallback((currentUser) => {
        setUser({
            name: currentUser.name,
            id: currentUser.id,
            isActive: true,
        });
    }, []);

    useEffect(() => {
        setUserCallback(currentUser);
    }, [currentUser, setUserCallback]);


    // Ensure messages is always an array
    const safeMessages = Array.isArray(messages) ? messages : [];
    const combinedMessages = useMemo(() => {
        return [...safeMessages, ...messageHistory.filter(msg => msg.roomUuid === currentRoomId)];
    }, [safeMessages, messageHistory, currentRoomId]);

    return (
        <div className="user-chat w-100 overflow-hidden" ref={userChatShow}>
            <div className="chat-content d-lg-flex">
                <div className="w-100 overflow-hidden position-relative">
                    <div className="position-relative">

                        <ChatMainTopBar
                            backToUserChat={backToUserChat}
                            Chat_Box_Username={Chat_Box_Username}
                            currentRoomId={currentRoomId}
                            socketUrl={socketUrl}
                        />

                        <ChatMainContent
                            combinedMessages={combinedMessages}
                        />

                        <ChatMainInput
                            socketUrl={socketUrl}
                            currentRoomId={currentRoomId}
                            setMessageHistory={setMessageHistory}
                        />

                        <ChatMainReply reply={reply} onClose={() => setreply("")} />

                    </div>
                </div>
            </div>
        </div>
    )
}

export default ChatBox;