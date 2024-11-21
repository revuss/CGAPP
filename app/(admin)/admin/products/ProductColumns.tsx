/* eslint-disable @typescript-eslint/no-explicit-any */
import { ColumnDef } from "@tanstack/react-table";
import Image from "next/image";
import SortableHeader from "../../components/SortableHeaders";
import ProductActions from "./ProductActions";

export const useProductColumns = (
  fetchDataOptions: any,
  setFetchDataOptions: any,
  refetch: any
) => {
  const columns: ColumnDef<any, any>[] = [
    {
      accessorKey: "productName",
      header: () => (
        <SortableHeader
          columnKey="productName"
          columnLabel="Product Name"
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
      accessorKey: "productDescription",
      header: () => (
        <SortableHeader
          columnKey="productDescription"
          columnLabel="Product Description"
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
      accessorKey: "tagLine",
      header: () => (
        <SortableHeader
          columnKey="tagLine"
          columnLabel="Tag Line"
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
      accessorKey: "imageUrl",
      header: () => (
        <SortableHeader
          columnKey="imageUrl"
          columnLabel="Image"
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
        const imageUrl = info.getValue();
        return (
          <Image
            width={500}
            height={500}
            src={imageUrl}
            alt="Product Image"
            className="w-16 h-16 object-cover rounded"
          />
        );
      },
    },

    {
      accessorKey: "createdAt",
      header: () => (
        <SortableHeader
          columnKey="createdAt"
          columnLabel="Created on"
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
        return <ProductActions infoData={rowData} refetch={refetch} />;
      },
    },
  ];

  return columns;
};
