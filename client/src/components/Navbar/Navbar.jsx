import './Navbar.css';
import { assets } from '../../assets/assets.js';
import { useContext} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import { UserContext } from '../../context/context.js';


const Navbar = ({setShowLogin}) => {
    
    // const [navmenu, setNavmenu] = useState("home")

    // const {token, setToken, cartTotalAmount, setCartItems } = useContext(StoreContext);

    const { token, setToken} = useContext(UserContext);

    const navigate = useNavigate();

    const logout = ()=>{
       localStorage.removeItem("token");
       setToken("")
       navigate("/")
    }

  return (
    <div className='navbar'>

        <div className='navbar__logo'>
            <Link to="/" className='logo'>EcomCart</Link>
        </div>

        <div className="navbar-right">
            {/* <img src={assets.search_icon} alt="" /> */}
            <div className="navbar-search-icon">
                <Link to="/cart"><img src={assets.basket_icon} alt="" /></Link>
                {/* <div className={cartTotalAmount() > 0 ? "dot" : ""}></div> */}
            </div>
            {
                !token
                    ?   <button onClick={()=>setShowLogin(true)}>sign in</button>
                    :   <div className='navbar-profile'>
                            <img src={assets.profile_icon} alt="" className='profile-icon'/>
                            <ul className='navbar-profile-dropdown'>
                                <li onClick={()=>navigate('/my-orders')}><img src={assets.bag_icon} alt="" /><p>Orders</p></li>
                                <hr />
                                <li onClick={logout}><img src={assets.logout_icon} alt="" /><p>Logout</p></li>
                            </ul>
                        </div>
            }
        </div>

    </div>
  )
}

export default Navbar