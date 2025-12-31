import { useState, useEffect } from "react"
import { Link, useLocation } from "react-router-dom"
import { navLinks } from "../constants"

const Navbar = ({ searchQuery, onSearchChange, onSearchClear }) => {
  const [scrolled, setScrolled] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10
      setScrolled(isScrolled)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const handleSearchToggle = () => {
    setSearchOpen(!searchOpen)
    if (searchOpen) {
      onSearchClear()
    }
  }

  const handleSearchSubmit = (e) => {
    e.preventDefault()
    console.log("Searching for:", searchQuery)
  }

  const handleInputChange = (e) => {
    onSearchChange(e.target.value)
  }

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen)
  }

  const isActive = (path) => location.pathname === path

  return (
    <header className={`navbar ${scrolled ? "scrolled" : "not-scrolled"}`}>
      <div className="inner">
        <Link className="logo" to="/">
          Find Discounts!
        </Link>

        <nav className="desktop">
          <ul>
            {navLinks.map(({ link, name }) => (
              <li key={name} className="group">
                <Link to={link} className={isActive(link) ? "active" : ""}>
                  <span>{name}</span>
                  <span className="underline" />
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="search-container">
          {searchOpen ? (
            <form onSubmit={handleSearchSubmit} className="search-form">
              <input
                type="text"
                value={searchQuery}
                onChange={handleInputChange}
                placeholder="Search Offers...."
                autoFocus
                className="search-input"
              />
              <button type="button" onClick={handleSearchToggle} className="close-btn">
                ✕
              </button>
            </form>
          ) : (
            <button onClick={handleSearchToggle} className="search-btn">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="search-icon"
              >
                <circle cx="11" cy="11" r="8"></circle>
                <path d="m21 21-4.35-4.35"></path>
              </svg>
              <span className="search-text">Search</span>
            </button>
          )}
        </div>

        <button className="mobile-menu-btn" onClick={toggleMobileMenu}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            {mobileMenuOpen ? (
              <>
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </>
            ) : (
              <>
                <line x1="3" y1="12" x2="21" y2="12"></line>
                <line x1="3" y1="6" x2="21" y2="6"></line>
                <line x1="3" y1="18" x2="21" y2="18"></line>
              </>
            )}
          </svg>
        </button>
      </div>

      {mobileMenuOpen && (
        <nav className="mobile-menu">
          <ul>
            {navLinks.map(({ link, name }) => (
              <li key={name}>
                <Link to={link} onClick={() => setMobileMenuOpen(false)} className={isActive(link) ? "active" : ""}>
                  {name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  )
}

export default Navbar
