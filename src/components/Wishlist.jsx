function Wishlist({ wishlistItems, addToWishlist }) {

  return (
    <div className="wishlist-dropdown">

      <div className="wishlist-title">
        <h2>Wishlist</h2>
        <span>{wishlistItems.length} Items</span>
      </div>

      {wishlistItems.length === 0 ? (
        <p className="empty-wishlist">
          Your wishlist is empty
        </p>
      ) : (
        <>
          <div className="wishlist-items">

            {wishlistItems.map((item, index) => (
              <div className="wishlist-item" key={index}>

                <img
                  src={item.image}
                  alt={item.name}
                />

                <div className="wishlist-info">
                  <h4>{item.name}</h4>
                  <p>{item.price}</p>

                  <button
                    onClick={() => addToWishlist(item)}
                  >
                    Remove
                  </button>
                </div>

              </div>
            ))}

          </div>
        </>
      )}

    </div>
  );
}

export default Wishlist;