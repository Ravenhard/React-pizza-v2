import React, {useState} from 'react';

function Categories({categoryId, onClickCategory}) {
    const categories = [
        'Все', 'Мясные', 'Вегетарианская', 'Гриль', 'Острые', 'Закрытые'
    ]

    return (
        <div className="categories">
            <ul>
                {
                    categories.map( (item, index) => <li
                        key={index}
                        onClick={ ()=>onClickCategory(index) }
                        className={ categoryId === index ? 'active' : '' }
                    >{item}</li> )
                }
            </ul>
        </div>
    );
}

export default Categories;