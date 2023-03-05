import React from 'react';

type CategoriesProps = {
    categoryId: number;
    onClickCategory: any;
};

function Categories ({categoryId, onClickCategory}: CategoriesProps) {
    const categories = [
        'Все', 'Мясные', 'Вегетарианская', 'Гриль', 'Острые', 'Закрытые'
    ]

    return (
        <div className="categories">
            <ul>
                {
                    categories.map((item, index) => <li
                        key={index}
                        onClick={() => onClickCategory(index)}
                        className={categoryId === index ? 'active' : ''}
                    >{item}</li>)
                }
            </ul>
        </div>
    );
}

export default Categories;