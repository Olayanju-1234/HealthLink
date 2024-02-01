import React, { useCallback, useState } from "react";
import { useGetAllTherapists } from "../../../hooks";

const TherapistList = () => {
  const [therapists, isLoading] = useGetAllTherapists();
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [searchLoading, setSearchLoading] = useState(false);

  const handleSearch = useCallback(async () => {
    try {
      setSearchLoading(true);
      const response = await fetch(
        `https://awful-gown-foal.cyclic.app/api/user?first_name=${searchQuery}`
      );

      if (!response.ok) {
        throw new Error(
          `Failed to fetch search results: ${response.statusText}`
        );
      }

      const searchResultsData = await response.json();
      setSearchResults(searchResultsData.data);
    } catch (error) {
      console.error(error);
    } finally {
      setSearchLoading(false);
    }
  }, [searchQuery]);

  return (
    <div>
      <section>
        <h1>See all our therapists</h1>
        <ul>
          {searchResults.length > 0 ? (
            searchResults.map((therapist) => (
              <li key={therapist._id}>
                {therapist.first_name} {therapist.last_name}
              </li>
            ))
          ) : therapists ? (
            therapists.map((therapist) => (
              <li key={therapist._id}>
                {therapist.first_name} {therapist.last_name}
              </li>
            ))
          ) : (
            <p>No therapists available</p>
          )}
          {(isLoading || searchLoading) && <p>Loading...</p>}
        </ul>
      </section>

      <div>
        <input type="text" onChange={(e) => setSearchQuery(e.target.value)} />
        <button onClick={handleSearch}>Search</button>
      </div>
    </div>
  );
};

export default TherapistList;
