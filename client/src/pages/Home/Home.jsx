
import "./home.css";
import { useEffect } from "react";
import ProductDisplay from "../../components/productDisplay/ProductDisplay";

const Home = () => {

  // when this page is refreshed, it start from top
  useEffect(()=>{
    window.scrollTo(0,0)
  },[])

  return (
    <div>
      <ProductDisplay/>
    </div>
  );
};

export default Home;
