import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {  Camera, MapPin, Calendar, Type, AlignLeft, Send } from 'lucide-react';

const AddTravel = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    location: '',
    date: '',
    imageUrl: '',
    description: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Saving Story:", formData);
    alert("Story Saved to your Safar!");
    navigate('/travel'); 
  };

  return (
    <div className="min-h-screen bg-black text-white p-4 md:p-8">
      {/* Header */}
      <div className="max-w-6xl mx-auto mb-10 flex items-center justify-between">
        <div className="absolute top-9 left-10">
        <Link
          to="/travel"
          className="px-8 py-2 rounded-md bg-lime-400 hover:bg-lime-500 text-black font-bold shadow-md"
        >
            Back
        </Link>
      </div>
        <h1 className="text-2xl font-black italic tracking-tighter text-lime-400">NEW SAFAR</h1>
      </div>

      <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-12">
        
        <section className="bg-zinc-900/50 border border-zinc-800 p-8 rounded-3xl backdrop-blur-sm">
          <h2 className="text-3xl font-bold mb-6">Create a <span className="text-lime-400 italic">Memory</span></h2>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Title */}
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest text-zinc-500 flex items-center gap-2">
                <Type size={14} /> Trip Title
              </label>
              <input
                required
                type="text"
                name="title"
                placeholder="e.g. Sunset at Santorini"
                value={formData.title}
                onChange={handleChange}
                className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-3 focus:outline-none focus:border-lime-400 focus:ring-1 focus:ring-lime-400 transition-all text-zinc-200"
              />
            </div>

            {/* Location and Date  */}
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-zinc-500 flex items-center gap-2">
                  <MapPin size={14} /> Location
                </label>
                <input
                  required
                  type="text"
                  name="location"
                  placeholder="Where to?"
                  value={formData.location}
                  onChange={handleChange}
                  className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-3 focus:outline-none focus:border-lime-400 focus:ring-1 focus:ring-lime-400 transition-all text-zinc-200"
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-zinc-500 flex items-center gap-2">
                  <Calendar size={14} /> Date
                </label>
                <input
                  required
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                  className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-3 focus:outline-none focus:border-lime-400 focus:ring-1 focus:ring-lime-400 transition-all text-zinc-200 [color-scheme:dark]"
                />
              </div>
            </div>

            {/* Image URL */}
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest text-zinc-500 flex items-center gap-2">
                <Camera size={14} /> Image URL
              </label>
              <input
                required
                type="url"
                name="imageUrl"
                placeholder="Paste an image link"
                value={formData.imageUrl}
                onChange={handleChange}
                className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-3 focus:outline-none focus:border-lime-400 focus:ring-1 focus:ring-lime-400 transition-all text-zinc-200"
              />
            </div>

            {/* Description Input */}
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest text-zinc-500 flex items-center gap-2">
                <AlignLeft size={14} /> The Story
              </label>
              <textarea
                required
                name="description"
                rows="4"
                placeholder="Describe your experience.."
                value={formData.description}
                onChange={handleChange}
                className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-3 focus:outline-none focus:border-lime-400 focus:ring-1 focus:ring-lime-400 transition-all text-zinc-200 resize-none"
              ></textarea>
            </div>

            <button
              type="submit"
              className="w-full bg-lime-400 cursor-pointer hover:bg-lime-500 text-black font-black py-4 rounded-xl flex items-center justify-center gap-2 transition-all active:scale-[0.98] shadow-[0_0_20px_rgba(163,230,53,0.2)]"
            >
              <Send size={18} />
              PUBLISH STORY
            </button>
          </form>
        </section>

        <section className="sticky top-24 h-fit">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-zinc-600 mb-6 text-center">Live Preview</p>
          
          <div className="group bg-zinc-900/40 border border-zinc-800 rounded-3xl overflow-hidden max-w-sm mx-auto shadow-2xl">
            {/* Image Preview */}
            <div className="h-64 bg-zinc-800 overflow-hidden flex items-center justify-center">
              {formData.imageUrl ? (
                <img 
                  src={formData.imageUrl} 
                  alt="Preview" 
                  className="w-full h-full object-cover"
                  onError={(e) => e.target.src = "https://images.unsplash.com/photo-1503220317375-aaad61436b1b?auto=format&fit=crop&q=80&w=800"} 
                />
              ) : (
                <div className="flex flex-col items-center text-zinc-600">
                  <Camera size={48} strokeWidth={1} />
                  <span className="text-xs mt-2 uppercase font-bold">Image Preview</span>
                </div>
              )}
            </div>

            {/* Text Preview */}
            <div className="p-6">
              <div className="flex items-center gap-1 text-lime-400 mb-2">
                <MapPin size={14} />
                <span className="text-[10px] font-bold uppercase tracking-widest">
                  {formData.location || "Location Unknown"}
                </span>
              </div>
              
              <h3 className="text-xl font-bold mb-3 truncate">
                {formData.title || "Your Trip Title"}
              </h3>
              
              <p className="text-zinc-400 text-sm leading-relaxed line-clamp-3 mb-6 min-h-[60px]">
                {formData.description || "Start writing your story to see it appear here..."}
              </p>

              <div className="flex justify-between items-center border-t border-zinc-800 pt-4">
                <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-tighter">
                  {formData.date || "Select Date"}
                </span>
                <div className="w-6 h-6 rounded-full bg-lime-400/20 flex items-center justify-center">
                  <div className="w-2 h-2 rounded-full bg-lime-400 animate-pulse"></div>
                </div>
              </div>
            </div>
          </div>
          
          <p className="text-zinc-500 text-[11px] text-center mt-6 px-10 italic">
            "We travel not to escape life, but for life not to escape us"
          </p>
        </section>
      </div>
    </div>
  );
};

export default AddTravel;