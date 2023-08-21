import ProductList from "./Product/ProductList"
import NavBar from "../NavBar/NavBar"

const HomePage = () => {
  return (
    <section className="">
      <NavBar />
      {/* Search Bar */}
      <form method="POST" action="/home/search" className="mb-3">
        <div className="row">
          <div className="col">
            <input type="text" name="searchTerm" className="form-control" placeholder="Search product model" required />
          </div>
          <div className="col">
            <input type="number" name="minPrice" className="form-control" placeholder="Minimum price" />
          </div>
          <div className="col">
            <input type="number" name="maxPrice" className="form-control" placeholder="Maximum price" />
          </div>
          <div className="col">
            <button type="submit" className="btn btn-primary">Search</button>
          </div>
        </div>
      </form>

      {/* Product List */}
      <div className="container px-4 px-lg-5 mt-5">
        <ProductList />
      </div>
    </section>

  )
}

export default HomePage