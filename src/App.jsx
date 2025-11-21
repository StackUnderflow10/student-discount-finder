import { BrowserRouter as Router,Routes,Route } from "react-router-dom"
import Navbar from "./components/Navbar"
import SearchResults from "./components/SearchResults"
import { useSearch } from "./hooks/useSearch"
import Home from "./pages/Home"
import Offers from "./pages/Offers"
import Categories from "./pages/Categories"


const App = () => {
  const searchState = useSearch();
  console.log('🔍 Search State:', searchState);

  return (
    <Router>
      <div className="app">
        <Navbar 
          searchQuery={searchState.searchQuery}
          onSearchChange={searchState.handleSearchChange}
          onSearchClear={searchState.handleSearchClear}
        />
        {searchState.isSearching ? (
          <SearchResults searchState={searchState} />
        ):(
          <Routes>
            <Route path="/" element={<Home />} /> 
            <Route path="/offers" element={<Offers />} /> 
            <Route path="/categories" element={<Categories />} /> 
          </Routes>
        )}
      </div>
    </Router>
  )
}

export default App