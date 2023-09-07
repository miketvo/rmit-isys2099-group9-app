import { Fragment} from "react"
import PropTypes from "prop-types"


const OptionComponent = ({name, compData, compState, compFunction}) => {

  return (
    <Fragment>
      <div className="col-4">
        <div className="d-flex flex-row align-items-center">
          <div className="col-3">
            <span className="text-capitalize">{name}:</span>
          </div>
          <div className="col-9">
            <select className="form-select" aria-label="Default select example"
            value={compState}
            onChange={(e) => compFunction(e.target.value)}>
                <option value="">Open this select menu</option>
                {compData.length > 0 && compData?.map((item, idx) => (
                  <option value={item} key={idx}>
                    {item}
                  </option>
                ))}
            </select>
          </div>
        </div>
      </div>
      
      <div className="col-8">
        <input className="form-control" type="text" aria-label="Disabled input example" disabled 
        value={compState}/>
      </div>
    </Fragment>
  )
}

OptionComponent.propTypes = {
  name: PropTypes.string.isRequired,
  compState: PropTypes.string,
  compData: PropTypes.array,
  compFunction: PropTypes.func.isRequired
};

export default OptionComponent