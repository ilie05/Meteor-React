import {Meteor} from 'meteor/meteor'
import Security from '/imports/api/security';
import PostService from '/imports/api/posts/services/PostService';

Meteor.methods({
    'secured.post_create'(post) {
        Security.checkLoggedIn(this.userId);
        PostService.create(post);
    },

    'secured.post_list' () {
        Security.checkLoggedIn(this.userId);
        return PostService.list();
    },

    'secured.post_edit' (_id, post) {
        Security.checkLoggedIn(this.userId);
        PostService.edit(_id, post);
    },

    'secured.post_remove' (_id, userId){
        Security.checkLoggedIn(userId)
        PostService.remove(_id, userId);
    },

    'secured.post_get' (_id) {
        Security.checkLoggedIn(this.userId);
        return PostService.get(_id);
    }
});