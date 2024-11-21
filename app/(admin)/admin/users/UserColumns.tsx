/* eslint-disable @typescript-eslint/no-explicit-any */
import { ColumnDef } from "@tanstack/react-table";
import SortableHeader from "../../components/SortableHeaders";
import UserActions from "./UserActions";

export const useUserColumns = (
  fetchDataOptions: any,
  setFetchDataOptions: any,
  refetch: any
) => {
  const columns: ColumnDef<any, any>[] = [
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
      accessorKey: "statusBlocked",
      header: () => (
        <SortableHeader
          columnKey="statusBlocked"
          columnLabel="Blocked"
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
      cell: (info) => (info.getValue() ? "Yes" : "No"),
    },
    {
      accessorKey: "authorized",
      header: () => (
        <SortableHeader
          columnKey="authorized"
          columnLabel="Authorized"
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
      cell: (info) => (info.getValue() ? "Yes" : "No"),
    },
    {
      accessorKey: "createdAt",
      header: () => (
        <SortableHeader
          columnKey="createdAt"
          columnLabel="Visit on"
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
      accessorKey: "updatedAt",
      header: () => (
        <SortableHeader
          columnKey="updatedAt"
          columnLabel="Latest Visit"
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
        return <UserActions infoData={rowData} refetch={refetch} />;
      },
    },
  ];

  return columns;
};
