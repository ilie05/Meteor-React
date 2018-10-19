import {Meteor} from 'meteor/meteor'
import {Comments} from '/db';
import {Posts} from '/db';
import Security from '/imports/api/security';

Meteor.methods({
	'secured.comment_create'(comment, postId){
		Security.checkLoggedIn(this.userId);
		const post = Posts.findOne({_id: postId})
		//check is the post wasn't deleted 
		if(post){
			comment.userId = this.userId;
			comment.postId = postId;
			Comments.insert(comment);
			Meteor.call('post.changeCommentsNumber', postId, 1);
		}else{
			throw new Meteor.Error('invalid-post', 'the post does not exist')
		}
	},

	'comment.list'(postId) {
		return Comments.find({postId: postId}).fetch();
	},

	'comments_remove'(postId){
		Comments.remove({postId: postId})
	},

	'secured.comment_remove' (comment){
		Security.checkLoggedIn(this.userId);

		//null if the comment user is not logged in
		const checkUserComment = Comments.findOne({_id: comment._id, userId: this.userId})

		//null if the  post does not belong to the logged in user
		const checkPostOwner = Posts.findOne({_id: comment.postId,userId: this.userId})

		if(checkUserComment || checkPostOwner){
			Comments.remove({_id: comment._id})
			Meteor.call('post.changeCommentsNumber', comment.postId, -1);
		}else{
			throw new Meteor.Error('invalid-action', 'the comment does not exist or you are not authorized to delete it')
		}
	}
});