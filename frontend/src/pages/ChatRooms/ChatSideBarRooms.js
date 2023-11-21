import { Link } from "react-router-dom";

const ChatSideBarRooms = ({ chat, currentRoomId, userChatOpen }) => {

    const handleChatOpen = (e) => {
        e.preventDefault();
        userChatOpen(chat);
    };

    return (
        <li
            key={chat.id + chat.status}
            className={currentRoomId === chat.uuid ? "active" : ""}
        >
            <Link to="#" onClick={handleChatOpen}>
                <div className="d-flex align-items-center">
                    <div className="flex-shrink-0 chat-user-img online align-self-center me-2 ms-0">
                        <div className="avatar-xxs">
                            <div className="avatar-xxs">{renderAvatar({ chat })}</div>
                        </div>
                        <span className="user-status"></span>
                    </div>
                    <div className="flex-grow-1 overflow-hidden">
                        <p className="text-truncate mb-0">{chat.createdByName}</p>
                    </div>
                    {chat.badge && (
                        <div className="flex-shrink-0">
                            <span className="badge bg-dark-subtle text-body rounded p-1">{chat.badge}</span>
                        </div>
                    )}
                </div>
            </Link>
        </li>
    );
};

export default ChatSideBarRooms;


const renderAvatar = ({ chat }) => {
    if (chat.image) {
        return (
            <img src={chat.image} className="rounded-circle img-fluid userprofile" alt="" />
        );
    }
    const avatarInitial = chat.createdByName ? chat.createdByName.charAt(0) : 'Nil';
    return (
        <div className={`avatar-title rounded-circle bg-${chat.bgColor} userprofile`}>
            {avatarInitial}
        </div>
    );
};
