'use client';

import React, { useState, useCallback } from 'react';
import { AiOutlineCopy, AiOutlineDownload } from 'react-icons/ai';
import clsx from 'clsx';
import { useTranslation } from "@/hooks/useTranslation";

// import { FIELD_TYPES } from '../../constants/fieldTypes';
import { FIELD_TYPES } from '@/lib/builder/fieldRegistry';

import { generateId } from '@/utils/generateId';
import { generateHTML } from '@/utils/generateHTML';
import { FieldTypeButton } from './FieldTypeButton';
import { FieldEditor } from './FieldEditor';
import { LivePreviewField } from './LivePreviewField';

export default function FormBuilder() {


  const { t } = useTranslation()

  const [formTitle, setFormTitle] = useState('');
  const [formDescription, setFormDescription] = useState('');
  const [fields, setFields] = useState([]);

  const addField = useCallback((type) => {
    const newField = {
      id: generateId(),
      type,
      label: '',
      placeholder: '',
      description: '',
      required: false,
      options: ['radio', 'checkbox', 'select'].includes(type) ? ['Option 1', 'Option 2'] : undefined,
      maxSize: type === 'file' ? '10MB' : undefined
    };
    setFields(prev => [...prev, newField]);
  }, []);

  const updateField = useCallback((id, updatedField) => {
    setFields(prev => prev.map(field => field.id === id ? updatedField : field));
  }, []);

  const deleteField = useCallback((id) => {
    setFields(prev => prev.filter(field => field.id !== id));
  }, []);

  const exportHTML = useCallback(() => {
    const html = generateHTML({ title: formTitle, description: formDescription, fields });
    const blob = new Blob([html], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${formTitle || 'form'}.html`;
    a.click();
    URL.revokeObjectURL(url);
  }, [formTitle, formDescription, fields]);

  const copyHTML = useCallback(() => {
    const html = generateHTML({ title: formTitle, description: formDescription, fields });
    navigator.clipboard.writeText(html);
    alert('HTML copied to clipboard!');
  }, [formTitle, formDescription, fields]);

  return (
    <div className="min-h-screen bg-background text-black">
      {/* Header */}
      <header className="border-b border-neutral-800 bg-neutral-950/80 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-450 mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-xl font-bold tracking-tight">{t("builder.name")}</h1>
              <p className="text-xs text-neutral-500 mt-0.5">{t("builder.tagline")}</p>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={copyHTML}
                disabled={fields.length === 0}
                className={clsx(
                  "px-4 py-2 bg-neutral-800 hover:bg-neutral-700 rounded-lg text-sm flex items-center gap-2 transition-colors",
                  fields.length === 0 && "opacity-50 cursor-not-allowed"
                )}
              >
                <AiOutlineCopy size={16} />
                {t("builder.actions.copyHtml")}
              </button>
              <button
                onClick={exportHTML}
                disabled={fields.length === 0}
                className={clsx(
                  "px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg text-sm flex items-center gap-2 transition-colors font-medium",
                  fields.length === 0 && "opacity-50 cursor-not-allowed"
                )}
              >
                <AiOutlineDownload size={16} />
                {t("builder.actions.export")}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* 3-Column Layout */}
      <div className="max-w-450 mx-auto">
        <div className="grid grid-cols-12 gap-0 min-h-[calc(100vh-73px)]">

          {/* Column 1: Field Types (Left) */}
          <div className="col-span-2 border-r border-neutral-800 bg-neutral-950/50 p-4 overflow-y-auto">
            <div className="mb-4">
              <h2 className="text-sm font-semibold mb-1 text-neutral-300 uppercase tracking-wide">{t("builder.fieldTypes.title")}</h2>
              <p className="text-xs text-neutral-500">{t("builder.fieldTypes.description")}</p>
            </div>

            <div className="space-y-1.5">
              {FIELD_TYPES.map(type => (
                <FieldTypeButton key={type.id} type={type} onClick={addField} />
              ))}
            </div>
          </div>

          {/* Column 2: Canvas/Editor (Center) */}
          <div className="col-span-5 border-r border-neutral-800 overflow-y-auto">
            <div className="p-6">
              <div className="mb-6">
                <h2 className="text-lg font-semibold mb-4">{t("builder.settings.title")}</h2>

                <div className="space-y-4 mb-6">
                  <div>
                    <label className="block text-sm font-medium mb-2 text-neutral-300">{t("builder.settings.formTitle")}</label>
                    <input
                      type="text"
                      value={formTitle}
                      onChange={(e) => setFormTitle(e.target.value)}
                      placeholder="e.g., Job Application Form"
                      className="w-full px-4 py-2.5 bg-neutral-900 border border-neutral-700 focus:border-blue-500 rounded-lg text-white placeholder-neutral-500 focus:outline-none transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2 text-neutral-300">{t("builder.settings.description")}</label>
                    <textarea
                      value={formDescription}
                      onChange={(e) => setFormDescription(e.target.value)}
                      placeholder={t("builder.settings.descriptionPlaceholder")}
                      rows={3}
                      className="w-full px-4 py-2.5 bg-neutral-900 border border-neutral-700 focus:border-blue-500 rounded-lg text-white placeholder-neutral-500 focus:outline-none resize-none transition-colors"
                    />
                  </div>
                </div>
              </div>

              <div className="border-t border-neutral-800 pt-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-semibold">{t("builder.canvas.title")}</h2>
                  <span className="text-xs text-neutral-500">{fields.length} field{fields.length !== 1 ? 's' : ''}</span>
                </div>

                {fields.length === 0 ? (
                  <div className="text-center py-16 text-neutral-500">
                    <p className="mb-2">{t("builder.canvas.emptyTitle")}</p>
                    <p className="text-sm">{t("builder.canvas.emptyDescription")}</p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {fields.map(field => (
                      <FieldEditor
                        key={field.id}
                        field={field}
                        onUpdate={updateField}
                        onDelete={deleteField}
                      />
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Column 3: Live Preview (Right) */}
          <div className="col-span-5 bg-neutral-950/30 overflow-y-auto">
            <div className="p-6">
              <div className="mb-6 flex items-center justify-between">
                <div>
                  <h2 className="text-lg font-semibold">{t("builder.preview.title")}</h2>
                  <p className="text-xs text-neutral-500 mt-1">{t("builder.preview.description")}</p>
                </div>
              </div>

              <div className="bg-black rounded-xl border border-neutral-800 p-8">
                <h1 className="text-3xl font-semibold mb-3 text-white">
                  {formTitle || 'Your Form Title'}
                </h1>
                {(formDescription || !formTitle) && (
                  <p className="text-neutral-400 mb-8 leading-relaxed">
                    {formDescription || 'Your form description will appear here'}
                  </p>
                )}

                {fields.length > 0 ? (
                  <div className="space-y-6 mb-6">
                    {fields.map(field => (
                      <LivePreviewField key={field.id} field={field} />
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-16 text-neutral-600">
                    <p>{t("builder.preview.empty")}</p>
                  </div>
                )}

                {fields.length > 0 && (
                  <button
                    type="button"
                    className="w-full py-3.5 bg-blue-600 hover:bg-blue-700 rounded-lg font-semibold text-base transition-colors"
                  >
                    {t("common.submit")}
                  </button>
                )}

                {fields.length > 0 && (
                  <div className="text-center mt-6 text-neutral-600 text-xs">
                    Powered by DeForm
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}