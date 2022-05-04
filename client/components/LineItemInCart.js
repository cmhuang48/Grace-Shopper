import React from 'react';
import { connect } from 'react-redux';
import { updateLineItem, deleteLineItem } from '../store';
import {loadLineItems} from '../store'

const LineItemInCart = ({ lineItem, auth, products, loadLineItems, updateLineItem, deleteLineItem }) => {
  const destroy = () => {
    if (auth.username) {
      deleteLineItem(lineItem);
    } else {
      let existingCart = JSON.parse(window.localStorage.getItem('cart'));
      existingCart = existingCart.filter(obj => obj.productId !== lineItem.productId);
      window.localStorage.setItem('cart', JSON.stringify(existingCart));
      updateLineItem(existingCart)
    }
  }

  const increase = () => {
    if (auth.username) {
      const updatedItem = { id: lineItem.id, quantity: lineItem.quantity*1+1, productId: lineItem.productId, orderId: lineItem.orderId, tiers: lineItem.tiers*1, size: lineItem.size*1};
      updateLineItem(updatedItem);
    } else {
      const existingCart = JSON.parse(window.localStorage.getItem('cart'));
      const existingLineItem = existingCart.find(obj => obj.productId === lineItem.productId);
      const idx = existingCart.indexOf(existingLineItem);
      existingLineItem.quantity = existingLineItem.quantity*1+1;
      existingCart[idx] = existingLineItem;
      window.localStorage.setItem('cart', JSON.stringify(existingCart));
      loadLineItems();
    }
  }

  const decrease = () => {
    if (lineItem.quantity === 1) { 
      destroy();
    }
    else if (auth.username) {
      const updatedItem = { id: lineItem.id, quantity: lineItem.quantity*1-1, productId: lineItem.productId, orderId: lineItem.orderId, tiers: lineItem.tiers*1, size: line.Item.size*1 };
      updateLineItem(updatedItem);
    } else {
      const existingCart = JSON.parse(window.localStorage.getItem('cart'));
      const existingLineItem = existingCart.find(obj => obj.productId === lineItem.productId);
      const idx = existingCart.indexOf(existingLineItem);
      existingLineItem.quantity = existingLineItem.quantity*1-1;
      existingCart[idx] = existingLineItem;
      window.localStorage.setItem('cart', JSON.stringify(existingCart));
      loadLineItems();
    }
  };

  const product = products.find(product => product?.id === lineItem.productId*1);

  if(!product) return null;

  let currentQuantity;
  let currentTiers
  let currentSize
  if (auth.username) {
    currentQuantity = lineItem.quantity;
    currentTiers = lineItem.tiers;
    currentSize = lineItem.size;
  } else {
    const existingCart = JSON.parse(window.localStorage.getItem('cart'));
    const existingLineItem = existingCart.find(obj => obj.productId === lineItem.productId);
    currentQuantity = existingLineItem.quantity;
  }

  return (
    <tr key={product.id}>
      <td className='cartImage'><a href={`/cakes/${product.id}`}><img src={product.image}/></a></td>
      <td>{product.name}</td>
      <td>{product.category}</td>
      <td>
        <button className='increaseBtn' onClick={decrease}>-</button>
        {currentQuantity}
        <button className='decreaseBtn' onClick={increase}>+</button>
      </td>
      <td>{currentTiers}</td>
      <td>{currentSize}</td>
      <td>
        <button className='deleteBtn' onClick={destroy}>Remove Item</button>
      </td>
      <td>${product.price * currentQuantity}</td>
    </tr>
  );
};

const mapState = ({ auth, products }) => ({ auth, products });
const mapDispatch = (dispatch) => {
  return {
    updateLineItem: (item) => {
      dispatch(updateLineItem(item));
    },
    deleteLineItem: (lineItem) => {
      dispatch(deleteLineItem(lineItem));
    },
    loadLineItems: ()=>{
      dispatch(loadLineItems())
    }
  };
};

export default connect(mapState, mapDispatch)(LineItemInCart);