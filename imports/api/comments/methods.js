import {Meteor} from 'meteor/meteor'
import {Comments} from '/db';
import {Posts} from '/db';
import Security from '/imports/api/security';
import commentQuery from '/imports/api/comments/queries/commentQuery';
import postQuery from '/imports/api/posts/queries/postQuery';

Meteor.methods({
	'secured.comment_create'(comment, postId){
		Security.checkLoggedIn(this.userId);
		const query = postQuery.clone({_id: postId});
        post = query.fetchOne();
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
		const query = commentQuery.clone({postId: postId});

		return query.fetch();
	},

	'comments_remove'(postId){
		Comments.remove({postId: postId})
	},

	'secured.comment_remove' (comment){
		Security.checkLoggedIn(this.userId);

		//null if the comment user is not logged in
		const checkUserCommentQuery = (commentQuery.clone({_id: comment._id, userId: this.userId})).fetchOne();

		//null if the  post does not belong to the logged in user
		const checkPostOwnerQuery = (postQuery.clone({_id: comment.postId,userId: this.userId})).fetchOne();

		if(checkUserCommentQuery || checkPostOwnerQuery){
			Comments.remove({_id: comment._id})
			Meteor.call('post.changeCommentsNumber', comment.postId, -1);
		}else{
			throw new Meteor.Error('invalid-action', 'the comment does not exist or you are not authorized to delete it')
		}
	}
});