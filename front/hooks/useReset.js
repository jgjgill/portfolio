import { useEffect } from 'react';

export default (resetValue, setResetValue) => {
  useEffect(() => {
    if (resetValue) {
      setResetValue('');
    }
  }, [resetValue]);
};
