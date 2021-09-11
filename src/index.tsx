import ReactDOM from 'react-dom';
import './index.css';
import '../src/assets/css/customerList.css';
import reportWebVitals from './reportWebVitals';
import Customer from './pages/customer/Customer'
import '../src/assets/css/customer.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import "bootstrap-icons/font/bootstrap-icons.css";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Provider } from 'react-redux';
import configureStore from './store/';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import CustomerList from './components/customer/CustomerList';

toast.configure({ closeButton: false, closeOnClick: true, className: 'toaster', autoClose: 2500 });
const store = configureStore();

const AppMain = (props: any) => {
    return (
        <Router>
            <Switch>
                <Route exact path="/" component={Customer}></Route>
                <Route exact path="/customerlist" component={CustomerList}></Route>
            </Switch>
        </Router>
    )
}

ReactDOM.render(
    <Provider store={store}>
        <AppMain />
    </Provider>
    , document.getElementById('root'));

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
