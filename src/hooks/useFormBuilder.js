'use client';

import { useState, useCallback } from 'react';
import { nanoid } from 'nanoid';
import { getFieldTypeById } from '@/lib/builder/fieldRegistry';

export function useFormBuilder(initialFields = []) {
  const [fields, setFields] = useState(initialFields);
  const [selectedFieldId, setSelectedFieldId] = useState(null);
  const [isDirty, setIsDirty] = useState(false);

  // Add field to canvas
  // NO dependency on fields.length — use state setter instead
  const addField = useCallback((fieldTypeId, position = -1) => {
    
    console.log('addField called', fieldTypeId);


    const fieldType = getFieldTypeById(fieldTypeId);
    if (!fieldType) return;

    const newField = {
      id: nanoid(),
      type: fieldTypeId,
      config: { ...fieldType.defaultConfig },
    };

    setFields((prev) => {
        const updated = [...prev];
        if (position === -1) {
            updated.push(newField);
        } else {
            updated.splice(position, 0, newField);
        }
        return updated.map((f, idx) => ({ ...f, order: idx }));
    });

    setSelectedFieldId(newField.id);
    setIsDirty(true);
  }, []); // ← EMPTY dependency: no external state needed

  // Remove field
  const removeField = useCallback((fieldId) => {
    setFields((prev) =>
      prev
        .filter((f) => f.id !== fieldId)
        .map((f, idx) => ({ ...f, order: idx }))
    );
    setSelectedFieldId((current) => (current === fieldId ? null : current));
    setIsDirty(true);
  }, []); // ← EMPTY dependency

  // Update field configuration
  const updateField = useCallback((fieldId, updates) => {
    setFields((prev) =>
      prev.map((f) => (f.id === fieldId ? { ...f, config: { ...f.config, ...updates } } : f))
    );
    setIsDirty(true);
  }, []); // ← EMPTY dependency

  // Reorder fields (drag and drop)
  const reorderFields = useCallback((startIndex, endIndex) => {
    setFields((prev) => {
      const result = Array.from(prev);
      const [removed] = result.splice(startIndex, 1);
      result.splice(endIndex, 0, removed);
      return result.map((f, idx) => ({ ...f, order: idx }));
    });
    setIsDirty(true);
  }, []); // ← EMPTY dependency

  // Duplicate field
  // Use state setter callback instead of reading fields array
  const duplicateField = useCallback((fieldId) => {
    setFields((prev) => {
      const field = prev.find((f) => f.id === fieldId);
      if (!field) return prev;

      const duplicated = {
        ...field,
        id: nanoid(),
        order: field.order + 1,
        config: { ...field.config, label: `${field.config.label} (Copy)` },
      };

      const updated = [...prev];
      updated.splice(field.order + 1, 0, duplicated);
      return updated.map((f, idx) => ({ ...f, order: idx }));
    });
    setIsDirty(true);
  }, []); // ← EMPTY dependency

  const selectedField = fields.find((f) => f.id === selectedFieldId);

  return {
    fields,
    selectedField,
    selectedFieldId,
    setSelectedFieldId,
    addField,
    removeField,
    updateField,
    reorderFields,
    duplicateField,
    isDirty,
    setIsDirty,
  };
}