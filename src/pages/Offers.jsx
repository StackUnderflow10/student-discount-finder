import React, {useMemo, useState} from 'react';
import { useLocation } from 'react-router-dom';
import discountsData from '../data/discounts.json';

const Offers = () => {
    const [sortBy, setSortBy] = useState('name');

    const location = useLocation()
    const queryParams = new URLSearchParams(location.search)
    const selectedCategory = queryParams.get('category')

    const filteredDiscounts = useMemo(() => {
        if(!selectedCategory) return discountsData;
        return discountsData.filter(item => 
            item.category.toLowerCase() === selectedCategory.toLowerCase()
        )
    },[selectedCategory])
    //sort discounts section
    const sortedDiscounts = useMemo(() => {
        return[...filteredDiscounts].sort((a,b) => {
            if(sortBy === 'name'){
                return a.name.localeCompare(b.name)
            }
            else if(sortBy === 'category'){
                return a.category.localeCompare(b.category)
            }
            return 0
        },[filteredDiscounts,sortBy])
    })
  return (
   <div className='offers-page'>
            <div className='offers-header'>
                <div className='container'>
                    {/* Dynamic Title based on selection */}
                    <h1>{selectedCategory ? `${selectedCategory} Offers` : 'All Student Offers'}</h1>
                    <p>Browse through {filteredDiscounts.length} amazing student discounts</p>

                    <div className='sort-controls'>
                        <label>Sort by:</label>
                        <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
                            <option value="name">Name (A-Z)</option>
                            <option value="category">Category</option>
                        </select>
                    </div>
                </div>
            </div>
            <div className='container'>
                <div className='discount-grid'>
                    {sortedDiscounts.map((discount) => (
                        <div key={discount.id} className='discount-card'>
                            <div className='card-content'>
                                <div className='discount-header'>
                                    <h3>{discount.name}</h3>
                                    <span className='discount-badge'>{discount.discount}</span>
                                </div>
                                <div className='discount-meta'>
                                    <span className='category-tag'>{discount.category}</span>
                                    <span className='location-tag'>{discount.location}</span>
                                </div>
                                <p className='description'>{discount.description}</p>
                                <div className='discount-footer'>
                                    <div className='verification-section'>
                                        {discount.verification === 'yes' && (
                                            <span className='verification-badge verified'>✓ Verification Required</span>
                                        )}
                                        {discount.verification === 'optional' && (
                                            <span className='verification-badge optional'>ⓘ Optional</span>
                                        )}
                                        {discount.verification === 'no' && (
                                            <span className="verification-badge no-verification">No Verification</span>
                                        )}
                                    </div>
                                    <a href={discount.link} target="_blank" rel="noopener noreferrer" className='claim-btn'>
                                        Claim Offer →
                                    </a>
                                </div>
                            </div>
                        </div>
                    ))}
                    {sortedDiscounts.length === 0 && (
                        <div className="no-results">No offers found for this category.</div>
                    )}
                </div>
            </div>
        </div>
    
  )
}

export default Offers