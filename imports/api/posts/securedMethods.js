import {Meteor} from 'meteor/meteor'
import {Posts} from '/db';
import Security from '/imports/api/security';
import {PostTypesEnum} from '/imports/enums/postTypes';

Meteor.methods({
    'secured.post_create'(post) {
        Security.checkLoggedIn(this.userId);

        //validate post type
        if (Object.values(PostTypesEnum).indexOf(post.type) < 0){
           throw new Meteor.Error('no-type', 'This post type does not exist!');
        }

        post.createdAt = new Date();
        post.views = 0;
        post.comments = 0;
        post.userId = this.userId;

        Posts.insert(post);
    },

    'secured.post_list' () {
        return Posts.find().fetch();
    },

    'secured.post_edit' (_id, postData) {
        Posts.update({_id: _id, userId: this.userId}, {
            $set: {
                title: postData.title,
                description: postData.description
            }
        });
    },

    'secured.post_remove' (_id, userId){
        Security.checkLoggedIn(userId)
        if(userId == this.userId){
            Posts.remove({_id: _id});
            Meteor.call('comments_remove', postId);
        }else{
            throw new Meteor.Error('not-authorized ', 'You are not authorized to delete this post!')
        }
    },

    'secured.post_get' (_id) {
        return Posts.findOne(_id);
    }
});