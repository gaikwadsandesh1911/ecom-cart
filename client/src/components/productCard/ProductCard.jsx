import { useContext} from 'react'
import { assets } from '../../assets/assets'
import './productCard.css'
import { StoreContext } from '../../context/StoreContext';
import LazyLoadImageComponent from '../LazyLoadImage/LazyLoadImageComponent';


// eslint-disable-next-line react/prop-types
const ProductCard = ({itemId, image, name, price, description}) => {
    
    const {cartItems, addToCart, removeFromCart} = useContext(StoreContext);

    return (
    <div className='product-card'>

        <div className="product-card-img-container">
            {/* <img className='food-card-img' src={image} alt="" /> */}
            <LazyLoadImageComponent src={image} alt={name} className='product-card-img' />
            {
                
                !cartItems[itemId]
                 ? <img className='add-icon' onClick={()=>addToCart(itemId)} src={assets.add_icon_white}/>
                 : <div className="product-item-counter">
                        <img className='remove-icon' src={assets.remove_icon_red} onClick={()=>removeFromCart(itemId)}/>
                        <p>{cartItems[itemId]}</p>
                        <img src={assets.add_icon_green} alt="" onClick={()=>addToCart(itemId)} />
                   </div>
            }
        </div>

        <div className="product-item-info">
            <div className="product-name-rating">
                <p>{name}</p>
            </div>
            <p className="product-item-desc">{description}</p>
            <p className="product-item-price">${price}</p>
        </div>

    </div>
  )
}

export default ProductCard;