import React, {useEffect} from 'react';
import Categories from "../components/Categories";
import Sort from "../components/Sort";
import Skeleton from "../components/PizzaBlock/Skeleton";
import PizzaBlock from "../components/PizzaBlock/PizzaBlock";
import Pagination from "../components/Pagination/Pagination";
import {useDispatch, useSelector} from "react-redux";
import {setCategoryId, setCurrentPage} from "../components/redux/slices/filterSlice";
import {fetchPizzas} from "../components/redux/slices/pizzaSlice";
import {Link} from "react-router-dom";


function Home() {
    const {items, status} = useSelector((state:any) => state.pizza);
    const {categoryId, sort, currentPage, searchValue} = useSelector((state:any) => state.filter);

    const dispatch = useDispatch();
    const onClickCategory = (id: number) => {
        dispatch(setCategoryId(id))
    };
    const onChangePage = (page : number) => {
        dispatch(setCurrentPage(page));
    };

    useEffect(() => {

        const category = categoryId > 0 ? `category=${categoryId}` : '';
        const order = sort.sortProperty.includes('-') ? 'asc' : 'desc';
        const sortBy = sort.sortProperty.replace('-', '');
        const search = searchValue ? `&search=${searchValue}` : '';

        window.scrollTo(0, 0)

        dispatch(
            // @ts-ignore
            fetchPizzas({
            category,
            order,
            sortBy,
            search,
            currentPage
        }))


    }, [categoryId, sort.sortProperty, searchValue, currentPage])

    const pizzas = items.map((item: any, index: number) => (
        <Link key={index} to={`/pizza/${item.id}`}><
            PizzaBlock
            {...item}
            />
        </Link>
    ));
    const skeletons = [...new Array(8)].map((_, index) => <Skeleton
        key={index}/>);

    return (
        <div className="container">
            <div className="content__top">
                <Categories
                    categoryId={categoryId}
                    onClickCategory={onClickCategory}
                />
                <Sort/>
            </div>
            <h2 className="content__title">Все пиццы</h2>
            {
                status === 'error' ? <div className='content__error_info'>
                    <h2>Произошла ошибка 😕</h2>
                    <p>Не удалось получить питсы :(</p>
                </div> : <div className="content__items">
                    {status === 'loading' ? skeletons : pizzas
                    }
                </div>
            }
            <Pagination currentPage={currentPage} onChangePage={onChangePage}/>
        </div>
    );
}

export default Home;