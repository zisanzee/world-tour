import { useEffect, useState } from "react";
import Country from "./Country";

const Countries = () => {
  const [countries, setCountries] = useState([]);
  const [showCountries, setShowCountries] = useState([]);
  const [visited, setVisited] = useState(() => {
    const savedVisited = localStorage.getItem("visited");
    return savedVisited ? JSON.parse(savedVisited) : [];
  });
  const [showVisited, setShowVisited] = useState(false);

  useEffect(() => {
    fetch("https://restcountries.com/v3.1/all")
      .then((res) => res.json())
      .then((data) => {
        setCountries(data);
        setShowCountries(data);
      });
  }, []);

  const handleMarked = (country) => {
    if(!visited.some(vis => vis.cca3 === country.cca3)){
      const newVisited = [country,...visited];
      setVisited(newVisited);
      localStorage.setItem('visited', JSON.stringify(newVisited));
    }
  };

  const deleteMarked = (country) => {
    const newVisited = visited.filter((coun) => country != coun);
    setVisited(newVisited);
    localStorage.setItem("visited", JSON.stringify(newVisited));
  };
  const search = (el) => {
    let searchFor = el.target.value;
    console.log(searchFor);
    if (el.key === "Backspace") {
      setShowCountries(
        countries.filter((count) =>
          count.name.common.toLowerCase().includes(searchFor.toLowerCase())
        )
      );
    }
    setShowCountries(
      countries.filter((count) =>
        count.name.common.toLowerCase().includes(searchFor.toLowerCase())
      )
    );
  };

  return (
    <div>
      <div>
        <div
          style={{
            display: "flex",
            width: "350px",
            margin: "auto",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <h3>Countries Visited: {visited.length}</h3>
          <button style={{backgroundColor: "rgb(154, 77, 21)", color:'white'}} onClick={() => setShowVisited(!showVisited)}>
            {showVisited ? "close" : "open"}
          </button>
        </div>
        {showVisited && (
          <ul className="visited">
            {visited.length > 0 ? (
              visited.map((coun) => (
                <li key={coun.cca3}>
                  {coun.name?.common}{" "}
                  <button onClick={() => deleteMarked(coun)}>X</button>
                </li>
              ))
            ) : (
              <h3>Nothing to show</h3>
            )}
          </ul>
        )}
      </div>
      <h3>countries:</h3>
      <div>
        <input
          onChange={search}
          placeholder="search by name"
          style={{ padding: "20px 30px", width: "400px" }}
          type="text"
        />
      </div>
      {showCountries.map((country) => (
        <Country
        didVisit={visited.some(vis => vis.cca3 === country.cca3)}
        handleMarked={handleMarked}
        key={country.cca3}
        country={country}
      />
      ))}
    </div>
  );
};

export default Countries;
