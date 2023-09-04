
import {useSearchParams} from "react-router-dom"
import PropTypes from "prop-types"


import {FaPlay} from "react-icons/fa"
import {IconSetting} from "../../../utils/IconSetting"
import { useState } from "react"

const Filter = ({fetchData}) => {
  const getSeller = fetchData.map((product) => product.seller)
  const uniqueSellers = [];

  for (const seller of getSeller) {
    if (!uniqueSellers.includes(seller)) {
      uniqueSellers.push(seller);
    }
  }

  const filterMap = [
    {
      id: "seller",
      selection: uniqueSellers
    }

  ]

  // const handleFilteredInput = (e) => {
  //   const {name, value} = e.target
  //   if (value.length === 0) {
  //       searchParams.delete(`${name}`)
  //       setSearchParams(searchParams, {replace: true})
  //   } else {
  //       searchParams.set(`${name}`, value)
  //       setSearchParams(searchParams, {replace: true})
  //   }
  // }

  // const setFilter = (value) => {
  //     return searchParams.get(`${value}`) || ""
  // }

  const initialCheckboxState = {};
  uniqueSellers.forEach(option => {
    initialCheckboxState[option.paramName] = false;
  });

  const [searchParams, setSearchParams] = useSearchParams();


  const initializeCheckboxState = () => {
    const urlSearchParams = new URLSearchParams(searchParams.toString());
    const initialCheckboxState = {};

    filterMap.forEach(item => {
      const paramValue = urlSearchParams.get(item.id);

      if (paramValue !== null) {
        const selectedValues = paramValue.split(',');
        const selectionState = {};

        item.selection.forEach(selectionValue => {
          selectionState[selectionValue] = selectedValues.includes(selectionValue);
        });

        initialCheckboxState[item.id] = selectionState;
      } else {

        initialCheckboxState[item.id] = {};
        item.selection.forEach(selectionValue => {
          initialCheckboxState[item.id][selectionValue] = false;
        });
      }
    });

    return initialCheckboxState;
  };

  const [checkboxState, setCheckboxState] = useState(initializeCheckboxState());
  
  const handleCheckboxChange = (id, value) => {
    const updatedState = { ...checkboxState, [id]: { ...(checkboxState[id] || {}), [value]: !checkboxState[id]?.[value] } };
    setCheckboxState(updatedState);

    const selectedValues = Object.keys(updatedState[id])
      .filter(key => updatedState[id][key])
      .join(',');

    if (selectedValues) {
      searchParams.set(id, selectedValues);
      setSearchParams(searchParams, {replace: true})
    } else {
      searchParams.delete(id); 
      setSearchParams(searchParams, {replace: true})
    }
  };
  
  return (
    <div className="filter_container">
      <div className="mt-4">
        <span className="px-2 my-1 fs-5 fw-bold">Price</span>
        <div className="d-flex mt-2">
          <div className="col-4">
            <input className="form-control form-control-sm" type="text" placeholder="0" aria-label=".form-control-sm example" />
          </div>
          <div className="col-1 text-center">
            <span>-</span>
          </div>
          <div className="col-4">
            <input className="form-control form-control-sm" type="text" placeholder="0" aria-label=".form-control-sm example" />
          </div> 
          <div className="col-1">
            <button className="btn btn-outline-primary ms-2 py-1 px-2">
              {IconSetting(<FaPlay/>, "", "14px")}
              
            </button>  
          </div> 
        </div>
      </div>

      {
        filterMap.map((type) => (
          <div className="mt-4" key={type.id}>
            <span className="px-2 my-1 fs-5 fw-bold text-capitalize">{type.id}</span>
            <div className="mt-2">
              
              {
                type.selection.map((selectionValue) => (
                  <div className="form-check" key={selectionValue}>
                    <input className="form-check-input" type="checkbox" id="flexCheckDefault" 
                    checked={checkboxState[type.id]?.[selectionValue] || false}
                    onChange={() => handleCheckboxChange(type.id, selectionValue)}
                    />
                    <label className="form-check-label text-capitalize" htmlFor="flexCheckDefault">
                      {selectionValue}
                    </label>
                  </div>
                ))
              }
              
            </div>
          </div>
        ))
      }
      
    </div>
  )
}

Filter.propTypes = {
  fetchData: PropTypes.arrayOf(PropTypes.shape({
    category: PropTypes.string.isRequired,
    height: PropTypes.number.isRequired,
    id: PropTypes.number.isRequired,
    image: PropTypes.string, // You can make this optional by omitting `isRequired`
    length: PropTypes.number.isRequired,
    price: PropTypes.string.isRequired,
    product_description: PropTypes.string.isRequired,
    seller: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    width: PropTypes.number.isRequired,
  })).isRequired,
};

export default Filter