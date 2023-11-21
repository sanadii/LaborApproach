import { Card, CardBody } from "reactstrap";

const ChatMainReply = ({ reply, onClose }) => {
    if (!reply) return null;

    return (
        <div className="replyCard show">
            <Card className="mb-0">
                <CardBody className="py-3">
                    <div className="replymessage-block mb-0 d-flex align-items-start">
                        <div className="flex-grow-1">
                            <h5 className="conversation-name">{reply.sender}</h5>
                            <p className="mb-0">{reply.message}</p>
                        </div>
                        <div className="flex-shrink-0">
                            <button
                                type="button"
                                id="close_toggle"
                                className="btn btn-sm btn-link mt-n2 me-n3 fs-18"
                                onClick={onClose}
                            >
                                <i className="bx bx-x align-middle"></i>
                            </button>
                        </div>
                    </div>
                </CardBody>
            </Card>
        </div>
    );
};

export default ChatMainReply;
