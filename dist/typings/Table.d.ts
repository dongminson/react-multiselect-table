import React, { CSSProperties } from 'react';
interface TableColumn {
    label: string;
    accessor: string;
    sortable: boolean;
    sortbyOrder?: string;
}
export interface TableProps {
    data: object[];
    columns: TableColumn[];
    cellStyle: CSSProperties;
    headerCellStyle: CSSProperties;
}
declare const Table: React.FC<TableProps>;
export default Table;
