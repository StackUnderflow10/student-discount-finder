"use client"

import { useState } from "react"
import Navbar from "../components/Navbar"
import Hero from "../components/Hero"
import LogoSection from "../components/LogoSection"

export default function Page() {
  const [searchQuery, setSearchQuery] = useState("")

  const handleSearchChange = (query) => {
    setSearchQuery(query)
  }

  const handleSearchClear = () => {
    setSearchQuery("")
  }

  return (
    <main>
      <Navbar 
        searchQuery={searchQuery} 
        onSearchChange={handleSearchChange} 
        onSearchClear={handleSearchClear} 
      />
      <Hero />
      <LogoSection />
    </main>
  )
}