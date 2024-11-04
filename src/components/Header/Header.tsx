import { Link } from 'react-router-dom';

const Header: React.FC = () => {
  return (
    <div>
      Header
      <Link to={`favorite/`}>Favorite</Link>
    </div>
  );
};

export default Header;
