import {Posts} from '/db';
import {Comments} from '/db';

Posts.addLinks({
    'author': {
        type: 'one',
        collection: Meteor.users,
        field: 'userId',
    }
})

Posts.addLinks({
    'comments': {
        type: 'many',
        collection: Comments,
        field: 'commentsIds',
    }
})
