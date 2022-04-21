import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import CreateProduct from './CreateProduct';

const Cakes = ({ cakes }) => {
  return (
    <div>
      <h1>Cakes</h1>
	    <CreateProduct category='cake' />
      <ul className='cakeContainer'>
        {cakes.map(cake => {
          return (
<<<<<<< HEAD
            <Link to={`/cakes/${cake.id}`}>
              <div className='cakeBox' key={cake.id}>
=======
            <Link to={`/cakes/${cake.id}`} key={cake.id}>
              <div className='cakeBox'>
>>>>>>> 03493994dc477227adc0bb4bb619ec82bad53249
                <img className='cakeImage' src={cake.image}/>
                <li>
                  <span className='product-title'>{cake.name}</span>
                </li>
                <button>Add to Cart</button>
              </div>
            </Link>
          )
        })}
      </ul>
		
    </div>
  );
};

const mapState = ({ products }) => {
  const cakes = products.filter(product => product.category === 'cake');
  return {
    cakes
  };
};

const mapDispatch = (dispatch) => {

}

export default connect(mapState)(Cakes);