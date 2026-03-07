import React, { useEffect, useState } from 'react'
import { useAuth } from '../hooks/useAuth.js'
import { Plus, MapPin, Calendar, LogOut, Trash2, X } from 'lucide-react' 
import { Link } from 'react-router-dom'
import axios from 'axios'
import { toast } from 'react-toastify'

const Travel = () => {
  const { user, handleLogout } = useAuth()
  const [stories, setStories] = useState([])
  const [selectedStory, setSelectedStory] = useState(null) 
  const [deletingId, setDeletingId] = useState(null)
  useEffect(() => {
    fetchStories()
  }, [])

  const fetchStories = async () => {
    try {
      const res = await axios.get(
        "http://localhost:8080/api/travel/get-travel",
        { withCredentials: true }
      )
      setStories(res.data.travels.reverse())
    } catch (error) {
      console.log("Error fetching stories:", error)
    }
  }

  const handleDelete = async (id, e) => {
  e.stopPropagation()
  setDeletingId(id)

  try {
    await axios.delete(
      `http://localhost:8080/api/travel/delete-travel/${id}`,
      { withCredentials: true }
    )

    setStories(prev => prev.filter(story => story._id !== id))
    toast.info("Story deleted successfully!")

  } catch (error) {
    console.log("Error deleting story:", error)
    toast.error("Failed to delete story")
  } finally {
    setDeletingId(null)
  }
}

  return (
    <div className='w-full min-h-screen bg-black text-white selection:bg-lime-400 selection:text-black'>
      
      {/* Header Section */}
      <nav className='sticky top-0 z-50 bg-black/80 backdrop-blur-md border-b border-zinc-800 px-6 py-4'>
        <div className='max-w-7xl mx-auto flex justify-between items-center'>
          <div>
            <h1 className='text-3xl font-black tracking-tighter text-lime-400 uppercase italic'>SAFAR</h1>
            <p className='text-xs text-zinc-500 font-medium tracking-widest uppercase'>
              Welcome, <span className='text-zinc-200'>{user?.username || 'Traveler'}</span>
            </p>
          </div>
          <button onClick={handleLogout} className='group flex items-center gap-2 px-4 py-2 rounded-sm bg-zinc-900 border border-zinc-700 hover:border-lime-400 hover:bg-lime-400 hover:text-black duration-300 transition-all text-sm font-bold cursor-pointer'>
            <LogOut size={16} />
            <span>Logout</span>
          </button>
        </div>
      </nav>

      <main className='max-w-7xl mx-auto p-6 md:p-10'>
        <div className='mb-12'>
          <h2 className='text-4xl font-bold mb-2'>Your Travel <span className='text-lime-400 italic'>Diaries</span></h2>
          <p className='text-zinc-400 max-w-sm'>Every map tells a story!!</p>
        </div>

        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
          {/* Add New Story Card */}
          <Link to={'/add-travel'}>
            <div className='group cursor-pointer h-full flex flex-col items-center justify-center border-2 border-dashed border-zinc-800 rounded-3xl p-8 hover:border-lime-400/50 hover:bg-lime-400/5 transition-all duration-300 bg-zinc-900/20 min-h-[400px]'>
              <div className='w-16 h-16 bg-zinc-900 border border-zinc-700 rounded-full flex items-center justify-center group-hover:scale-110 group-hover:bg-lime-400 group-hover:text-black transition-all duration-300'>
                <Plus size={32} />
              </div>
              <p className='mt-6 text-zinc-400 group-hover:text-lime-400 font-semibold tracking-wide'>Start a New Adventure</p>
            </div>
          </Link>

          {stories.map(story => (
            <div key={story._id} className='group bg-zinc-900/40 border border-zinc-800 rounded-3xl overflow-hidden hover:border-zinc-700 transition-all duration-300 flex flex-col relative'>
              <button 
                onClick={(e) => handleDelete(story._id, e)}
                className='absolute top-4 left-4 z-10 p-2 bg-black/60 backdrop-blur-md rounded-full text-zinc-400 hover:bg-red-500 hover:text-white transition-all duration-300 opacity-0 cursor-pointer group-hover:opacity-100'
              >
                {deletingId === story._id ? (
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                ) : (
                <Trash2 size={16} />
                )}
              </button>

              <div className='h-56 overflow-hidden relative'>
                <img src={story.imageurl} alt={story.title} className='w-full h-full object-cover group-hover:scale-105 transition-transform duration-700' />
                <div className='absolute top-4 right-4 bg-black/60 backdrop-blur-md px-3 py-1 rounded-full flex items-center gap-1.5 border border-white/10'>
                  <Calendar size={12} className='text-lime-400' />
                  <span className='text-[10px] font-bold uppercase tracking-wider'>{new Date(story.date).toLocaleDateString()}</span>
                </div>
              </div>

              <div className='p-6 flex flex-col flex-grow'>
                <div className='flex items-center gap-1 text-lime-400 mb-2'>
                  <MapPin size={14} />
                  <span className='text-[11px] font-bold uppercase tracking-widest'>{story.location}</span>
                </div>
                <h3 className='text-xl font-bold mb-3 group-hover:text-lime-400 transition-colors'>{story.title}</h3>
                <p className='text-zinc-400 text-sm leading-relaxed line-clamp-3 mb-6'>{story.description}</p>
                <div className='mt-auto'>
                  <button 
                    onClick={() => setSelectedStory(story)}
                    className='text-xs font-black uppercase tracking-tighter border-b-2 border-lime-400 pb-0.5 hover:text-lime-400 transition-colors cursor-pointer'
                  >
                    Read Full Story
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>

      {selectedStory && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 sm:p-6">
          <div 
            className="absolute inset-0 bg-black/90 backdrop-blur-sm"
            onClick={() => setSelectedStory(null)}
          ></div>

          <div className="relative bg-zinc-900 border border-zinc-800 w-full max-w-3xl max-h-[90vh] rounded-3xl overflow-hidden flex flex-col shadow-2xl animate-in fade-in zoom-in duration-300">
            
            <button 
              onClick={() => setSelectedStory(null)}
              className="absolute top-4 right-7 z-20 p-2 bg-black/50 hover:bg-red-600 hover:text-white rounded-sm cursor-pointer transition-all"
            >
              <X size={20} />
            </button>

          
            <div className="overflow-y-auto custom-scrollbar">
              <div className="relative h-64 sm:h-96">
                <img 
                  src={selectedStory.imageurl} 
                  alt={selectedStory.title} 
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 via-transparent to-transparent"></div>
              </div>

              <div className="p-8 sm:p-12 -mt-12 relative z-10">
                <div className='flex items-center gap-4 mb-4'>
                    <div className='flex items-center gap-1.5 bg-lime-400/10 text-lime-400 px-3 py-1 rounded-full border border-lime-400/20'>
                        <MapPin size={14} />
                        <span className='text-xs font-bold uppercase tracking-widest'>{selectedStory.location}</span>
                    </div>
                    <div className='flex items-center gap-1.5 bg-zinc-800 text-zinc-400 px-3 py-1 rounded-full border border-zinc-700'>
                        <Calendar size={14} />
                        <span className='text-xs font-bold uppercase tracking-widest'>{new Date(selectedStory.date).toLocaleDateString()}</span>
                    </div>
                </div>

                <h2 className="text-3xl sm:text-5xl font-black mb-6 text-white tracking-tighter leading-tight">
                  {selectedStory.title}
                </h2>
                
                <div className="w-20 h-1 bg-lime-400 mb-8"></div>

                <p className="text-zinc-300 text-lg leading-relaxed whitespace-pre-line font-medium">
                  {selectedStory.description}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Travel