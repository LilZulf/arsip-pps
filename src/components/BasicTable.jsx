import React from 'react';
import DataTable from 'react-data-table-component';

const selectProps = { indeterminate: isIndeterminate => isIndeterminate };

function BasicTable(props) {
    return (
        <>
            <DataTable
                pagination
                selectableRowsComponentProps={selectProps}
                dense
                {...props}
            />
        </>
    );
}

export default BasicTable;