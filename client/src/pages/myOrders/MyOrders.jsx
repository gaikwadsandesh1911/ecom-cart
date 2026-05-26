import "./myorders.css";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useEffect, useRef } from "react";
import { getMyOrders } from "../../api/orderApi.js";

const MyOrders = () => {
  const observerRef = useRef();

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } =
    useInfiniteQuery({
      queryKey: ["orders"],
      queryFn: ({ pageParam = 1 }) => getMyOrders(pageParam),
      initialPageParam: 1,
      getNextPageParam: (lastPage) => {
        return lastPage?.hasMore ? lastPage.currentPage + 1 : undefined;
      },
    });

  const orders = data?.pages.flatMap((page) => page.orders) || [];
  console.log('orders', orders);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && hasNextPage) {
        fetchNextPage();
      }
    });

    if (observerRef.current) {
      observer.observe(observerRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, [fetchNextPage, hasNextPage]);

  if (isLoading) {
    return <p></p>;
  }

  return (
    <div className="orders-container">
      {/* <h1 className="orders-title">My Orders</h1> */}

      {orders.length === 0 ? (
        <h2>No Orders Found</h2>
      ) : (
        <>
          {orders.map((order) => (
            <div className="order-card" key={order._id}>

              <div className="order-top">
                <div>
                  <p className="order-id">Order #{order._id.slice(-8)}</p>

                  <p className="order-date">
                    {new Date(order.createdAt).toLocaleDateString()}
                  </p>
                </div>

                <span className="order-status processing">{order.status}</span>
              </div>

              <hr />

              <div className="order-items">
                {order.items.map((item) => (
                  <div className="order-item" key={item.productId}>
                    <img src={item.image.url} alt={item.name} />

                    <div>
                      <h3>{item.name}</h3>

                      <p>
                        Qty:
                        {item.quantity}
                      </p>

                      <p>₹{item.finalPrice}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="order-footer">
                <div>
                  <span>Total:</span>

                  <strong>₹{order.amount}</strong>
                </div>

                <button>Track Order</button>
              </div>

            </div>
          ))}

          <div
            ref={observerRef}
            style={{
              height: "20px",
            }}
          />

          {isFetchingNextPage && <p>Loading more...</p>}
        </>
      )}
    </div>
  );
};

export default MyOrders;
