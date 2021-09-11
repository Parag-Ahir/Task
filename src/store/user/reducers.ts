import { CustomerType, ADD_CUSTOMER } from "./types";
export const initialState = {
    customerList:[]
}

export const customerReducer = (state = initialState, action: CustomerType) => {
    switch (action.type) {
        case ADD_CUSTOMER.ADD_CUSTOMER:
            return {
                ...state,
                customerList:[...state.customerList,action.payload]
            }
         default:
        return state;
    }
}