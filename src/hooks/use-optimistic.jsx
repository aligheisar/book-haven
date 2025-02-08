import { useCallback, useEffect, useState } from "react";

let useOptimistic = (initialValue, handler) => {
  const [loading, setLoading] = useState(false);
  const [value, setValue] = useState(() =>
    typeof initialValue === "function" ? false : initialValue,
  );

  let initFunc = useCallback(async () => {
    if (typeof initialValue === "function") {
      setLoading(true);
      let result = await initialValue();

      setLoading(false);
      setValue(result);
    }
  }, [initialValue]);

  useEffect(() => {
    initFunc();
  }, [initFunc]);

  let changeValue = async (cbOrValue) => {
    if (loading) return;
    let prevValue = value;
    let newValue =
      typeof cbOrValue === "function" ? cbOrValue(prevValue) : cbOrValue;

    setValue(newValue);
    setLoading(true);

    try {
      let response = await handler(newValue);
      setValue(response);
    } catch (error) {
      setValue(prevValue);
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return [value, changeValue, loading];
};

export default useOptimistic;
