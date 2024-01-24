import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAttendee, updateAttendee } from "store/actions";
import { FormFields } from "components";
import { Row, Col, CardBody, Card, Container, Form } from "reactstrap";
import 'react-toastify/dist/ReactToastify.css';
import * as Yup from "yup";
import { useFormik } from "formik";
import { AttendanceStatusOptions } from "constants";
import { attendeeSelector } from "Selectors";

const GeneralAssemblyMeeting = () => {
    const dispatch = useDispatch();
    const { attendee } = useSelector(attendeeSelector);

    const [formStatus, setAttendanceFormStatus] = useState('check');
    const [selectedStatus, setSelectedStatus] = useState(false);

    console.log("attendee: ", attendee)
    console.log("formStatus: ", formStatus)
    console.log("selectedStatus: ", selectedStatus)

    const validationCheck = Yup.object({
        kocNumber: Yup.string().required("الرجاء إدخال رقم العضوية"),
        mobile: Yup.number().integer().required('الرجاء إدخال رقم الهاتف'),
    });

    const validationConfirm = Yup.object({
        status: Yup.number()
            .oneOf([0, 1, 2], 'الرجاء اختيار حالة صحيحة'), // Example: 0, 1, 2 are valid status values
        notes: Yup.string()
            .max(255, 'الملاحظات يجب أن تكون أقل من 255 حرفًا'), // Example: Limit 'notes' to 255 characters
    });

    const validationSchema = formStatus === 'check' ? validationCheck : validationConfirm;

    const validation = useFormik({
        enableReinitialize: true,
        initialValues: {
            kocNumber: "",
            mobile: "",
            confirmAttendance: "",
            notes: "",
            status: 0,
        },
        validationSchema: validationSchema,

        onSubmit: (values) => {
            if (formStatus === 'check') {
                const searchedAttendee = {
                    kocNumber: values.kocNumber,
                    mobile: values.mobile,
                };
                dispatch(getAttendee(searchedAttendee));
                setAttendanceFormStatus('confirm')
                setSelectedStatus(false)

            } else if (formStatus === 'confirm') {
                const updatedAttendee = {
                    id: attendee.entryId,
                    notes: values.notes || "",
                };

                dispatch(updateAttendee(updatedAttendee));
                setAttendanceFormStatus('thankYou')
                setSelectedStatus(false)

            }
            validation.resetForm();
        },
    });

    const handleAttendanceClick = (status) => {
        const updatedAttendee = {
            id: attendee.entryId,
            status: status,
        };
        console.log("calling handleAttendance... ")
        dispatch(updateAttendee(updatedAttendee));
    }



    const fields = [
        {
            id: "koc-number-field",
            name: "kocNumber",
            label: "رقم العضوية",
            type: "text",
            placeholder: "Search by Civil ID or Name...",
        },
        {
            id: "mobile-field",
            name: "mobile",
            label: "رقم الهاتف",
            type: "tel",
        },
    ];

    const fieldsConfirm = [


        {
            id: "status-field",
            name: "status",
            label: "تأكيد الحضور",
            type: "buttonsWithLabel",
            options: AttendanceStatusOptions.map(item => ({
                id: item.id,
                label: item.name,
                value: item.id,
                color: item.color,
                icon: item.icon,
                onClick: (e) => {
                    e.preventDefault();
                    handleAttendanceClick(item.id); // Pass item.id as the status
                    setSelectedStatus(true)
                }
            })),
            condition: selectedStatus === false
        },
        {
            id: "info-field",
            label: "تأكيد الحضور",
            name: "شكرا لمشاركتك",
            type: "info",
            condition: selectedStatus === true

        },
        {
            id: "notes-field",
            name: "notes",
            label: "ملاحضات",
            type: "text",
        },
    ];

    return (
        <React.Fragment>
            <div className="auth-page-content">
                <Container>
                    <Row className="justify-content-center m-3">
                        <Col md={8} lg={6} xl={5}>
                            <Card className="mt-4 border card-border-info">
                                <CardBody className="p-4">
                                    <div className="text-center mt-2">
                                        <h5 className="text-primary">تأكيد الحضور</h5>
                                        <p className="text-muted">حضور الجمعية العمومية الغير عادية لنقابة شركة النفط</p>
                                    </div>

                                    {formStatus === "check" && (
                                        <AttendanceCheckForm
                                            validation={validation}
                                            fields={fields}
                                        />
                                    )}
                                    {formStatus === "confirm" && (
                                        <AttendanceSubmitForm
                                            validation={validation}
                                            fields={fieldsConfirm}
                                            attendee={attendee}
                                        />
                                    )}
                                    {formStatus === "thankYou" && (
                                        <ThankYou
                                            setAttendanceFormStatus={setAttendanceFormStatus}
                                        />
                                    )}
                                </CardBody>
                            </Card>
                        </Col>
                    </Row>
                </Container>
            </div>
        </React.Fragment>
    );
};

const AttendanceCheckForm = ({ validation, fields }) => {
    return (
        <div className="p-2 mt-4">
            <Form
                className="tablelist-form"
                onSubmit={e => {
                    e.preventDefault();
                    validation.handleSubmit();
                }}
            >
                {fields.map(field => (
                    <FormFields
                        key={field.id}
                        field={field}
                        validation={validation}
                        inLineStyle={true}
                    />
                ))}
                <div className="mt-4">
                    <button className="btn btn-info w-100" type="submit">متابعة</button>
                </div>
            </Form>
        </div>
    );
}

const AttendanceSubmitForm = ({ validation, fields, attendee }) => {

    const getStatusNameById = (id) => {
        const status = AttendanceStatusOptions.find(option => option.value === id);
        return (
            <span className={`text-${status ? status.color : ''}`}>
                <strong>
                    {status ? status.label : 'غير معروف'}
                </strong>
            </span>
        );
    };


    return (
        <div className="p-2 mt-4">
            {attendee && (
                <ul>
                    <li>{attendee.name} [{attendee.kocNumber}]</li>
                    <li>الحضور: {getStatusNameById(attendee.status)}</li>
                </ul>
            )}
            <Form
                className="tablelist-form"
                onSubmit={e => {
                    e.preventDefault();
                    validation.handleSubmit();
                }}
            >
                {
                    fields.map(field => {
                        return (field.condition === undefined || field.condition) && (
                            <FormFields
                                key={field.id}
                                field={field}
                                validation={validation}
                                inLineStyle={true}
                            />
                        );
                    })
                }
                <div className="mt-4">
                    <button className="btn btn-info w-100" type="submit">متابعة</button>
                </div>
            </Form>
        </div>
    );
}

const ThankYou = ({ setAttendanceFormStatus }) => {
    return (
        <div className="text-center mt-2">
            <h2>شكرا لمشاركتك</h2>
            <button
                className="btn btn-info w-100"
                type="button" // Use type="button" for buttons that are not part of a form submission
                onClick={() => setAttendanceFormStatus('check')}
            >
                تأكيد الحضور لشخص آخر
            </button>
        </div>
    );
}


export default GeneralAssemblyMeeting;