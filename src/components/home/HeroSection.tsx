import { Link } from 'react-router-dom';

const HeroSection = () => {
  return (
    <div className="bg-indigo-700 text-white">
      <div className="container mx-auto px-4 py-24 text-center">
        <h1 className="text-4xl md:text-6xl font-bold mb-4">Welcome to RideX</h1>
        <p className="text-lg md:text-xl mb-8 max-w-2xl mx-auto">
          Your reliable, safe, and affordable ride-sharing partner. Get to your destination with ease and comfort.
        </p>
        <Link 
          to="/register" 
          className="bg-white text-indigo-600 font-bold py-3 px-8 rounded-full hover:bg-gray-200 transition-colors"
        >
          Get Started
        </Link>
      </div>
    </div>
  );
};

export default HeroSection;