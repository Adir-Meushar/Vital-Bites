import { useContext, useEffect } from "react"
import { GeneralContext } from "../../App"
import './search-bar.css'
import { useLocation } from "react-router-dom";

function SearchBar() {
    const{searchQuery,setSearchQuery}=useContext(GeneralContext)
    const location = useLocation();

    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value.toLowerCase());
    };
    useEffect(() => {
        setSearchQuery("");
    }, [location.pathname, setSearchQuery]);

    return (
       <div className="search-bar-container">
            <input
                type="text"
                placeholder="Search recipes..."
                value={searchQuery}
                onChange={handleSearchChange}
                className="search-bar"
            />
        </div>
    )
}

export default SearchBar
