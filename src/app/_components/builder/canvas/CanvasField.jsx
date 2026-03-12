'use client';

import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { getFieldTypeById } from '@/lib/builder/fieldRegistry';
import { Checkbox, Input } from '@/components/ui';
import { FiTrash2, FiCopy, FiMove } from 'react-icons/fi';


export default function CanvasField({
  field,
  isSelected,
  onSelect,
  onRemove,
  onDuplicate,
  onUpdate,
}) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: `field-${field.id}` });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  const fieldType = getFieldTypeById(field.type);

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`
        group relative bg-white rounded-lg border-2 p-4
        ${isSelected ? 'border-blue-500 ring-2 ring-blue-200' : 'border-gray-200'}
        hover:border-blue-300 transition-all cursor-pointer
      `}
      onClick={onSelect}
    >
      {/* Drag Handle */}
      <div
        {...attributes}
        {...listeners}
        className="absolute left-2 top-1/2 -translate-y-1/2 cursor-grab active:cursor-grabbing opacity-0 group-hover:opacity-100 transition-opacity"
      >
        <FiMove className="w-5 h-5 text-gray-400" />
      </div>

      {/* Field Content */}
      <div className="pl-6">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
                <Input
                    type="text"
                    value={field.config.label}
                    onChange={(e) => onUpdate({ label: e.target.value })}
                    onClick={(e) => e.stopPropagation()}
                    icon={true}
                    imgSrc={fieldType.icon} // 📝, 📧, 📞
                    className="flex-1 font-medium text-gray-900 bg-transparent border-b border-transparent hover:border-gray-300 focus:border-blue-500 focus:outline-none px-1 py-0.5"
                />
            </div>

            {/* Field Preview based on type */}
            {['SHORT_TEXT', 'EMAIL', 'PHONE'].includes(field.type) && (
              <Input
                type={field.type === 'EMAIL' ? 'email' : 'text'}
                placeholder={field.config.placeholder}
                value={field.config.placeholder}
                onClick={(e) => e.stopPropagation()}
                onChange={(e) => onUpdate({ placeholder: e.target.value })}
                className="w-full text-sm border border-gray-300 focus:ring-2 focus:ring-blue-500"
            />
            )}
          </div>

          {/* Actions */}
          <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
            <button
              onClick={(e) => {
                e.stopPropagation();
                onDuplicate();
              }}
              className="p-1.5 hover:bg-gray-100 rounded"
              title="Duplicate"
            >
              <FiCopy className="w-4 h-4 text-gray-600" />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onRemove();
              }}
              className="p-1.5 hover:bg-red-50 rounded"
              title="Delete"
            >
              <FiTrash2 className="w-4 h-4 text-red-600" />
            </button>
          </div>
        </div>

        <Checkbox
            label="Required"
            checked={field.config.required}
            disabled={false}
            onChange={(e) => {
                e.stopPropagation(); // prevents triggering parent onClick
                onUpdate({ required: e.target.checked });
            }}
            className="mt-3 text-sm text-gray-600"
        />
      </div>
    </div>
  );
}