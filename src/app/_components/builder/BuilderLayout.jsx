'use client';

import { DndContext, DragOverlay, closestCenter } from '@dnd-kit/core';
import { useState } from 'react';
import FieldsSidebar from './FieldsSidebar';
import FormCanvas from './FormCanvas';
import LivePreview from './LivePreview';
import { FIELD_TYPES } from '@/lib/builder/fieldRegistry';

export default function BuilderLayout({ builderState, formId }) {
  const [activeId, setActiveId] = useState(null);

  function handleDragStart(event) {
    setActiveId(event.active.id);
  }

  function handleDragEnd(event) {
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
      builderState.reorderFields(oldIndex, newIndex);
    }

    setActiveId(null);
  }

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
          {activeId && activeId.startsWith('sidebar-') ? (
            <div className="bg-white p-4 rounded-lg shadow-lg border-2 border-blue-500">
              {FIELD_TYPES[activeId.replace('sidebar-', '')]?.icon}{' '}
              {FIELD_TYPES[activeId.replace('sidebar-', '')]?.label}
            </div>
          ) : null}
        </DragOverlay>
      </div>
    </DndContext>
  );
}