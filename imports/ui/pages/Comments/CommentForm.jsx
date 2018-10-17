import React from 'react'
import {AutoForm, LongTextField, TextField} from 'uniforms-unstyled';
import CommentSchema from '/db/comments/schema';

export default class CommentForm extends React.Component{
	constructor(props){
		super(props);
	}

	submitComment = (comment) => {
		Meteor.call('secured.comment_create', comment, this.props.postId, (err) => {
            if (err) {
                return alert(err.reason);
            }
        });
	}	
	
	render(){
		return(
            <div className='comment-form'>
				<AutoForm onSubmit={this.submitComment} schema={CommentSchema} >
					<LongTextField name='text' placeholder='Comment here...'/>
                    <button type='submit'>Add comment</button>
				</AutoForm>
			</div>		
		)
	}
}