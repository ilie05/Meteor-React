import {Comments} from '/db';

Comments.addLinks({
    'author': {
        type: 'one',
        collection: Meteor.users,
        field: 'userId',
    }
})