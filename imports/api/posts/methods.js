import {Meteor} from 'meteor/meteor'
import {Posts} from '/db';
import {PostTypesEnum} from '/imports/enums/postTypes';

Meteor.methods({
    'post.create'(post) {
        //validate post type
        if (Object.values(PostTypesEnum).indexOf(post.type) < 0){
           throw new Meteor.Error('no-type', 'This post type does not exist!');
        }

        post.createdAt = new Date();
        post.views = 0;
        post.comments = 0;

        Posts.insert(post);
    },

    'post.list' () {
        return Posts.find().fetch();
    },

    'post.edit' (_id, post) {
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

    'post.increment_views' (_id){
        Posts.update(_id,{
            $inc: {views: 1}
        });
    },

    'post.changeCommentsNumber' (_id, number){
        Posts.update(_id,{
            $inc: {comments: number}
        });
    },

    'post.remove' (_id){
        Posts.remove(_id);
    },

    'post.get' (_id) {
        let post = Posts.findOne(_id)
        if(post){
            return Posts.findOne(_id);
        }else{
            throw new Meteor.Error('no-id found', 'ID fals');
        }
    }
});