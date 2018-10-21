import {Meteor} from 'meteor/meteor'
import Security from '/imports/api/security';
import CommentService from '/imports/api/comments/services/CommentService';

Meteor.methods({
	'secured.comment_create'(comment, postId){
		Security.checkLoggedIn(this.userId);
		CommentService.create(comment, postId);
	},

	'comment.list'(postId) {
		return CommentService.list(postId);
	},

	'comments_remove'(_id){
		CommentService.removeOnPostDelete(_id);
	},

	'secured.comment_remove' (comment){
		Security.checkLoggedIn(this.userId);
		CommentService.remove(comment);
	}
});