import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import Sort from "../../Sort";

type Sort = {
    name: string;
    sortProperty: 'rating' | 'title' | 'price' |  '-rating' | '-title' | '-price';
}

interface FilterSliceState {
    searchValue: string;
    categoryId: number;
    currentPage: number;
    sort: Sort;
}

const initialState:FilterSliceState = {
    searchValue: '',
    categoryId: 0,
    currentPage: 1,
    sort: {
        name: 'популярности',
        sortProperty: 'rating'
    }
}

export const filterSlice = createSlice({
    name: 'filter',
    initialState: initialState,
    reducers: {
        setCategoryId (state, action: PayloadAction<number>) {
            state.categoryId = action.payload
        },
        setSearchValue (state, action: PayloadAction<string>) {
            state.searchValue = action.payload
        },
        setSort(state, action: PayloadAction<Sort>) {
            state.sort = action.payload
        },
        setCurrentPage(state, action: PayloadAction<number>) {
            state.currentPage = action.payload
        }

    },
})

export const { setCategoryId, setSort, setCurrentPage, setSearchValue } = filterSlice.actions

export default filterSlice.reducer