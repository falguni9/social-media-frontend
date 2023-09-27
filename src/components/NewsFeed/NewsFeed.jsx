import React, { useState, useEffect } from 'react';
import axios from 'axios';
import FriendRequests from '../FriendRequest'
function NewsFeed() {
  const [posts, setPosts] = useState([]);
  const [newPost, setNewPost] = useState({
    content: '',
    taggedUsers: [],
  });

  useEffect(() => {
    // Fetch user's news feed from the backend
    axios.get('http://localhost:3000/api/post/feed')
      .then((response) => {
        setPosts(response.data);
      })
      .catch((error) => {
        console.error('Error fetching news feed:', error);
      });
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewPost({ ...newPost, [name]: value });
  };

  const handleTagUser = (e) => {
    const { value } = e.target;
    if (!newPost.taggedUsers.includes(value)) {
      setNewPost({ ...newPost, taggedUsers: [...newPost.taggedUsers, value] });
    }
  };

  const handleCreatePost = async () => {
    try {
      // Send the new post data to the backend
      const response = await axios.post('http://localhost:3000/api/news-feed/create-post', newPost);
      console.log('Post creation successful:', response.data);
      setPosts([response.data, ...posts]); // Update the news feed with the new post
      setNewPost({ content: '', taggedUsers: [] }); // Clear the input fields
    } catch (error) {
      console.error('Post creation error:', error.response.data);
    }
  };

  return (
    <div className="container mt-4">
        <FriendRequests/>
      <h2>News Feed</h2>
      <div className="row">
        <div className="col-md-6">
          <h3>Create a Post</h3>
          <form>
            <div className="form-group">
              <textarea
                className="form-control"
                name="content"
                placeholder="What's on your mind?"
                value={newPost.content}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label>Tag Users</label>
              <input
                type="text"
                className="form-control"
                name="taggedUsers"
                placeholder="Tag users (comma-separated)"
                value={newPost.taggedUsers.join(',')}
                onChange={handleInputChange}
                onBlur={handleTagUser}
              />
            </div>
            <button
              type="button"
              className="btn btn-primary"
              onClick={handleCreatePost}
            >
              Post
            </button>
          </form>
        </div>
        <div className="col-md-6">
          <h3>Recent Posts</h3>
          {posts.map((post) => (
            <div key={post._id} className="card mb-3">
              <div className="card-body">
                <p>{post.content}</p>
                <p>Tagged Users: {post.taggedUsers.join(', ')}</p>
                {/* Display other post information here */}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default NewsFeed;
