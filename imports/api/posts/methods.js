import {Meteor} from 'meteor/meteor'
import {Posts} from '/db';

Meteor.methods({
    'post.create'(post) {
        // Validation of date
        if(post.createdAt != (new Date())){
             post.createdAt = new Date();
        }

        //Number of views validation
        if(post.views){
            post.views = 0;
        }

        Posts.insert(post);
        console.log(post)
    },

    'post.list' () {
        console.log(Posts.find().fetch())
        return Posts.find().fetch();
    },

    'post.edit' (_id, post) {
        Posts.update(_id, {
            $set: {
                title: post.title,
                description: post.description
            }
        });
    },

    'post.remove' (_id){
        Posts.remove(_id);
    },

    'post.get' (_id) {
        return Posts.findOne(_id);
    }
});