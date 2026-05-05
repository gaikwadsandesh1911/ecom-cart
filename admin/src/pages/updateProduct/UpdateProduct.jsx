import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import "./updateProduct.css";
import { axiosInstance } from "../../api/axiosInstance";
import { toast } from "react-toastify";

const UpdateProduct = () => {

  const { id } = useParams();

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    price: "",
    stock: ""
  });

  const [imagePreview, setImagePreview] = useState(null);

  const [newImage, setNewImage] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    // console.log('file', file)
    setNewImage(file);
    setImagePreview(URL.createObjectURL(file));
  };

  // form validation error
  const [errors, setErrors] = useState({});

  // ---------------------------------------------------------------------------

  useEffect(() => {
    const fetchSingleProduct = async () => {
      try {
        const { data } = await axiosInstance.get(
          `/api/product/single-product/${id}`,
        );
        // console.log("data", data);
        if (data.success) {
          setFormData({
            name: data?.product?.name,
            price: data?.product?.price,
            stock: data?.product?.stock
          });
          setImagePreview(data?.product?.image?.url);
        }
      } catch (error) {
        // console.log("error", error?.response?.data?.message);
        toast.error(error?.response?.data?.message);
      }
    };

    fetchSingleProduct();
  }, [id]);

  // ------------------------------------------------------------------------------

  const formValidation = () => {
    let newErrors = {};

    if (formData["name"].trim().length < 4) {
      newErrors.name = "Name should be at least four char long";
    }
    setErrors(newErrors);
    // console.log('errors', errors)

    return Object.keys(newErrors).length === 0;
  };

  // ---------------------------------------------------------------------------------------

  const data = new FormData();
  data.append("name", formData.name);
  data.append("price", formData.price);
  data.append("stock", formData.stock);
  data.append("image", newImage);

  const handleSubmit = (e) => {
    e.preventDefault();
    const isValid = formValidation();
    if (isValid) {
      axiosInstance
        .put(`/api/product/update-product/${id}`, data)
        .then((res) => {
            // console.log('updated product', res.data.message);
            toast.success(res.data?.message)
          navigate("/admin/product-list");
        })
        .catch((error) => {
          console.log("error", error?.response?.data?.message);
        });

      setFormData({
        name: "",
        price: "",
        stock: ""
      });
      setImagePreview(null);
      setNewImage(null);
    }
  };

  return (
    <div className="update-product">
      <form onSubmit={handleSubmit}>
        <div className="update-img-upload flex-col">
          <p>Upload Image</p>
          <label htmlFor="image">
            {imagePreview && <img src={imagePreview} alt="" />}
          </label>
          <input
            type="file"
            name="image"
            accept="image/*"
            onChange={handleImageChange}
            id="image"
            hidden
          />
        </div>

        <div className="update-name flex-col">
          <p>Product Name</p>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Type here..."
            autoComplete="off"
            required
          />
        </div>
        {errors.name && <span className="error">{errors.name}</span>}

        <div className="update-price flex-col">
          <p>Product price</p>
          <input
            type="number"
            min={10}
            name="price"
            value={formData.price}
            onChange={handleChange}
            placeholder=""
            autoComplete="off"
            required
          />
        </div>

        <div className="update-stock flex-col">
          <p>Update Stock</p>
          <input
            type="number"
            name="stock"
            value={formData.stock}
            onChange={handleChange}
            placeholder=""
            autoComplete="off"
            required
          />
        </div>

        <button type="submit" className="update-btn">
          Update
        </button>
      </form>
    </div>
  );
};

export default UpdateProduct;
