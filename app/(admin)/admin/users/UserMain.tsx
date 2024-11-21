"use client";
import { useEffect, useState } from "react";
import {
  ColumnFiltersState,
  SortingState,
  VisibilityState,
} from "@tanstack/react-table";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import DataTable from "../../components/DataTable";
import AppSpinner from "../../components/AppSpinner";
import { useUserColumns } from "./UserColumns";
import { usersAPI } from "@/app/services/adminServices/adminService";
import VisitorDelete from "../visitors/VisitorDelete";

const UserMain = () => {
  const [fetchDataOptions, setFetchDataOptions] = useState({
    pageIndex: 0,
    pageSize: 5,
    sortCol: "",
    sortOrder: "",
  });

  const [open, setOpen] = useState<boolean>(false);
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});

  const { isLoading, data, isPending, refetch } = useQuery({
    queryKey: ["usersData", fetchDataOptions],
    queryFn: () =>
      usersAPI({
        ...fetchDataOptions,
        pageIndex: fetchDataOptions.pageIndex + 1,
      }),
    staleTime: 1000,
  });

  const totalRecords = data?.totalCount || 0;
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const users = data?.users || [];

  const columns = useUserColumns(
    fetchDataOptions,
    setFetchDataOptions,
    refetch
  );

  useEffect(() => {
    if (users.length === 0) {
      refetch();
    }
  }, [users, refetch]);
  return (
    <div>
      {isLoading || isPending || !data || users.length === 0 ? (
        <AppSpinner />
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          key={fetchDataOptions.pageIndex}
        >
          {" "}
          <DataTable
            columns={columns}
            data={users}
            setPagination={(newPagination) =>
              setFetchDataOptions((prev) => ({ ...prev, ...newPagination }))
            }
            pagination={{
              pageIndex: fetchDataOptions.pageIndex,
              pageSize: fetchDataOptions.pageSize,
            }}
            total={totalRecords}
            setSorting={setSorting}
            sorting={sorting}
            setColumnFilters={setColumnFilters}
            columnFilters={columnFilters}
            columnVisibility={columnVisibility}
            setColumnVisibility={setColumnVisibility}
            setFetchDataOptions={setFetchDataOptions}
            fetchDataOptions={fetchDataOptions}
          />
        </motion.div>
      )}
      {open && (
        <VisitorDelete
          closeMe={() => {
            setOpen(false);
          }}
        />
      )}
    </div>
  );
};

export default UserMain;
