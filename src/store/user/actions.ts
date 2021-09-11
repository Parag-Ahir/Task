import {
    ADD_CUSTOMER, AddCustomerAction, AddCustomerRequest
} from './types';

export const addCustomer = (customer: AddCustomerRequest): AddCustomerAction => {
    return {
        type: ADD_CUSTOMER.ADD_CUSTOMER,
        payload: customer
    };
}