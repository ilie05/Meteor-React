import React from 'react'
import NotFound from '../NotFound.jsx'
import ListComments from '../Comments/ListComments'
import CommentForm from '../Comments/CommentForm'
import Button from '../Button'

export default class PostView extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      post: {},
      error: {}
    }
  }

  componentDidMount () {
    Meteor.call('secured.post_get', this.props.match.params._id, (err, gotPost) => {
      if (err) {
        this.setState({ error: err })
      } else {
        this.setState({ post: gotPost })
        Meteor.call('post.increment_views', gotPost._id)
      }
    })
  }

  render () {
    const post = this.state.post
    const error = this.state.error

    if (Object.getOwnPropertyNames(error).length === 0) {
      if (Object.getOwnPropertyNames(post).length === 0) {
        return (
          <div>Loading post...</div>
        )
      }

      if (post.author._id == Meteor.userId()) {
        var button = <Button onClick={() => {
          Meteor.call('secured.post_remove', post._id, post.author._id, () => {
            this.props.history.push('/posts')
          })
        }}
        label="Delete post"
        />
      }

      return (
        <div className="post">
          <p>Post user: {post.author.emails[0].address} </p>
          <p>Post title: {post.title} </p>
          <p>Post Description: {post.description} </p>
          <p>Post Type: {post.type} </p>
          <p>Post Views: {post.views} </p>

          {button}

          <hr/>

          <ListComments postId={post._id} postUserId={post.author._id}/>

          <hr/>

          <CommentForm postId={post._id}/>

          <button onClick={() => this.props.history.push('/posts')}>Back to posts</button>
        </div>
      )
    } else {
      return (
        <NotFound />
      )
    }
  }
}
