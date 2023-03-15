import React, {memo} from 'react';
import {useWhyDidYouUpdate} from "ahooks";

type CategoriesProps = {
    categoryId: number;
    onClickCategory: (index: number) => void;
};

const Categories: React.FC<CategoriesProps> = memo(({categoryId, onClickCategory}) => {
    const categories = [
        'Все', 'Мясные', 'Вегетарианская', 'Гриль', 'Острые', 'Закрытые'
    ]

    useWhyDidYouUpdate('Categories', {categoryId, onClickCategory})

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
})

export default Categories;