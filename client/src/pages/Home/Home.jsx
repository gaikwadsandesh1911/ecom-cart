/* eslint-disable no-unused-vars */

import "./home.css";
import { useEffect, useState } from "react";
import ProductDisplay from "../../components/productDisplay/ProductDisplay";

const categories = [
  "All",
  "Earbuds",
  "Headphones",
  "Mobiles",
  "Laptops",
  "Powerbanks",
  "Smartwatches",
  "Cameras",
  "Tablets",
  "Mouses",
  "Keyboards"
];

const Home = () => {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [sort, setSort] = useState("");

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="home">

      <div className="filters">

        {/* <input
          type="text"
          placeholder="Search products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        /> */}

        <div className="category-list">
          {categories.map((item) => (
            <button
              key={item}
              className={category === item ? "active" : ""}
              onClick={() => setCategory(item === "All" ? "" : item)}
            >
              {item}
            </button>
          ))}
        </div>

        {/* <select value={sort} onChange={(e) => setSort(e.target.value)}>
          <option value="">Latest</option>

          <option value="price_asc">Price Low → High</option>

          <option value="price_desc">Price High → Low</option>
        </select> */}

      </div>

      <ProductDisplay search={search} category={category} sort={sort} />
    </div>
  );
};

export default Home;
