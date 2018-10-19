import React from 'react';
import Button from '../Button'

export default class PostList extends React.Component {
    constructor() {
        super();
        this.state = {posts: null};
    }

    componentDidMount() {
        Meteor.call('post.list', (err, posts) => {
            this.setState({posts});
        });
    }

    render() {
        const {posts} = this.state;
        const {history} = this.props;

        if (!posts) {
            return <div>Loading....</div>
        }

        return (
            <div className="post">
                {
                    posts.map((post) => {

                        if(post.userId == Meteor.userId()){
                            var button = <Button onClick={() => {
                                    history.push("/posts/edit/" + post._id)
                                }}
                            label="Edit post"
                            />
                        }

                        return (
                            <div key={post._id}>
                                <p>Post id: {post._id} </p>
                                <p>Post title: {post.title} </p>
                                <p onClick={() => history.push('/posts/view/' + post._id)}>Post Description: {post.description} </p>
                                <p>Post Type: {post.type} </p>
                                <p>Post Date: {post.createdAt.toString()} </p>
                                <p>Views: {post.views} </p>
                                <p>Comments: {post.comments} </p>
                                {button}
                            </div>
                        )
                    })
                }
                <button onClick={() => history.push('/posts/create')}>Create a new post</button>
            </div>
        )
    }
}
