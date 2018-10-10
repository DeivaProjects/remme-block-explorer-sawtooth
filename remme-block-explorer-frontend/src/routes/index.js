import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import App from '../App';
import {
  Home,
  Claim,
  Feedback,
  Blocks,
  BlockDetails,
  Transactions,
  TransactionDetails,
  AddressDetails, 
  HowToUse,
  NotFound
} from '../pages';

export default () => (
  <Router>
    <App>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/claim" component={Claim} />
        <Route exact path="/feedback" component={Feedback} />
        <Route exact path="/blocks" component={Blocks} />
        <Route exact path="/blocks/:id" component={BlockDetails}/>
        <Route exact path="/transactions" component={Transactions} />
        <Route exact path="/transactions/:id" component={TransactionDetails}/>
        <Route exact path="/address/:id" component={AddressDetails}/>
        <Route exact path="/how-to-use" component={HowToUse} />
        <Route component={NotFound}/>
      </Switch>
    </App>
  </Router>
);
