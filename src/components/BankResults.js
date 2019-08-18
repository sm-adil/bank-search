import React, { Component } from 'react'
import Pagination from './Pagination'

class BankResults extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentPage: 1,
            banksPerPage: 20,
        }
    }
    render() {
        const { favoriteBanks, banks, searchQuery, loading, loadFavoriteBanks } = this.props;
        const { currentPage, banksPerPage } = this.state;
 
        // Filter bankResults table depending upon the searchQuery state passed as prop
        let filteredBanks = banks.filter((bank) => {
            return bank.bank_name.toLowerCase().indexOf(searchQuery.toLowerCase()) !== -1;
        });

        // Get current banks
        const indexOfLastBank = currentPage * banksPerPage;
        const indexOfFirstBank = indexOfLastBank - banksPerPage;
        const currentBanks = filteredBanks.slice(indexOfFirstBank, indexOfLastBank)

        // Change page
        const paginate = pageNumber => this.setState({currentPage: pageNumber});
        
        let favoriteBanksArray = localStorage.getItem('favoriteBanks') ? JSON.parse(localStorage.getItem('favoriteBanks')) : []
        localStorage.setItem('favoriteBanks', JSON.stringify(favoriteBanksArray))
        
        function addFavoriteBank(ifsc) {
            let myFavoriteBanks = banks.filter((bank) => {
                return bank.ifsc.indexOf(ifsc) !== -1;
            })
            favoriteBanksArray.push(myFavoriteBanks)
            localStorage.setItem('favoriteBanks', JSON.stringify(favoriteBanksArray))
        }

        if (loading) {
            return <h2 className="loading">Loading...</h2>;
        }

        if (loadFavoriteBanks) {
            return (
                <div className="search__results">
                    <table className="table">
                        <thead>
                            <tr>
                                <th scope="col">IFSC</th>
                                <th scope="col">Bank Name</th>
                                <th scope="col">Branch</th>
                                <th scope="col">Address</th>
                                <th scope="col">City</th>
                                <th scope="col">District</th>
                                <th scope="col">State</th>
                            </tr>
                        </thead>
                        <tbody>
                        {favoriteBanks.map(obj => {
                            return(
                            obj.map(bank => {
                            return (
                            <tr className="active" key = {bank.ifsc}>
                                <td data-label="IFSC"> {bank.ifsc}</td>
                                <td data-label="Bank Name"> {bank.bank_name}</td>
                                <td data-label="Branch"> {bank.branch}</td>
                                <td data-label="Address"> {bank.address}</td>
                                <td data-label="City"> {bank.city}</td>
                                <td data-label="District"> {bank.district}</td>
                                <td data-label="State"> {bank.state}</td>
                            </tr>
                            )}
                            ))}
                        )}
                        </tbody>
                    </table>
                </div>
            );
        }
        else {
            return (
                <div className="search__results">
                    <table className="table">
                        <thead>
                            <tr>
                                <th scope="col">IFSC</th>
                                <th scope="col">Bank Name</th>
                                <th scope="col">Branch</th>
                                <th scope="col">Address</th>
                                <th scope="col">City</th>
                                <th scope="col">District</th>
                                <th scope="col">State</th>
                                <th scope="col">Add to Favorite</th>
                            </tr>
                        </thead>
                        <tbody>
                        {currentBanks.map(bank => {
                            return (
                            <tr className="active" key = {bank.ifsc}>
                                <td data-label="IFSC"> {bank.ifsc}</td>
                                <td data-label="Bank Name"> {bank.bank_name}</td>
                                <td data-label="Branch"> {bank.branch}</td>
                                <td data-label="Address"> {bank.address}</td>
                                <td data-label="City"> {bank.city}</td>
                                <td data-label="District"> {bank.district}</td>
                                <td data-label="State"> {bank.state}</td>
                                <td data-label="Add to Favorite">
                                    <button className="addbutton" id="add" onClick={() => addFavoriteBank(bank.ifsc)}>Add</button>
                                </td>
                            </tr>
                            )}
                        )}
                        </tbody>
                    </table>
                    <Pagination banksPerPage={banksPerPage} totalBanks={banks.length} paginate={paginate}/>
                </div>
            );
        }
    }
}

export default BankResults;