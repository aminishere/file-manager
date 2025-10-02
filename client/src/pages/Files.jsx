import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { authApi, filesApi } from "../api"


const Files = () => {
    const navigate = useNavigate();
    const [items, setItems] = useState([])
    const [file, setFile] = useState(null)
    const [text, setText] = useState('')
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')

    async function refresh() {
        try {
            setError('')
            const data =await filesApi.list()
            setItems(data)
        } catch (error) {
            setError('Failed to load files')      
        }
    }


    useEffect(()=>{
        refresh()
    },[])

    //file upload
    const handleUpload = async (e) =>{
        e.preventDefault()
        if(!file) return;
        setLoading(true);
        try {
            await filesApi.upload({file, text});
            setFile(null); setText('');
            await refresh();

        } catch (e) {
            setError('upload failed');
        }finally{
            setLoading(false);
        }
    }


   //tag update 
  const handleUpdate = async (id) => {
    const newText = prompt('New text:');
    if(newText==null)return;
    try {
        await filesApi.updateText(id, newText)
        await refresh();
    } catch (error) {
        setError('failed to update tag');
    }
  }
  //del
  const handleDelete = async(id) => {
    if(!confirm('Delete file?'))return;
    try {
        await filesApi.remove(id);
        await refresh();
    } catch (e) {
        setError('failed to delete');
        
    }
  }

  const handleLogout = () =>{
    authApi.logout();
    navigate('/');
  }

  return (
     <div className="min-h-screen grid place-items-center p-4">
      <div className="w-full max-w-4xl bg-white/5 border border-white/10 rounded-lg shadow p-6">
        
        {/* Header */}
        <div className="grid grid-cols-1 md:grid-cols-[1fr_auto] gap-4 items-center mb-6">
          <h2 className="text-white text-2xl font-semibold text-center md:text-left">Uploaded Files List</h2>
          <button 
            onClick={handleLogout}
            className="px-4 py-2 rounded bg-red-500 hover:bg-red-400 text-white font-semibold justify-self-center md:justify-self-end"
          >
            Logout
          </button>
        </div>

        {/* Error Message */}
        {error && (
          <div className="text-sm text-red-400 text-center mb-4 p-2 bg-red-400/10 rounded">
            {error}
          </div>
        )}

        {/* Upload Form */}
        <form onSubmit={handleUpload} className="grid grid-cols-1 md:grid-cols-[1fr_1fr_auto] gap-3 mb-8 p-4 bg-white/5 rounded border border-white/10">
          <input 
            type="file" 
            onChange={e=>setFile(e.target.files?.[0] || null)}
            className="border border-white/10 rounded px-3 py-2 bg-white/5 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-indigo-400"
          />
          <input 
            type="text" 
            placeholder="Add description..."
            value={text}
            onChange={e=> setText(e.target.value)}
            className="border border-white/10 rounded px-3 py-2 bg-white/5 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-indigo-400"
          />
          <button 
            type="submit" 
            disabled={loading}
            className="px-4 py-2 rounded bg-indigo-500 hover:bg-indigo-400 disabled:bg-indigo-800 text-white font-semibold"
          >
            {loading ? 'Uploading...' : 'Upload'}
          </button>
        </form>

        {/* Files List */}
        <div className="grid grid-cols-1 gap-4">
          {items.map(it=>(
            <div 
              key={it.id} 
              className="grid grid-cols-1 md:grid-cols-[1fr_auto] gap-4 p-4 bg-white/5 border border-white/10 rounded-lg items-center"
            >
              {/* File Info */}
              <div className="grid grid-cols-1 gap-2">
                <div className="text-white font-medium">{it.filename}</div>
                <div className="text-white/70 text-sm">{it.text}</div>
                {it.url && (
                  <div>
                    <a 
                      href={it.url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-indigo-300 hover:text-indigo-200 text-sm"
                    >
                      Open File
                    </a>
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="grid grid-cols-2 gap-2 justify-self-center md:justify-self-end">
                <button 
                  onClick={()=>handleUpdate(it.id)}
                  className="px-3 py-2 rounded bg-blue-500 hover:bg-blue-400 text-white font-semibold text-sm"
                >
                  Edit tag
                </button>
                <button 
                  onClick={()=>handleDelete(it.id)}
                  className="px-3 py-2 rounded bg-red-500 hover:bg-red-400 text-white font-semibold text-sm"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {items.length === 0 && (
          <div className="text-center text-white/50 py-8">
            No files uploaded yet
          </div>
        )}

      </div>
    </div>
  )
}

export default Files
