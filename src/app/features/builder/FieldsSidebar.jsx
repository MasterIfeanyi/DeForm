'use client';

import { useDraggable } from '@dnd-kit/core';
import { getAllFieldTypes } from '@/lib/builder/fieldRegistry';

function DraggableFieldType({ fieldType }) {
  const { attributes, listeners, setNodeRef, isDragging } = useDraggable({
    id: `sidebar-${fieldType.id}`,
    data: { fieldType },
  });

    return (
        <div
            ref={setNodeRef}
            {...listeners}
            {...attributes}
            className={`
                flex items-center gap-3 p-3 bg-white rounded-lg border-2 border-gray-200
                hover:border-blue-400 hover:shadow-md cursor-grab active:cursor-grabbing
                transition-all duration-150
                ${isDragging ? 'opacity-50' : 'opacity-100'}
            `}
            >
            <span className="text-2xl">{fieldType.icon}</span>
            <span className="font-medium text-gray-700">{fieldType.label}</span>
        </div>
    );
}

export default function FieldsSidebar() {
  const fieldTypes = getAllFieldTypes();

    return (
        <aside className="w-64 bg-white border-r border-gray-200 p-4 overflow-y-auto">
            <div className="mb-4">
                <h2 className="text-lg font-bold text-gray-900">Fields</h2>
                <p className="text-sm text-gray-500">Drag to add to form</p>
            </div>

            <div className="space-y-2">
                {fieldTypes.map((fieldType) => (
                <DraggableFieldType key={fieldType.id} fieldType={fieldType} />
                ))}
            </div>
        </aside>
    );
}