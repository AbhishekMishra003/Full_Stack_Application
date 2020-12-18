import logo from './logo.svg';
import './App.css';
import ListUsers from './Component/ListUsers';
import HeaderComponent from './Component/HeaderComponent';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import Createuser from './Component/Createuser';
import UpdateUser from './Component/UpdateUser';
import View from './Component/View';
import ListBooks from './Component/ListBooks';
import CreateBook from './Component/CreateBook';
import UpdateBook from './Component/UpdateBook';
import ViewBook from './Component/ViewBook';
import HistoryPage from './Component/HistoryPage';
import BestSeller from './Component/BestSeller';
import LateHistory from './Component/LateHistory';

function App() {
  return (
    <div>
      <Router>
        <HeaderComponent/>
        <div className='container'>
            <Switch>
              <div className="container">
                <Route path="/" exact component={ListUsers}/>
                <Route path="/add-user" component={Createuser}/>
                <Route path="/update-user/:userId" component={UpdateUser}/>
                <Route path="/view-user/:userId" component={View}/>
                <Route path="/books" exact component={ListBooks}/>
                <Route path="/books/add-book" component={CreateBook}/>
                <Route path="/books/update-book/:bookId" component={UpdateBook}/>
                <Route path="/view-book/:bookId" component={ViewBook}/>
                <Route path="/history" component={HistoryPage}/>
                <Route path="/bestSeller" component={BestSeller}/>
                <Route path="/lateHistory" component={LateHistory}/>
              </div>
            </Switch>
        </div>
      </Router>
    </div>
  );
}

export default App;
