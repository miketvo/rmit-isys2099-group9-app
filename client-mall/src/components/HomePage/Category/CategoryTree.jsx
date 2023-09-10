import PropTypes from "prop-types";
import {Link} from "react-router-dom"

const CategoryTree = ({categories, depth = 1}) => {

    return (
        <ul className={`${depth === 1 && "px-2"}`}>
          {categories.map((category) => (
            <li key={category.category_name}>
                <Link to="/">{category.category_name}</Link>
              
                {category.sub_categories && (
                    <div className="sub_menu">
                        <CategoryTree categories={category.sub_categories} depth={depth + 1}/>
                    </div>
                )}
            </li>
          ))}
        </ul>
      );
}

CategoryTree.propTypes = {
    categories: PropTypes.arrayOf(
      PropTypes.shape({
        category_name: PropTypes.string.isRequired,
        sub_categories: PropTypes.array, // You can make this recursive if needed
      })
    ).isRequired,
    depth: PropTypes.number,
};

export default CategoryTree