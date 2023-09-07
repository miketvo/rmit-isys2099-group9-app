import PropTypes from "prop-types";
import {Link} from "react-router-dom"

const ProductCard = ({ product }) => {
  return (
    <div className="card h-100">
      {/* Product image */}
      <img
        className="card-img-top"
        src={
          product.image || "https://dummyimage.com/450x300/dee2e6/6c757d.jpg"
        }
        alt="Product"
      />
      {/* Product details */}
      <div className="card-body p-2">
        <div className="text-center">
          {/* Product name */}
          <Link to={`/products/${product.id}`} className="fw-bolder">{product.title}</Link>
        </div>
        <div className="text-center mt-2">
          {/* Product price */}
          ${product.price}
        </div>
      </div>
      {/* Product actions */}
      <div className="card-footer p-4 pt-0 border-top-0 bg-transparent">
        <div className="text-center">
          <span className="btn btn-outline-dark mt-auto" href="#">
            Place Order
          </span>
        </div>
        <div className="d-flex justify-content-end mt-4 w-100">
          <small className="text-end fw-bold ">{product.category}</small>
        </div>
      </div>
    </div>
  );
};

ProductCard.propTypes = {
  product: PropTypes.object.isRequired, // Assuming 'product' is an object
};

export default ProductCard;
