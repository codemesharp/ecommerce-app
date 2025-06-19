'use client';

import React, { useState } from 'react';
import { DndContext, closestCenter, DragEndEvent } from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { v4 as uuidv4 } from 'uuid';
import { Page } from '@/utils/types';
import PageItem from './PageItem';

import {
  InformationCircleIcon,
  DocumentTextIcon,
  CheckCircleIcon,
  PlusIcon,
  DocumentIcon,
  XMarkIcon,
} from '@heroicons/react/24/solid';

const iconMap: Record<string, React.ElementType> = {
  Info: InformationCircleIcon,
  Details: DocumentTextIcon,
  Other: DocumentTextIcon,
  Ending: CheckCircleIcon,
  'New Page': PlusIcon,
};

const PageNavigation: React.FC = () => {
  const [pages, setPages] = useState<Page[]>([
    { id: uuidv4(), title: 'Info' },
    { id: uuidv4(), title: 'Details' },
    { id: uuidv4(), title: 'Other' },
    { id: uuidv4(), title: 'Ending' },
  ]);

  const [activePageId, setActivePageId] = useState<string>(pages[0].id);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isFormModalOpen, setIsFormModalOpen] = useState<boolean>(false);
  const [newPageTitle, setNewPageTitle] = useState<string>('');

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const oldIndex = pages.findIndex((p) => p.id === active.id);
    const newIndex = pages.findIndex((p) => p.id === over.id);

    if (oldIndex !== -1 && newIndex !== -1) {
      setPages(arrayMove(pages, oldIndex, newIndex));
    }
  };

  const handleAddNewPage = () => {
    if (!newPageTitle.trim()) return;
    const newPage: Page = { id: uuidv4(), title: newPageTitle.trim() };
    setPages((prev) => [...prev, newPage]);
    setActivePageId(newPage.id);
    setNewPageTitle('');
    setIsFormModalOpen(false);
    setIsModalOpen(false);
  };

  return (
    <div className="p-6 w-full max-w-4xl mx-auto">
      <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <SortableContext
          items={pages.map((p) => p.id)}
          strategy={verticalListSortingStrategy}
        >
          <div className="flex flex-wrap gap-3 items-center">
            {pages.map((page) => {
              const Icon = iconMap[page.title] ?? PlusIcon;

              return (
                <div key={page.id} className="relative group">
                  <PageItem
                    page={page}
                    icon={
                      <Icon
                        className={`h-5 w-5 ${
                          page.id === activePageId
                            ? 'text-yellow-500'
                            : 'text-gray-500'
                        }`}
                      />
                    }
                    isActive={page.id === activePageId}
                    onClick={() => setActivePageId(page.id)}
                  />
                </div>
              );
            })}

            <button
              onClick={() => setIsModalOpen(true)}
              className="flex items-center gap-1 bg-gray-200 rounded-lg text-black font-medium px-4 py-2 shadow-sm hover:bg-gray-300 transition focus:outline-none"
            >
              <PlusIcon className="h-5 w-5" />
              <span>Add New</span>
            </button>
          </div>
        </SortableContext>
      </DndContext>

      {/* Choose Page Type Modal */}
      {isModalOpen && (
        <div
          className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50"
          onClick={() => setIsModalOpen(false)}
        >
          <div
            className="relative bg-white/90 backdrop-blur-md rounded-lg shadow-xl w-80 p-6 border border-white/40"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-2 right-2 text-gray-500 hover:text-black"
            >
              <XMarkIcon className="w-5 h-5" />
            </button>
            <h2 className="font-bold text-black text-lg mb-4">
              Choose a page type
            </h2>

            <button
              onClick={() => {
                setIsModalOpen(false);
                setIsFormModalOpen(true);
              }}
              className="flex items-center gap-3 font-bold bg-gray-100 text-black px-4 py-3 rounded-lg hover:bg-gray-200 transition w-full"
            >
              <div className="border-yellow-500 border p-2 rounded-lg">
                <DocumentIcon className="h-5 w-5 text-yellow-500" />
              </div>
              <div className="flex flex-col items-start">
                <span className="text-base font-semibold">Form</span>
                <span className="text-sm font-normal text-gray-500">
                  Page to collect user input
                </span>
              </div>
            </button>
          </div>
        </div>
      )}

      {/* Name Form Modal */}
      {isFormModalOpen && (
        <div
          className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50"
          onClick={() => setIsFormModalOpen(false)}
        >
          <div
            className="relative bg-white/90 backdrop-blur-md rounded-lg shadow-xl w-80 p-6 border border-white/40"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setIsFormModalOpen(false)}
              className="absolute top-2 right-2 text-gray-500 hover:text-black"
            >
              <XMarkIcon className="w-5 h-5" />
            </button>
            <h2 className="font-bold text-black text-lg mb-4">
              Name your form page
            </h2>

            <input
              type="text"
              value={newPageTitle}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setNewPageTitle(e.target.value)
              }
              placeholder="e.g. Contact Form"
              className="w-full px-3 py-2 mb-4 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-400 text-black font-medium"
            />

            <div className="flex w-full justify-end">
              <button
                onClick={handleAddNewPage}
                className="bg-blue-500 hover:bg-blue-600 text-white text-sm font-semibold py-2 px-4 rounded transition"
              >
                Create
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PageNavigation;
