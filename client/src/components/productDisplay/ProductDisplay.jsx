import "./productDisplay.css";
import { useInfiniteQuery } from "@tanstack/react-query";
import { fetchProducts } from "../../api/productApi";

// import ProductCard from "../productCard/ProductCard";

const ProductDisplay = () => {
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isError,
    status,
  } = useInfiniteQuery({
    queryKey: [`products`],
    queryFn: fetchProducts,
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      // here we got actuall backend response at variable lastpage
      // console.log("lastPage", lastPage)
      return lastPage.currentPage < lastPage.totalPages
        ? lastPage.currentPage + 1
        : undefined;
    },
  });

  console.log("fetchProduct data", data);
  const products = data?.pages.flatMap((page) => page.productList);
  console.log('products', products);

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
