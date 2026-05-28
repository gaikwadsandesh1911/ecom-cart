import "./productDisplay.css";
import { useInfiniteQuery } from "@tanstack/react-query";
import { fetchProducts } from "../../api/productApi";
import ProductCard from "../productCard/ProductCard";
import { useEffect, useRef } from "react";
const ProductDisplay = ({ search, category, sort }) => {
  // console.log({ search, category, sort });
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isError } =
    useInfiniteQuery({
      queryKey: [`products`, search, category, sort],
      queryFn: ({ pageParam }) =>
        fetchProducts({
          pageParam,
          search,
          category,
          sort,
        }),
      initialPageParam: 1,
      getNextPageParam: (lastPage) => {
        // here we got actual backend response at variable lastpage
        // console.log("lastPage", lastPage)
        return lastPage.currentPage < lastPage.totalPages
          ? lastPage.currentPage + 1
          : undefined;
      },
    });

  // console.log("fetchProduct data", data);
  const products = data?.pages.flatMap((page) => page.productList);
  // console.log("products", products);

  const bottomRef = useRef();

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const firstEntry = entries[0];

        if (firstEntry.isIntersecting && hasNextPage && !isFetchingNextPage) {
          fetchNextPage();
        }
      },
      {
        threshold: 0.5,
      },
    );

    const currentRef = bottomRef.current;

    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [fetchNextPage, hasNextPage, isFetchingNextPage]);

  if (isError) {
    return <p>Something went wrong...</p>;
  }

  return (
    <div className="product-display" id="product-display">
      {products && (
        <div className="product-list">
          {products.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      )}

      <div ref={bottomRef}></div>
      {isFetchingNextPage && <p>Loading...</p>}
    </div>
  );
};

export default ProductDisplay;
