import React from 'react'
import {Comments} from '/db';
import commentQuery from '/imports/api/comments/queries/commentQuery';
import Button from '../Button'
import {Tracker} from 'meteor/tracker';

export default class CommentsView extends React.Component{
	constructor(props){
		super(props);
        this.state = {
            loading: true,
            comments: []
        };
	}

    componentDidMount(){
        const query = commentQuery.clone({postId: this.props.postId});
        const subscriptionHandle = query.subscribe();

        Tracker.autorun(() => {
            if (subscriptionHandle.ready()) {
                this.setState({comments: query.fetch()})
                this.setState({loading: false})
            }
        })
    }

	render() {
        const {comments} = this.state;

        if(this.props.loading){
            return (
                <div>Loading comments...</div>
            )
        }

        return (
            comments.map(comment =>{
                if((comment.author._id == Meteor.userId()) || (Meteor.userId() == this.props.postUserId)){
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
                        <p>Author: {comment.author.emails[0].address}</p>
                        {button}
                    </div>
                )
            })
        )
    }
}