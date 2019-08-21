import React from 'react';
import Select from 'react-select';
import './App.css';

import SearchBar from './components/SearchBar'
import BankResults from './components/BankResults'

// Import Api URL 
import bankApi from './api/bankApi'

// Defining city options
const cityOptions = [
  { value: 'MANGALORE', label: 'Mangalore' },
  { value: 'BANGALORE', label: 'Bangalore' },
  { value: 'DELHI', label: 'Delhi' },
  { value: 'PUNE', label: 'Pune' },
  { value: 'CHENNAI', label: 'Chennai' },
];

class App extends React.Component {
  // Defining various states required for the application
  constructor(props) {
    super(props);
    this.state = {
      selectedCity: null,
      banks: [],
      loading: false,
      searchQuery: '',
      favoriteBanks: [],
      loadFavoriteBanks: false,
      banksPerPage: 20
    };
  }

  // Load the favorite banks from localStorage or 
  // create a new localStorage object to store favorite banks and 
  // update the favoriteBanks state
  componentDidMount() {
    let myFavoriteBanks = localStorage.getItem('favoriteBanks') ? JSON.parse(localStorage.getItem('favoriteBanks')) : []
    this.setState({favoriteBanks: myFavoriteBanks})
  }

  // Handle search query and update the searchQuery state
  handleSearchChange = event => {
    this.setState({
      searchQuery: event.target.value
    })
  }
  
  // Handle selectedCity state from dropdown 
  // and asynchronously fetch the bank details from the API
  // depending upon selected city
  handleChange = async (selectedCity) => {
    this.setState({ selectedCity });
    this.setState({ loading: true });

    let city = selectedCity.value;
    const response = await bankApi.get('banks?city='+city);

    this.setState({ banks: response.data});
    this.setState({ loading: false });
    this.setState({ loadFavoriteBanks: false });
  };

  // Select page size to display the same number of banks 
  // Set default display size to 1 if no value or 0 is entered
  pageFilter = (event) => {
    let pageSize = event.target.value.replace(/\D/,'');

    if (pageSize.search(/^0/) !== -1 || pageSize === '') {
      alert("Select atleast one bank details!!"); 
      this.setState({banksPerPage: 1})
    }
    else {
      this.setState({banksPerPage: pageSize})
    }
  }

  // Changing loadFavoriteBanks to true in order to 
  // toggle bankResult component for Favorite Banks and
  // update the favoriteBanks state
  restoreFavoriteBanks = () => {
    this.setState({ loadFavoriteBanks: true });
    
    let myFavoriteBanks = localStorage.getItem('favoriteBanks') ? JSON.parse(localStorage.getItem('favoriteBanks')) : []
    this.setState({favoriteBanks: myFavoriteBanks})
  }

  render() {
    const { selectedCity, banks, searchQuery, favoriteBanks, loading, loadFavoriteBanks, banksPerPage } = this.state;
    
    return (
      <div className="App">
        <div className="container">
          <div className="search__container">

            <div className="city__selection">
              <Select
                value={selectedCity}
                onChange={this.handleChange}
                options={cityOptions}
                placeholder='Select a City'
              />
            </div>

            <div className="page__filter">
              <input type="tel" value={banksPerPage} onChange={this.pageFilter} />
            </div>
            
            <SearchBar textChange={this.handleSearchChange} />
            
            <div className="favoritebanks">
              <button onClick={this.restoreFavoriteBanks} >Favorite Banks</button>            
            </div>

          </div>
          <br/>
          
          <BankResults 
            favoriteBanks={favoriteBanks} 
            banks={banks} 
            searchQuery={searchQuery} 
            loading={loading} 
            loadFavoriteBanks={loadFavoriteBanks}
            banksPerPage={banksPerPage}/>
        </div>
      </div>
    );
  }
}
export default App;
