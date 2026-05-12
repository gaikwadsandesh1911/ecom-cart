import { useEffect } from "react";
import "./productDisplay.css";
import { axiosInstance } from "../../api/axiosInstance";

// import ProductCard from "../productCard/ProductCard";

const ProductDisplay = () => {
  useEffect(() => {
    const fetchProduct = async() => {
      try {
        const res = await axiosInstance.get(`api/product/product-list`);
        console.log('res', res)
      } catch (error) {
        console.log(error)
      }
    };

    fetchProduct();
  }, []);
  return (
    <div className="product-display" id="product-display">
      <h2 className="top-products">Top Products</h2>

      {/* <div className="product-list">
        {product_list &&
          product_list.map((item, index) => {
            return (
              <ProductCard
                key={index}
                itemId={item._id}
                name={item.name}
                image={item.image?.url}
                price={item.price}
                description={item.description}
              />
            );
          })}
      </div> */}
    </div>
  );
};

export default ProductDisplay;
