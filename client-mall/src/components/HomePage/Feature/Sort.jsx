import PropTypes from "prop-types";

const Sort = ({ compData, compFunction }) => {
  return (
    <div className="sorting d-flex w-25 mb-4">
      <div className="d-flex align-items-center" style={{ width: "120px" }}>
        <h6 className="m-0">Sort By: </h6>
      </div>
      <select
        className="form-select"
        value={compData}
        onChange={e => compFunction(e.target.value)}
      >
        <option value="">Default</option>
        <option value="price">Price: Low-High</option>
        <option value="-price">Price: High-Low</option>
      </select>
    </div>
  );
};

Sort.propTypes = {
  compData: PropTypes.string,
  compFunction: PropTypes.func.isRequired,
};

export default Sort;
