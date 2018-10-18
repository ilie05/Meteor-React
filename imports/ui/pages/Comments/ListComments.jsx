import React from 'react'
import {withTracker} from 'meteor/react-meteor-data';
import {Comments} from '/db';

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
                return (
                    <div className='comment' key={comment._id}>
                        <p>Comment: {comment.text}</p>
                        <p>Author: {comment.userId}</p>
                    </div>
                )
            })
        )
    }
}

const ListComments = withTracker(({props, postId}) => {
    const handle = Meteor.subscribe('comments', postId);

    return {
        loading: !handle.ready(),
        comments: Comments.find().fetch(),
        ...props
    };
})(CommentsView);

export default ListComments;