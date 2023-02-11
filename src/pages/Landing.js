import { Link } from 'react-router-dom'
import main from '../assets/images/main.svg'
import Wrapper from '../assets/wrappers/LandingPage'
import { Logo } from '../components'

const Landing = () => {
    return (
        <Wrapper>
            <nav>
                <Logo />
            </nav>
            <div className="container page">
                <div className="info">
                    <h1>Job <span>tracking</span>App</h1>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Nam repellat debitis veniam officia magnam enim nostrum reiciendis vero! Vel, dignissimos?</p>
                    <Link to='/register' className='btn btn-hero'>login/signup</Link>
                </div>
                <img src={main} alt="main" className='img main-img' />
            </div>
        </Wrapper>
    )
}


export default Landing