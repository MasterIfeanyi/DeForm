'use client';
import { Input, TextArea, Checkbox, FieldLabel } from "@/components/ui";

export default function LivePreview({ fields }) {
  return (
    <aside className="w-96 bg-gray-100 border-l border-gray-200 p-6 overflow-y-auto">
        <div className="mb-4">
            <h2 className="text-lg font-bold text-gray-900">Preview</h2>
            <p className="text-sm text-gray-500">Live preview of your form</p>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
            <h2 className="text-xl font-bold mb-4">Form Preview</h2>
            
            {fields.length === 0 ? (
            <p className="text-gray-400 text-center py-8">Add fields to see preview</p>
            ) : (
            <div className="space-y-4">
                {fields.map((field) => (
                    <div key={field.id} className="space-y-2">
                        <FieldLabel
                            label={field.config.label}
                            required={field.config.required}
                            htmlFor={field.id}
                        />
                        
                        {/* Render appropriate input based on field type */}
                        {['EMAIL', 'PHONE'].includes(field.type) && (
                            <Input
                                type={field.type === 'EMAIL' ? 'email' : 'text'}
                                placeholder={field.config.placeholder}
                                disabled={true}
                                className="px-3 py-2 border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                            />
                        )}
                    
                        {field.type === 'NUMBER' && (
                           <Input
                                type="number"
                                placeholder={field.config.placeholder}
                                disabled
                                className="px-3 py-2 border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                            />
                        )}

                        {field.type === 'SHORT_TEXT' && (
                            <Input
                                type="text"
                                placeholder={field.config.placeholder}
                                disabled
                                className="px-3 py-2 border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                            />
                        )}

                        {field.type === 'TEXTAREA' && (
                            <TextArea
                                id={field.id}
                                value=""
                                onChange={() => {}}
                                placeholder={field.config.placeholder}
                                rows={3}
                                disabled
                            />
                        )}
                    
                    
                        {field.type === 'DATE' && (
                            <Input
                                type="date"
                                disabled
                                className="border border-gray-300 focus:ring-2 focus:ring-blue-500"
                            />
                        )}
                    
                        {field.type === 'CHECKBOX' && (
                            <div className="space-y-2">
                                {field.config.options.map((option, idx) => (
                                    <Checkbox
                                        key={idx}
                                        label={option}
                                        disabled
                                        checked={false}
                                    />
                                ))}
                            </div>
                        )}
                    </div>
                ))}
            </div>
            )}
        </div>
    </aside>
  );
}

