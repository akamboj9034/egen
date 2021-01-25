import axios from "axios";
import React, { Component } from "react";
import Jobs from "./Jobs";
import Nav from './Nav';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      jobs: [],
      selectedJobs: [],
      page: 1,
      temp_page: 1,
      jobQuantity: 12,
      noMore: false,
      search:"",
      location:"",
      full_time:false
    };
    this.loadMore = this.loadMore.bind(this);
    this.updateSearch = this.updateSearch.bind(this);
    this.updateLocation = this.updateLocation.bind(this);
    this.searchResults = this.searchResults.bind(this);
    this.updateFullTime = this.updateFullTime.bind(this);
  }

  updateSearch(e){
      this.setState({
          search:e.target.value
      })
  }

  updateLocation(e){
    this.setState({
        location:e.target.value
    })
}

async updateFullTime(e){
    await this.setState({
        full_time: !this.state.full_time
    })
    this.searchResults('t');
}
searchResults(arg){
    console.log(arg)

        axios
        .get(
          `https://fast-falls-26162.herokuapp.com/https://jobs.github.com/positions.json?page=0&search=${this.state.search}&location=${this.state.location}&full_time=${this.state.full_time}`
        )
        .then((response) => {
          this.setState({
            jobs: response.data,
            selectedJobs: response.data.slice(0, this.state.jobQuantity),
          });
          console.log(response.data);
          console.log(this.state.page);
        })
        .catch((err) => {
          console.log(err.message);
        });
    
    

}

  componentDidMount() {
    axios
      .get(
        `https://fast-falls-26162.herokuapp.com/https://jobs.github.com/positions.json?page=${this.state.page}&search=${this.state.search}&location=${this.state.location}&full_time=${this.state.full_time}`
      )
      .then((response) => {
        this.setState({
          jobs: response.data,
          selectedJobs: response.data.slice(0, this.state.jobQuantity),
        });
        console.log(response.data);
        console.log(this.state.page);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }
  shouldComponentUpdate(prevProps, prevState) {
    if (prevState.search !== this.state.search) {
        console.log("did not update")
        return false
    }
    if (prevState.location !== this.state.location) {
        return false
    }
    if (prevState.full_time !== this.state.full_time) {
        return false
    }
    return true

  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.search !== this.state.search) {
        console.log("did not update")
        return false
    }
    if (prevState.location !== this.state.location) {
        return false
    }

    if (prevState.page !== this.state.page) {
      console.log("axios needs to load more");
      axios
        .get(
          `https://fast-falls-26162.herokuapp.com/https://jobs.github.com/positions.json?page=${this.state.page}&search=${this.state.search}&location=${this.state.location}&full_time=${this.state.full_time}`
        )
        .then((response) => {
          this.setState({
            jobs: this.state.jobs.concat(response.data),
            temp_page: this.state.temp_page + 1,
          });
        });

      return true;
    }

    if (prevState.temp_page !== this.state.temp_page) {
      console.log("temp page needs to be incremented");
      let rest = this.state.selectedJobs.length;

      if (
        this.state.jobQuantity * this.state.temp_page >=
        this.state.jobs.length
      ) {
        //update the selectedJobs until end of jobs and mark noMore True
        console.log("this is running");
        this.setState({
          selectedJobs: this.state.selectedJobs.concat(
            this.state.jobs.slice(rest)
          ),
          noMore: true,
        });
      } else {
        //Append exactly jobsQuantity jobs to selected jobs
        this.setState({
          selectedJobs: this.state.selectedJobs.concat(
            this.state.jobs.slice(rest, rest + this.state.jobQuantity)
          ),
        });
      }

      return true;
    }
    return false;
  }


  loadMore() {
    let required = (this.state.temp_page + 1) * this.state.jobQuantity;
    // let total= this.state.page*50
    let total = this.state.jobs.length;
    console.log("required is" + required);
    console.log("total is" + total);

    if (required < total) {
      this.setState({
        temp_page: this.state.temp_page + 1,
      });
    } else {
      this.setState({
        page: this.state.page + 1,
      });
    }
  }

  render() {
    return (
      <div className="container">
                <Nav />
<div className="searchBar">
<div className="container-fluid">
    <div className="row">
        <div className="col-md-4 ">
            <div className="input-group">
                <span className="input-group-addon"><i className="fa fa-search"></i></span>
                <input id="search" type="text" className="form-control inpu-lg" name="email" placeholder="Filter by title" onChange={this.updateSearch}/>
                <button data-toggle="collapse" data-target="#collapsibleFilters" id="filterCollapse" className="btn searchBtnMini"><i className="fa fa-filter"></i></button>
                <button onClick={this.searchResults} className="btn searchBtnMini"><i className="fa fa-search"></i> </button>
            </div>
        </div>
        <div className="col-md-6 collapse" id="collapsibleFilters" >
            <div className="input-group">
                    <span className="input-group-addon"><i className="fa fa-map-marker"></i></span>
                    <input id="location" type="text" className="form-control" name="email" placeholder="Filter by location" onChange={this.updateLocation}/>
                    <div className="checkbox aligned">
                    <label ><input type="checkbox" onChange={this.updateFullTime}/> <span>Full Time Only</span></label>
                </div>
                </div>
                        
        </div>
        <div className="col-md-2 center">
                <button onClick={this.searchResults} className="btn searchBtn">Search</button>
                
          
        </div>
    </div>
    </div>
</div>





                <Jobs jobs={this.state.selectedJobs} />
            

        
        
        {!this.state.noMore && (
          <button className="btn center loadButton" onClick={this.loadMore}>
            Load More
          </button>
        )}
      </div>
    );
  }
}
export default Home;
