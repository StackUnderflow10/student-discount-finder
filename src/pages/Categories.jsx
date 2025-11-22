import React, {useState} from 'react';
import { useNavigate  } from 'react-router-dom';
import discountsData from '../data/discounts.json'
import { MonitorCloud, Clapperboard, Pizza, MonitorSmartphone, PaintbrushVertical, ChartNoAxesCombined, BookText, Plane } from 'lucide-react';

const Categories = () => {

    const navigate = useNavigate();

    const categories = discountsData.reduce((acc, discount)=>{
        const cat = discount.category;

        if(!acc[cat]){
            acc[cat] = { name:cat, count:0, icon:getCategoryIcon(cat)};
        }
        acc[cat].count++;
        return acc;
    },{})

    const categoryList = Object.values(categories);

    function getCategoryIcon(category){
        const icons = {
      software: <MonitorCloud />,
      entertainment: <Clapperboard />,
      food: <Pizza />,
      electronics: <MonitorSmartphone />,
      design: <PaintbrushVertical />,
      productivity: <ChartNoAxesCombined />,
      education: <BookText />,
      travel: <Plane />
        }
        return icons[category] || '🎁';
    };

    const handleCategoryClick = (categoryName) => {
        navigate(`/offers?category=${categoryName}`);
    };

  return (
    <div className='categories-page'>
        <div className='categories-header'>
            <div className='container'>
                <h1>Browse by Category</h1>
                <p>Find the perfect discount for your need</p>
            </div>
        </div>
        <div className='container'>
            <div className='categories-grid'>
                {categoryList.map((category)=>(
                    <div
                        key={category.name}
                        className='category-card'
                        data-category={category.name}
                        onClick={()=> handleCategoryClick(category.name)}
                    >
                        <div className='category-icon'>{category.icon}</div>
                        <h3>{category.name}</h3>
                        <p className='category-count'>
                            {category.count} offer{category.count!==1?'s' : ''}
                        </p>
                        <button className='view-btn'>View All</button>
                    </div>
                ))}
            </div>
        </div>
    </div>
  )
}

export default Categories