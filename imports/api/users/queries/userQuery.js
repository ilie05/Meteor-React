import {Users} from '/db';
import {createQuery} from 'meteor/cultofcoders:grapher';

export default Users.createQuery({
	$filter({filters, params}) {
        if(params._id){
             filters._id = params._id;
        }
        if(params['emails.0.address']){
            filters['emails.0.address'] = params['emails.0.address'];
        }
	},
    emails: 1
});