import {Meteor} from 'meteor/meteor'
import {Comments} from '/db';
import Security from '/imports/api/security';

Meteor.methods({
	'secured.comment_create'(comment, postId){
		Security.checkLoggedIn(this.userId);
		comment.userId = this.userId;
		comment.postId = postId;
		Comments.insert(comment);
		Meteor.call('post.increment_comments', postId);
	},

	'comment.list'(postId) {
		return Comments.find({postId: postId}).fetch();
	}
});