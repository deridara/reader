import React from 'react'
import { Input, Button, DatePicker, Form } from 'antd'
import { connect } from 'react-redux'
import moment from 'moment';

/* AC */
import { setDateRange } from '../../ducks/filters'

/* Selectosr */
import { filterDatesSelector } from '../../ducks/filters'

const dateFormat = 'YYYY-MM-DD'

class DateRangeSearchForm extends React.PureComponent {

  handleDateSearch = (e) => {
    e.preventDefault();
    const { form, setDateRange } = this.props;

    form.validateFields((err, values) => {
      if (!err) {
        const timestamps= Object.values(values).map(date => date.valueOf())
        setDateRange(timestamps)
      }
    });
  }

  render() {
    const { form, dates } = this.props;
    return (
      <div>
           <Form onSubmit={this.handleDateSearch}>
               <Input.Group compact>
                   {form.getFieldDecorator('startDate', {
                     initialValue: moment(dates[0]),
                     rules: [
                       {
                         required: true,
                         message: 'Date field is required'
                       }
                     ]
                   })(
                      <DatePicker format={dateFormat} />
                   )}
                   {form.getFieldDecorator('endDate', {
                     initialValue: moment(dates[1]),
                     rules: [
                       {
                         required: true,
                         message: 'Date field is required'
                       }
                     ]
                   })(
                      <DatePicker format={dateFormat} />
                   )}
                  <Button type='primary' htmlType="submit">Search</Button>
               </Input.Group>
           </Form>
      </div>
    )
  }
}

const DecoratedForm = Form.create()(DateRangeSearchForm)

export default connect((state, props) => ({ dates: filterDatesSelector(state, props) }), { setDateRange })(DecoratedForm)
