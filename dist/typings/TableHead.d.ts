import React from 'react';
interface TableColumn {
    label: string;
    accessor: string;
    sortable: boolean;
    sortbyOrder?: string;
}
interface TableHeadProps {
    columns: TableColumn[];
    handleSorting: (accessor: string, sortOrder: string) => void;
    headerCellStyle?: React.CSSProperties;
}
declare const TableHead: React.FC<TableHeadProps>;
export default TableHead;
