import { useEffect, useState } from "react";

export const useGetAllTherapists = () => {
  const [therapists, setTherapists] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const handleFetchTherapists = async () => {
      try {
        const response = await fetch(
          "https://awful-gown-foal.cyclic.app/api/user/therapists"
        );
        const allTherapists = await response.json();
        setTherapists(allTherapists.data);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };

    handleFetchTherapists();
  }, []);

  return [therapists, isLoading];
};
