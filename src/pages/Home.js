import React, {useContext, useEffect, useState} from 'react';
import Categories from "../components/Categories";
import Sort from "../components/Sort";
import Skeleton from "../components/PizzaBlock/Skeleton";
import PizzaBlock from "../components/PizzaBlock/PizzaBlock";
import Pagination from "../components/Pagination/Pagination";
import {Context} from "../App";
import {useDispatch, useSelector} from "react-redux";
import {setCategoryId, setCurrentPage} from "../components/redux/slices/filterSlice";
import axios from "axios";


function Home() {
    const {searchValue} = useContext(Context)
    const [items, setItems] = useState([])
    const [loading, setLoading] = useState(true)
    const { categoryId, sort, currentPage } = useSelector( state => state.filter);

    const dispatch = useDispatch();
    const onClickCategory = (id) => {
        dispatch(setCategoryId(id))
    };
    const onChangePage = (number) => {
        dispatch(setCurrentPage(number));
    };

    useEffect(() => {

        setLoading(true)
        const category = categoryId > 0 ? `category=${categoryId}` : '';
        const order = sort.sortProperty.includes('-') ? 'asc' : 'desc';
        const sortBy = sort.sortProperty.replace('-', '');
        const search = searchValue ? `&search=${searchValue}` : '';

        // // window.scrollTo(0, 0)
        axios.get(`https://63dffffc59bccf35dabd934d.mockapi.io/pizza-items?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}${search}`)
            .then( responce => {
                setItems(responce.data)
                setLoading(false)
            })
    }, [categoryId,  sort.sortProperty, searchValue, currentPage])

    const pizzas = items.map((item, index) => (
        <PizzaBlock
            key={index}
            {...item}
        />
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
            <div className="content__items">
                {loading ? skeletons : pizzas
                }
            </div>
            <Pagination currentPage={currentPage} onChangePage={ onChangePage } />
        </div>
    );
}

export default Home;