import { Outlet } from 'react-router-dom'
import Navbar from '../../components/navbar/Navbar'
import Sidebar from '../../components/sidebar/Sidebar'
import './home.css'

function Home() {
  return (
    <div className='home'>

        <Navbar/>

        <div className='main-section'>

          <Sidebar/>

          <div className='main'>
            <Outlet/>
          </div>

        </div>
    </div>
  )
}

export default Home