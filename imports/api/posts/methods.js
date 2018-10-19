import {Meteor} from 'meteor/meteor'
import {Posts} from '/db';
import {Users} from '/db';
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
        const postMatch = Posts.findOne({_id: _id, userId: Meteor.userId()})
        console.log(postMatch)

        if(!postMatch){
            throw new Meteor.Error('no-post', 'This post does not exist!');
        }

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

    'post.get' (postId){
        let post = Posts.createQuery({
            $filters: {_id: postId},
            title: 1,
            type: 1,
            createdAt: 1,
            author: {
                emails: 1
            }
        });
        return post.fetchOne()
    }
});