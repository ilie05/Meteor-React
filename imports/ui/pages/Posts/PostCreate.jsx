import React from 'react';
import {AutoForm, AutoField, LongTextField, SelectField} from 'uniforms-unstyled';
import PostSchema from '/db/posts/schema';
import {PostTypesEnum, PostTypesEnumArray} from '/imports/enums/postTypes';

export default class PostCreate extends React.Component {
    constructor() {
        super();
    }

    submit = (post) => {
        Meteor.call('secured.post_create', post, (err) => {
            if (err) {
                return alert(err.reason);
            }
            alert('Post added!')
            this.props.history.push('/posts')
        });
    };

    render() {
        const {history} = this.props;

        return (
            <div className="post">
                <AutoForm onSubmit={this.submit} schema={PostSchema}>
                    <AutoField name="title"/>
                    <LongTextField name="description"/>
                    <SelectField name="type" options={PostTypesEnumArray}/>
                    <button type='submit'>Add post</button>
                    <button onClick={() => history.push('/posts')}>Back to posts</button>
                </AutoForm>
            </div>
        )
    }
}
