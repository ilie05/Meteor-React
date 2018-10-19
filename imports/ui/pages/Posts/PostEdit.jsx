import React from 'react';
import {AutoForm, AutoField, SelectField, LongTextField} from 'uniforms-unstyled';
import PostSchema from '/db/posts/schema';
import {PostTypesEnum, PostTypesEnumArray} from '/imports/enums/postTypes';
import NotFound from '../NotFound.jsx'

export default class PostEdit extends React.Component {
    constructor() {
        super();
        this.state = {
            post: {},
            error: {}
        }
    }

    componentDidMount() {
        Meteor.call('post.get', this.props.match.params._id, (err, gotPost) => {
            if(err){
                this.setState({error: err}) ;
            }else{
                this.setState({post: gotPost});
            }
        });
    }

    submit = (post) => {
        Meteor.call('post.edit', this.props.match.params._id, post, (err) => {
            if (err) {
                return alert(err.reason);
            }
            alert('Post modified!')
        });
    };

    render() {
        const {history} = this.props;
        const post = this.state.post;
        const error = this.state.error;

        if(!(Object.getOwnPropertyNames(error).length === 0)){
            return (
                <NotFound />
            )
        }else{
            if (!post) {
                return <div>Loading....</div>
            }

            return (
                <div className="post">
                    <AutoForm onSubmit={this.submit} schema={PostSchema} model={post}>
                        <AutoField name="title"/>
                        <LongTextField name="description"/>
                        <SelectField name="type" options={PostTypesEnumArray}/>
                        <button type='submit'>Edit post</button>
                        <button onClick={() => history.push('/posts')}>Back to posts</button>
                    </AutoForm>
                </div>
            )
        }
    }
}
