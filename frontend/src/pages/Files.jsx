import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { authApi } from '../api'
import { filesApi } from '../api'

export default function Files() {
  const navigate = useNavigate()
  const [items, setItems] = useState([])
  const [file, setFile] = useState(null)
  const [text, setText] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  async function refresh() {
    try {
      setError('')
      const data = await filesApi.list()
      setItems(data)
    } catch (e) {
      setError('Failed to load files')
    }
  }

  useEffect(() => {
    refresh()
  }, [])

  async function handleUpload(e) {
    e.preventDefault()
    if (!file) return
    setLoading(true)
    try {
      await filesApi.upload({ file, text })
      setFile(null); setText('')
      await refresh()
    } catch (e) {
      setError('Upload failed')
    } finally {
      setLoading(false)
    }
  }

  async function handleUpdate(id) {
    const newText = prompt('New text:')
    if (newText == null) return
    try {
      await filesApi.updateText(id, newText)
      await refresh()
    } catch (e) {
      setError('Update failed')
    }
  }

  async function handleDelete(id) {
    if (!confirm('Delete file?')) return
    try {
      await filesApi.remove(id)
      await refresh()
    } catch (e) {
      setError('Delete failed')
    }
  }

  function handleLogout() {
    authApi.logout()
    navigate('/login')
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center">
        <h2 className="text-2xl font-semibold text-white">Files</h2>
        <div className="flex-1" />
        <button onClick={handleLogout} className="px-3 py-1.5 rounded-md border border-white/10 text-white/90 hover:text-white hover:border-white/20">Logout</button>
      </div>
      {error && <div className="text-red-400 text-sm">{error}</div>}

      <form onSubmit={handleUpload} className="flex flex-wrap items-center gap-3 bg-white/5 border border-white/10 rounded-xl p-4">
        <input type="file" onChange={e => setFile(e.target.files?.[0] || null)} className="text-white" />
        <input placeholder="Text" value={text} onChange={e => setText(e.target.value)} className="px-3 py-2 rounded-md bg-white/5 border border-white/10 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-indigo-400" />
        <button type="submit" disabled={loading} className="inline-flex justify-center px-4 py-2 rounded-md bg-indigo-500 hover:bg-indigo-400 text-white font-semibold disabled:opacity-60">Upload</button>
      </form>

      <ul className="grid gap-3 p-0">
        {items.map(it => (
          <li key={it.id} className="list-none border border-white/10 bg-white/5 rounded-lg p-4">
            <div className="text-white font-semibold">{it.filename}</div>
            <div className="text-white/80">Text: {it.text}</div>
            {it.url && <div className="mt-1"><a className="text-indigo-300 hover:text-indigo-200" href={it.url} target="_blank">Open</a></div>}
            <div className="flex gap-2 mt-3">
              <button className="px-3 py-1.5 rounded-md bg-amber-500/90 hover:bg-amber-500 text-white" onClick={() => handleUpdate(it.id)}>Edit Text</button>
              <button className="px-3 py-1.5 rounded-md bg-rose-600/90 hover:bg-rose-600 text-white" onClick={() => handleDelete(it.id)}>Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}

