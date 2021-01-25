import { Component } from "react";
import { Link } from "react-router-dom";
 class Nav extends Component{
     constructor(){
         super();
         var preference;
         var useDarkMode;
         if(localStorage.getItem('colorPreference')){
            if (localStorage.getItem('colorPreference')=='dark'){
                preference=true
            }else{
                preference=false
                document.body.classList.add('light');
            }
         }else{
            preference=window.matchMedia('(prefers-color-scheme: dark)');
            preference = preference.matches;
         }


         this.state={
             darkMode:preference
         }
         this.changeMode= this.changeMode.bind(this)
     }

     changeMode(){
        this.setState({
            darkMode:!this.state.darkMode
        })
         if(this.state.darkMode===true){
            document.body.classList.add('light');
            document.body.classList.remove('dark');
            localStorage.setItem("colorPreference","light");
         }else{
            document.body.classList.add('dark');
            document.body.classList.remove('light');
            localStorage.setItem("colorPreference","dark");
         }
        

     }

render(){


    return (
        <nav className="navbar navbar-expand-sm fixed-top">
        <div className="container-fluid">
            <div className="navbar-header">
            <Link to="/"><p className="navbar-brand" href="#">devjobs</p></Link>
            </div>
            <ul className="nav navbar-nav">
                

            </ul>
            <ul className="nav navbar-nav navbar-right">
 
                    <form>
                <div className="custom-control custom-switch" htmlFor="switch1">
               
                    <input
                    type="checkbox"
                    className="custom-control-input"
                    id="switch1"
                    onChange={this.changeMode}
                    checked={this.state.darkMode}
                    />
                    <label className="custom-control-label" htmlFor="switch1">
                    <i className='far fa-moon'></i>
                    </label>
                </div>
                </form>
            </ul>
        </div>
        </nav>

    )
}
}
export default Nav;