import {Comments} from '/db';
import {Meteor} from "meteor/meteor";

Meteor.publish('comments', (postId) => {
    return Comments.find({postId: postId});
});