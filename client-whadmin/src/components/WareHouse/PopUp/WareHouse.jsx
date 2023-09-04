import { useState } from "react";
import PropTypes from 'prop-types';

const WareHouse = ({compData, compFunction}) => {
    const {created, wareHouseData} = compData;
    const {setPopUpState, setWareHouseData} = compFunction;

    const WareHouseState = {
        warehouse_name: "",
        volume: "",
        province: "",
        city: "",
        district: "",
        street: "",
        street_number: ""
    };

    const [wareHouseFormData, setWareHouseFormData] = useState(WareHouseState);
    const {warehouse_name, volume, province, city, district, street, street_number} = wareHouseFormData;

    const handleChangeInput = (e) => {
        const {name, value} = e.target;
        const parsedValue = (name === "volume" || name ==="street_number") ? parseInt(value, 10) : value;

        setWareHouseFormData(prevState => ({...prevState, [name]: parsedValue}))
    };


    const handleSubmitData = (e) => {
        e.preventDefault();

        setWareHouseData(prevState => [
            ...prevState,
            {
                id: wareHouseData.length + 1,
                ...wareHouseFormData
            }
        ])

        setPopUpState(prevState => ({
            ...prevState,
            state: !prevState.state,
            created: true
        }));
    };

    const handleClosePopUpForm = () => {
        setPopUpState(prevState => ({
            ...prevState,
            state: !prevState.state,
            created: true
        }));

        setWareHouseFormData(WareHouseState);
    };

    return (
        <form onSubmit={handleSubmitData}>
            <div className="container_fluid">
                <div className="row">
                    <div className="col-6">
                        <div className="mb-3">
                            <label className="form-label">Warehouse Name</label>
                            <input type="text" className="form-control"
                                name="warehouse_name" value={warehouse_name} onChange={handleChangeInput}
                            />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Volume</label>
                            <input type="text" className="form-control"
                                name="volume" value={volume} onChange={handleChangeInput}
                            />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Province</label>
                            <input type="text" className="form-control"
                                name="province" value={province} onChange={handleChangeInput}
                            />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">City</label>
                            <input type="text" className="form-control"
                                name="city" value={city} onChange={handleChangeInput}
                            />
                        </div>
                    </div>
                    <div className="col-6">
                        <div className="mb-3">
                            <label className="form-label">Street Number</label>
                            <input type="text" className="form-control"
                                name="street_number" value={street_number} onChange={handleChangeInput}
                            />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Street</label>
                            <input type="text" className="form-control"
                                name="street" value={street} onChange={handleChangeInput}
                            />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">District</label>
                            <input type="text" className="form-control"
                                name="district" value={district} onChange={handleChangeInput}
                            />
                        </div>
                    </div>
                </div>
                <div className="submit_btn">
                    <span className="btn" onClick={handleClosePopUpForm}>Cancel</span>
                    <button className="btn btn-outline-primary ms-2" type="submit">{created ? "Create" : "Edit"}</button>
                </div>
            </div>
        </form>
    )
};

WareHouse.propTypes = {
    compData: PropTypes.shape({
        created: PropTypes.bool.isRequired,
        wareHouseData: PropTypes.array.isRequired
    }).isRequired,
    compFunction: PropTypes.shape({
        setPopUpState: PropTypes.func.isRequired,
        setWareHouseData: PropTypes.func.isRequired,
    })
}

export default WareHouse