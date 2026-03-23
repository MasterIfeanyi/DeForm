'use client'

import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import { useQuery } from '@tanstack/react-query'
import Icon from '@/icons/Icon'
import { Button } from '@/components/ui'

export default function FormDetailPage() {
  const { id } = useParams()
  const router = useRouter()

  const { data: form, isLoading, isError } = useQuery({
    queryKey: ['form', id],
    queryFn: () =>
      fetch(`/api/forms/${id}`).then(res => {
        if (!res.ok) throw new Error('Form not found')
        return res.json()
      }),
    staleTime: 5 * 60 * 1000,
    refetchOnWindowFocus: false,
    enabled: !!id,
  })

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p className="text-muted-foreground text-sm animate-pulse">Loading form...</p>
      </div>
    )
  }

  if (isError || !form) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <p className="text-muted-foreground mb-4">Form not found or you do not have access.</p>
          <Button onClick={() => router.push('/dashboard')}>Back to Dashboard</Button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-3xl mx-auto p-6 md:p-10">

        <Link
          href="/dashboard"
          className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition mb-8"
        >
          <Icon name="back" className="w-4 h-4" />
          Back to Dashboard
        </Link>

        <div className="flex items-start justify-between mb-6">
          <div>
            <h1 className="text-2xl font-medium">{form.title}</h1>
            {form.description && (
              <p className="text-muted-foreground text-sm mt-1">{form.description}</p>
            )}
            <div className="flex items-center gap-3 mt-3">
              <span className={`text-xs px-2.5 py-1 rounded-full font-medium
                ${form.status === 'PUBLISHED'
                  ? 'bg-green-100 text-green-700'
                  : form.status === 'ARCHIVED'
                  ? 'bg-secondary text-secondary-foreground'
                  : 'bg-accent text-accent-foreground'
                }`}>
                {form.status.charAt(0) + form.status.slice(1).toLowerCase()}
              </span>
              <span className="text-sm text-muted-foreground">
                {form.submissionCount} {form.submissionCount === 1 ? 'response' : 'responses'}
              </span>
              <span className="text-sm text-muted-foreground">
                {form.fields.length} {form.fields.length === 1 ? 'field' : 'fields'}
              </span>
            </div>
          </div>

          <Button
            variant="other"
            onClick={() => router.push(`/builder?formId=${form.id}`)}
            icon={<Icon name="edit" className="w-4 h-4" />}
          >
            Edit
          </Button>
        </div>

        <div className="rounded-xl border border-border bg-card">
          <div className="px-5 py-4 border-b border-border">
            <h2 className="font-medium">Form Fields</h2>
          </div>

          {form.fields.length === 0 ? (
            <div className="p-10 text-center">
              <Icon name="document" className="w-8 h-8 mx-auto mb-3 text-muted-foreground" />
              <p className="text-sm text-muted-foreground">No fields added yet.</p>
              <Button
                className="mt-4 rounded-xl! bg-blue-600! hover:bg-blue-700!"
                onClick={() => router.push(`/builder?formId=${form.id}`)}
              >
                Open in Builder
              </Button>
            </div>
          ) : (
            <div className="divide-y divide-border">
              {form.fields.map((field) => (
                <div key={field.id} className="flex items-center justify-between px-5 py-3">
                  <div>
                    <p className="text-sm font-medium">{field.label}</p>
                    {field.placeholder && (
                      <p className="text-xs text-muted-foreground mt-0.5">{field.placeholder}</p>
                    )}
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs bg-secondary text-secondary-foreground px-2 py-0.5 rounded-full">
                      {field.type.replace(/_/g, ' ').toLowerCase()}
                    </span>
                    {field.required && (
                      <span className="text-xs text-danger font-medium">Required</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <p className="text-xs text-muted-foreground mt-6 text-right">
          Last updated {new Date(form.updatedAt).toLocaleDateString()}
        </p>

      </div>
    </div>
  )
}