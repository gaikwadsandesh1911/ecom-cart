import { assets } from "../../assets/assets";
import { useState } from "react";
import "./addProduct.css";
import { toast } from "react-toastify";
import { axiosInstance } from "../../api/axiosInstance";
import { useNavigate } from "react-router-dom";

const AddProduct = () => {
  const navigate = useNavigate();

  const [imageFile, setImageFile] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    stock: "",
    discount: "",
  });

  // -----------------------------------------------------------------------------------------------------------------

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // -----------------------------------------------------------------------------------------------------------------

  // server loading state
  const [loading, setLoading] = useState(false);

  // form validation errors
  const [errors, setErrors] = useState({});

  const formValidation = () => {
    let newErrors = {};

    if (!imageFile) {
      newErrors.imageFile = "Please choose an image file to upload";
    }

    if (formData["name"].trim().length < 4) {
      newErrors.name = "Name should be at least four char long";
    }

    if (formData["description"].trim().length < 10) {
      newErrors.description = "Description should be at least ten char long";
    }

    setErrors(newErrors);
    // console.log('errors', errors)

    return Object.keys(newErrors).length === 0;
  };

  // -----------------------------------------------------------------------------------------------------------------

  const handleSubmit = async (e) => {
    e.preventDefault();

    const isValid = formValidation();

    if (isValid) {
      try {
        setLoading(true);
        const data = new FormData();
        data.append("name", formData.name);
        data.append("description", formData.description);
        data.append("category", formData.category);
        data.append("price", Number(formData.price));
        data.append("stock", Number(formData.stock));
        data.append("discount", Number(formData.discount));
        data.append("image", imageFile);

        const res = await axiosInstance.post(`/api/product/add-product`, data);
        console.log("add-product-res =>", res);

        if (res.data.success) {
          toast.success(res.data.message);
          navigate("/admin/product-list");
        }

        // reset form after success
        setFormData({
          name: "",
          description: "",
          price: "",
          category: "",
          stock: "",
          discount: "",
        });
        setImageFile(null);
      } catch (error) {
        console.log("product create error =>", error);
        toast.error(error?.response?.data?.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className="add-product">
      <form onSubmit={handleSubmit}>
        <div className="add-img-upload flex-col">
          <p>Upload Image</p>
          <label htmlFor="image">
            <img
              src={
                imageFile ? URL.createObjectURL(imageFile) : assets.upload_area
              }
              alt=""
            />
          </label>
          <input
            type="file"
            name="image"
            accept="image/*"
            onChange={(e) => setImageFile(e.target.files[0])}
            id="image"
            hidden
          />
        </div>
        {errors.imageFile && <span className="error">{errors.imageFile}</span>}

        <div className="add-product-name flex-col">
          <p>Product Name</p>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="type here"
            autoComplete="off"
            required
          />
        </div>
        {errors.name && <span className="error">{errors.name}</span>}

        <div className="add-product-description flex-col">
          <p>Product Description</p>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows="5"
            placeholder="Write description here"
            autoComplete="off"
            required
          ></textarea>
        </div>
        {errors.description && (
          <span className="error">{errors.description}</span>
        )}

        <div className="add-category flex-col">
          <p>Product category</p>
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            required
          >
            <option value="" hidden readOnly>
              select category
            </option>
            <option value="Phone">Phone</option>
            <option value="Laptop">Laptop</option>
            <option value="HeadPhone">HeadPhone</option>
            <option value="EarBuds">EarBuds</option>
          </select>
        </div>

        <div className="add-price flex-col">
          <p>Product price</p>
          <input
            type="number"
            min={10}
            name="price"
            value={formData.price}
            onChange={handleChange}
            placeholder="$20"
            autoComplete="off"
            required
          />
        </div>

        <div className="add-discount flex-col">
          <p>Discount percentage</p>
          <input
            type="number"
            name="discount"
            value={formData.discount}
            onChange={handleChange}
            placeholder="add discount in %"
            autoComplete="off"
            required
          />
        </div>

        <div className="add-stock flex-col">
          <p>Product stock</p>
          <input
            type="number"
            name="stock"
            value={formData.stock}
            onChange={handleChange}
            placeholder="add stock"
            autoComplete="off"
            required
          />
        </div>

        <button type="submit" className="add-btn" disabled={loading}>
          {loading ? "Adding..." : "Add"}
        </button>
      </form>
    </div>
  );
};

export default AddProduct;
