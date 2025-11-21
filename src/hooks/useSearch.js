import { useState,  useMemo } from "react"
import discountsData from '../data/discounts.json';

export const useSearch = () => {
    const [discounts] = useState(discountsData);
    const [searchQuery, setSearchQuery] = useState('');

    // ✅ Calculate isSearching directly from searchQuery (no extra state needed)
    const isSearching = searchQuery.trim() !== '';

    // ✅ Use useMemo instead of useEffect to avoid cascading renders
    const filteredDiscounts = useMemo(() => {
        if (!isSearching) {
            return discounts;
        }

        const query = searchQuery.toLowerCase();
        
        return discounts.filter(discount => (
            discount.name.toLowerCase().includes(query) ||
            discount.category.toLowerCase().includes(query) ||
            discount.description.toLowerCase().includes(query) ||
            discount.discount.toLowerCase().includes(query)
        ));
    }, [searchQuery, discounts, isSearching]);

    const handleSearchChange = (query) => {
        setSearchQuery(query);
    };

    const handleSearchClear = () => {
        setSearchQuery('');
    };

    return {
        searchQuery,
        filteredDiscounts,
        isSearching,
        resultsCount: filteredDiscounts.length,
        handleSearchChange,
        handleSearchClear,
        allDiscounts: discounts
    };
};