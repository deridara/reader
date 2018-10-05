import React from 'react'
import { connect } from 'react-redux'
import moment from 'moment';

/* AC */
import { toggleArticleText, loadArticle, loadAllArticles } from '../../ducks/articles'
import { loadAllComments } from '../../ducks/comments'

/* Selectors */
import { dataSelector, loadingSelector, openedSelector } from '../../ducks/articles'

import Loader from '../common/Loader'
import Comments from '../Comments/Comments'
import FilterBar from '../FilterBar/FilterBar'

class Articles extends React.PureComponent {

  componentDidMount() {
    this.props.loadAllArticles()
    this.props.loadAllComments()
  }

  handleTitleClick = article => e => {
    if (!article.text) {
      this.props.loadArticle(article.id)
    }
    this.props.toggleArticleText(article.id)
  }

  renderArticle = (article) => {
    const { id, title, date, text } = article;
    const { opened } = this.props;
    return (
      <div key={id}>
        <h3 className='article_title' onClick={this.handleTitleClick(article)}>{title} </h3>
        <div className='article_date'>{moment(date.slice(0, 10)).format('YYYY-MM-DD')}</div>
          {opened.includes(id) && <div className="article_text">{text}</div>}
        <Comments articleId={id} />
      </div>
    )
  }

  renderArticleList() {
    const { currentlyDisplayed, articles } = this.props;
    return (
      <div>
        {articles.map(this.renderArticle)}
      </div>
    )
  }

  render() {
    return (
      <div>
        <FilterBar />
        {this.props.loading ? <Loader /> : this.renderArticleList()}
      </div>
    )
  }
}

const mapStateToProps = (state, props) => ({
    articles: dataSelector(state)
      .filter(article => {
      const { title, dates } = state.filters
      const timestamp = new Date(article.date).getTime()
      return article.title.toLowerCase().includes(title.toLowerCase()) && dates[0] < timestamp && dates[1] > timestamp
    }),
    loading: loadingSelector(state, props),
    opened: openedSelector(state, props)
})

const mapDispatchToProps = {
  loadAllArticles,
  loadArticle,
  toggleArticleText,
  loadAllComments
}

export default connect(mapStateToProps, mapDispatchToProps)(Articles)
