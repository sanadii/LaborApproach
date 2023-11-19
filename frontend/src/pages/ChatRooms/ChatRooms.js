import React, { useState, useRef } from "react";
import { Container } from "reactstrap";

// Import Chat Components
import ChatLeftSideBar from "./ChatLeftSideBar";
import ChatBox from "./ChatBox";


const ChatRooms = () => {
    const [currentRoomId, setCurrentRoomId] = useState(1);
    const [chatBoxUsername, setChatBoxUsername] = useState("Lisa Parker");
    const [socketUrl, setSocketUrl] = useState(null);

    const userChatShow = useRef();

    const backToUserChat = () => {
        userChatShow.current.classList.remove("user-chat-show");
    }

    document.title = "Chat | Q8 Vision";

    return (
        <div className="page-content">
            <Container fluid>
                <div className="chat-wrapper d-lg-flex gap-1 mx-n4 mt-n4 py-1">

                    {/* Chat Left Sidebar */}
                    <ChatLeftSideBar
                        currentRoomId={currentRoomId}
                        setCurrentRoomId={setCurrentRoomId}
                        setChatBoxUsername={setChatBoxUsername}
                        userChatShow={userChatShow}
                        setSocketUrl={setSocketUrl}
                    />

                    {/* Chat Box */}
                    <ChatBox
                        userChatShow={userChatShow}
                        backToUserChat={backToUserChat}
                        chatBoxUsername={chatBoxUsername}
                        currentRoomId={currentRoomId}
                        socketUrl={socketUrl}
                    />
                </div>
            </Container>
        </div>
    );
};

export default ChatRooms;
