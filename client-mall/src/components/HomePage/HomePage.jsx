import { useState, useEffect } from "react";

import ProductCard from "./Product/ProductCard"
import CategoryTree from "./Category/CategoryTree";

import Sort from "./Feature/Sort";
import { getDataAPI } from "../../api/apiRequest";
import Search from "./Feature/Search";
import SellerFiltered from "./Feature/SellerFiltered";

const HomePage = () => {
  // Function to fetch products from the API
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("");


  const [productQuery, setProductQuery] = useState("");
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);

  // Sort and search by server logic
  useEffect(() => {
    let newProductQuery = "";
  
    if (sort === "price") {
      newProductQuery = "productsASC";
    } else if (sort === "-price") {
      newProductQuery = "productsDSC";
    }
  
    if (search !== "") {
      newProductQuery = `title/${search}`;
    }

    setProductQuery(newProductQuery);
  }, [search, sort]);



  // Filter by client logic
  const [queryData, setQueryData] = useState(products)
  const [sellerFiltered, setSellerFiltered] = useState([]);
  const [categoryFiltered, setCategoryFiltered] = useState([]);

  const handleCategoryChange = (newSelectedCategories) => {
    setCategoryFiltered(newSelectedCategories);
  };

  

  useEffect(() => {
    if (sellerFiltered.length > 0) {
      const clonedData = [...products];
      const filtered = clonedData.filter((item) => sellerFiltered.includes(item.seller))
      setQueryData(filtered)
    } 

    if (categoryFiltered.length > 0) {
      const clonedData = [...products];
      const filtered = clonedData.filter((item) => categoryFiltered.includes(item.category))
  
      setQueryData(filtered)
    } 

    if (sellerFiltered.length > 0 && categoryFiltered.length > 0) {
      const clonedData = [...products];
      const filterSeller = clonedData.filter((item) => sellerFiltered.includes(item.seller))
      const filterCategory = filterSeller.filter((item) => categoryFiltered.includes(item.category))
      setQueryData(filterCategory)
    }

    if (sellerFiltered.length === 0 && categoryFiltered.length === 0) {
      setQueryData(products)
    }

  }, [categoryFiltered, products, sellerFiltered])

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await getDataAPI(`product/${productQuery}`);
        setProducts(response.data)
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    const fetchCategories = async () => {
      try {
        const response = await getDataAPI(`product-category`);
        setCategories(response.data)
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
    fetchCategories();
  }, [productQuery, search]);

  function buildCategoryTree(categories, parentCategory) {
    return categories
      .filter((category) => category.parent === parentCategory)
      .map((category) => ({
        category_name: category.category_name,
        sub_categories: buildCategoryTree(categories, category.category_name),
      }));
  }

  const categoryTree = buildCategoryTree(categories, null);

  return (
    <section className="main_page mt-5" style={{minHeight: "calc(100vh - var(--horizontalNavBarHeight))"}}>
      <div className="container d-flex column-gap-3 gap-0">
        <div className="position-relative z-3 col-2 px-2 py-4 bg-light h-100">
          <div className="mb-4">
            <SellerFiltered compData={{products, sellerFiltered}} compFunction={{setSellerFiltered}} />
          </div>

          <div className="">
            <span className="px-2 my-1 fs-5 fw-bold">Categories</span>
            <CategoryTree compData={{categoryTree: categoryTree, categoryFiltered: categoryFiltered}} compFunction={{handleCategoryChange}} />
          </div>


        </div>
        {/* Product List */}
        <div className="col-10 px-2 px-lg-2">
            <div className="d-flex justify-content-between">
              <Search compData={search} compFunction={setSearch}/>
              <Sort compData={sort} compFunction={setSort}/>
            </div>
            <div className="">
              <div className="row">
                {
                  queryData.map(product => (
                    <div className="col-lg-3 col-md-12 px-3 mb-3" key={product.id}>
                      <ProductCard product={product} />
                    </div>
                  ))
                }
              </div>
            </div>
          </div>
      </div>
      

      
    </section>
  );
};

export default HomePage;
