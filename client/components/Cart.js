import React from 'react';
import { connect } from 'react-redux';
import LineItemInCart from './LineItemInCart';
import { Link } from 'react-router-dom';

const Cart = ({ auth, associatedLineItems, products }) => {
  let cart;

  if (auth.username) {
    if(!associatedLineItems.length) return <div>Empty Cart</div>;
    cart = associatedLineItems;
  }

  else {
    const existingCart = JSON.parse(window.localStorage.getItem('cart'));
    if(!existingCart.length) return <div>Empty Cart</div>;
    cart = existingCart;
  }

  let total; 

  return (
    <div style={{marginBottom: '100%'}}>
      <h1>Cart</h1>
        <div className='cartBox'>
          <table>
            <tbody>
              <tr>
                <th style={{width: "150px"}}>Product Image</th>
                <th>Name</th>
                <th>Category</th>
                <th>Quantity</th>
                <th></th>
                <th style={{width: "50px"}}>Price</th>
              </tr>
              {cart.map(lineItem => {
                const product = products.find(product => product?.id === lineItem.productId*1);
                total = product.price * lineItem.quantity;
                return (
                  <LineItemInCart lineItem={lineItem} key={lineItem.id} />
                )
              })}
              <tr>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td>Total:</td>
                <td>${total}</td>
              </tr>
            </tbody>
          </table>
        </div>
      <Link to='/checkout'><button className='cartCheckout'>Continue To Checkout</button></Link>
    </div>
  );
};

const mapState = ({ auth, orders, lineItems, products }) => {
  const cart = orders.find(order => order.status === 'cart');
  const associatedLineItems = lineItems.filter(lineItem => lineItem.orderId === cart?.id);
  return {
    auth,
    associatedLineItems,
    products
  };
};

export default connect(mapState)(Cart);