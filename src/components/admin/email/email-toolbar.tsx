"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface Props {
  search: string;
  setSearch: (val: string) => void;
  filter: string;
  setFilter: (val: string) => void;
}

export const EmailToolbar = ({ search, setSearch, filter, setFilter }: Props) => {
  return (
    <div className="flex justify-between items-center gap-4 py-4">
      <Input
        placeholder="Search email..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="max-w-sm"
      />

      <Select onValueChange={setFilter} defaultValue={filter}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Filter" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All</SelectItem>
          <SelectItem value="read">Read</SelectItem>
          <SelectItem value="unread">Unread</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};
