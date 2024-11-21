/* eslint-disable @typescript-eslint/no-explicit-any */
import { ColumnDef } from "@tanstack/react-table";
import SortableHeader from "../../components/SortableHeaders";
import VisitorAction from "./VisitorAction";

export const useVisitorColumns = (
  fetchDataOptions: any,
  setFetchDataOptions: any
) => {
  const columns: ColumnDef<any, any>[] = [
    {
      accessorKey: "ipAddress",
      header: () => (
        <SortableHeader
          columnKey="ipAddress"
          columnLabel="IP Address"
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
      accessorKey: "country",
      header: () => (
        <SortableHeader
          columnKey="country"
          columnLabel="Country"
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
      accessorKey: "region",
      header: () => (
        <SortableHeader
          columnKey="region"
          columnLabel="Region"
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
      accessorKey: "locality",
      header: "Locality",
      cell: (info) => info.getValue(),
    },
    {
      id: "coordinates",
      header: "Coordinates (Lat, Long)",
      cell: (info) => {
        const latitude = info.row.original.latitude;
        const longitude = info.row.original.longitude;
        return `${latitude}, ${longitude}`;
      },
    },
    {
      accessorKey: "visitCount",
      header: "Visit Count",
      cell: (info) => info.getValue(),
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
        return <VisitorAction infoData={rowData} />;
      },
    },
  ];

  return columns;
};
