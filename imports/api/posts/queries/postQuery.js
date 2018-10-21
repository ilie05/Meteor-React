import {Posts} from '/db';
import {createQuery} from 'meteor/cultofcoders:grapher';

export default Posts.createQuery('postQuery', {
		$filter({filters, params}) {
            if(params._id){
		      filters._id = params._id;
          }
		},
        title: 1,
        description: 1,
        views: 1,
        comments: 1,
        type: 1,
        author: {
            $filter({filters, params}) {
                if(params.userId){
                    filters._id = params.userId;
                }
            },
            emails: 1
        }
});