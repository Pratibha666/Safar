import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="w-full min-h-screen bg-linear-to-br from-black via-zinc-900 to-black text-white">
      
      {/*Navbar */}
      <nav className="sticky top-0 z-50 flex items-center justify-between px-8 py-5 bg-black/60 backdrop-blur-md border-b border-white/5">
        <h1 className="text-2xl font-bold tracking-tighter text-lime-400 italic">Safar</h1>
        <div className="space-x-4">
          <Link
            to="/login"
            className="px-5 py-2 rounded-sm hover:text-lime-400 transition text-white font-bold text-sm"
          >
            Login
          </Link>
          <Link
            to="/signup"
            className="px-5 py-2 rounded-sm bg-lime-400 hover:bg-lime-500 transition text-black font-bold shadow-md text-sm"
          >
            Sign Up
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="flex flex-col lg:flex-row items-center justify-center gap-16 px-6 mt-16 max-w-7xl mx-auto">
        
        {/* Image */}
        <div className="relative">
          <div className="absolute -inset-1 bg-lime-400/20 rounded-2xl blur-2xl"></div>
          <img
            src="https://images.pexels.com/photos/5886503/pexels-photo-5886503.jpeg"
            className="relative w-full max-w-2xl rounded-2xl 
                       shadow-2xl ring-1 ring-white/10"
            alt="Travel"
          />
        </div>

        {/* Text */}
        <section className="flex flex-col items-center lg:items-start text-center lg:text-left">
          <h2 className="text-5xl md:text-7xl font-extrabold leading-tight tracking-tight">
            Capture Your <br />
            <span className="bg-linear-to-r from-lime-300 to-lime-500 bg-clip-text text-transparent italic">
              Travel Stories
            </span>
          </h2>

          <p className="mt-6 text-zinc-400 max-w-xl text-lg leading-relaxed">
            Safar is your personal travel diary where memories turn into stories 
            Store trips, organize photos, and let your journey live forever
          </p>

          <div className="mt-10 flex flex-wrap justify-center lg:justify-start gap-4">
            <Link
              to="/signup"
              className="px-8 py-4 rounded-sm text-black font-black uppercase tracking-wider text-sm
                bg-linear-to-r from-lime-300 to-lime-400 hover:from-lime-400 hover:to-lime-500
                transition-all duration-300 shadow-[0_0_20px_rgba(163,230,53,0.3)]"
            >
              Start Your Safar
            </Link>

            <Link
              to="/login"
              className="px-8 py-4 rounded-sm border border-zinc-700
                         hover:bg-zinc-800 transition font-bold text-sm uppercase tracking-wider"
            >
              Explore Stories
            </Link>
          </div>
        </section>
      </div>

      {/* Features */}
      <section className="mt-40 px-8 grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {[
          {
            title: "📍 Store Your Trips",
            desc: "Save places, dates, and memories from every journey effortlessly",
          },
          {
            title: "🖼️ Upload Photos",
            desc: "Attach high-quality photos to each travel story and create a visual map",
          },
          {
            title: "🌟 AI Travel Writer",
            desc: "Enhance your descriptions using AI to make your stories sound magical",
          },
        ].map((item, index) => (
          <div
            key={index}
            className="bg-zinc-900/40 border border-zinc-800 rounded-2xl p-8 
                       backdrop-blur-xl group
                       hover:border-lime-400/40 transition-all duration-300"
          >
            <h3 className="text-xl font-bold mb-3 group-hover:text-lime-400 transition-colors">{item.title}</h3>
            <p className="text-zinc-400 text-sm leading-relaxed">{item.desc}</p>
          </div>
        ))}
      </section>

      {/* Footer */}
      <footer className="mt-40 py-12 border-t border-zinc-900 text-center text-zinc-500 text-sm">
        <div className="mb-4">
           <span className="text-lime-400 font-bold italic tracking-tighter text-xl">SAFAR</span>
        </div>
        © {new Date().getFullYear()} --- Your journeys, forever remembered  
        <div className="mt-2 text-zinc-600">
          Made with ❤️ by <span className="text-zinc-400 font-medium">Pratibha Yadav</span>
        </div>
      </footer>
    </div>
  );
};

export default Home;