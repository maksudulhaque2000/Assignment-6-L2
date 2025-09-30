import { Link } from 'react-router-dom';
const CtaSection = () => {
    return (
        <div className="py-20 bg-indigo-600 text-white">
            <div className="container mx-auto px-4 text-center">
                <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
                <p className="mb-8">Join the RideX community today as a rider or a driver.</p>
                 <Link 
                    to="/register" 
                    className="bg-white text-indigo-600 font-bold py-3 px-8 rounded-full hover:bg-gray-200 transition-colors"
                >
                    Sign Up Now
                </Link>
            </div>
        </div>
    )
}
export default CtaSection;