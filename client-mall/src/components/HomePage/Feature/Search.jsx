import { FiSearch } from "react-icons/fi";
import PropTypes from "prop-types";

const Search = ({ compData, compFunction }) => {
  const handleSearchProduct = e => {
    e.preventDefault();
  };
  return (
    <div className="">
      <form className="d-flex" onSubmit={handleSearchProduct}>
        <input
          className="form-control"
          type="text"
          name="search"
          placeholder="Search here..."
          id="search"
          value={compData}
          onChange={e => {
            compFunction(e.target.value);
          }}
          onKeyDown={e => e.key === "Enter" && compFunction(e.target.value)}
        />
        <button className="btn btn-outline-primary">
          <FiSearch />
        </button>
      </form>
    </div>
  );
};

Search.propTypes = {
  compData: PropTypes.string,
  compFunction: PropTypes.func.isRequired,
};

export default Search;
