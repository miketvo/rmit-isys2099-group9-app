import PropTypes from "prop-types";

const CategoryTree = ({ compData, compFunction, depth = 1 }) => {
  const { categoryTree, categoryFiltered } = compData;
  const { handleCategoryChange } = compFunction;

  const handleCheckboxChange = e => {
    const { value, checked } = e.target;
    if (checked) {
      handleCategoryChange([...categoryFiltered, value]);
    } else {
      handleCategoryChange(categoryFiltered.filter(item => item !== value));
    }
  };

  return (
    <ul className={`${depth === 1 && "px-2"}`}>
      {categoryTree.map(category => (
        <li key={category.category_name}>
          <div className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              id="flexCheckDefault"
              value={category.category_name}
              checked={categoryFiltered.includes(category.category_name)}
              onChange={handleCheckboxChange}
            />
            <label
              className="form-check-label text-capitalize"
              htmlFor="flexCheckDefault"
            >
              {category.category_name}
            </label>
          </div>

          {category.sub_categories && (
            <div className="sub_menu">
              <CategoryTree
                compData={{
                  categoryTree: category.sub_categories,
                  categoryFiltered: categoryFiltered,
                }}
                compFunction={{ handleCategoryChange }}
                depth={depth + 1}
              />
            </div>
          )}
        </li>
      ))}
    </ul>
  );
};

CategoryTree.propTypes = {
  compData: PropTypes.shape({
    categoryTree: PropTypes.arrayOf(
      PropTypes.shape({
        category_name: PropTypes.string.isRequired,
        sub_categories: PropTypes.array,
      }),
    ).isRequired,
    categoryFiltered: PropTypes.arrayOf(PropTypes.string).isRequired,
  }).isRequired,
  compFunction: PropTypes.shape({
    handleCategoryChange: PropTypes.func.isRequired,
  }).isRequired,
  depth: PropTypes.number, // You can add this prop if it's used frequently, but it's optional.
};

export default CategoryTree;
