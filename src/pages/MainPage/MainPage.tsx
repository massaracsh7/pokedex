import CardsList from "@/components/CardsList";
import { useDispatch } from "react-redux";
import { RootState } from "@/redux/store";
import { useSelector } from "react-redux";
import { useFetchPokemons } from "@/redux/pokemonApi";
import { useEffect, useMemo } from "react";
import { setLoading, incrementOffset } from "@/redux/Slice";

const MainPage = () => {
  const dispatch = useDispatch();
  const { textError } = useSelector((state: RootState) => state.storeReducer);
  const { data, isLoading, error } = useFetchPokemons({ offset: 0, limit: 20 });

  useEffect(() => {
    dispatch(setLoading(isLoading));
  }, [dispatch, isLoading]);

  useEffect(() => {
    if (!isLoading && data) {
      dispatch(incrementOffset());
    }
  }, [data, isLoading, dispatch]);

  const viewPage = useMemo(() => {
    if (isLoading) return (<p>Loading...</p>);
    if (error) return <div>{textError}</div>;
    return <CardsList />;
  }, [error, isLoading, textError]);

  return (
    <>
      <div>MainPage</div>
      {viewPage}
    </>
  );
};

export default MainPage;
