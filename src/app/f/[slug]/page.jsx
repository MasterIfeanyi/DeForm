'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { validateForm } from '@/lib/builder/validationRules';
import { getFieldTypeById } from '@/lib/builder/fieldRegistry';

export default function PublicFormPage() {
  const params = useParams();
  const [form, setForm] = useState(null);
  const [formData, setFormData] = useState({});
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    async function loadForm() {
      try {
        // todo: Fetch from API
        // const res = await fetch(`/api/public/forms/${params.slug}`);
        // const data = await res.json();
        // setForm(data);

        // Mock data for now
        setForm({
          id: '1',
          title: 'Contact Form',
          description: 'Get in touch with us',
          fields: [],
        });
        setLoading(false);
      } catch (error) {
        console.error('Failed to load form:', error);
        setLoading(false);
      }
    }
    loadForm();
  }, [params.slug]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validation = validateForm(form.fields, formData);

    if (!validation.isValid) {
      setErrors(validation.errors);
      return;
    }

    setSubmitting(true);

    try {
      // todo: Submit to API
      // await fetch(`/api/public/forms/${form.id}/submissions`, {
      //   method: 'POST',
      //   body: JSON.stringify(formData),
      // });
      setSubmitted(true);
    } catch (error) {
      console.error('Submission failed:', error);
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  if (!form) return <div className="flex items-center justify-center min-h-screen">Form not found</div>;
  if (submitted) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="text-center">
          <div className="text-6xl mb-4">✅</div>
          <h2 className="text-2xl font-bold mb-2">Thank you!</h2>
          <p className="text-gray-600">{form.thankYouMessage}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-lg shadow-sm p-8">
          <h1 className="text-3xl font-bold mb-2">{form.title}</h1>
          {form.description && (
            <p className="text-gray-600 mb-8">{form.description}</p>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {form.fields.map((field) => (
              <div key={field.id}>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {field.config.label}
                  {field.config.required && <span className="text-red-500 ml-1">*</span>}
                </label>

                {/* Render field based on type */}
                {['SHORT_TEXT', 'EMAIL', 'PHONE'].includes(field.type) && (
                  <input
                    type={field.type === 'EMAIL' ? 'email' : 'text'}
                    value={formData[field.id] || ''}
                    onChange={(e) => setFormData({ ...formData, [field.id]: e.target.value })}
                    placeholder={field.config.placeholder}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                )}

                {errors[field.id] && (
                  <p className="mt-1 text-sm text-red-600">{errors[field.id][0]}</p>
                )}
              </div>
            ))}

            <button
              type="submit"
              disabled={submitting}
              className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {submitting ? 'Submitting...' : 'Submit'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
