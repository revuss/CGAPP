/* eslint-disable @typescript-eslint/no-explicit-any */
import { ColumnDef } from "@tanstack/react-table";
import SortableHeader from "../../components/SortableHeaders";
import CareersAction from "./CareerActions";

interface CareersColumnsProps {
  fetchDataOptions: any;
  setFetchDataOptions: (newOptions: any) => void;
  refetch: () => void;
}

export const CareersColumns = ({
  fetchDataOptions,
  setFetchDataOptions,
  refetch,
}: CareersColumnsProps): ColumnDef<any, any>[] => {
  return [
    {
      accessorKey: "name",
      header: () => (
        <SortableHeader
          columnKey="name"
          columnLabel="Name"
          sortCol={fetchDataOptions.sortCol}
          sortOrder={fetchDataOptions.sortOrder}
          onSort={(columnKey, newSortOrder) =>
            setFetchDataOptions((prev: any) => ({
              ...prev,
              sortCol: columnKey,
              sortOrder: newSortOrder,
            }))
          }
        />
      ),
      cell: (info) => info.getValue(),
    },
    {
      accessorKey: "email",
      header: () => (
        <SortableHeader
          columnKey="email"
          columnLabel="Email"
          sortCol={fetchDataOptions.sortCol}
          sortOrder={fetchDataOptions.sortOrder}
          onSort={(columnKey, newSortOrder) =>
            setFetchDataOptions((prev: any) => ({
              ...prev,
              sortCol: columnKey,
              sortOrder: newSortOrder,
            }))
          }
        />
      ),
      cell: (info) => info.getValue(),
    },
    {
      accessorKey: "phoneNumber",
      header: () => (
        <SortableHeader
          columnKey="phoneNumber"
          columnLabel="Phone Number"
          sortCol={fetchDataOptions.sortCol}
          sortOrder={fetchDataOptions.sortOrder}
          onSort={(columnKey, newSortOrder) =>
            setFetchDataOptions((prev: any) => ({
              ...prev,
              sortCol: columnKey,
              sortOrder: newSortOrder,
            }))
          }
        />
      ),
      cell: (info) => info.getValue(),
    },
    {
      accessorKey: "appliedOn",
      header: () => (
        <SortableHeader
          columnKey="appliedOn"
          columnLabel="Applied On"
          sortCol={fetchDataOptions.sortCol}
          sortOrder={fetchDataOptions.sortOrder}
          onSort={(columnKey, newSortOrder) =>
            setFetchDataOptions((prev: any) => ({
              ...prev,
              sortCol: columnKey,
              sortOrder: newSortOrder,
            }))
          }
        />
      ),
      cell: (info) => {
        const dateValue = new Date(info.getValue() as string);
        return new Intl.DateTimeFormat("en-GB", {
          day: "2-digit",
          month: "short",
          year: "numeric",
          hour: "2-digit",
          minute: "2-digit",
          hour12: true,
        }).format(dateValue);
      },
    },
    {
      accessorKey: "actions",
      header: "Actions",
      cell: (info) => {
        const rowData = info.row.original;
        return <CareersAction infoData={rowData} refetch={refetch} />;
      },
    },
  ];
};