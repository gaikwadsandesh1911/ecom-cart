import "./productList.css";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import Pagination from "../../components/pagination/Pagination";
import { axiosInstance } from "../../api/axiosInstance";

const ProductList = () => {
  const [loading, setLoading] = useState(false);

  const [productList, setProductList] = useState([]);

  const [currentPage, setCurrentPage] = useState(1);

  const [totalPages, setTotalPages] = useState(0);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  // -------------------------------------------------------------------------------------------------

  const fetchProductList = async () => {
    try {
      setLoading(true);
      const { data } = await axiosInstance.get(`/api/product/product-list`, {
        params: {
          page: currentPage,
        },
      });
      // console.log("data", data);
      setProductList(data?.productList);
      setTotalPages(data?.totalPages);
      setLoading(false);
    } catch (err) {
      setLoading(false);
      console.log("error productList", err?.response);
    }
  };

  useEffect(() => {
    fetchProductList();
  }, [currentPage]);

  // -------------------------------------------------------------------------------------------------
  const removeProduct = async (productId) => {
    const confirmDelete = window.confirm(
      "Are you sure, you want to delete this record?",
    );
    if (confirmDelete) {
      try {
        // Optimistic update — remove from UI immediately
        setProductList((prev) => prev.filter((item) => item._id !== productId));

        const { data } = await axiosInstance.delete(
          `/api/product/remove-product/${productId}`,
        );

        // console.log("deleteProduct", data);

        if (data.status) {
          toast.success(data?.message);

          // If current page is now empty and it's not page 1, go back one page
          setProductList((prev) => {
            const updated = prev.filter((item) => item._id !== productId);
            if (updated.length === 0 && currentPage > 1) {
              setCurrentPage((p) => p - 1); // triggers fetchProductList via useEffect
            } else {
              // Refresh to sync totalPages accurately from server
              fetchProductList();
            }
            return updated;
          });
        } else {
          // Rollback if server says failure
          fetchProductList();
          toast.error(data?.message || "Delete failed");
        }
      } catch (err) {
        console.log("err", err?.response);
        // Rollback optimistic update on error
        fetchProductList();
        toast.error("Something went wrong while removing product");
      }
    }
  };
  // -------------------------------------------------------------------------------------------------

  return (
    <div className="product-list">
      {loading && <p>Loading...</p>}

      <div className="list">
        <h3>All Products</h3>
        <div className="list-table">
          <div className="list-table-format title">
            <b>Image</b>
            <b>Name</b>
            <b>Category</b>
            <b>Price</b>
            <b>Edit</b>
            <b>Delete</b>
          </div>
          {productList &&
            productList.map((item) => (
              <div key={item._id} className="list-table-format">
                <img src={item.image?.url} alt={item.name} />
                <p>{item.name}</p>
                <p>{item.category}</p>
                <p>{item.price}</p>
                <p>
                  <Link to={`/admin/update-product/${item._id}`}>Edit</Link>
                </p>
                <p
                  className="cross-icon"
                  onClick={() => removeProduct(item._id)}
                >
                  Delete
                </p>
              </div>
            ))}
        </div>
      </div>

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default ProductList;
