import { Search } from 'lucide-react';
import React, { useState } from 'react';
import { Input } from "@/components/ui/input";

export const SearchBar = ({ onSearch }: { onSearch: (query: string) => void }) => {
  const [value, setValue] = useState("");

  const handleEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      onSearch(value);
    }
  };

  return (
    <div 
    className="relative flex-1 max-w-sm hidden md:block"
    style={{
      display: 'block',
      flex: '1 1 auto',
      maxWidth: '28rem',
      marginLeft: '1rem',
      marginRight: '1rem'
    }}
    >
      <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
      <Input
        type="search"
        placeholder="Nhập tên sách"
        className="pl-8 w-full"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={handleEnter}
      />
    </div>
  )
}