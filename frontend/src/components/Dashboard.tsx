import { useState } from "react";
import Header from "./Header";

export default function Dashboard() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const handleSearch = () => {
    // Not used in this component, but required by Header
  };

  return (
    <div id="webcrumbs"> 
      <Header onSearch={handleSearch} />
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
        
        {/* Main Page - Book List */}
        <div>
          <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
              <div>
                <h2 className="text-2xl font-bold text-gray-800">Library Collection</h2>
                <p className="text-gray-600 mt-1">Browse our extensive collection of books</p>
              </div>
              
              <div className="mt-4 md:mt-0 flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-3">
                <select className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                  <option>Filter by Category</option>
                  <option>All Categories</option>
                  <option>Fiction</option>
                  <option>Non-Fiction</option>
                  <option>Sci-Fi</option>
                  <option>Fantasy</option>
                  <option>Romance</option>
                  <option>Mystery</option>
                  <option>Horror</option>
                </select>
                
                <select className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                  <option>Sort by</option>
                  <option>Newest First</option>
                  <option>Oldest First</option>
                  <option>Title (A-Z)</option>
                  <option>Title (Z-A)</option>
                  <option>Author (A-Z)</option>
                </select>
              </div>
            </div>
            
            <div className="flex flex-wrap gap-3 mb-6">
              <label className="flex items-center gap-2 cursor-pointer">
                <input 
                  type="radio" 
                  name="category" 
                  value="all" 
                  checked={selectedCategory === "all"}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-4 h-4 text-purple-600 cursor-pointer"
                />
                <span className="text-sm font-medium text-gray-700">All Books</span>
              </label>
              
              <label className="flex items-center gap-2 cursor-pointer">
                <input 
                  type="radio" 
                  name="category" 
                  value="fantasy"
                  checked={selectedCategory === "fantasy"}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-4 h-4 text-purple-600 cursor-pointer"
                />
                <span className="text-sm font-medium text-gray-700">Fantasy</span>
              </label>
              
              <label className="flex items-center gap-2 cursor-pointer">
                <input 
                  type="radio" 
                  name="category" 
                  value="scifi"
                  checked={selectedCategory === "scifi"}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-4 h-4 text-purple-600 cursor-pointer"
                />
                <span className="text-sm font-medium text-gray-700">Sci-Fi</span>
              </label>
              
              <label className="flex items-center gap-2 cursor-pointer">
                <input 
                  type="radio" 
                  name="category" 
                  value="mystery"
                  checked={selectedCategory === "mystery"}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-4 h-4 text-purple-600 cursor-pointer"
                />
                <span className="text-sm font-medium text-gray-700">Mystery</span>
              </label>
              
              <label className="flex items-center gap-2 cursor-pointer">
                <input 
                  type="radio" 
                  name="category" 
                  value="romance"
                  checked={selectedCategory === "romance"}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-4 h-4 text-purple-600 cursor-pointer"
                />
                <span className="text-sm font-medium text-gray-700">Romance</span>
              </label>
              
              <label className="flex items-center gap-2 cursor-pointer">
                <input 
                  type="radio" 
                  name="category" 
                  value="biography"
                  checked={selectedCategory === "biography"}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-4 h-4 text-purple-600 cursor-pointer"
                />
                <span className="text-sm font-medium text-gray-700">Biography</span>
              </label>
              
              <label className="flex items-center gap-2 cursor-pointer">
                <input 
                  type="radio" 
                  name="category" 
                  value="horror"
                  checked={selectedCategory === "horror"}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-4 h-4 text-purple-600 cursor-pointer"
                />
                <span className="text-sm font-medium text-gray-700">Horror</span>
              </label>
              
              <label className="flex items-center gap-2 cursor-pointer">
                <input 
                  type="radio" 
                  name="category" 
                  value="historical"
                  checked={selectedCategory === "historical"}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-4 h-4 text-purple-600 cursor-pointer"
                />
                <span className="text-sm font-medium text-gray-700">Historical</span>
              </label>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                <div className="relative h-48 bg-gradient-to-br from-purple-400 to-indigo-600 flex items-center justify-center">
                  <span className="text-6xl">📖</span>
                  <div className="absolute top-2 right-2">
                    <button className="h-8 w-8 rounded-full bg-white text-gray-500 hover:text-rose-500 flex items-center justify-center shadow-sm transition-colors">
                      ❤️
                    </button>
                  </div>
                </div>
                
                <div className="p-5">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-lg font-semibold text-gray-800">The Midnight Library</h3>
                    <span className="bg-purple-100 text-purple-700 text-xs px-2 py-1 rounded-full">
                      New
                    </span>
                  </div>
                  
                  <p className="text-gray-600 text-sm mb-3">by Matt Haig</p>
                  
                  <div className="flex flex-wrap gap-1 mb-4">
                    <span className="px-2 py-0.5 rounded-full text-xs bg-blue-100 text-blue-700">Fiction</span>
                    <span className="px-2 py-0.5 rounded-full text-xs bg-purple-100 text-purple-700">Fantasy</span>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <div className="text-sm text-gray-600">
                      <span className="font-medium">12</span> copies available
                    </div>
                    
                    <button className="px-3 py-1.5 bg-purple-600 text-white text-sm font-medium rounded-lg hover:bg-purple-700 transition-colors">
                      View Details
                    </button>
                  </div>
                </div>
              </div>
              
              <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                <div className="relative h-48 bg-gradient-to-br from-blue-400 to-cyan-600 flex items-center justify-center">
                  <span className="text-6xl">🚀</span>
                  <div className="absolute top-2 right-2">
                    <button className="h-8 w-8 rounded-full bg-white text-gray-500 hover:text-rose-500 flex items-center justify-center shadow-sm transition-colors">
                      ❤️
                    </button>
                  </div>
                </div>
                
                <div className="p-5">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-lg font-semibold text-gray-800">Project Hail Mary</h3>
                    <span className="bg-amber-100 text-amber-700 text-xs px-2 py-1 rounded-full">
                      Popular
                    </span>
                  </div>
                  
                  <p className="text-gray-600 text-sm mb-3">by Andy Weir</p>
                  
                  <div className="flex flex-wrap gap-1 mb-4">
                    <span className="px-2 py-0.5 rounded-full text-xs bg-purple-100 text-purple-700">Sci-Fi</span>
                    <span className="px-2 py-0.5 rounded-full text-xs bg-green-100 text-green-700">Adventure</span>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <div className="text-sm text-gray-600">
                      <span className="font-medium">8</span> copies available
                    </div>
                    
                    <button className="px-3 py-1.5 bg-purple-600 text-white text-sm font-medium rounded-lg hover:bg-purple-700 transition-colors">
                      View Details
                    </button>
                  </div>
                </div>
              </div>
              
              <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                <div className="relative h-48 bg-gradient-to-br from-green-400 to-emerald-600 flex items-center justify-center">
                  <span className="text-6xl">💡</span>
                  <div className="absolute top-2 right-2">
                    <button className="h-8 w-8 rounded-full bg-white text-gray-500 hover:text-rose-500 flex items-center justify-center shadow-sm transition-colors">
                      ❤️
                    </button>
                  </div>
                </div>
                
                <div className="p-5">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-lg font-semibold text-gray-800">Atomic Habits</h3>
                  </div>
                  
                  <p className="text-gray-600 text-sm mb-3">by James Clear</p>
                  
                  <div className="flex flex-wrap gap-1 mb-4">
                    <span className="px-2 py-0.5 rounded-full text-xs bg-green-100 text-green-700">Self-Help</span>
                    <span className="px-2 py-0.5 rounded-full text-xs bg-yellow-100 text-yellow-700">Productivity</span>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <div className="text-sm text-gray-600">
                      <span className="font-medium">5</span> copies available
                    </div>
                    
                    <button className="px-3 py-1.5 bg-purple-600 text-white text-sm font-medium rounded-lg hover:bg-purple-700 transition-colors">
                      View Details
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div> 
    </div>
  );
}