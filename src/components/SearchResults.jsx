import React from 'react'

const SearchResults = ({ searchState }) => {
    const { searchQuery, filteredDiscounts, resultsCount } = searchState;
    
    return (
        <section className='search-results-section'>
            <div className='container'>
                <div className='search-results-header'>
                    <h2>Search Results</h2>
                    <p>
                        Found <strong>{resultsCount}</strong> result
                        {resultsCount !== 1 ? 's' : ''} for 
                        <span className='search-query'> "{searchQuery}"</span>
                    </p>
                </div>

                {filteredDiscounts.length > 0 ? (
                    <div className='discount-grid'>
                        {filteredDiscounts.map((discount) => (
                            <div key={discount.id} className='discount-card'>
                                <div className='card-content'>
                                    <div className='discount-header'>
                                        <h3>{discount.name}</h3>
                                        <span className='discount-badge'>
                                            {discount.discount}
                                        </span>
                                    </div>
                                    
                                    <div className='discount-meta'>
                                        <span className='category-tag'>
                                            {discount.category}
                                        </span>
                                        <span className='location-tag'>
                                            📍 {discount.location}
                                        </span>
                                    </div>
                                    
                                    <p className='description'>
                                        {discount.description}
                                    </p>
                                    
                                    <div className='discount-footer'>
                                        <div className='verification-section'>
                                            {discount.verification === 'yes' && (
                                                <span className='verification-badge verified'>
                                                    ✓ Verification Required
                                                </span>
                                            )}
                                            {discount.verification === 'optional' && (
                                                <span className='verification-badge optional'>
                                                    ⓘ Optional
                                                </span>
                                            )}
                                            {discount.verification === 'no' && (
                                                <span className='verification-badge no-verification'>
                                                    No Verification
                                                </span>
                                            )}
                                        </div>
                                        
                                        <a
                                            href={discount.link}
                                            target="_blank"
                                            rel='noopener noreferrer'
                                            className='claim-btn'
                                        >
                                            Claim Offer →
                                        </a>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className='no-results'>
                        <div className='no-results-icon'>🔍</div>
                        <h3>No discounts found</h3>
                        <p>
                            We couldn't find any offers matching
                            <strong> "{searchQuery}"</strong>
                        </p>
                        <div className='suggestions'>
                            <p>Try searching for:</p>
                            <div className='suggestion-tags'>
                                <span className='tag'>software</span>
                                <span className='tag'>entertainment</span>
                                <span className='tag'>food</span>
                                <span className='tag'>electronics</span>
                                <span className='tag'>education</span>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </section>
    )
}

export default SearchResults;