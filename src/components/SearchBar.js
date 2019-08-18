import React, { Component } from 'react'
import PropTypes from "prop-types";

class SearchBank extends Component {
    static propTypes = {
        textChange: PropTypes.func
    };

    handleChange = event => {
        this.props.textChange(event);
    };
    render() {
        return (
            <div className="search__box">
                <input type="text" placeholder="Enter your bank name..." onChange={this.handleChange} />
            </div>
        )
    }
}

export default SearchBank;