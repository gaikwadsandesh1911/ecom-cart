import "./orders.css";
import { useEffect, useState } from "react";
import { assets } from "../../assets/assets";
import { axiosInstance } from "../../api/axiosInstance";
import { toast } from "react-toastify";

const Orders = () => {
  // ----------------------------------------------------------------------------

  const [isLoading, setIsLoading] = useState(false);
  const [orders, setOrders] = useState([]);

  // ----------------------------------------------------------------------------fetch all orders

  useEffect(() => {
    const fetchAllOrders = async () => {
      try {
        setIsLoading(true);
        const { data } = await axiosInstance.get(`/api/order/all-orders`);
        // console.log("allOrders", data);
        if (data?.success) {
          setOrders(data?.orders);
        }
      } catch (error) {
        console.log("error", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchAllOrders();
  }, []);

  // ----------------------------------------------------------------------------order status

  const orderStatusHandler = async (e, orderId) => {
    const newStatus = e.target.value;

    try {
      const { data } = await axiosInstance.patch(
        `/api/order/${orderId}/status`,
        { status: newStatus },
      );
      // console.log("updated orderStatus =>", data);
      toast.success(data?.message);

      // update ui instantly
      setOrders((prev) =>
        prev.map((order) =>
          order._id === orderId ? { ...order, status: newStatus } : order,
        ),
      );
    } catch (error) {
      console.log("order status error => ", error?.response);
      toast.error(error?.response?.data?.message);
    }
  };

  return (
    <div className="orders add">
      <h3>All Orders</h3>
      {isLoading && <p>Loading...</p>}

      <div className="order-list">
        {orders.map((order) => (
          <div key={order._id} className="order-item">
            <img src={assets.parcel_icon} alt="" />

            <div>
              <p className="ordered-product">
                {order.items.map((product) => {
                  return `${product.name} x ${product.quantity}` + ", ";
                })}
              </p>

              <p className="customer-name">
                {`${order?.address?.firstName} ${order?.address?.lastName}`}
              </p>

              <div className="customer-address">
                <p>{`${order?.address?.street},`}</p>
                <p>{`${order?.address?.city}, ${order?.address?.state}, ${order?.address?.zipcode},`}</p>
              </div>

              <p className="customer-phone">{order?.address?.phone}</p>
            </div>

            <p>Items : {order?.items?.length}</p>

            <p>{order?.amount}.00</p>

            <select
              onChange={(e) => orderStatusHandler(e, order._id)}
              value={order?.status}
            >
              <option value="Preparing">Preparing</option>
              <option value="Out for Delivery">Out for Delivery</option>
              <option value="Delivered">Delivered</option>
            </select>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Orders;
