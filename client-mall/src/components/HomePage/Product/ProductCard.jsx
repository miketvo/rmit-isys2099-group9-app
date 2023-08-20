import PropTypes from 'prop-types';

const ProductCard = ({ product }) => {
    return (
        <div className="card h-100">
          {/* Product image */}
          <img
            className="card-img-top"
            src={product.image || 'https://dummyimage.com/450x300/dee2e6/6c757d.jpg'}
            alt="Product"
          />
          {/* Product details */}
          <div className="card-body p-4">
            <div className="text-center">
              {/* Product name */}
              <h5 className="fw-bolder">{product.title}</h5>
              {/* Product price */}
              ${product.price}
            </div>
          </div>
          {/* Product actions */}
          <div className="card-footer p-4 pt-0 border-top-0 bg-transparent">
            <div className="text-center">
              <a className="btn btn-outline-dark mt-auto" href="#">
                Add to Cart
              </a>
            </div>
          </div>
        </div>
    );
}

ProductCard.propTypes = {
    product: PropTypes.object.isRequired, // Assuming 'product' is an object
};

export default ProductCard;
