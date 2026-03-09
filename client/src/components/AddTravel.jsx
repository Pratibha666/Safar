import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Camera, MapPin, Calendar, Type, AlignLeft, Send, Upload, X, Sparkles, Loader2 } from 'lucide-react';
import { toast } from "react-toastify";
import axios from "axios";

const AddTravel = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    location: '',
    date: '',
    description: ''
  });
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState('');
  const [loading, setLoading] = useState(false);
  const [generating, setGenerating] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleGenerateStory = async () => {
    if (!formData.title || !formData.location) {
      return toast.info("Please enter a title and location first!");
    }
    
    setGenerating(true);
    try {
      const res = await axios.post("http://localhost:8080/api/ai/generate-story", formData);
      setFormData(prev => ({ ...prev, description: res.data.story }));
      toast.success("AI has crafted your story!");
    } catch (error) {
      console.error(error);
      toast.error("Failed to generate story!");
    } finally {
      setGenerating(false);
    }
  };

  const removeImage = () => {
    setImageFile(null);
    setImagePreview('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!imageFile) return toast.warning("Please upload a cover photo");
    
    setLoading(true);
    try {
      const data = new FormData();
      Object.keys(formData).forEach(key => data.append(key, formData[key]));
      data.append("image", imageFile);

      await axios.post("http://localhost:8080/api/travel/add-travel", data, { withCredentials: true });
      toast.success("Memory captured successfully!");
      navigate("/travel");
    } catch (error) {
      toast.error("Error saving your story");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#050505] text-zinc-200 selection:bg-lime-400 selection:text-black">
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-lime-400/5 blur-[120px] pointer-events-none" />

      {/* Header */}
      <header className="sticky top-0 z-50 backdrop-blur-md bg-black/50 border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 h-20 flex items-center justify-between">
        <Link
          to="/travel"
          className="px-8 py-2 rounded-md bg-lime-400 hover:bg-lime-500 text-black font-bold shadow-md"
        >
          Back
        </Link>
          <h1 className="text-xl font-black italic tracking-tighter text-lime-400 uppercase">New Safar</h1>
          <div className="w-20" /> {/* Space for symmetry */}
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid lg:grid-cols-12 gap-16">
          
          {/* Form Section */}
          <div className="lg:col-span-7 space-y-10">
            <div>
              <h2 className="text-5xl font-bold tracking-tight text-white mb-4">
                Capture a <span className="italic font-serif text-lime-400">Moment</span>
              </h2>
              <p className="text-zinc-500 text-lg">Fill in the details to immortalize your journey</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Title Input */}
              <div className="group space-y-3">
                <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-500 flex items-center gap-2 group-focus-within:text-lime-400 transition-colors">
                  <Type size={14} /> Journey Title
                </label>
                <input
                  required
                  name="title"
                  placeholder="The Misty Peaks of Manali..."
                  value={formData.title}
                  onChange={handleChange}
                  className="w-full bg-zinc-900/50 border border-zinc-800 rounded-2xl px-6 py-4 focus:outline-none focus:border-lime-400/50 focus:ring-4 focus:ring-lime-400/10 transition-all text-[18px] font-semibold placeholder:text-zinc-700"
                />
              </div>

              {/* Info Grid */}
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-500 flex items-center gap-2">
                    <MapPin size={14} /> Location
                  </label>
                  <input
                    required
                    name="location"
                    placeholder="Where did this happen?"
                    value={formData.location}
                    onChange={handleChange}
                    className="w-full bg-zinc-900/50 border border-zinc-800 rounded-xl px-4 py-3 focus:outline-none focus:border-lime-400/50 transition-all"
                  />
                </div>
                <div className="space-y-3">
                  <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-500 flex items-center gap-2">
                    <Calendar size={14} /> Date
                  </label>
                  <input
                    required
                    type="date"
                    name="date"
                    value={formData.date}
                    onChange={handleChange}
                    className="w-full bg-zinc-900/50 border border-zinc-800 rounded-xl px-4 py-3 focus:outline-none focus:border-lime-400/50 transition-all [color-scheme:dark]"
                  />
                </div>
              </div>

              {/* Image Upload */}
              <div className="space-y-3">
              <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-500 flex items-center gap-2">
                <Camera size={14} /> Visual Memory
              </label>
              
              {!imagePreview ? (
                <div className="relative group">
                  <input
                    required
                    type="file"
                    accept="image/*"
                    name="image"
                    onChange={handleImageChange}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                  />
                  <div className="w-full h-32 border-2 border-dashed border-zinc-800 rounded-xl flex flex-col items-center justify-center gap-2 group-hover:border-lime-400/50 transition-colors bg-zinc-900/30">
                    <Upload size={24} className="text-zinc-500 group-hover:text-lime-400" />
                    <span className="text-zinc-500 text-sm">Drop your favorite shot here</span>
                  </div>
                </div>
              ) : (
                <div className="relative w-full h-60 rounded-xl overflow-hidden border border-zinc-800">
                  <img src={imagePreview} alt="Selected" className="w-full h-full object-cover" />
                  <button 
                    type="button"
                    onClick={removeImage}
                    className="absolute top-2 right-2 p-1 bg-black/60 rounded-full cursor-pointer hover:bg-red-500 transition-colors"
                  >
                    <X size={20} />
                  </button>
                </div>
              )}
            </div>

              {/* Description & AI Button */}
              <div className="space-y-3 relative">
                <div className="flex justify-between items-center">
                  <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-500 flex items-center gap-2">
                    <AlignLeft size={14} /> The Narrative
                  </label>
                  <button
                    type="button"
                    onClick={handleGenerateStory}
                    disabled={generating}
                    className="flex cursor-pointer items-center gap-2 text-[16px] font-bold uppercase tracking-wider text-lime-500 hover:text-lime-300 disabled:opacity-50 transition-colors group"
                  >
                    {generating ? <Loader2 size={12} className="animate-spin" /> : <Sparkles size={12} className="group-hover:animate-pulse" />}
                    {generating ? "Generating..." : "Magic Write"}
                  </button>
                </div>
                <textarea
                  required
                  name="description"
                  rows="6"
                  placeholder="The air was crisp, and the sun began to dip below the horizon..."
                  value={formData.description}
                  onChange={handleChange}
                  className="w-full bg-zinc-900/50 border border-zinc-800 rounded-2xl px-6 py-4 focus:outline-none focus:border-lime-400/50 transition-all text-zinc-300 leading-relaxed resize-none"
                ></textarea>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className={`group relative w-full overflow-hidden rounded-2xl bg-lime-400 py-5 font-black text-black transition-all hover:bg-lime-500 active:scale-[0.98] ${loading ? "opacity-70 cursor-not-allowed" : "cursor-pointer"}`}
              >
                <div className="relative z-10 flex items-center justify-center gap-3 text-lg uppercase tracking-tighter">
                  {loading ? (
                    <>
                      <Loader2 size={20} className="animate-spin" /> Saving Memory...
                    </>
                  ) : (
                    <>
                      Publish Story <Send size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                    </>
                  )}
                </div>
              </button>
            </form>
          </div>

          {/* Preview Section */}
          <div className="lg:col-span-5 relative">
            <div className="sticky top-32">
              <div className="mb-8 text-center">
                <span className="px-4 py-1 rounded-full border border-zinc-800 text-[10px] font-bold uppercase tracking-widest text-zinc-500">
                  Live Preview
                </span>
              </div>

              <div className="relative group mx-auto max-w-sm">
                <div className="absolute -inset-1 bg-gradient-to-r from-lime-400/20 to-emerald-400/20 rounded-[2.5rem] blur-2xl opacity-50 group-hover:opacity-100 transition duration-1000"></div>
                
                <div className="relative bg-zinc-950 border border-white/10 rounded-[2rem] overflow-hidden shadow-2xl transition-transform duration-500 hover:-rotate-2">
                  {/* Card Image */}
                  <div className="h-72 bg-zinc-900 relative overflow-hidden">
                    {imagePreview ? (
                      <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full flex flex-col items-center justify-center text-zinc-700">
                        <Camera size={40} strokeWidth={1} />
                        <p className="text-[10px] mt-4 uppercase font-black tracking-widest">Awaiting Visuals</p>
                      </div>
                    )}
                    <div className="absolute top-4 left-4">
                      <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/60 backdrop-blur-md border border-white/10 text-white">
                        <MapPin size={10} className="text-lime-400" />
                        <span className="text-[9px] font-bold uppercase tracking-tight truncate max-w-[100px]">
                          {formData.location || "Earth"}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Card Body */}
                  <div className="p-8">
                    <h3 className="text-2xl font-bold text-white mb-4 line-clamp-2 leading-tight">
                      {formData.title || "Your Epic Adventure"}
                    </h3>
                    <p className="text-zinc-400 text-sm leading-relaxed line-clamp-4 mb-8 font-light italic">
                      "{formData.description || "Start telling your story, and watch the magic happen here..."}"
                    </p>
                    
                    <div className="flex items-center justify-between pt-6 border-t border-white/5">
                      <div className="flex flex-col">
                        <span className="text-[10px] text-zinc-600 font-bold uppercase tracking-widest">Date</span>
                        <span className="text-xs font-medium text-zinc-300">{formData.date || "TBD"}</span>
                      </div>
                      <div className="h-10 w-10 rounded-full bg-lime-400 flex items-center justify-center text-black">
                        <Send size={16} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <p className="mt-12 text-center text-zinc-600 text-sm italic font-serif">
                "We travel not to escape life, but for life not to escape us"
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AddTravel;