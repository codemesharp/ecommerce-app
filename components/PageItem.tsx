'use client';

import React, { JSX } from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Page } from '@/utils/types';

interface Props {
  page: Page;
  isActive: boolean;
  onClick: () => void;
  icon?: JSX.Element;
}

const PageItem = ({ page, isActive, onClick, icon }: Props) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: page.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      onClick={onClick}
      style={style}
      className={`
        flex items-center gap-2 px-4 py-2 rounded-lg cursor-pointer 
        border transition-shadow duration-200 select-none 
        ${
          isActive
            ? 'bg-yellow-100 border-yellow-400 text-yellow-900 shadow-md'
            : 'bg-white border-gray-200 text-gray-700 hover:bg-gray-50 hover:shadow-sm'
        }
        w-full sm:w-auto
      `}
    >
      {icon && <span className="text-lg">{icon}</span>}
      <span className="text-sm sm:text-base font-medium truncate max-w-[10rem]">
        {page.title}
      </span>
    </div>
  );
};

export default PageItem;
