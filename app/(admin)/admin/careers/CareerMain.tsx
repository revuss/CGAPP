/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useMemo, useState } from "react";
import {
  ColumnFiltersState,
  SortingState,
  VisibilityState,
} from "@tanstack/react-table";
import { motion } from "framer-motion";
import DataTable from "../../components/DataTable";
import AppSpinner from "../../components/AppSpinner";
import { CareersColumns } from "./CareerColumns";
import { careerDetailsAPI } from "@/app/services/adminServices/adminService";

const CareersMain = () => {
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
    queryKey: ["careersData", fetchDataOptions],
    queryFn: () =>
      careerDetailsAPI({
        ...fetchDataOptions,
        pageIndex: fetchDataOptions.pageIndex + 1,
      }),
    staleTime: 1000,
  });

  const totalRecords = data?.totalCount || 0;
  const careersData = useMemo(() => data?.careers || [], [data]);

  const columns = CareersColumns({
    fetchDataOptions,
    setFetchDataOptions,
    refetch,
  });

  useEffect(() => {
    if (careersData.length === 0) {
      refetch();
    }
  }, [careersData, refetch]);

  return (
    <div>
      {isLoading || isPending || !data || careersData.length === 0 ? (
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
            data={careersData}
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
    </div>
  );
};

export default CareersMain;
