import React, { Fragment, useState } from "react";
import { useSelector } from "react-redux";
import { Row } from "reactstrap";


// General Filters
import GlobalFilter from "../Filters/GlobalFilter";
import GenderFilter from "../Filters/GenderFilter";
import PriorityFilter from "../Filters/PriorityFilter";
import StatusFilter from "../Filters/StatusFilter";
import ResetFilters from "../Filters/ResetFilters";


const TableContainerFilters = ({
    // Global Filter----------
    isGlobalFilter,

    globalFilter,

    // Select Filters----------
    isStatusFilter,
    isPriorityFilter,
    isGenderFilter,
    isResetFilters,

    // Settings
    activeTab,
    setActiveTab,
    filters,
    setFilters,
    customPageSize,
    SearchPlaceholder,

    // Constants

    // From useTable
    preGlobalFilteredRows,
    setPageSize,
    gotoPage,
}) => {
    const onChangeInSelect = (event) => {
        setPageSize(Number(event.target.value));
    };
    const onChangeInInput = (event) => {
        const page = event.target.value ? Number(event.target.value) - 1 : 0;
        gotoPage(page);
    };
    return (
        <React.Fragment>
            <Row className="g-4 mb-4">
                <div className="d-flex align-items-center ">
                    <div className="col">
                        {/* {isElectionCategoryFilter && (
                            <ElectionCategoryFilter
                                setFilters={setFilters}
                                activeTab={activeTab}
                                setActiveTab={setActiveTab}
                            />
                        )} */}
                    </div>
                    <div className="flex-shrink-0"></div>
                </div>
            </Row>

            <Row className="g-4 mb-4">
                <div className="d-flex align-items-center ">
                    <div className="col d-flex g-2 row">
                        {/* {isGlobalSearch && (
                            <select
                                className="form-select"
                                value={pageSize}
                                onChange={onChangeInSelect}
                            >
                                {[10, 20, 30, 40, 50].map((pageSize) => (
                                    <option key={pageSize} value={pageSize}>
                                        Show {pageSize}
                                    </option>
                                ))}
                            </select>
                        )} */}
                        {isGlobalFilter && (
                            <GlobalFilter
                                preGlobalFilteredRows={preGlobalFilteredRows}
                                setFilters={setFilters}
                                SearchPlaceholder={SearchPlaceholder}
                                globalFilter={filters?.global}

                            />
                        )}

                        {isStatusFilter && (
                            <StatusFilter
                                filters={filters}
                                setFilters={setFilters}
                            />
                        )}
                        {isPriorityFilter && (
                            <PriorityFilter
                                filters={filters}
                                setFilters={setFilters}
                            />
                        )}
                        {isGenderFilter && (
                            <GenderFilter
                                filters={filters}
                                setFilters={setFilters}
                            />
                        )}
                    </div>
                    <div className="flex-shrink-0">
                        {isResetFilters && (
                            <ResetFilters
                                setFilters={setFilters}
                                activeTab={activeTab}
                                setActiveTab={setActiveTab}
                                globalFilter={globalFilter}
                            />
                        )}
                    </div>
                </div>
            </Row>
        </React.Fragment>
    )
};
export default TableContainerFilters
