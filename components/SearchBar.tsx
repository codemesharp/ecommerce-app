'use client';
import { useState, useEffect } from 'react';

interface Education {
  school: string;
  degree: string;
  duration: string;
}

export interface NodeData {
  id: string;
  name: string;
  type: string;
  image?: string;
  location?: string;
  bio?: string;
  peerCount?: number;
  followingCount?: number;
  patientsServed?: number;
  successRate?: string | number;
  education?: Education[];
}

interface SearchBarProps {
  data: NodeData[];
  onSelect: (node: NodeData) => void;
}

export default function SearchBar({ data, onSelect }: SearchBarProps) {
  const [query, setQuery] = useState('');
  const [filtered, setFiltered] = useState<NodeData[]>([]);

  useEffect(() => {
    if (query.trim() === '') {
      setFiltered([]);
    } else {
      const matches = data.filter((node) =>
        node.name?.toLowerCase().includes(query.toLowerCase())
      );
      setFiltered(matches.slice(0, 10));
    }
  }, [query, data]);

  return (
    <div className="relative w-full">
      <input
        type="text"
        value={query}
        placeholder="Search HCP by name"
        onChange={(e) => setQuery(e.target.value)}
        className="w-full border border-gray-300 rounded-xl px-4 py-2"
      />
      {filtered.length > 0 && (
        <ul className="absolute z-10 w-full bg-white border border-gray-200 mt-1 rounded-xl shadow-md max-h-60 overflow-auto">
          {filtered.map((node) => (
            <li
              key={node.id}
              onClick={() => {
                onSelect(node);
                setQuery('');
                setFiltered([]);
              }}
              className="px-4 py-2 cursor-pointer hover:bg-gray-100 text-sm"
            >
              {node.name} ({node.type})
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
