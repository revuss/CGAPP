import {
  TbSortAscendingNumbers,
  TbSortDescendingNumbers,
} from "react-icons/tb";

import { FaSort } from "react-icons/fa6";
interface SortableHeaderProps {
  columnKey: string;
  columnLabel: string;
  sortCol: string;
  sortOrder: string;
  onSort: (columnKey: string, newSortOrder: string) => void;
}

const SortableHeader = ({
  columnKey,
  columnLabel,
  sortCol,
  sortOrder,
  onSort,
}: SortableHeaderProps) => {
  const handleSort = () => {
    const isSameColumn = sortCol === columnKey;
    const newSortOrder = isSameColumn && sortOrder === "asc" ? "desc" : "asc";
    onSort(columnKey, newSortOrder);
  };

  const getSortIcon = () => {
    if (sortCol !== columnKey) {
      return <FaSort className="ml-2 w-4" />;
    }

    return sortOrder === "asc" ? (
      <TbSortAscendingNumbers className="ml-2 w-5 h-7" />
    ) : (
      <TbSortDescendingNumbers className="ml-2 w-5 h-7" />
    );
  };

  return (
    <div className="flex items-center cursor-pointer" onClick={handleSort}>
      {columnLabel}
      {getSortIcon()}
    </div>
  );
};

export default SortableHeader;
