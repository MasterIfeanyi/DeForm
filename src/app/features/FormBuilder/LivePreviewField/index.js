import React, { useState, useCallback, useId, useMemo, memo } from 'react';
import { Input, TextArea, FieldLabel } from '@/components/ui';
import { useTranslation } from "@/hooks/useTranslation";
import {FileUploader} from "../../../_components/FileUploader"

export const LivePreviewField = memo(({ field, onChange }) => {

    const { t } = useTranslation();
    const uniqueId = useId();

    const [checkboxSet, setCheckboxSet] = useState(() => {
        const initial = Array.isArray(field.value) ? field.value : [];
        return new Set(initial);
    });

    const [value, setValue] = useState(field.value || '');


    const handleChange = useCallback((id, val) => {
        setValue(val);
        onChange?.(id, val);
    }, [onChange]);

    const handleCheckboxChange = useCallback((option, checked) => {
        setCheckboxSet(prev => {
            const newSet = new Set(prev);
            if (checked) {
                newSet.add(option);
            } else {
                newSet.delete(option);
            }
            const newValue = Array.from(newSet);
            onChange?.(field.id, newValue);
            return newSet;
        });
    }, [field.id, onChange]);

    
    const checkboxValue = useMemo(() => Array.from(checkboxSet), [checkboxSet]);

    const renderCheckboxes = useMemo(() => {
        if (!field.options) return null;
        return field.options.map(option => {
            const inputId = `${field.id}-${option}-${uniqueId}`;
            const isChecked = checkboxSet.has(option);
            return (
                <label key={option} htmlFor={inputId} className="flex items-center gap-3 cursor-pointer">
                    <input
                        id={inputId}
                        type="checkbox"
                        className="w-4 h-4 accent-blue-500"
                        checked={isChecked}
                        onChange={(e) => handleCheckboxChange(option, e.target.checked)}
                    />
                    <span className="text-black">{t(option)}</span>
                </label>
            );
        });
    }, [field.options, checkboxSet, handleCheckboxChange, t, field.id, uniqueId]);

    const renderField = () => {
        switch (field.type) {
            case 'textarea':
                return (
                    <TextArea
                        id={field.id}
                        name={field.name}
                        label={t(field.label)}
                        value={value}
                        placeholder={t(field.placeholder)}
                        rows={4}
                        onChange={(e) => handleChange(field.id, e.target.value)}
                        className="px-4 py-3 border-neutral-700 rounded-lg text-black placeholder-neutral-400 resize-none"
                    />
                );
            case 'select':
                return (
                    <select
                        value={value || ""}
                        onChange={(e) => handleChange(field.id, e.target.value)}
                        className="w-full px-4 py-3 border border-neutral-700 rounded-lg text-black focus:outline-none focus:border-neutral-600"
                    >
                        <option value="">Select an option</option>
                        {field.options?.map((opt) => (
                            <option key={opt} value={opt}>{t(opt)}</option>
                        ))}
                    </select>
                );
            case 'radio':
                return (
                    <div className="flex flex-col gap-3">
                        {field.options?.map((option) => (
                            <FieldLabel
                                key={option}
                                htmlFor={`${field.id}-${option}-${uniqueId}`}
                                label={t(option)}
                                className="text-white"
                            />
                        ))}
                    </div>
                );
            case 'checkbox':
                return <div className="flex flex-col gap-3">{renderCheckboxes}</div>;
            case 'file':
                return <FileUploader field={field} t={t} onChange={onChange} />
            default:
                return (
                    <Input
                        id={field.id}
                        type={field.type}
                        placeholder={t(field.placeholder)}
                        value={value}
                        onChange={(e) => handleChange(field.id, e.target.value)}
                        className="px-4 py-3 border-neutral-700 rounded-lg text-black placeholder-neutral-400 focus:border-neutral-600"
                    />
                );
        }
    }

    return (
        <div className="mb-6">
            <label className="block text-base font-medium mb-2 text-white">
                {t(field.label, "Untitled Field")}
                {field.required && <span className="text-red-500 ml-1">*</span>}
            </label>
            {field.description && (
                <p className="text-neutral-400 text-sm mb-3">{t(field.description)}</p>
            )}
            {renderField()}
        </div>
    );
});

LivePreviewField.displayName = 'LivePreviewField';