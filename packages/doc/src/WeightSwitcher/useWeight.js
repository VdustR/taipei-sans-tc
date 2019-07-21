import { useContext } from 'react';
import Context from './Context';

const useWeight = () => {
  const { weight } = useContext(Context);
  return weight;
};

export default useWeight;
