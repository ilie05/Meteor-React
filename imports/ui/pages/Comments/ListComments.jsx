import React from 'react'
import {withTracker} from 'meteor/react-meteor-data';
import {Comments} from '/db';

class CommentsView extends React.Component{
	constructor(props){
		super(props);
	}

	render() {
        const {comments} = this.props;
        return (
           	
                comments.map((comment) =>{
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