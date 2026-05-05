import { StoreContext } from "../../context/StoreContext";
import { useContext } from "react";
import "./productDisplay.css";
import InfiniteScroll from "react-infinite-scroll-component";
import { PulseLoader} from "react-spinners"
import ProductCard from "../productCard/ProductCard";

const ProductDisplay = () => {

  const { isLoading, isError, product_list, fetchMoreProductList, hasMore } = useContext(StoreContext);

  return (
    <div className="product-display" id="product-display">

      <h2 className="top-products">Top Products</h2>

      
      {isLoading && <p>Loading...</p>}    

      {isError && <p>Network Error...</p>}

      <InfiniteScroll
        dataLength={product_list.length}
        next={fetchMoreProductList}
        hasMore={hasMore}
        loader={<PulseLoader loading={isLoading} color="tomato" margin={5} className="pulse-loader"/>}
        // endMessage={<p className="no-item">No more items to load</p>}
      >
        <div className="product-list">
          {product_list &&
            product_list.map((item, index) => {
              // console.log('item', item)
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
        </div>
      </InfiniteScroll>

    </div>
  );
};

export default ProductDisplay;
