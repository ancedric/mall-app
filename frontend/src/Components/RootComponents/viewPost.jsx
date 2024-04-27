import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Comment from "../Comment";
import axios from "axios";
import Loader from "../Loader";
import PostCard from "../PostCard";

function ViewPost() {
  const { postId } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [post, setPost] = useState(null);

  useEffect(() => {
    const fetchPostAndComments = async () => {
      try {
        // Fetch post by ID
        const response = await axios.get(`http://localhost:8081/get-post/${postId}`);
        const postData = await response.data.post
        setPost(postData);

        setIsLoading(false);
      } catch (error) {
        console.error("Error while fetching post and comments:", error);
      }
    };

    if(!post) {fetchPostAndComments();}
  }, [postId, post]);

  return (
    <div className="view-post">
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <div className='post-card' >
            <PostCard postData={post} />
          </div>
          
          <div>
            <h3>Comments</h3>
            {
              post.comments.length === 0 ?
                <p>No Comment...</p>
              :
                post.comments.map((comment) => (
                  <Comment key={comment.id} commentData={comment} />
              ))
            }
          </div>
        </>
      )}
    </div>
  );
}

export default ViewPost;