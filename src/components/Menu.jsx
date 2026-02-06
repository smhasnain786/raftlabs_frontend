import { useEffect, useState } from "react";
import { fetchMenu } from "../services/api";
import { useCart } from "../contexts/cartContext";

export default function Menu() {
  const [menu, setMenu] = useState([]);
  const { addToCart } = useCart();

  useEffect(() => {
    fetchMenu().then(setMenu);
  }, []);

  return (
       
<div id="menu-view" className="view-container">
            
            <div className="text-center mb-12 slide-in">
                <h1 className="text-5xl md:text-6xl font-display font-bold mb-4 text-gradient">
                    Delicious Food, Delivered Fast
                </h1>
                <p className="text-xl text-gray-600 font-light">
                    Choose from our carefully curated menu
                </p>
            </div>

           
            {/* <div className="mb-10 space-y-6">
               
                <div className="max-w-2xl mx-auto relative">
                    <i className="fas fa-search absolute left-5 top-1/2 transform -translate-y-1/2 text-gray-400 text-lg"></i>
                    <input 
                        type="text" 
                        id="search-input"
                        placeholder="Search for dishes..." 
                        className="w-full pl-14 pr-6 py-4 border-2 border-gray-200 rounded-2xl text-lg smooth-transition"
                        onInput={() => filterMenu()}
                    />
                </div>

                
                <div className="flex flex-wrap justify-center gap-3" id="category-filters">
                    <button onClick={() => filterCategory('All')} className="category-btn active px-6 py-2.5 rounded-xl font-medium smooth-transition border-2">
                        All
                    </button>
                    <button onClick={() => filterCategory('Pizza')} className="category-btn px-6 py-2.5 rounded-xl font-medium smooth-transition border-2">
                        Pizza
                    </button>
                    <button onClick={() => filterCategory('Burgers')} className="category-btn px-6 py-2.5 rounded-xl font-medium smooth-transition border-2">
                        Burgers
                    </button>
                    <button onClick={() => filterCategory('Mexican')} className="category-btn px-6 py-2.5 rounded-xl font-medium smooth-transition border-2">
                        Mexican
                    </button>
                    <button onClick={() => filterCategory('Salads')} className="category-btn px-6 py-2.5 rounded-xl font-medium smooth-transition border-2">
                        Salads
                    </button>
                    <button onClick={() => filterCategory('Asian')} className="category-btn px-6 py-2.5 rounded-xl font-medium smooth-transition border-2">
                        Asian
                    </button>
                    <button onClick={() => filterCategory('Desserts')} className="category-btn px-6 py-2.5 rounded-xl font-medium smooth-transition border-2">
                        Desserts
                    </button>
                </div>
            </div> */}

          
            <div id="menu-grid" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                {
menu.map(item=>{
  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-md card-hover" key={item.id}>
            <div className="relative image-zoom h-56">
                <img src={item.image} alt={item.name} className="w-full h-full object-cover"/>
                <span className="absolute top-4 right-4 glass-effect px-4 py-1.5 rounded-lg text-xs font-bold text-primary uppercase tracking-wide shadow-sm">
                    {item.category}
                </span>
            </div>
            <div className="p-6">
                <h3 className="font-display text-xl font-semibold text-gray-900 mb-2">{item.name}</h3>
                <p className="text-gray-600 text-sm mb-4 line-clamp-2">{item.description}</p>
                <div className="flex items-center justify-between">
                    <span className="text-3xl font-display font-bold text-primary">{item.price.toFixed(2)}</span>
                    <button onClick={() => addToCart(item)} className="btn-primary text-white px-6 py-3 rounded-xl font-semibold flex items-center space-x-2 shadow-lg">
                        <i className="fas fa-plus"></i>
                        <span >Add</span>
                    </button>
                </div>
            </div>
        </div>
  )
})

                }
            </div>
        </div>

  );
}
