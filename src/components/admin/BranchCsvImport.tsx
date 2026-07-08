'use client'

import React, { useRef, useState } from 'react'

import { BRANCH_CSV_TEMPLATE } from '@/utilities/parseCsv'

type ImportResponse = {
  ok?: boolean
  created?: number
  updated?: number
  skipped?: number
  errors?: string[]
  error?: string
}

export default function BranchCsvImport() {
  const inputRef = useRef<HTMLInputElement>(null)
  const [replaceExisting, setReplaceExisting] = useState(false)
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [message, setMessage] = useState('')

  const downloadTemplate = () => {
    const blob = new Blob([BRANCH_CSV_TEMPLATE], { type: 'text/csv;charset=utf-8' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = 'branches-template.csv'
    link.click()
    URL.revokeObjectURL(url)
  }

  const handleImport = async () => {
    const file = inputRef.current?.files?.[0]
    if (!file) {
      setStatus('error')
      setMessage('Choose a CSV file first.')
      return
    }

    if (replaceExisting && !window.confirm('Replace all existing branches with this CSV? This cannot be undone.')) {
      return
    }

    setStatus('loading')
    setMessage('Importing branches…')

    try {
      const formData = new FormData()
      formData.append('file', file)
      formData.append('_payload', JSON.stringify({ replace: replaceExisting }))

      const res = await fetch('/api/branches/import-csv', {
        method: 'POST',
        body: formData,
        credentials: 'include',
      })

      const data = (await res.json()) as ImportResponse

      if (!res.ok) {
        throw new Error(data.error || 'Import failed')
      }

      const summary = `Imported: ${data.created ?? 0} created, ${data.updated ?? 0} updated, ${data.skipped ?? 0} skipped.`
      const errorLines = data.errors?.length ? `\n${data.errors.slice(0, 5).join('\n')}` : ''
      setStatus(data.errors?.length ? 'error' : 'success')
      setMessage(`${summary}${errorLines}`)
      if (inputRef.current) inputRef.current.value = ''
    } catch (error) {
      setStatus('error')
      setMessage(error instanceof Error ? error.message : 'Import failed')
    }
  }

  return (
    <div
      style={{
        marginBottom: '1.5rem',
        padding: '1rem 1.25rem',
        borderRadius: '8px',
        border: '1px solid var(--theme-elevation-150)',
        background: 'var(--theme-elevation-50)',
      }}
    >
      <p style={{ margin: '0 0 0.75rem', fontWeight: 600 }}>Upload branches from CSV</p>
      <p style={{ margin: '0 0 1rem', fontSize: '0.875rem', color: 'var(--theme-elevation-600)' }}>
        Required columns: <code>branch_name</code>, <code>city</code>, <code>address</code>, <code>phone</code>.
        Optional: <code>cell_phone</code>, <code>email</code>, <code>google_map_link</code>.
      </p>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem', alignItems: 'center' }}>
        <input ref={inputRef} type="file" accept=".csv,text/csv" />
        <label style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem', fontSize: '0.875rem' }}>
          <input
            type="checkbox"
            checked={replaceExisting}
            onChange={(event) => setReplaceExisting(event.target.checked)}
          />
          Replace all existing branches
        </label>
        <button type="button" onClick={downloadTemplate} style={{ cursor: 'pointer' }}>
          Download template
        </button>
        <button type="button" onClick={handleImport} disabled={status === 'loading'} style={{ cursor: 'pointer' }}>
          {status === 'loading' ? 'Importing…' : 'Import CSV'}
        </button>
      </div>

      {message ? (
        <p
          style={{
            margin: '0.75rem 0 0',
            fontSize: '0.875rem',
            whiteSpace: 'pre-wrap',
            color: status === 'error' ? 'var(--theme-error-500)' : 'var(--theme-success-500)',
          }}
        >
          {message}
        </p>
      ) : null}
    </div>
  )
}
