import { useCallback } from "react";

const useHttpRequest = () => {
  const sendRequest = useCallback(async (requestConfig) => {
    try {
      const response = await fetch(requestConfig.url, {
        method: requestConfig.method ? requestConfig.method : "GET",
        headers: requestConfig.headers ? requestConfig.headers : {},
        body: requestConfig.body ? requestConfig.body : null,
      });
      //"https://react-a64f7-default-rtdb.europe-west1.firebasedatabase.app/tasks.json"
      if (!response.ok) {
        throw new Error("Request failed!");
      }
      const HttpData = await response.json();
      return HttpData;
    } catch (err) {
      console.log(err);
      throw new Error("Something went wrong!");
    }
  }, []);
  return {
    sendRequest,
  };
};

export default useHttpRequest;
