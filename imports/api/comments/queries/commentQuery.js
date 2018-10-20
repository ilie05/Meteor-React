import {Comments} from '/db';
import {createQuery} from 'meteor/cultofcoders:grapher';

export default Comments.createQuery('commentQuery',{
	    $filter({filters, params}) {
			if(params._id){
				filters._id = params._id;
			}
			if(params.postId){
				filters.postId = params.postId;
			}
	    },
        text: 1,
        author: {
			$filter({filters, params}){
				if(params.userId){
					filters_id = params.userId
				}
			},
            emails: 1
        }
});