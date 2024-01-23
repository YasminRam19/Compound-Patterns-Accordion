import { useRef, useState } from "react";

const SearchableList = ({ items, children, itemKeyFn }) => {
  //Search logic...
  const lastChange = useRef(); //to store the timer identifier that's returned by the setTimeout
  const [searchTerm, setSearchTerm] = useState("");

  const searchResults = items.filter((item) =>
    JSON.stringify(item).toLowerCase().includes(searchTerm.toLocaleLowerCase())
  );

  const handleChange = (e) => {
    if (lastChange.current) {
      clearTimeout(lastChange.current);
    }
    lastChange.current = setTimeout(() => {
      lastChange.current = null;
      setSearchTerm(e.target.value);
    }, 500);
  };

  return (
    <div className="searchable-list">
      <input type="search" placeholder="Search" onChange={handleChange} />
      <ul>
        {searchResults.map((item) => (
          <li key={itemKeyFn(item)}>{children(item)}</li>
        ))}
      </ul>
    </div>
  );
};

export default SearchableList;
