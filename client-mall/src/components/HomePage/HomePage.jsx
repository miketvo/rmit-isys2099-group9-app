import { useState, useEffect } from "react";
import {useSearchParams} from "react-router-dom"

import { categoriesData } from "../../api/mock_data";

import ProductCard from "./Product/ProductCard"
import CategoryTree from "./Category/CategoryTree";

import Sort from "./Feature/Sort";
import Filter from "./Feature/Filter";
import { getDataAPI } from "../../api/apiRequest";

const HomePage = () => {
  // Function to fetch products from the API
  const [products, setProducts] = useState([]);
  const fetchProducts = async () => {
    try {
      const response = await getDataAPI(`product`);
      setProducts(response.data)
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  // Fetch products when the component mounts
  useEffect(() => {
    fetchProducts();
  }, []);

  function buildCategoryTree(categories, parentCategory) {
    return categories
      .filter((category) => category.parent === parentCategory)
      .map((category) => ({
        category_name: category.category_name,
        sub_categories: buildCategoryTree(categories, category.category_name),
      }));
  }

  const categoryTree = buildCategoryTree(categoriesData, null);

  const [searchParams] = useSearchParams({})
  const [queryData, setQueryData] = useState([])

  useEffect(() => {
    if (searchParams.size > 0) {
      const searchCurr = searchParams.get('search');
      const sortCurr = searchParams.get('sort');
      const sellerFiltered = searchParams.get('seller');
      const sellerArray = decodeURIComponent(sellerFiltered).split(',');


      if (searchCurr) {
        const clonedData = [...products];

        setQueryData(clonedData.filter(item => {
          return item.title.toLowerCase().includes(searchCurr.toLowerCase());
        }))
      }
      
      if (sortCurr) {
        const clonedData = [...products];
        const sortTitle = clonedData.sort((a, b) => {
          return sortCurr === 'title' ? a.title.localeCompare(b.title) : 
                sortCurr === '-title' ? b.title.localeCompare(a.title) :
                sortCurr === 'price' ? a.price.localeCompare(b.price) :
                sortCurr === '-price' ? b.price.localeCompare(a.price) :
                a.title.localeCompare(b.title)
        })
        setQueryData(sortTitle)
      }

      if (sellerFiltered) {
        const clonedData = [...products];
        const filtered = clonedData.filter((item) => sellerArray.includes(item.seller))
        setQueryData(filtered)
      }


      if (searchCurr && sortCurr) {
        const clonedData = [...products];
        const filteredData = clonedData.filter(item => {
          return item.title.toLowerCase().includes(searchCurr.toLowerCase());
        });
    
        const sortedData = [...filteredData].sort((a, b) => {
          return sortCurr === 'title' ? a.title.localeCompare(b.title) : b.title.localeCompare(a.title);
        });
        
        setQueryData(sortedData); 
      }

      if (!searchCurr && !sortCurr && !sellerFiltered) {
        setQueryData(products)
      }
    }
    
    
  }, [products, searchParams])

  return (
    <section className="main_page mt-5" style={{minHeight: "calc(100vh - var(--horizontalNavBarHeight))"}}>
      <div className="container d-flex column-gap-3 gap-0">
        <div className="position-relative z-3 col-2 px-2 py-4 bg-light h-100">
          <div className="">
            <span className="px-2 my-1 fs-5 fw-bold">Categories</span>
            <CategoryTree categories={categoryTree} />
          </div>
          
          <div className="">
            <Filter fetchData={products}/>
          </div>
        </div>
        {/* Product List */}
        <div className="col-10 px-2 px-lg-2">
            <div className="d-flex justify-content-end">
                <Sort />
            </div>
            <div className="">
              <div className="row">
                {
                  searchParams.size > 0 
                  ?
                  queryData.map(product => (
                    <div className="col-lg-3 col-md-12 px-3 mb-3" key={product.id}>
                      <ProductCard product={product} />
                    </div>
                  ))
                  :
                  products.map(product => (
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
