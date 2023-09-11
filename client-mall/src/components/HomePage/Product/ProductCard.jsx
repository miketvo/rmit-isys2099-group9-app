import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const ProductCard = ({ product }) => {
  return (
    <Link to={`/products/${product.id}`} className="card h-100">
      {/* Product image */}
      <div style={{ width: "100%", height: "240px" }}>
        <img
          className="card-img-top w-100 h-100"
          style={{ objectFit: "contain" }}
          src={
            product.image !== ""
              ? product.image
              : "https://dummyimage.com/450x300/dee2e6/6c757d.jpg"
          }
          alt="Product"
        />
      </div>

      {/* Product details */}
      <div className="card-body p-2">
        <div className="text-center">
          {/* Product name */}
          <div className="fw-bolder">{product.title}</div>
        </div>
        <div className="text-center mt-2">
          {/* Product price */}${product.price}
        </div>
      </div>
      {/* Product actions */}
      <div className="card-footer p-4 pt-0 border-top-0 bg-transparent">
        <div className="d-flex justify-content-end mt-4 w-100">
          <small className="text-end fw-bold ">{product.category}</small>
        </div>
      </div>
    </Link>
  );
};

ProductCard.propTypes = {
  product: PropTypes.object.isRequired, // Assuming 'product' is an object
};

export default ProductCard;
