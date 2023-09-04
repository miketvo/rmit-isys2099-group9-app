import { Fragment, useState } from "react"
import PropTypes from "prop-types"


const OptionComponent = ({name, data}) => {
  const [optionValue, setOptionValue] = useState()
  return (
    <Fragment>
      <div className="col-4">
        <div className="d-flex flex-row align-items-center">
          <div className="col-3">
            <span className="text-capitalize">{name}:</span>
          </div>
          <div className="col-9">
            <select className="form-select" aria-label="Default select example"
            value={optionValue}
            onChange={(e) => setOptionValue(e.target.value)}>
                <option selected>Open this select menu</option>
                {
                  data?.map((item, idx) => (
                    <option value={item.value} key={idx}>{item.name}</option>
                  ))
                }
            </select>
          </div>
        </div>
      </div>
      
      <div className="col-8">
        <input className="form-control" type="text" placeholder="Disabled input" aria-label="Disabled input example" disabled 
        value={optionValue}/>
      </div>
    </Fragment>
  )
}

OptionComponent.propTypes = {
  name: PropTypes.string.isRequired,
  data: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      name: PropTypes.string,
    })
  ),
};

export default OptionComponent