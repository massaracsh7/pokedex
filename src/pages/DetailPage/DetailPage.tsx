import DetailInfo from '@/components/DetailInfo';
import { RootState } from '@/redux/store';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';

const DetailPage: React.FC = () => {
  const params = useParams();
  const detailName = params.name ?? '';
  const data = useSelector(
    (state: RootState) => state.pokemonReducer.pokemonDetails[detailName],
  );
  const navigation = useNavigate();
  const goBack = () => {
    navigation('/', { replace: true });
  };
  return (
    <div>
      <button onClick={goBack}>Catalog</button>
      <DetailInfo pokemon={data} />
    </div>
  );
};

export default DetailPage;
