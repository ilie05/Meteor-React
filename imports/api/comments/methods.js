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
			Meteor.call('post.increment_comments', postId);
		}else{
			throw new Meteor.Error('invalid-post', 'the post does not exist')
		}
	},

	'comment.list'(postId) {
		return Comments.find({postId: postId}).fetch();
	},

	'comments_remove'(postId){
		Comments.remove({postId: postId})
	}
});