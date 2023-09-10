import PropTypes from "prop-types";

import TestImg from "../../../images/potato.jpg";

const Product = ({ compData }) => {
  return (
    <div className="warehouse_table d-flex mt-2">
      <table className="table table-striped table-hover">
        <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th style={{ width: "15%" }}>Image</th>
            <th style={{ width: "15%" }}>Product Description</th>
            <th>Category</th>
            <th>Price</th>
            <th>Width</th>
            <th>Height</th>
            <th>Length</th>
            <th>Seller</th>
          </tr>
        </thead>
        <tbody>
          {compData?.map(item => {
            return (
              <tr key={item.id}>
                <th scope="row">{item.id}</th>
                <td>{item.title}</td>
                <td>
                  <img src={TestImg} alt="" />
                </td>
                <td>{item.product_description}</td>
                <td>{item.category}</td>
                <td>{item.price}</td>
                <td>{item.width}</td>
                <td>{item.height}</td>
                <td>{item.length}</td>
                <td>{item.seller}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

Product.propTypes = {
  compData: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      image: PropTypes.string,
      product_description: PropTypes.string,
      category: PropTypes.string.isRequired,
      price: PropTypes.string.isRequired,
      width: PropTypes.number.isRequired,
      height: PropTypes.number.isRequired,
      length: PropTypes.number.isRequired,
      seller: PropTypes.string.isRequired,
    }),
  ).isRequired
};

export default Product;
