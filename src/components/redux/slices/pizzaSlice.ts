import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import axios from "axios";

type PizzaArgs = Record<string, string>;

export const fetchPizzas = createAsyncThunk<PizzaItem[], PizzaArgs>(
    'pizza/fetchPizzasStatus',
    async (params) => {
        const { category, order, sortBy, search, currentPage } = params;
        const { data } = await axios.get <PizzaItem[]>(`https://63dffffc59bccf35dabd934d.mockapi.io/pizza-items?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}${search}`)
        return data
    }
)

type PizzaItem = {
    name: string,
    price: number,
    imageUrl: string,
    sizes: number[],
    types: number[],
    id: string;
    count: 0;
}
export enum Status {
    LOADING = 'loading',
    SUCCESS = 'completed',
    ERROR = 'error'
}
interface PizzaSliceState {
    items: PizzaItem[];
    status: Status;
}
const initialState: PizzaSliceState = {
    items: [],
    status: Status.LOADING,
}


export const pizzaSlice = createSlice({
    name: 'pizza',
    initialState,
    reducers: {
        setItems(state, action) {
            state.items = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchPizzas.pending, (state, action) => {
            state.status = Status.LOADING
            state.items = []
        });
        builder.addCase(fetchPizzas.fulfilled, (state, action) => {
            state.items = action.payload;
            state.status = Status.SUCCESS;
        });
        builder.addCase(fetchPizzas.rejected, (state, action) => {
            state.status = Status.ERROR;
            state.items = []
        });
    },
    // extraReducers:{
    //     [fetchPizzas.pending]: (state, action) => {
    //         state.status = 'loading'
    //         state.items = []
    //     },
    //     [fetchPizzas.fulfilled]: (state, action) => {
    //         state.items = action.payload;
    //         state.status = 'success'
    //     },
    //     [fetchPizzas.rejected]: (state, action) => {
    //         state.status = 'error'
    //         state.items = []
    //     }
    // }
})

export const { setItems } = pizzaSlice.actions

export default pizzaSlice.reducer