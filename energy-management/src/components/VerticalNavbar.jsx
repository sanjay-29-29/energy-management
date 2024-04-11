import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBolt, faHome, faDroplet } from '@fortawesome/free-solid-svg-icons';

const VerticalNavbar = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col bg-myblack  w-[4vh] items-center">
      <div className='pt-[60px]'>
        <button onClick={() => navigate('/')}><FontAwesomeIcon icon={faHome} color='white' size='1x' /></button>
      </div>
      <div className='py-6'>
        <button onClick={() => navigate('/energy')}><FontAwesomeIcon icon={faBolt} color='white' size='1x' /></button>
      </div>
      <div className=''>
        <button onClick={() => navigate('/water')}><FontAwesomeIcon icon={faDroplet} color='white' size='1x'/></button>
      </div>
    </div>
  );
}

export default VerticalNavbar;