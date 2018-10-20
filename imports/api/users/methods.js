import {Meteor} from 'meteor/meteor'
import {Users} from '/db';
import userQuery from '/imports/api/users/queries/userQuery';

Meteor.methods({
    'user.register' (data) {
        const query = userQuery.clone({'emails.0.address': data.email});

        if (query.fetchOne()) {
            throw new Meteor.Error(500, 'email_already_taken',
                'Email already taken');
        }

        Accounts.createUser({
            email: data.email,
            password: data.password
        });
    }
});