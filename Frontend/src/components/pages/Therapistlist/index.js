import React, { useCallback, useState } from "react";
import { useGetAllTherapists } from "../../../hooks";
import "../../../styles/therapists.css";

const TherapistList = () => {
  const [therapists, isLoading] = useGetAllTherapists();
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [searchLoading, setSearchLoading] = useState(false);

  const handleSearch = useCallback(async () => {
    try {
      setSearchLoading(true);
      const response = await fetch(
        `https://awful-gown-foal.cyclic.app/api/user?specialty=${searchQuery}`
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
    <div className="therapist-list">
      <div className="therapist-list__search">
        <h1 className="therapist-list__title">Available Therapists</h1>
        <div>
          <input
            type="text"
            className="therapist-list__search-input"
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Filter by Specialty"
          />
          <button
            className="therapist-list__search-button"
            onClick={handleSearch}
          >
            Search
          </button>
        </div>
      </div>
      <section className="therapist-list__section">
        {searchResults.length > 0 || therapists.length > 0 ? (
          <table className="therapist-list__table">
            <thead className="therapist-list__table-head">
              <tr>
                <th>Name</th>
                <th>Specialty</th>
                <th>Country</th>
              </tr>
            </thead>
            <tbody therapist-list__table-body>
              {searchResults.length > 0
                ? searchResults.map((therapist) => (
                    <tr key={therapist._id} className="therapist-list__item">
                      <td>
                        {therapist.first_name} {therapist.last_name}
                      </td>
                      <td>{therapist.specialty}</td>
                      
                      <td>{therapist.country}</td>
                    </tr>
                  ))
                : therapists.map((therapist) => (
                    <tr key={therapist._id} className="therapist-list__item">
                      <td>
                        {therapist.first_name} {therapist.last_name}
                      </td>
                      <td>{therapist.specialty}</td>
                   
                      <td>{therapist.country}</td>
                    </tr>
                  ))}
            </tbody>
          </table>
        ) : (
          <p className="therapist-list__empty">No therapists available</p>
        )}
        {(isLoading || searchLoading) && (
          <p className="therapist-list__loading">Loading...</p>
        )}
      </section>
    </div>
  );
};

export default TherapistList;
