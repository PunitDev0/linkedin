import { useState, useCallback } from "react";
import axios from "axios";

const useFetchUserData = () => {
  const [userData, setUserData] = useState({});
  const [message, setMessage] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchUserData = useCallback(async (username) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(`/api/user/${username}`);
      setUserData(response.data);
      setMessage(response.data.message);
      // console.log(response);
    } catch (err) {
      console.error(err);
      setError(err);
    } finally {
      setLoading(false);
    }
  }, []);

  return { userData, message, error, loading, fetchUserData };
};

export default useFetchUserData;
