import React from 'react'
import { Input, Button, DatePicker, Form } from 'antd'
import { connect } from 'react-redux'
import SearchBar from './SearchBar'
import DateRangeSearchForm from './DateRangeSearchForm'

class FilterBar extends React.PureComponent {
  render() {
    return (
      <div>
          <SearchBar />
          <br />
          <DateRangeSearchForm />
      </div>
    )
  }
}

export default FilterBar
