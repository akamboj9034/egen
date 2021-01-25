import React, {Component} from 'react';
import {Route} from 'react-router-dom';
import Home from './components/Home';
import JobDetail from './components/JobDetail';

 
class Main extends Component{
    render(){
        return(
            <div>
                <Route exact path="/" component={Home} />
                <Route path="/job" component={JobDetail} />


            </div>
        )
    }
}

export default Main;