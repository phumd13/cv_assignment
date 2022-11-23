import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';

import { faShareAlt, faShoppingCart, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ProductContext } from '../App.tsx';

export const ShoppingCartPanel = (props: any): JSX.Element => {

  const navigate = useNavigate();

  const [data, setData] = useContext(ProductContext);

  let updatedArray = [];

  function handleDeleteItem(id) {
    const newProduct = data.filter((product) => product.id !== id);
    setData(newProduct);
  }

  function handleQuantityUpdate() {
    if(typeof updatedArray !== 'undefined' && updatedArray.length > 0) {
      setData(updatedArray);
    }
  }

  const updateQuantity = (index) => (e) => {
    const newArray = data.map((item, i) => {
      if (index === i) {
        return { ...item, quantity: e.target.valueAsNumber };
      } else {
        return item;
      }
    });
    updatedArray = newArray;
  }

  let total = 0;

  data.forEach(item => {
    total += item.price * item.quantity;
  });

  return (
    <div className="container">
      <div className="row">
        <div className="col-8">
          <div className="card card-info">
            <div className="card-header">
              <div className="card-title">
                <div className="row align-items-center">
                  <div className="col-6">
                    <h5 className="mb-0">
                      <FontAwesomeIcon icon={faShoppingCart} />
                      {" "}Shopping Cart
                    </h5>
                  </div>
                  <div className="col-6">
                    <button type="button" className="btn btn-primary btn-sm w-100">
                      <FontAwesomeIcon icon={faShareAlt} />{" "}Continue shopping
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="card-body">
            {data.map((product: any, index) => (
              <div className="row" key={product.id}>
                <div className="col-2"><img className="img-responsive" src="http://placehold.it/100x70" alt="placeholder" />
              </div>
              <div className="col-4">
                <h4 className="product-name"><strong>{ product.name }</strong></h4><h4><small>{product.body}</small></h4>
              </div>
              <div className="col-6">
                <div className="row">
                  <div className="col-6 text-end">
                    <h6><strong>${ product.price } <span className="text-muted">x</span></strong></h6>
                  </div>
                  <div className="col-4">
                    <input type="number" className="form-control input-sm" defaultValue={ product.quantity } onChange={updateQuantity(index)}/>
                  </div>
                  <div className="col-2">
                    <button type="button" className="btn btn-link btn" onClick={() => handleDeleteItem(product.id)}>
                      <FontAwesomeIcon icon={faTrash} />
                    </button>
                  </div>
                </div>
              </div>
              <hr />
              </div>
            ))}
            <div className="row text-center align-items-center">
              <div className="col-9">
                <h6 className="text-end mb-0">Added items?</h6>
              </div>
              <div className="col-3">
                <button type="button" className="btn btn-default btn-sm w-100 border" onClick={handleQuantityUpdate}>
                  Update cart
                </button>
              </div>
            </div>
            <div className="card-footer">
              <div className="row text-center align-items-center">
                <div className="col-9">
                  <h4 className="text-end mb-0 h5">Total <strong>${ total }</strong></h4>
                </div>
                <div className="col-3">
                  <button type="button" className="btn btn-success w-100" onClick={() => navigate('/checkout')}>
                    Checkout
                  </button>
                </div>
              </div>
            </div>
            </div>   
            </div>
          </div>
        </div>
      </div>
      )
};