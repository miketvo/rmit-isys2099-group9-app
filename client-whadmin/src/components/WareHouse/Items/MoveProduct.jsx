import OptionComponent from "./MoveProduct/OptionComponent"
import {FaArrowRight} from "react-icons/fa"
import { IconSetting } from "../../../utils/IconSettings"
const MoveProduct = () => {
    const data = [
        {
            name: "One",
            value: 1
        },
        {
            name: "Two",
            value: 2
        },
        {
            name: "Three",
            value: 3
        },
    ]
    return (
        <div className="move_product mt-4">
            <form className="container_fluid">
                <div className="row g-2">
                    <OptionComponent name="Seller" data={data} />
                    <OptionComponent name="Category" data={data} />
                    <OptionComponent name="Product" data={data} />
                </div>
                <div className="mt-4">
                    <div className="d-flex">
                        <div className="col-5">
                            <select className="form-select" aria-label="Default select example">
                                <option selected>Open this select menu</option>
                                <option value="1">One</option>
                                <option value="2">Two</option>
                                <option value="3">Three</option>
                            </select>
                        </div>
                        <div className="col-2 d-flex justify-content-center align-items-center">             
                            {IconSetting(<FaArrowRight/>, "black", "25px", "")}
                        </div>
                        <div className="col-5">
                            <select className="form-select" aria-label="Default select example">
                                <option selected>Open this select menu</option>
                                <option value="1">One</option>
                                <option value="2">Two</option>
                                <option value="3">Three</option>
                            </select>
                        </div>
                    </div>
                    <div className="d-flex">
                        <div className="col-5">
                            <div className="my-3"> 
                                <ul>
                                    <li><span>Warehouse Name: Name</span></li>
                                    <li><span>Volume: Volume</span></li>
                                    <li><span>Province: Province</span></li>
                                    <li><span>City: City</span></li>
                                    <li><span>District: Name</span></li>
                                    <li><span>Street Number: Name</span></li>
                                    <li><span>Street: Name</span></li>
                                </ul>    
                            </div>
                        </div>
                        <div className="col-2">

                        </div>
                        <div className="col-5">
                            <div className="my-3"> 
                                <ul>
                                    <li><span>Warehouse Name: Name</span></li>
                                    <li><span>Volume: Volume</span></li>
                                    <li><span>Province: Province</span></li>
                                    <li><span>City: City</span></li>
                                    <li><span>District: Name</span></li>
                                    <li><span>Street Number: Name</span></li>
                                    <li><span>Street: Name</span></li>
                                </ul>    
                            </div>
                        </div>
                    </div>
                </div>
                <div className="mt-3 d-flex flex-row float-end">
                    <button className="btn btn-outline-secondary me-3">Reset</button>
                    <button className="btn btn-outline-primary">Submit</button>
                </div>
            </form>
        </div>
    )
}

export default MoveProduct