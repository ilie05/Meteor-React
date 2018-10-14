import React from 'react'
import NotFound from '../NotFound.jsx'

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

	render(){
		const post = this.state.post
		const error = this.state.error;

		if(Object.getOwnPropertyNames(error).length === 0){

			if(Object.getOwnPropertyNames(post).length === 0){
				return (
					<div>Loading....</div>
				)
			}
			return (
				<div className="post">
	                <p>Post id: {post._id} </p>
	                <p>Post title: {post.title} </p>
	                <p>Post Description: {post.description} </p>
	                <p>Post Type: {post.type} </p>
	                <p>Post Date: {post.createdAt.toString()} </p>
	                <p>Views: {post.views} </p>
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