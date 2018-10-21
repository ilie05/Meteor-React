import {Meteor} from 'meteor/meteor'
import {Posts} from '/db';
import {PostTypesEnum} from '/imports/enums/postTypes';
import postQuery from '/imports/api/posts/queries/postQuery';

export default class PostService{
    static create(post) {
        //validate post type
        if (Object.values(PostTypesEnum).indexOf(post.type) < 0){
           throw new Meteor.Error('no-type', 'This post type does not exist!');
        }

        post.createdAt = new Date();
        post.views = 0;
        post.comments = 0;
        post.userId = Meteor.userId();

        Posts.insert(post);
    }

    static list() {
        const query = postQuery.clone();
        return query.fetch();
    }

    static edit(_id, post) {
        const query = postQuery.clone({_id: _id, userId: Meteor.userId()});
        const postMatch = query.fetchOne();

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
    }

    static remove(_id, userId){
        if(userId == Meteor.userId()){
            Meteor.call('comments_remove', _id);
            Posts.remove({_id: _id});
        }else{
            throw new Meteor.Error('not-authorized ', 'You are not authorized to delete this post!')
        }
    }

    static get(_id) {
        const query = postQuery.clone({_id:_id});
        if(!query.fetchOne()){
             throw new Meteor.Error('no-post', 'This post does not exist!');
        }

        return query.fetchOne();
    }

    static increment_views(_id){
        Posts.update(_id,{
            $inc: {views: 1}
        });
    }

    static changeCommentsNumber(_id, number){
        Posts.update(_id,{
            $inc: {comments: number}
        });
    }
}