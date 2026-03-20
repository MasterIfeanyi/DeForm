'use client';

import { DndContext, DragOverlay, closestCenter } from '@dnd-kit/core';
import { useState, useCallback } from 'react';
import FieldsSidebar from './FieldsSidebar';
import FormCanvas from './FormCanvas';
import LivePreview from './LivePreview';
import { FIELD_TYPES } from '@/lib/builder/fieldRegistry';

export default function BuilderLayout({ builderState, formId }) {
  const [activeId, setActiveId] = useState(null);

  const handleDragStart = useCallback((event) => {
    setActiveId(event.active.id);
  }, []);

  const handleDragEnd = useCallback((event) => {
    const { active, over } = event;

    if (!over) {
      setActiveId(null);
      return;
    }

    // Dragging from sidebar to canvas
    if (active.id.startsWith('sidebar-')) {
      const fieldType = active.id.replace('sidebar-', '');
      builderState.addField(fieldType);
    }

    // Reordering within canvas
    if (active.id.startsWith('field-') && over.id.startsWith('field-')) {
      const oldIndex = builderState.fields.findIndex(
        (f) => `field-${f.id}` === active.id
      );
      const newIndex = builderState.fields.findIndex(
        (f) => `field-${f.id}` === over.id
      );
      
      if (oldIndex !== -1 && newIndex !== -1 && oldIndex !== newIndex) {
        builderState.reorderFields(oldIndex, newIndex);
      }
    }

    setActiveId(null);
  }, [builderState]);

  console.log('BuilderLayout render', builderState.fields.length);

  const activeField = activeId?.startsWith('sidebar-') 
    ? FIELD_TYPES[activeId.replace('sidebar-', '')] 
    : null;

  return (
    <DndContext
      collisionDetection={closestCenter}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <div className="flex h-screen bg-gray-50">
        {/* Left Sidebar - Field Types */}
        <FieldsSidebar />

        {/* Center Canvas - Drop Zone */}
        <FormCanvas builderState={builderState} />

        {/* Right Preview - Live View */}
        <LivePreview fields={builderState.fields} />

        {/* Drag Overlay */}
        <DragOverlay>
          {activeField ? (
            <div className="bg-white p-4 rounded-lg shadow-lg border-2 border-blue-500">
              {activeField.icon} {activeField.label}
            </div>
          ) : null}
        </DragOverlay>
      </div>
    </DndContext>
  );
}