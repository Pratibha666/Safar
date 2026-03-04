import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="w-full min-h-full bg-linear-to-br from-black via-zinc-900 to-black text-white">
      
      {/* Navbar */}
      <nav className="flex items-center justify-between px-8 py-6">
        <h1 className="text-2xl font-bold tracking-wide">Safar</h1>
        <div className="space-x-4">
          <Link
            to="/login"
            className="px-5 py-2 rounded-sm bg-lime-400 hover:bg-lime-500 transition text-black font-bold shadow-md"
          >
            Login
          </Link>
          <Link
            to="/signup"
            className="px-5 py-2 rounded-sm bg-lime-400 hover:bg-lime-500 transition text-black font-bold shadow-md"
          >
            Sign Up
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="flex flex-col lg:flex-row items-center justify-center gap-16 px-6 mt-16">
        
        {/* Image */}
        <div className="relative">
          <img
            src="https://images.pexels.com/photos/5886503/pexels-photo-5886503.jpeg"
            className="w-full max-w-2xl rounded-2xl 
                       shadow-2xl shadow-lime-400/40
                       ring-1 ring-lime-400/20"
            alt="Travel"
          />
        </div>

        {/* Text */}
        <section className="flex flex-col items-center lg:items-start text-center lg:text-left">
          <h2 className="text-5xl md:text-6xl font-extrabold leading-tight">
            Capture Your <br />
            <span className="bg-linear-to-r from-lime-300 to-lime-600 bg-clip-text text-transparent">
              Travel Stories
            </span>
          </h2>

          <p className="mt-6 text-zinc-400 max-w-xl text-lg">
            Safar is your personal travel diary where memories turn into stories
            Store trips, photos, and let AI enhance your experiences !!
          </p>

          <div className="mt-10 flex gap-4">
            <Link
              to="/signup"
              className="px-8 py-3 rounded-sm text-black font-bold
                bg-linear-to-r from-lime-300 to-lime-400 hover:from-lime-400 hover:to-lime-500
                transition-all duration-300"
            >
              Start Your Safar
            </Link>

            <Link
              to="/login"
              className="px-8 py-3 rounded-sm border border-zinc-700
                         hover:bg-zinc-800 transition font-bold text-[17px]"
            >
              Login
            </Link>
          </div>
        </section>
      </div>

      {/* Features */}
      <section className="mt-32 px-8 grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {[
          {
            title: "📍 Store Your Trips",
            desc: "Save places, dates, and memories from every journey",
          },
          {
            title: "🖼️ Upload Photos",
            desc: "Attach photos to each travel story beautifully",
          },
          {
            title: "🌟 AI Travel Writer",
            desc: "Enhance descriptions using AI to make stories magical",
          },
        ].map((item, index) => (
          <div
            key={index}
            className="bg-zinc-900/70 border border-zinc-800 rounded-xl p-6 
                       backdrop-blur-xl
                       hover:border-lime-400/40 transition"
          >
            <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
            <p className="text-zinc-400 text-sm">{item.desc}</p>
          </div>
        ))}
      </section>

      {/* Footer */}
      <footer className="mt-32 py-8 text-center text-zinc-500 text-sm">
        © {new Date().getFullYear()} Safar --- Your journeys, forever remembered  
        <div className="mt-2 text-zinc-600">
          Made with ❤️ by <span className="text-lime-600 font-medium">Pratibha Yadav</span>
        </div>
      </footer>
    </div>
  );
};

export default Home;