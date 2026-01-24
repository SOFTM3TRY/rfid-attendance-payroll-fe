"use client";

import { RefreshCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface RefreshButtonProps {
  isLoading: boolean;
  onClick: () => void;
}

export function RefreshButton({ isLoading, onClick }: RefreshButtonProps) {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          onClick={onClick}
          disabled={isLoading}
          className="h-7 w-7 rounded-full"
        >
          <RefreshCcw className={`size-3 ${isLoading ? "animate-spin" : ""}`} />
        </Button>
      </TooltipTrigger>
      <TooltipContent>
        <p className="text-xs">Refresh Table</p>
      </TooltipContent>
    </Tooltip>
  );
}
