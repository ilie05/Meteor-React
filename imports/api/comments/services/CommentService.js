import {Meteor} from 'meteor/meteor'
import {Comments} from '/db';
import commentQuery from '/imports/api/comments/queries/commentQuery';
import postQuery from '/imports/api/posts/queries/postQuery';

export default class CommentService{
	static create(comment, postId){
		const query = postQuery.clone({_id: postId});
        const post = query.fetchOne();
		//check is the post wasn't deleted 
		if(post){
			comment.userId = Meteor.userId();
			comment.postId = postId;
			Comments.insert(comment);
			Meteor.call('post.changeCommentsNumber', postId, 1);
		}else{
			throw new Meteor.Error('invalid-post', 'the post does not exist')
		}
	}

	static list(postId) {
		const query = commentQuery.clone({postId: postId});
		return query.fetch();
	}

	static removeOnPostDelete(_id){
		Comments.remove({postId:_id});
	}

	static remove(comment){
		//null if the comment user is not logged in
		const checkUserCommentQuery = (commentQuery.clone({_id: comment._id, userId: Meteor.userId()})).fetchOne();

		//null if the  post does not belong to the logged in user
		const checkPostOwnerQuery = (postQuery.clone({_id: comment.postId,userId: Meteor.userId()})).fetchOne();

		if(checkUserCommentQuery || checkPostOwnerQuery){
			Comments.remove({_id: comment._id})
			Meteor.call('post.changeCommentsNumber', comment.postId, -1);
		}else{
			throw new Meteor.Error('invalid-action', 'the comment does not exist or you are not authorized to delete it')
		}
	}
}