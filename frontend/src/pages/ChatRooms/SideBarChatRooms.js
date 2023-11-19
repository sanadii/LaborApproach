import { Link } from "react-router-dom";

const SideBarChatRooms = ({ chat, currentRoomId, userChatOpen }) => {
    const handleChatOpen = (e) => {
        e.preventDefault(); // Prevent default link behavior
        userChatOpen(chat);
    };

    return (
        <li
            key={chat.id + chat.status}
            className={currentRoomId === chat.roomUuid ? "active" : ""}
        >
            <Link to="#" onClick={handleChatOpen}>
                <div className="d-flex align-items-center">
                    <div className="flex-shrink-0 chat-user-img online align-self-center me-2 ms-0">
                        <div className="avatar-xxs">
                            {chat.image ? (
                                <img
                                    src={chat.image}
                                    className="rounded-circle img-fluid userprofile"
                                    alt=""
                                />
                            ) : (
                                <div
                                    className={
                                        "avatar-title rounded-circle bg-" +
                                        chat.bgColor +
                                        " userprofile"
                                    }
                                >
                                    {/* {chat.name.charAt(0)} */}
                                </div>
                            )}
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

export default SideBarChatRooms;
