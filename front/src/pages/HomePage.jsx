import { motion } from 'framer-motion';
import Navbar from '../components/Navbar';
import { useWallet } from '../utils/WalletContext';

export default function HomePage() {
  const { isWalletConnected, connectToWallet } = useWallet();

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
              Explore
              <span className="inline-block bg-[linear-gradient(90deg,#0066cc,#5e5ce6)] text-transparent bg-clip-text">
                {' '}Web3 Innovation
              </span>
              Future
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Join our hackathon platform to build next-generation blockchain applications with global developers and win amazing rewards
            </p>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-block"
            >
              <button 
                onClick={() => {
                  if (isWalletConnected) {
                    window.location.href = '/hackathons';
                  } else {
                    connectToWallet();
                  }
                }}
                className="px-8 py-4 text-lg font-semibold rounded-lg
                  cursor-pointer transition-all duration-200 ease-in-out
                  bg-gradient-to-r from-[#0066cc] to-[#5e5ce6] 
                  text-white shadow-lg 
                  hover:shadow-xl">
                {isWalletConnected ? 'Start Exploring' : 'Connect Wallet'}
              </button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow"
              >
                <div className="w-12 h-12 bg-[#0066cc]/10 rounded-lg flex items-center justify-center mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
              >
                <div className="text-4xl font-bold mb-2">{stat.value}</div>
                <div className="text-gray-400">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="max-w-4xl mx-auto text-center"
        >
          <h2 className="text-3xl font-bold mb-8">Ready to Start Your Web3 Journey?</h2>
          <div className="space-x-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-3 font-semibold rounded-lg cursor-pointer
                transition-all duration-200 ease-in-out
                bg-gradient-to-r from-[#0066cc] to-[#5e5ce6] 
                text-white shadow-lg 
                hover:shadow-xl"
            >
              Join Now
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-3 font-semibold rounded-lg cursor-pointer
                transition-all duration-200 ease-in-out
                bg-white text-[#0066cc] border-2 border-[#0066cc] 
                shadow-lg hover:shadow-xl 
                hover:bg-gradient-to-r hover:from-[#0066cc] hover:to-[#5e5ce6] 
                hover:text-white hover:border-transparent"
            >
              Learn More
            </motion.button>
          </div>
        </motion.div>
      </section>
    </div>
  );
}

const features = [
  {
    icon: (
      <svg className="w-6 h-6 text-[#0066cc]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
    title: "Quick Start",
    description: "Easy development environment setup, so you can focus on innovation and building"
  },
  {
    icon: (
      <svg className="w-6 h-6 text-[#0066cc]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
      </svg>
    ),
    title: "Global Community",
    description: "Connect with developers worldwide, share ideas and experiences"
  },
  {
    icon: (
      <svg className="w-6 h-6 text-[#0066cc]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    title: "Great Rewards",
    description: "Earn token rewards and investment opportunities to grow your project"
  }
];

const stats = [
  {
    value: "50+",
    label: "Active Projects"
  },
  {
    value: "1000+",
    label: "Developers"
  },
  {
    value: "$1M+",
    label: "Prize Pool"
  }
];
