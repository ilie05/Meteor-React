import {Meteor} from 'meteor/meteor'
import PostService from '/imports/api/posts/services/PostService';

Meteor.methods({
    'post.create'(post) {
        PostService.post_create(post);
    },

    'post.list' () {
        return PostService.list();
    },

    'post.edit' (_id, post) {
        PostService.edit(_id, post);
    },

    'post.increment_views' (_id){
        PostService.increment_views(_id)
    },

    'post.changeCommentsNumber' (_id, number){
        PostService.changeCommentsNumber(_id, number);
    },

    'post.remove' (_id){
        PostService.remove(_id)
    },

    'post.get' (postId){
        return PostService.get(_id);
    }
});