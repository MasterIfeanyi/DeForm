'use client';

import { useState, useEffect, useMemo } from 'react';
import { useParams } from 'next/navigation';
import BuilderLayout from '@/app/_components/builder/BuilderLayout';
import { useFormBuilder } from '@/hooks/useFormBuilder';
import FormBuilder from '@/app/_components/FormBuilder';

export default function FormBuilderPage() {
  const params = useParams();
  const formId = params.formId;
  const [loading, setLoading] = useState(true);

  const initialFields = useMemo(() => [], []);
  const builderState = useFormBuilder([]);

  // Load form data
  useEffect(() => {
    async function loadForm() {
      try {
        // todo: Fetch from API
        // const res = await fetch(`/api/forms/${formId}`);
        // const data = await res.json();
        setLoading(false);
      } catch (error) {
        console.error('Failed to load form:', error);
        setLoading(false);
      }
    }
    loadForm();
  }, [formId]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-lg">Loading...</div>
      </div>
    );
  }

  // return <BuilderLayout builderState={builderState} formId={formId} />;
  return <FormBuilder />
}