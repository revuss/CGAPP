/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import {
  ColumnFiltersState,
  SortingState,
  VisibilityState,
} from "@tanstack/react-table";
import { motion } from "framer-motion";
import DataTable from "../../components/DataTable";
import AppSpinner from "../../components/AppSpinner";
import { ContactsColumns } from "./ContactsColumns";
import { contactDetailsAPI } from "@/app/services/adminServices/adminService";

const ContactsMain = () => {
  const [fetchDataOptions, setFetchDataOptions] = useState({
    pageIndex: 0,
    pageSize: 5,
    sortCol: "",
    sortOrder: "",
  });

  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});

  const { isLoading, data, isPending, refetch } = useQuery({
    queryKey: ["contactData", fetchDataOptions],
    queryFn: () =>
      contactDetailsAPI({
        ...fetchDataOptions,
        pageIndex: fetchDataOptions.pageIndex + 1,
      }),
    staleTime: 1000,
  });

  const totalRecords = data?.totalCount || 0;
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const contactsData = data?.contacts || [];

  const columns = ContactsColumns({
    fetchDataOptions,
    setFetchDataOptions,
  });

  useEffect(() => {
    if (contactsData.length === 0) {
      refetch();
    }
  }, [contactsData, refetch]);

  if (isLoading || isPending || !data || contactsData.length === 0) {
    return <AppSpinner />;
  }

  return (
    <div>
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
          data={contactsData}
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
    </div>
  );
};

export default ContactsMain;
