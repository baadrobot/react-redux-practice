import logo from './logo.svg';
import './App.css';
import {useDispatch, useSelector} from 'react-redux';
import { addCustomerAction, removeCustomerAction } from './store/customerReducer';
import {fetchCustomers} from './asyncActions/customer.js';

function App() {
  const dispatch = useDispatch();
  const selectCash = useSelector(state => state.cash.cash);
  const selectCustomers = useSelector(state => state.customers.customers)

  const addCash = (selectCash) => {
    dispatch({type: "ADD_CASH", payload: selectCash})
  }
  const getCash = (selectCash) => {
    dispatch({type: "GET_CASH", payload: selectCash})
  }

  const addCustomer = (name) => {
    const customer = {
      name,
      id: Date.now(),
    }
    dispatch(addCustomerAction(customer))
  }
  const removeCustomer = (customer) => {
    dispatch(removeCustomerAction(customer.id))
  }

  return (
    <div className="App">
      <header className="App-header">
        {/* numbers */}
        <div style={{display: "flex"}}>
          <button onClick={() => addCash(Number(prompt()))}>Increase</button>
          <button onClick={() => getCash(Number(prompt()))}>Decrease</button>
        </div>
        <div style={{fontSize: "3rem"}}>{selectCash}</div>
        <br/>
        {/* customers */}
        <div style={{display: "flex"}}>
          <button onClick={() => addCustomer(prompt())}>Add customer</button>
          <button onClick={() => dispatch(fetchCustomers())}>Fetch all customers</button>
        </div>
        {selectCustomers.length > 0
          ?
          <div>
            {selectCustomers.map(customer =>
              <div key={customer.id} onClick={() => removeCustomer(customer)}>{customer.name}</div>
            )}
          </div>
          :
          <div>
            No customers!
          </div>
        }
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Redux practice
        </p>
      </header>
    </div>
  );
}

export default App;
