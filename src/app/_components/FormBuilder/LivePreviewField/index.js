import React, {useState} from 'react';
import { Input, TextArea, FieldLabel } from '@/components/ui';
import { useTranslation } from "@/hooks/useTranslation";

export const LivePreviewField = ({ field }) => {

    const [value, setValue] = useState(field.value || []);

    const handleChange = (id, val) => setValue(val);
    const handleCheckboxChange = (id, option, checked) => {
        setValue((prev) =>
        checked ? [...prev, option] : prev.filter((v) => v !== option)
        );
    };


    const {t} = useTranslation()


    const renderField = () => {

        switch(field.type) {
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
                        {field.options?.map((opt, idx) => (
                            <option key={idx} value={opt}>{t(opt)}</option>
                        ))}
                    </select>
                );
            case 'radio':
                return (
                    <div className="flex flex-col gap-3">
                        {field.options?.map((option, idx) => (
                            <FieldLabel
                                key={`preview_${field.id}_${idx}`}
                                htmlFor={`preview_${field.id}_${idx}`}
                                label={t(option)}
                                className="text-white"
                            />
                        ))}
                    </div>
                );
            case 'checkbox':
                return (
                    <div className="flex flex-col gap-3">
                        {field.options?.map((option, idx) => (
                            <label key={idx} className="flex items-center gap-3 cursor-pointer">
                                <input
                                    type="checkbox"
                                    className="w-4 h-4 accent-blue-500" 
                                    checked={value?.includes(option) || false}
                                    onChange={(e) => handleCheckboxChange(field.id, option, e.target.checked)}
                                />
                                <span className="text-black">{t(option)}</span>
                            </label>
                        ))}
                    </div>
                );
            case 'file':
                return (
                <div className="border-2 border-dashed border-neutral-700 rounded-lg p-10 text-center hover:border-neutral-600 cursor-pointer transition-colors">
                    <div className="text-3xl mb-2">📎</div>
                    <div className="text-black mb-1">{t("builder.canvas.clickToUpload", "Click to upload")}</div>
                    <div className="text-neutral-500 text-sm">{t("builder.canvas.maxSize", "Max {{size}}", { size: field.maxSize || '10MB' })}</div>
                </div>
                );
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
    };

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
};