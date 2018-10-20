import {Comments} from '/db';
import {createQuery} from 'meteor/cultofcoders:grapher';

export default Comments.createQuery('commentQuery',{
	    $filter({filters, params}) {
	        filters.postId = params.postId;
	    },
        text: 1,
        author: {
            emails: 1
        }
});