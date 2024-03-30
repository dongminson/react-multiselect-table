/// <reference types="react" />
interface TableColumn {
    label: string;
    accessor: string;
    sortable: boolean;
    sortbyOrder?: string;
}
export declare const useSortableTable: <T extends {}>(data: T[], columns: TableColumn[]) => readonly [T[], (sortField: string, sortOrder: string) => void, import("react").Dispatch<import("react").SetStateAction<T[]>>];
export {};
