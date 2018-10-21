import {Comments, Posts} from '/db';

Posts.addLinks({
    'author': {
        type: 'one',
        collection: Meteor.users,
        field: 'userId',
    }
})

Posts.addLinks({
    allComments: {
        collection: Comments,
        inversedBy: 'onePost',
    }
})
