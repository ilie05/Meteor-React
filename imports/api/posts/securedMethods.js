import {Meteor} from 'meteor/meteor'
import {Posts} from '/db';
import Security from '/imports/api/security';
import {PostTypesEnum} from '/imports/enums/postTypes';
import postQuery from '/imports/api/posts/queries/postQuery';

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
        Security.checkLoggedIn(this.userId);
        const query = postQuery.clone();

        return query.fetch();
    },

    'secured.post_edit' (_id, post) {
        Security.checkLoggedIn(this.userId);
        const query = postQuery.clone({_id: _id, userId: Meteor.userId()});
        postMatch = query.fetchOne();

        if(!postMatch){
            throw new Meteor.Error('no-post', 'This post does not exist!');
        }
        //validate post type
        if (Object.values(PostTypesEnum).indexOf(post.type) < 0){
           throw new Meteor.Error('no-type', 'This post type does not exist!');
        }

        Posts.update(_id, {
            $set: {
                title: post.title,
                description: post.description,
                type: post.type,
                createdAt: new Date()
            }
        });
    },

    'secured.post_remove' (_id, userId){
        Security.checkLoggedIn(userId)
        if(userId == this.userId){
            Posts.remove({_id: _id});
            Meteor.call('comments_remove', _id);
        }else{
            throw new Meteor.Error('not-authorized ', 'You are not authorized to delete this post!')
        }
    },

    'secured.post_get' (_id) {
        Security.checkLoggedIn(this.userId);
        const query = postQuery.clone({_id:_id});
        if(!query.fetchOne()){
             throw new Meteor.Error('no-post', 'This post does not exist!');
        }

        return query.fetchOne();
    }
});