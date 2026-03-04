import React from 'react'
import { useAuth } from '../hooks/useAuth'
import { Plus, MapPin, Calendar, LogOut, Image as ImageIcon } from 'lucide-react'
import { Link } from 'react-router-dom'

const Travel = () => {
  const { user, handleLogout } = useAuth()

  const stories = [
    {
      id: 1,
      title: "Golden Hour in Manali",
      location: "Himachal Pradesh, India",
      date: "Oct 12, 2023",
      description: "Spent the evening watching the sun dip behind the snow-capped peaks. The air was crisp and smelled of pine",
      image: "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&q=80&w=800",
    },
    {
      id: 2,
      title: "The Silent Valley Trek",
      location: "Kerala, India",
      date: "Jan 05, 2024",
      description: "A deep dive into the rainforest. We spotted three rare birds and a giant squirrel. Nature at its purest",
      image: "https://static2.tripoto.com/media/filter/tst/img/2561311/TripDocument/1725176777_1725176775268.jpg",
    }
  ]

  return (
    <div className='w-full min-h-screen bg-black text-white selection:bg-lime-400 selection:text-black'>
      
      {/* Header Section */}
      <nav className='sticky top-0 z-50 bg-black/80 backdrop-blur-md border-b border-zinc-800 px-6 py-4'>
        <div className='max-w-7xl mx-auto flex justify-between items-center'>
          <div>
            <h1 className='text-3xl font-black tracking-tighter text-lime-400 uppercase italic'>
              SAFAR
            </h1>
            <p className='text-xs text-zinc-500 font-medium tracking-widest uppercase'>
              Welcome, <span className='text-zinc-200'>{user?.username || 'Traveler'}</span>
            </p>
          </div>
          
          <button
            onClick={handleLogout}
            className='group flex items-center gap-2 px-4 py-2 rounded-sm bg-zinc-900 border border-zinc-700 hover:border-lime-400 hover:bg-lime-400 hover:text-black duration-300 transition-all text-sm font-bold cursor-pointer'
          >
            <LogOut size={16} />
            <span>Logout</span>
          </button>
        </div>
      </nav>

      <main className='max-w-7xl mx-auto p-6 md:p-10'>
        
        <div className='mb-12'>
          <h2 className='text-4xl font-bold mb-2'>Your Travel <span className='text-lime-400 italic'>Diaries</span></h2>
          <pre className='text-zinc-400 max-w-sm'>Capture your footprints and relive the journey</pre>
          <pre className='text-zinc-400 max-w-sm'>Every map tells a story!!</pre>
        </div>

        {/* Stories */}
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
          
          {/* "Add New Story" Card */}
          <Link to={'/add-travel'} >
          <div className='group cursor-pointer flex flex-col items-center justify-center border-2 border-dashed border-zinc-800 rounded-3xl p-8 hover:border-lime-400/50 hover:bg-lime-400/5 transition-all duration-300 min-[400px] bg-zinc-900/20'>
            <div className='w-16 h-16 bg-zinc-900 border border-zinc-700 rounded-full flex items-center justify-center group-hover:scale-110 group-hover:bg-lime-400 group-hover:text-black transition-all duration-300'>
              <Plus size={32} />
            </div>
            <p className='mt-6 text-zinc-400 group-hover:text-lime-400 font-semibold tracking-wide'>Start a New Adventure</p>
          </div>
          </Link>

          {/* Story Cards */}
          {stories.map((story) => (
            <div key={story.id} className='group bg-zinc-900/40 border border-zinc-800 rounded-3xl overflow-hidden hover:border-zinc-600 transition-all duration-300 flex flex-col'>
              
              {/* Image */}
              <div className='h-56 overflow-hidden relative'>
                <img 
                  src={story.image} 
                  alt={story.title}
                  className='w-full h-full object-cover group-hover:scale-110 transition-transform duration-500'
                />
                <div className='absolute top-4 right-4 bg-black/60 backdrop-blur-md px-3 py-1 rounded-full flex items-center gap-1.5 border border-white/10'>
                  <Calendar size={12} className='text-lime-400' />
                  <span className='text-[10px] font-bold uppercase tracking-wider'>{story.date}</span>
                </div>
              </div>

              {/* Text */}
              <div className='p-6 flex flex-col flex-grow'>
                <div className='flex items-center gap-1 text-lime-400 mb-2'>
                  <MapPin size={14} />
                  <span className='text-[11px] font-bold uppercase tracking-widest'>{story.location}</span>
                </div>
                
                <h3 className='text-xl font-bold mb-3 group-hover:text-lime-400 transition-colors'>
                  {story.title}
                </h3>
                
                <p className='text-zinc-400 text-sm leading-relaxed line-clamp-3 mb-6'>
                  {story.description}
                </p>

                <div className='mt-auto flex justify-between items-center'>
                  <button className='text-xs font-black uppercase tracking-tighter border-b-2 border-lime-400 pb-0.5 hover:text-lime-400 transition-colors'>
                    Read Full Story
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>


    </div>
  )
}

export default Travel