import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar/Navbar';
import Footer from '../components/Footer/Footer';
import { useEffect } from 'react';
import Container from '../ui/Container';
import ProtectedRoute from './ProtectedRoute';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowCircleLeft } from '@fortawesome/free-solid-svg-icons';

function AppLayout() {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <div>
      <Navbar />
      <button
        onClick={() => navigate(-1)}
        className=" z-50  text-[20px] absolute top-[60px]  left-2   cursor-pointer  "
      >
        <FontAwesomeIcon icon={faArrowCircleLeft} />
      </button>
      <Container>
        <Outlet />
      </Container>
      <Footer />
    </div>
  );
}

export default AppLayout;
