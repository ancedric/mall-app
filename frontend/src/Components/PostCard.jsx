import { useEffect, useState } from "react";
import axios from "axios";
import PropTypes from "prop-types";
import { FetchSavedPosts } from "./SavedPosts";
import { user } from "../Authentication/user";

function PostCard({ postData }) {
  const [savedPosts, setSavedPosts] = useState([]);
  const [likes, setLikes] = useState(postData.likes);

  useEffect(() => {
    const fetchSavedPosts = async () => {
      const savedPosts = await FetchSavedPosts();
      setSavedPosts(savedPosts);
    };

    fetchSavedPosts();
  }, []);

  const [foundedLikedPost, setFoundedLikedPost] = useState(savedPosts.includes(postData.postId));

  const updateAddSavedPosts = async () => {
    const response = await axios.post("http://localhost:8081/savedPosts", {
      PostId: postData.postId,
      userId: user.id,
    });
    console.log(response);
  };
  const updateRemoveSavedPosts = async () => {
    const response = await axios.delete("http://localhost:8081/savedPosts", {
      PostId: postData.postId,
      userId: user.id,
    });
    console.log(response);
  };
  const updateLike = async () => {
    const updatedLikes = likes + 1;
    setLikes(updatedLikes);
    const response = await axios.put(
      `http://localhost:8081/posts/${postData.postId}`,
      {
        likes: updatedLikes,
      }
    );
    console.log(response);
  };
  const updateRemoveLike = async () => {
    const updatedLikes = likes - 1;
    setLikes(updatedLikes);
    const response = await axios.put(
      `http://localhost:8081/posts/${postData.postId}`,
      {
        likes: updatedLikes,
      }
    );
    console.log(response);
  };

  const handleLike = () => {
    if (foundedLikedPost) {
      setSavedPosts([...savedPosts, postData.postId]);
      setFoundedLikedPost(true);
      updateLike();
      updateAddSavedPosts();
    } else {
      const updatedLikedPosts = savedPosts.filter((postId) => postId !== postData.postId);
      setSavedPosts(updatedLikedPosts);
      setFoundedLikedPost(false);
      updateRemoveLike();
      updateRemoveSavedPosts();
    }
  };

  return (
    <div>
      <h3>{postData.author}</h3>
      <figure>
        <img
          src={postData.fileUrl}
          alt={postData.author}
          className="post-img"
        />
      </figure>
      <div className="post-body">
        <span>{postData.date}</span>
        <p className="post-content">{postData.content}</p>
        <div className="post-tags">
          {postData.tags &&
            postData.tags.split(" ").map((tag, index) => (
              <span key={index} className="tag">
                #{tag}
              </span>
            ))}
        </div>
        <div>
          {postData.catalogLink && (
            <div>
              <p>Go to catalog</p>
            </div>
          )}
        </div>
        <div className="divider"></div>
        <div className="post-actions">
        <button className="action" onClick={handleLike}>
          {foundedLikedPost ? (
            <div>
              <img src="frontend\src\assets\icons\liked.svg" alt="like" />
              {likes}
            </div>
          ) : (
            <div>
              <img src="frontend\src\assets\icons\like.svg" alt="like" />
              {likes}
            </div>
          )}
        </button>
          <button className="action">
            <img src="frontend\src\assets\icons\chat.svg" alt="chat" />
          </button>
          <button className="action">
            <img src="frontend\src\assets\icons\share.svg" alt="share" />
          </button>
        </div>
      </div>
    </div>
  );
}

PostCard.propTypes = {
  postData: PropTypes.shape({
    postId: PropTypes.number.isRequired,
    author: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    fileUrl: PropTypes.string.isRequired,
    catalogLink: PropTypes.boolean,
    likes: PropTypes.number.isRequired,
    comments: PropTypes.shape({
      comments: PropTypes.arrayOf(
        PropTypes.shape({
          id: PropTypes.number,
          author: PropTypes.string,
          content: PropTypes.string,
          date: PropTypes.number,
        })
      ).isRequired,
    }).isRequired,
    tags: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
    date: PropTypes.number.isRequired,
  }).isRequired,
};

export default PostCard;
