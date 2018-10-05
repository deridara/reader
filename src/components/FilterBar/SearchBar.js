import React from 'react'
import { Input, Button, DatePicker, Form } from 'antd'
import { connect } from 'react-redux'

/* AC */
import { searchArticle } from '../Articles/Articles'
import { setTitle } from '../../ducks/filters'

class SearchBar extends React.PureComponent {
  handleSearch = (value) =>  this.props.setTitle(value)

  render() {
    return (
      <div>
          <Input.Search
           placeholder="input search text"
           onSearch={this.handleSearch}
           enterButton
         />
      </div>
    )
  }
}
export default connect(() => ({}), { setTitle })(SearchBar)
