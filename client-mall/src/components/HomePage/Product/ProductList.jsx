import { useEffect, useState } from "react";
import ProductCard from "./ProductCard"; // Import your ProductCard component

const ProductList = () => {
  // State to store the list of products
  const [products, setProducts] = useState([]);

  // Function to fetch products from the API
  const fetchProducts = async () => {
    try {
      const response = await fetch("http://localhost:3000/product");
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  // Fetch products when the component mounts
  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="row">
      {products.map(product => (
        <div className="col-lg-4 col-md-12 p-5" key={product.id}>
          <ProductCard product={product} />
        </div>
      ))}
    </div>
  );
};

export default ProductList;
