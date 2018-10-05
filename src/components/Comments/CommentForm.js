import React from 'react';
import { Form, Icon, Button, Input } from 'antd'
import { connect } from 'react-redux'

/* AC */
import { submitNewComment } from '../../ducks/comments'

/* Selectors */
import { commentsFormLoadingSelector } from '../../ducks/comments'

class CommentForm extends React.PureComponent {

  handleSubmit = (e) => {
    e.preventDefault()
    const { articleId, form, submitNewComment } = this.props
    form.validateFields((err, values) => {
      if (!err) {
        submitNewComment({
          ...values,
          article: articleId,
          user: 'Anonymous',
        })
        form.resetFields()
      }
    });
  }

  render() {
    const { form, loading } = this.props
    return (
      <Form onSubmit={this.handleSubmit}>
        <Form.Item label="Enter comment text">
          {form.getFieldDecorator('text', {
            rules: [
              {
                required: true,
                message: 'Text field is required'
              }
            ]
          })(
            <Input.TextArea />
          )}
        </Form.Item>
        <Form.Item>
          <Button loading={loading} type="primary" htmlType="submit">Send</Button>
        </Form.Item>
      </Form>
    )
  }
}

const DecoratedForm = Form.create()(CommentForm)
export default connect(
  (state, props) => ({
      loading: commentsFormLoadingSelector(state, props)
    }),
    { submitNewComment }
  )(DecoratedForm)
