import Hero from "./components/Hero"
import LogoSection from "./components/LogoSection"
import Navbar from "./components/Navbar"
import SearchResults from "./components/SearchResults"
import { useSearch } from "./hooks/useSearch"

const App = () => {
  const searchState = useSearch();
  console.log('🔍 Search State:', searchState);

  return (
    <>
      <Navbar 
        searchQuery={searchState.searchQuery}
        onSearchChange={searchState.handleSearchChange}
        onSearchClear={searchState.handleSearchClear}
      />
      
      {searchState.isSearching ? (
        <SearchResults searchState={searchState} />
      ) : (
        <>
          <Hero />
          <LogoSection />
        </>
      )}
    </>
  )
}

export default App