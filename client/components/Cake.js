import React from 'react';
import { connect } from 'react-redux';
import { createLineItem, updateLineItem } from '../store/lineItems';

class Cake extends React.Component {
  constructor () {
    super();
    this.state = {
      quantity: 0
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onSubmit (ev) {
    ev.preventDefault();
    const { cake, order, lineItem, createLineItem, updateLineItem } = this.props;
    const { quantity } = this.state;
    if (!lineItem) {
      createLineItem(quantity, cake.id, order.id);
    } else {
      updateLineItem(lineItem.id, quantity, cake.id, order.id);
    }
  }

  onChange (ev) {
    const change = {};
    change[ev.target.name] = ev.target.value;
    this.setState(change);
  }

  render () {
    const { cake } = this.props;
    const { quantity } = this.state;
    const { onChange, onSubmit } = this;
    if(!cake) return null;

    return (
      <div className='cake-details'>
        <img src={cake.image}/>
        <div className='cake-add-to-cart'>
          <h1>{cake.name} cake</h1>
          <p>Price: ${cake.price}</p>
          <form onSubmit={onSubmit}>
            <p>Quantity: <input name='quantity' value={quantity} type='number' min='1' max='10' onChange={onChange} /></p>
            <button>Add to Cart</button>
          </form>
        </div>
      </div>
    );
  }
};

const mapState = ({ products, orders, lineItems }, { match: { params: { id } } }) => {
  const cake = products.find(product => product.id === id*1 && product.category === "cake");
  const order = orders.find(order => order.status === 'cart');
  const lineItem = lineItems.find(lineItem => lineItem.productId === cake.id && lineItem.orderId === order?.id);
  return {
    cake,
    order,
    lineItem
  };
};

const mapDispatch = (dispatch) => {
  return {
    createLineItem: (quantity, productId, orderId) => {
      dispatch(createLineItem(quantity, productId, orderId));
    },
    updateLineItem: (id, quantity, productId, orderId) => {
      dispatch(updateLineItem(id, quantity, productId, orderId));
    }
  };
};

export default connect(mapState, mapDispatch)(Cake);