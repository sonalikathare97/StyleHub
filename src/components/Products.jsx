import { useState } from "react";

function Products({ addToCart, addToWishlist, wishlistItems=[], 
                   searchTerm = "", selectedCategory = "All", clearFilters }) {
    const [selectedProduct, setSelectedProduct] = useState(null);
  const products = [
    { id: 1, name: "Classic Shirt", price: "₹799", image: "/images/product1.jpg", category: "Men" },
    { id: 2, name: "Fancy Frock", price: "₹1,499", image: "/images/product2.jpg", category: "Kids" },
    { id:3, name: "Long Dress", price: "₹1,299", image: "/images/product3.jpg", category: "Women" },
    { id:4, name: "Jacket", price: "₹1,999", image: "/images/product4.jpg", category: "Men" },
    { id:5,name: "Casual Shoes", price: "₹1,999", image: "/images/product5.jpg", category: "Shoes" },
    { id:6,name: "T-shirt", price: "₹999", image: "/images/product6.jpg", category: "Men" },
    { id:7, name: "Kid T-shirt", price: "₹1,099", image: "/images/product7.jpg", category: "Kids" },
    { id:8, name: "Women Kurti", price: "₹1,499", image: "/images/product8.jpg", category: "Women" }
  ];

  const visibleProducts = products.filter((product) => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "All" || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <section className="products" id="products">
      <h2>OUR PRODUCTS</h2>
      <div className="product-container">
        {visibleProducts.map((product) => (
          <div className="product-card" key={product.name}>
            <img src={product.image} alt={product.name}
                 onClick={()=> setSelectedProduct(product)} />
            <small>{product.category}</small>
            <h3 onClick={() => setSelectedProduct(product)}>
              {product.name}</h3>
            <p>{product.price}</p>

            <div className="product-buttons">
        <button onClick={() => addToCart(product)}>
            ADD TO CART
        </button>

        <button
          className="wishlist-btn"
          onClick={() => addToWishlist(product)}>

         {wishlistItems.some((item) => item.name === product.name)
          ? "❤️ Wishlisted"
          : "♡  Wishlist"}
        </button> 
        </div>        
        </div>
        ))}
      </div>
      {visibleProducts.length === 0 && <div className="no-products"><p>No products match your search.</p><button onClick={clearFilters}>SHOW ALL PRODUCTS</button></div>}
    
    {selectedProduct && (
  <div className="product-modal-overlay" onClick={()=> setSelectedProduct(null)}>
    <div className="product-modal" onClick={(e) => e.stopPropagation()}>

      <button
        className="close-modal"
        onClick={() => setSelectedProduct(null)}
      >
        ×
      </button>

      <div className="modal-content">

        <img
          src={selectedProduct.image}
          alt={selectedProduct.name}
        />

        <div className="modal-details">
          <small>{selectedProduct.category}</small>

          <h2>{selectedProduct.name}</h2>

          <h3>{selectedProduct.price}</h3>

          <p>
            Explore our stylish {selectedProduct.name}.
            A perfect choice for your everyday fashion.
          </p>

          <div className="product-buttons">
            <button onClick={() => addToCart(selectedProduct)}>
              ADD TO CART
            </button>

            <button
              className="wishlist-btn"
              onClick={() => addToWishlist(selectedProduct)}
            >
              {wishlistItems.some(
                (item) => item.id === selectedProduct.id
              ) ? "❤️ Wishlisted" : "♡ Wishlist"}
            </button>
          </div>
        </div>

      </div>
    </div>
  </div>
)}
    
    </section>
  );
}

export default Products;
