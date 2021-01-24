import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { Link } from 'react-router-dom';
import {getAllOrderList, getYourTickets} from '../Actions/ordersAction';
import { getYourTicketsReducer } from '../Reducers/ordersReducer';
const OrdersScreen = (props) => {
    const userSignin = useSelector(state => state.userSignin);
    const {userInfo} = userSignin
    const allOrders = useSelector(state => state.allOrderList);
    const {allOrderList} = allOrders;
    const takeHandler = (orderId) => {
        if(userInfo) {
            console.log("www call take handler get your tickets");
            dispatch(getYourTickets(props.history, orderId));
        }
        else{
        props.history.push(`/signin?redirect=/orders/${orderId}`); 
        }
    }
    const dispatch = useDispatch()
    useEffect(()=> {
        dispatch(getAllOrderList());
    },[])

    return (
        <div className="ordersScreen">
            <table>
                <thead>
                    <tr>
                        <th>
                            State
                        </th>
                        <th>
                            City
                        </th>
                        <th>
                            Street
                        </th>
                        <th>
                            Order Number
                        </th>
                        <th>
                            Product
                        </th>
                        <th>
                            Created Date
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {allOrderList&& allOrderList.map(order=>
                        order.show&&<tr key={order._id}>
                            <td>{order.state}</td>
                            <td>{order.city}</td>
                            <td>{order.street}</td>
                            <td>{order._id}</td>
                            <td>{order.product}</td>
                            <td>{order.updatedAt}</td>
                            <td>{order.show}</td>
                            <td><button onClick = {()=>{takeHandler(order._id)}}>TAKE IT</button></td>
                        </tr>
                        
                    )}
                </tbody>

            </table>
        </div>
    )
}
export default OrdersScreen;