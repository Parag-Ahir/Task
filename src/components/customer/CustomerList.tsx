import { useState } from 'react';
import { shallowEqual, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import CustomerDetail from './CustomerDetail';
import { Avatar } from '@material-ui/core';

const CustomerList = () => {
    const history = useHistory();
    const [selectedCustomer, setSelectedCustomer]:any = useState('');
    const customerList = useSelector((state: any) => state.customerList.customerList, shallowEqual);

    return (
        <div className="main">
            <div className="left-side">
                <div className="title">
                    <div className=" fw-bold fs-5 p-3">Customers</div>
                    <div ><button className="btn btn-primary m-2" onClick={()=>{history.push({pathname:'/'})}}><i className="bi bi-person-plus"></i> Add</button></div>
                    </div>
                <ul className="list-group" >
                    {(customerList && customerList.length > 0) &&
                        customerList.map((customer: any) => {
                            return (
                                <li key={customer.id} className={selectedCustomer && selectedCustomer.id === customer.id ? "list-group-item border-bottom p-3 active" : "list-group-item border-bottom p-3"} onClick={() => { setSelectedCustomer(customer) }}>
                                    {/* <div className="avatar avatar-sm rounded-circl">A</div> */}
                                    <div className="d-flex justify-content-flex-start">
                                        <Avatar>P</Avatar>
                                        <div>
                                            <div className="pl-3 fw-medium fs-6" style={{ marginLeft: '15px' }}>{customer.customerName} ({customer.country})</div><br />
                                            <div className="fs-7" style={{ marginLeft: '15px', marginTop: '-25px' }}>{customer.email}</div>
                                        </div>
                                    </div>
                                </li>
                            )
                        })
                    }
                </ul>
            </div>
            {(selectedCustomer) &&
                <CustomerDetail customer={selectedCustomer} />
            }
        </div>
    )
}

export default CustomerList
