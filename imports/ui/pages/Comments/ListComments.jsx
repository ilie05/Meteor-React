import React from 'react'
import {withTracker} from 'meteor/react-meteor-data';
import {Comments} from '/db';
import Button from '../Button'

class CommentsView extends React.Component{
	constructor(props){
		super(props);
        this.state = {
            userAddress: ''
        };
	}

	render() {
        const {comments} = this.props;

        if(this.props.loading){
            return (
                <div>Loading comments...</div>
            )
        }

        return (
            comments.map(comment =>{
                if((comment.userId == Meteor.userId()) || (Meteor.userId() == this.props.postUserId)){
                        var button = <Button onClick={() => {
                            Meteor.call('secured.comment_remove', comment, (err) => {
                                if(err){
                                    alert(err.reason)
                                }
                            })
                        }}
                    label="Delete comment"
                    />
                }
                return (
                    <div className='comment' key={comment._id}>
                        <p>Comment: {comment.text}</p>
                        <p>Author: {comment.userId}</p>
                        {button}
                    </div>
                )
            })
        )
    }
}

const ListComments = withTracker(({props, postId, postUserId}) => {
    const handle = Meteor.subscribe('comments', postId);

    return {
        loading: !handle.ready(),
        comments: Comments.find().fetch(),
        postUserId: postUserId,
        ...props
    };
})(CommentsView);

export default ListComments;