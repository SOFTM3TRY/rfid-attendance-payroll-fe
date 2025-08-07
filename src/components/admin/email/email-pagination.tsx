"use client";

import { Button } from "@/components/ui/button";

interface Props {
  page: number;
  totalPages: number;
  onPageChange: (newPage: number) => void;
}

export const EmailPagination = ({ page, totalPages, onPageChange }: Props) => {
  return (
    <div className="flex justify-between items-center py-4">
      <Button
        variant="outline"
        onClick={() => onPageChange(page - 1)}
        disabled={page === 1}
      >
        Previous
      </Button>
      <span>
        Page {page} of {totalPages}
      </span>
      <Button
        variant="outline"
        onClick={() => onPageChange(page + 1)}
        disabled={page === totalPages}
      >
        Next
      </Button>
    </div>
  );
};
