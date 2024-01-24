// React & Redux core
import React, { useState, useMemo, useCallback, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

// Store & Selectors
import { attendeeSelector } from 'Selectors';
import { getAttendees, deleteAttendee } from "store/actions";

// Components & Columns
import { Id, CheckboxHeader, CheckboxCell, Name, DueDate, Status, Priority, Category, CreateBy, Actions } from "./AttendeeListCol";
import { Loader, DeleteModal, TableContainer, TableFilters, TableContainerHeader } from "components";
import { useDelete, useFilter, useFetchDataIfNeeded } from "hooks"

// UI, Styles & Notifications
import { Col, Row, Card, CardBody } from "reactstrap";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


const AllAttendees = () => {
    const dispatch = useDispatch();

    // State Management
    const { attendees, error } = useSelector(attendeeSelector);

    // Candidate Data
    useEffect(() => {
        if (attendees && !attendees.length) {
            dispatch(getAttendees());
        }
    }, [dispatch, attendees]);


    // Delete Hook
    const {
        handleDeleteItem,
        onClickDelete,
        deleteModal,
        setDeleteModal,
        checkedAll,
        deleteCheckbox,
        isMultiDeleteButton,
        deleteModalMulti,
        setDeleteModalMulti,
        deleteMultiple,
    } = useDelete(deleteAttendee);
    console.log("checkedAll: ", checkedAll)



    // Table Columns
    const columns = useMemo(
        () => [
            {
                Header: () => <CheckboxHeader checkedAll={checkedAll} />,
                accessor: "id",
                Cell: (cellProps) => <CheckboxCell {...cellProps} deleteCheckbox={deleteCheckbox} />,
            },
            {
                Header: "م.",
                Cell: (cellProps) => <Id {...cellProps} />
            },
            {
                Header: "الاسم",
                accessor: "name",
                Cell: (cellProps) => cellProps.row.original.name
            },
            {
                Header: "التليفون",
                accessor: "mobile",
                Cell: (cellProps) => cellProps.row.original.mobile
            },
            {
                Header: "الحضور",
                accessor: "attendance",
                Cell: (cellProps) => cellProps.row.original.attendance
            },
            {
                Header: "إجراءات",
                accessor: "attendee",
                Cell: (cellProps) =>
                    <Actions
                        {...cellProps}
                        onClickDelete={onClickDelete}
                    />
            },
        ],
        [checkedAll]
    );

    // Filters
    const { filteredData: attendeeList, filters, setFilters } = useFilter(attendees);

    console.log("filters: ", filters);
    console.log("filters: attendeeList: ", attendeeList);
    return (
        <React.Fragment>
            <DeleteModal
                show={deleteModal}
                onDeleteClick={handleDeleteItem}
                onCloseClick={() => setDeleteModal(false)}
            />
            <DeleteModal
                show={deleteModalMulti}
                onDeleteClick={() => {
                    deleteMultiple();
                    setDeleteModalMulti(false);
                }}
                onCloseClick={() => setDeleteModalMulti(false)}
            />

            <Row>
                <Col lg={12}>
                    <Card id="attendeeList">
                        <CardBody>
                            <TableContainerHeader
                                // Title
                                ContainerHeaderTitle="الحضور"

                                // Delete Button
                                isMultiDeleteButton={isMultiDeleteButton}
                                setDeleteModalMulti={setDeleteModalMulti}
                            />

                            <TableFilters
                                // Filters
                                isGlobalFilter={true}
                                preGlobalFilteredRows={true}
                                isResetFilters={true}

                                // Settings

                                filters={filters}
                                setFilters={setFilters}
                                SearchPlaceholder="البحث بالاسم..."
                            />

                            {attendees.length ? (
                                <TableContainer
                                    // Data
                                    columns={columns}
                                    data={attendeeList || []}
                                    customPageSize={20}
                                    sortBy="dueDate"
                                    sortDesc={true}

                                    // Styling
                                    className="custom-header-css"
                                    divClass="table-responsive table-card mb-2"
                                    tableClass="align-middle table-nowrap"
                                    theadClass="table-light"
                                    thClass="table-light text-muted"


                                />
                            ) : (
                                <Loader error={error} />
                            )}

                            <ToastContainer closeButton={false} limit={1} />
                        </CardBody>
                    </Card>
                </Col>
            </Row>
        </React.Fragment>
    );
};

export default AllAttendees;
