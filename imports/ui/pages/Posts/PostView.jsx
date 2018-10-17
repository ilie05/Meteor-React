import React from 'react'
import NotFound from '../NotFound.jsx'
import ListComments from '../Comments/ListComments'
import CommentForm from '../Comments/CommentForm'

export default class PostView extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			post: {},
			error: {}
		};
	}

	componentDidMount() {
		Meteor.call('post.get', this.props.match.params._id, (err, gotPost) => {
			if(err){
				this.setState({error: err})	;
			}else{
				this.setState({post: gotPost});	
				Meteor.call('post.increment_views', gotPost._id);
			}
		});
	}

/*	submitComment = (comment) => {
		Meteor.call('secured.comment_create', comment, this.state.post._id, (err) => {
            if (err) {
                return alert(err.reason);
            }
        });
	}*/

	render(){
		const post = this.state.post;
		const error = this.state.error;

		if(Object.getOwnPropertyNames(error).length === 0){

			if(Object.getOwnPropertyNames(post).length === 0){
				return (
					<div>Loading....</div>
				)
			}
			return (
				<div className="post">
					<p>Post userID: {post.userId} </p>
	                <p>Post id: {post._id} </p>
	                <p>Post title: {post.title} </p>
	                <p>Post Description: {post.description} </p>
	                <p>Post Type: {post.type} </p>
	                <p>Post Date: {post.createdAt.toString()} </p>
	                <p>Post Views: {post.views} </p>
	                <hr/>

	                <ListComments postId={post._id} />

		            <hr/>

		            <CommentForm postId={post._id}/>
{/*	                <div className='comment-form'>
						<AutoForm onSubmit={this.submitComment} schema={CommentSchema} validator={'text'}>
							<LongTextField name='text' placeholder='Comment here...'/>
		                    <button type='submit'>Add comment</button>
		                    <button onClick={() => this.props.history.push('/posts')}>Back to posts</button>
						</AutoForm>
					</div>*/}
					<button onClick={() => this.props.history.push('/posts')}>Back to posts</button>
				</div>
			)
		}else{
			return (
				<NotFound />
			)
		}		
	}
}