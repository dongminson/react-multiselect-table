import React, { ChangeEvent } from 'react';
interface TableColumn {
    label: string;
    accessor: string;
    sortable: boolean;
    sortbyOrder?: string;
}
interface TableBodyProps {
    tableData: any[];
    columns: TableColumn[];
    isCellBeingSelected: (rowIndex: number, columnIndex: number) => boolean;
    isCellBeingEdited: (rowIndex: number, columnIndex: number) => boolean;
    handleInputChange: (e: ChangeEvent<HTMLInputElement>, rowIndex: number, columnIndex: number) => void;
    cellStyle: React.CSSProperties;
}
declare const TableBody: React.FC<TableBodyProps>;
export default TableBody;
