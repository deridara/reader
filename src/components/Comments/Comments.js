import React from 'react'
import { connect } from 'react-redux'
import { Button } from 'antd'

import CommentForm from './CommentForm'
import { toggleComments } from '../../ducks/comments'

class Comments extends React.PureComponent {

  renderComments = (comment) => {
    const { id, user, text } = comment;
    return (
      <div key={id} className='comment_div'>
        <div className='comment_autor'>{user}</div>
        <div className='comment_text'>{text}</div>
      </div>
    )
  }

  handleButtonClick = (id) => () => {
    this.props.toggleComments(id);
  }

  renderCommentsList = () => {
    const { articleId, comments } = this.props
    return (
      <React.Fragment>
        {comments.map(this.renderComments)}
        <CommentForm articleId={articleId} />
      </React.Fragment>
    )
  }

  render() {
    const { opened, articleId } = this.props
    const showComments = opened.includes(articleId)

    return (
      <React.Fragment>
        {showComments && this.renderCommentsList()}
        <Button
          onClick={this.handleButtonClick(articleId)}
          children={showComments ? 'Close comments' : 'Show comments' }
        />
      </React.Fragment>
    )
  }
}

const mapStateToProps = (state, props) => ({
    comments: Object.values(state.comments.data).filter(comment => comment.article === props.articleId),
    opened: state.comments.opened
})

const mapDispatchToProps = {
  toggleComments
}

export default connect(mapStateToProps, mapDispatchToProps)(Comments)
