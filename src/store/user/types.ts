export enum ADD_CUSTOMER {
    ADD_CUSTOMER='ADD_CUSTOMER'
}
export interface AddCustomerRequest {
    id: any;
    customerName: string;
    email: string;
    phone: number;
    country: string;
    additionalInfo: string;
    pdfURL: any;
    fileName: any;
}

export interface AddCustomerResponse{
    customerList: any;
}

export interface AddCustomerAction {
    type: ADD_CUSTOMER.ADD_CUSTOMER,
    payload: AddCustomerRequest;
}

export type CustomerType = AddCustomerAction;