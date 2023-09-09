import PropTypes from "prop-types"


const SellerFiltered = ({compData, compFunction}) => {
  const {products, sellerFiltered} = compData;
  const {setSellerFiltered} = compFunction;

  const getSeller = products.map((product) => product.seller)
  const uniqueSellers = [];

  for (const seller of getSeller) {
    if (!uniqueSellers.includes(seller)) {
      uniqueSellers.push(seller);
    }
  }

  const handleCheckboxChange = (e) => {
    const { value, checked } = e.target;

    setSellerFiltered((prevSelectedValues) => {
      if (checked) {
        return [...prevSelectedValues, value];
      } else {
        return prevSelectedValues.filter((item) => item !== value);
      }
    });
  };
  
  return (
    <div className="filter_container">
        <span className="px-2 my-1 fs-5 fw-bold text-capitalize">Seller</span>
        <div className="mt-2">
          {
            uniqueSellers.map((selectionValue) => (
              <div className="form-check" key={selectionValue}>
                <input className="form-check-input" type="checkbox" id="flexCheckDefault" 
                value={selectionValue}
                checked={sellerFiltered.includes(selectionValue)}
                onChange={handleCheckboxChange}
                />
                <label className="form-check-label text-capitalize" htmlFor="flexCheckDefault">
                  {selectionValue}
                </label>
              </div>
            ))
          }
          
        </div>
    </div>
  )
}

SellerFiltered.propTypes = {
  compData: PropTypes.shape({
    products: PropTypes.arrayOf(
      PropTypes.shape({
        seller: PropTypes.string.isRequired,
      })
    ).isRequired,
    sellerFiltered: PropTypes.arrayOf(PropTypes.string).isRequired,
  }).isRequired,
  compFunction: PropTypes.shape({
    setSellerFiltered: PropTypes.func.isRequired,
  }).isRequired,
};

export default SellerFiltered