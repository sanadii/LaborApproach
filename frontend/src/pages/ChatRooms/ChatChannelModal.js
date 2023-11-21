import React from 'react';
import { useSelector, useDispatch } from "react-redux";

// Store & Actions
import { addNewChatChannel, updateChatChannel } from "store/actions";
import { Form, Modal, ModalHeader, ModalBody, Button } from 'reactstrap';

// Form and validation
import * as Yup from "yup";
import { useFormik } from "formik";
import "react-toastify/dist/ReactToastify.css";

import { FieldComponent } from "components";
import { ChatStatusOptions } from "constants"

const ChatChannelModal = ({ modal, toggle, isEdit, chatChannel }) => {
    const dispatch = useDispatch();

    // validation
    const validation = useFormik({
        enableReinitialize: true,
        initialValues: {
            name: (chatChannel && chatChannel.name) || null,
            moderator: (chatChannel && chatChannel.moderator) || null,
            status: (chatChannel && chatChannel.status) || null,
        },
        validationSchema: Yup.object({


        }),
        onSubmit: (values) => {
            if (isEdit) {
                const updatedChatChannel = {
                    id: chatChannel ? chatChannel.id : 0,
                    name: values.name,
                    status: values.status,
                    moderator: values.moderator,
                };

                // Update Chat Channel
                dispatch(
                    updateChatChannel(updatedChatChannel)
                );
            } else {
                const newChatChannel = {
                    uuid: Math.random().toString(36).slice(2, 12),
                    name: values.name,
                    status: values.status,
                    moderator: values.moderator,
                };
                dispatch(addNewChatChannel(newChatChannel));
            }

            validation.resetForm();
            toggle();
        },
    });

    const fields = [
        {
            id: "name-field",
            name: "name",
            label: "Name",
            type: "text",
            placeholder: "Enter First Name",
            colSize: 12,
        },
        {
            id: "status-field",
            name: "status",
            label: "Status",
            type: "select",
            placeholder: "Select Status",
            colSize: 12,
            options: ChatStatusOptions.map(status => ({
                id: status.id,
                label: status.name,
                value: status.value
            })),
        },
        {
            id: "moderator-field",
            name: "moderator",
            label: "Moderator",
            type: "tel",
            placeholder: "Select Moderator",
            colSize: 12,
        },

    ]
    return (
        <Modal
            isOpen={modal}
            toggle={toggle}
        >
            <ModalHeader>
                <h5 className="modal-title">
                    Add New Chat Channel
                </h5>

            </ModalHeader>
            <ModalBody>
                <Form
                    className="tablelist-form"
                    onSubmit={(e) => {
                        e.preventDefault();
                        validation.handleSubmit();
                        return false;
                    }}
                >
                    <div className="row g-3">
                        {fields.map(field => (
                            <FieldComponent
                                key={field.id}
                                field={field}
                                validation={validation}
                            />
                        ))}
                        <div className="col-lg-12">
                            <div className="hstack gap-2 justify-content-end">
                                <Button color="primary">Submit</Button>
                            </div>
                        </div>
                    </div>
                </Form>
            </ModalBody>
        </Modal>
    )
}

export default ChatChannelModal;