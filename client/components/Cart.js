import React from 'react';
import { connect } from 'react-redux';
import LineItemInCart from './LineItemInCart';
import { auth, updateOrder, createOrder, createLineItem } from '../store';

class Cart extends React.Component {
  constructor () {
    super();
    this.onClick = this.onClick.bind(this);
  }

  onClick () {
    const { auth, cart, updateOrder, createOrder, createLineItem } = this.props;
    if (auth.username) {
      const token = window.localStorage.getItem('token'); // How to get userId?
      updateOrder({ id: cart.id, status: 'order', userId: token });
    } else {
      const id = Math.floor(Math.random());
      createOrder({ id, status: 'order' });
      const existingCart = JSON.parse(window.localStorage.getItem('cart'));
      for (const lineItem of existingCart) {
        createLineItem({ ...lineItem, orderId: id });
      }
    }
    window.alert('Successfully checked out!')
  }

  render () {
    const { auth, cart } = this.props;
    const { onClick } = this;

    if (auth.username) {
      if(!cart.length) return <div>Empty Cart</div>;

      return (
        <div>
          <h1>Cart</h1>
          <ul>
            {cart.map(lineItem => {
              return (
                <LineItemInCart lineItem={lineItem} key={lineItem.id} />
              )
            })}
          </ul>
          <button onClick={onClick}>Checkout</button>
        </div>
      );
    }

    else {
      const existingCart = JSON.parse(window.localStorage.getItem('cart'));
      if(!existingCart.length) return <div>Empty Cart</div>;

      return (
        <div>
          <h1>Cart</h1>
          <ul>
            {existingCart.map(lineItem => {
              return (
                <LineItemInCart lineItem={lineItem} key={lineItem.productId} />
              )
            })}
          </ul>
          <button onClick={onClick}>Checkout</button>
        </div>
      );
    }
  }
};

const mapState = ({ auth, orders }) => {
  const cart = orders.find(order => order.status === 'cart');
  return {
    auth,
    cart
  };
};

const mapDispatch = (dispatch) => {
  return {
    updateOrder: (order) => {
      dispatch(updateOrder(order));
    },
    createOrder: (order) => {
      dispatch(createOrder(order));
    },
    createLineItem: (lineItem) => {
      dispatch(createLineItem(lineItem));
    }
  };
};

export default connect(mapState, mapDispatch)(Cart);