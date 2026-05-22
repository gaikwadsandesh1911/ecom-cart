import { useParams } from "react-router-dom";
import { getProductDetails } from "../../api/productApi.js";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import "./productDetails.css";
import { addToCart } from "../../api/cartApi.js";

import { toast } from "react-toastify";

function ProductDetails() {

  const { id } = useParams();

   const queryClient = useQueryClient();

  // get product details
  const {
    data: product,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["product", id],
    queryFn: () => getProductDetails(id),
  });


  // add to  cart mutation

  const {mutate: addProduct, isPending: addingToCart} = useMutation({
    mutationFn: addToCart,
    onSuccess: (data)=> {
      console.log('onSuc',data)
      toast.success(data?.message)
      queryClient.invalidateQueries({
        queryKey: ['cart']
      })
      
    },
    onError: (error)=> {
      console.log('onErr',error)
    }
  })
 

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (isError) {
    return <p>{error.message}</p>;
  }

  console.log("product", product);

  return (
    <div className="product-details-container">
      <div className="product-image-section">
        <img
          src={product?.product.image.url}
          alt={product?.product.name}
          className="product-image"
        />
      </div>

      <div className="product-info-section">
        <span className="product-category">{product?.product.category}</span>

        <h1 className="product-name">{product?.product.name}</h1>

        <p className="product-description">{product?.product.description}</p>

        <div className="price-section">
          <span className="final-price">₹{product?.product.finalPrice}</span>

          <span className="original-price">₹{product?.product.price}</span>

          <span className="discount">{product?.product.discount}% OFF</span>
        </div>

        {product?.product.stock <= 0 && (
          <div className="stock-section">
            <p className="out-stock">Out Of Stock</p>
          </div>
        )}

        <div className="button-section">
          <button className="cart-btn" disabled={product?.product.stock < 1 || addingToCart} onClick={()=>addProduct(product?.product._id)}>
            {addingToCart ? "Adding..." : "Add To Cart"}
          </button>

          <button className="buy-btn" disabled={product?.product.stock <= 0}>
            Buy Now
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductDetails;
