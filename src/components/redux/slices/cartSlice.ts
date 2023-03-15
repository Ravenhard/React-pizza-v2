import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {RootState} from "../store";
import {getCartFromLS} from "../../utils/getCartFromLS";
import {calcTotalPrice} from "../../utils/calcTotalPrice";

export type CartItem = {
    id: string;
    name: string;
    price: number;
    imageUrl: string;
    type: string;
    size: number;
    count: number
}

export interface CartSliceState {
    totalPrice: number,
    items: CartItem[],
}

// @ts-expect-error
const initialState: CartSliceState = getCartFromLS();


export const cartSlice = createSlice({
    name: 'cart',
    initialState: initialState,
    reducers: {
        addItem(state, action: PayloadAction<CartItem>) {
            const findItem = state.items.find(obj => obj.id === action.payload.id);

            if (findItem) {
                findItem.count++;
            } else {
                state.items.push({
                    ...action.payload,
                    count: 1,
                })
            }
            state.totalPrice = calcTotalPrice(state.items);
        },
        minusItem(state, action) {
            const findItem = state.items.find((obj)=> obj.id === action.payload.id);
            if(findItem){
                findItem.count--;
            }
        },
        removeItem(state, action) {
            state.items = state.items.filter(obj => obj.id !== action.payload.id)
        },
        clearItem(state) {
            state.items = []
            state.totalPrice = 0;
        }

    },
})

export const getCart = (state: RootState) => state.cart;

export const {addItem, removeItem, clearItem, minusItem} = cartSlice.actions

export default cartSlice.reducer