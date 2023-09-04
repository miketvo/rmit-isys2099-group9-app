import { useSearchParams } from "react-router-dom"

const Sort = () => {
    const [searchParams, setSearchParams] = useSearchParams({})
    const setSort = searchParams.get('sort') || ""

    const handleSort = (e) => {
        const {value} = e.target
        if (value.length === 0) {
            searchParams.delete('sort')
            setSearchParams(searchParams, {replace: true})
        } else {
            searchParams.set('sort', value)
            setSearchParams(searchParams, {replace: true})
        }
    }
    return (
        <div className="sorting d-flex w-25 mb-4" >
            <div className="d-flex align-items-center" style={{width: "120px"}}>
                <h6 className="m-0">Sort By: </h6>
            </div>
            <select className="form-select" value={setSort} onChange={handleSort}>
                <option value="">Default</option>
                <option value="title">Sort A to Z</option>
                <option value="-title">Sort Z to A</option>
                <option value="salary">Salary: Low-High</option>
                <option value="-salary">Salary: High-Low</option>
            </select>
        </div>
    ) 
}

export default Sort