import { Link } from 'react-router-dom';
import main from '../assets/images/main.svg';
import Wrapper from '../assets/wrappers/LandingPage';

import { Logo } from '../components';

const Landing = () => {
  return (
    <Wrapper>
      <nav>
        <Logo />
      </nav>
      <div className="container page">
        <div className="info">
          <h1>
            Job <span>Tracking</span> App
          </h1>
          <p>
            Ipsum bushwick pickled tumeric humblebrag fam. Quis roof party est
            cloud bread you probably haven't heard of them health goth etsy
            lo-fi lorem snackwave hexagon pitchfork. Twee shabby chic marfa id
            gochujang lomo. Occaecat consequat ea, et reprehenderit dolore
            hexagon swag sustainable jianbing.
          </p>
          <Link to="/register" className="btn btn-hero">
            Login/Register
          </Link>
        </div>
        <div className="main-img">
          <img src={main} alt="job hunt" className="img" />
        </div>
      </div>
    </Wrapper>
  );
};

export default Landing;
