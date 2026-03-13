'use client';

import { useMemo } from 'react';
import { useDroppable } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import CanvasField from './canvas/CanvasField';
import { HiOutlineDocumentAdd } from "react-icons/hi";

export default function FormCanvas({ builderState }) {
  const { setNodeRef } = useDroppable({ id: 'canvas-droppable' });

  const fieldIds = useMemo(
    () => builderState.fields.map((f) => `field-${f.id}`), [builderState.fields]
  )

  return (
    <main className="flex-1 overflow-y-auto p-8">
      <div className="max-w-3xl mx-auto">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Untitled Form</h1>
          <p className="text-gray-500">Add fields from the sidebar</p>
        </div>

        <div
          ref={setNodeRef}
          className="min-h-125 bg-white rounded-lg border-2 border-dashed border-gray-300 p-6"
        >
          {builderState.fields.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-64 text-gray-400">
              <HiOutlineDocumentAdd className="w-16 h-16 mb-4" />
              <p className="text-lg font-medium">No fields yet</p>
              <p className="text-sm">Drag fields from the sidebar to get started</p>
            </div>
          ) : (
            <SortableContext
              items={fieldIds}
              strategy={verticalListSortingStrategy}
            >
              <div className="space-y-4">
                {builderState.fields.map((field) => (
                  <CanvasField
                    key={field.id}
                    field={field}
                    isSelected={builderState.selectedFieldId === field.id}
                    onSelect={() => builderState.setSelectedFieldId(field.id)}
                    onRemove={() => builderState.removeField(field.id)}
                    onDuplicate={() => builderState.duplicateField(field.id)}
                    onUpdate={(updates) => builderState.updateField(field.id, updates)}
                  />
                ))}
              </div>
            </SortableContext>
          )}
        </div>
      </div>
    </main>
  );
}