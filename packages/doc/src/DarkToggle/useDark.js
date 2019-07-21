import { useContext } from 'react';
import Context from './Context';

const useDark = () => {
  const context = useContext(Context);
  const { dark } = context;
  return dark;
};

export default useDark;
