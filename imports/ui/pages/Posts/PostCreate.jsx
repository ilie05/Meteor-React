import React from 'react';
import {AutoForm, AutoField, LongTextField, SelectField, DateField, NumField} from 'uniforms-unstyled';
import PostSchema from '/db/posts/schema';

export default class PostCreate extends React.Component {
    constructor() {
        super();
        this.options = [
            {value: '', label: ''},
            {value: 'Nature', label: 'Nature'},
            {value: 'Psychology', label: 'Psychology'},
            {value: 'Music', label: 'Music'},
            {value: 'Programming', label: 'Programming'},
            {value: 'Project Management', label: 'Project Management'},
            {value: 'Other', label: 'Other'}
        ];
    }

    submit = (post) => {
        Meteor.call('post.create', post, (err) => {
            if (err) {
                return alert(err.reason);
            }
            alert('Post added!')
        });
    };

    render() {
        const {history} = this.props;

        return (
            <div className="post">
                <AutoForm onSubmit={this.submit} schema={PostSchema}>
                    <AutoField name="title"/>
                    <LongTextField name="description"/>
                    <DateField name="createdAt" value = {new Date()} hidden={true}/>
                    <NumField name="views" value='0' hidden={true}/>
                    <SelectField name="type" options={this.options}/>
                    <button type='submit'>Add post</button>
                    <button onClick={() => history.push('/posts')}>Back to posts</button>
                </AutoForm>
            </div>
        )
    }
}
