import "./productCard.css";
import { Link } from "react-router-dom";
import './productCard.css'

const ProductCard = ({ product }) => {
  return (
    <Link to={`/product/${product._id}`} className="product-card-link">
      <div className="product-card">
        {product.discount > 0 && (
          <span className="discount-badge">{product.discount}% OFF</span>
        )}

        <div className="product-image-container">
          <img
            src={product.image.url}
            alt={product.name}
            className="product-image"
          />
        </div>

        <div className="product-info">
          <h3 className="product-title">{product.name}</h3>

          <div className="price-container">
            <span className="final-price">₹{product.finalPrice}</span>

            <span className="original-price">₹{product.price}</span>
          </div>

          <p className="save-price">
            Save ₹{product.price - product.finalPrice}
          </p>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
