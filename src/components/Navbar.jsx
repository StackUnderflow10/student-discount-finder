import { useState, useEffect, useRef } from "react"
import { Link, useLocation } from "react-router-dom"
import { navLinks } from "../constants"

const Navbar = ({ searchQuery, onSearchChange, onSearchClear }) => {
  const [scrolled, setScrolled] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const location = useLocation()
  const inputRef = useRef(null)

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10
      setScrolled(prev => (prev !== isScrolled ? isScrolled : prev))
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Auto-focus input when opened
  useEffect(() => {
    if (searchOpen && inputRef.current) {
      inputRef.current.focus()
    }
  }, [searchOpen])

  const handleSearchToggle = () => {
    if (searchOpen) {
      onSearchClear()
    }
    setSearchOpen(!searchOpen)
  }

  const handleInputChange = (e) => {
    onSearchChange(e.target.value)
  }

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen)
  }

  const isActive = (path) => location.pathname === path

  return (
    <header 
      className={`navbar ${scrolled ? "scrolled" : "not-scrolled"}`}
      style={{ 
        transform: 'translate3d(0, 0, 0)', 
        backfaceVisibility: 'hidden',
        WebkitFontSmoothing: 'antialiased' 
      }}
    >
      <div className="inner relative flex items-center justify-between">
        <Link className="logo" to="/">
          Find Discounts!
        </Link>

        <nav className="desktop">
          <ul className="flex items-center gap-6">
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

        {/* UNIFIED SEARCH CONTAINER */}
        <div 
          className={`flex items-center transition-all duration-300 ease-in-out overflow-hidden h-10 rounded-md
            ${searchOpen 
              ? "w-64 bg-white border border-gray-300 shadow-sm cursor-default" // cursor-default ensures Arrow cursor when open
              : "w-24 bg-transparent border border-transparent cursor-pointer hover:opacity-80" // cursor-pointer (Hand) when closed
            }`}
          onClick={() => !searchOpen && setSearchOpen(true)}
        >
          {/* Search Icon */}
          <div className="pl-2 pr-1 flex items-center justify-center text-gray-700">
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
              >
                <circle cx="11" cy="11" r="8"></circle>
                <path d="m21 21-4.35-4.35"></path>
              </svg>
          </div>

          {/* Input Field */}
          <input
            ref={inputRef}
            type="text"
            value={searchQuery}
            onChange={handleInputChange}
            placeholder="Search..."
            // cursor-text ensures I-beam only on input
            className={`bg-transparent outline-none h-full text-sm text-black transition-all duration-300 cursor-text
              ${searchOpen ? "w-full opacity-100 pl-1" : "w-0 opacity-0 p-0"}`}
          />

          {/* "Search" Text - Visible when closed */}
          <span 
            className={`font-medium text-gray-700 whitespace-nowrap transition-all duration-300
              ${searchOpen ? "w-0 opacity-0 overflow-hidden" : "w-auto opacity-100"}`}
          >
            Search
          </span>

          {/* Close Button */}
          <button 
            type="button" 
            onClick={(e) => {
              e.stopPropagation()
              handleSearchToggle()
            }}
            className={`flex items-center justify-center h-full hover:text-red-500 bg-transparent transition-all duration-300 cursor-pointer
              ${searchOpen ? "w-8 opacity-100" : "w-0 opacity-0 overflow-hidden"}`}
          >
            ✕
          </button>
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