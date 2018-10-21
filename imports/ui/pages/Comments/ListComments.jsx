import React from 'react'
import commentQuery from '/imports/api/comments/queries/commentQuery'
import Button from '../Button'
import { Tracker } from 'meteor/tracker'
import '/client/style/style.css'

export default class CommentsView extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      loading: true,
      comments: [],
      handle: null
    }
  }

  componentDidMount () {
    const query = commentQuery.clone({ postId: this.props.postId })
    const subscriptionHandle = query.subscribe()
    this.setState({ handle: subscriptionHandle })

    Tracker.autorun(() => {
      if (subscriptionHandle.ready()) {
        this.setState({ comments: query.fetch() })
        this.setState({ loading: false })
      }
    })
  }

  componentWillUnmount () {
    this.state.handle.stop()
  }

  render () {
    const { comments } = this.state

    if (this.props.loading) {
      return (
        <div>Loading comments...</div>
      )
    }

    return (
      comments.map(comment => {
        if ((comment.author._id === Meteor.userId()) || (Meteor.userId() === this.props.postUserId)) {
          var button = <Button onClick={() => {
            Meteor.call('secured.comment_remove', comment, (err) => {
              if (err) {
                alert(err.reason)
              }
            })
          }}
          label="Delete comment"
          />
        }
        return (
          <div className='comment' key={comment._id}>
            <p className='text'>Comment: {comment.text}</p>
            <p className='author'>Author: {comment.author.emails[0].address}</p>
            {button}
          </div>
        )
      })
    )
  }
}
