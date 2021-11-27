import { useEffect } from 'react';

export const useReset = (resetValue, setResetValue) => {
  useEffect(() => {
    if (resetValue) {
      setResetValue('');
    }
  }, [resetValue]);
};

export default useReset;
