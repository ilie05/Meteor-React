import {Comments, Posts} from '/db';

Comments.addLinks({
    'author': {
        type: 'one',
        collection: Meteor.users,
        field: 'userId',
    }
})

Comments.addLinks({
    onePost: {
        type: 'one',
        field: 'postId',
        collection: Posts,
    },
});