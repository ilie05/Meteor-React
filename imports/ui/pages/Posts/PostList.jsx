import React from 'react'
import Button from '../Button'
import postQuery from '/imports/api/posts/queries/postQuery'
import { Tracker } from 'meteor/tracker'

export default class PostList extends React.Component {
  constructor () {
    super()
    this.state = {
      posts: null,
      handle: null
    }
  }

  componentDidMount () {
    const query = postQuery.clone()
    const subscriptionHandle = query.subscribe()
    this.setState({ handle: subscriptionHandle })

    Tracker.autorun(() => {
      if (subscriptionHandle.ready()) {
        this.setState({ posts: query.fetch() })
      }
    })
  }

  componentWillUnmount () {
    this.state.handle.stop()
  }

  render () {
    const { posts } = this.state
    const { history } = this.props

    if (!posts) {
      return <div>Loading....</div>
    }

    return (
      <div className="post">
        {
          posts.map((post) => {
            if (post.author._id == Meteor.userId()) {
              var button = <Button onClick={() => {
                history.push('/posts/edit/' + post._id)
              }}
              label="Edit post"
              />
            }

            return (
              <div key={post._id}>
                <p>Post title: {post.title} </p>
                <p onClick={() => history.push('/posts/view/' + post._id)} style={{cursor:'pointer'}}>Post Description: {post.description} </p>
                <p>Views: {post.views} </p>
                <p>Comments: {post.comments} </p>
                {button}
                <hr/>
              </div>
            )
          })
        }
        <button onClick={() => history.push('/posts/create')}>Create a new post</button>
      </div>
    )
  }
}
