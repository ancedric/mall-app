import { useEffect, useState } from "react";
import PostCard from "../PostCard";
import Loader from "../Loader";
import { FetchSavedPosts } from "../SavedPosts";

const Saved = () => {
  const [isPostLoading, setIsPostLoading] = useState(true);
  const [loadedPosts, setLoadedPosts] = useState([]);
  const [totalPosts, setTotalPosts] = useState(0);
  const [startIndex, setStartIndex] = useState(0);

  const postsPerPage = 5;

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const posts = await FetchSavedPosts(); // Utilisez await pour attendre la résolution de la promesse
        setLoadedPosts(posts.slice(startIndex, startIndex + postsPerPage));
        setTotalPosts(posts.length);
        setIsPostLoading(false);
        console.log(posts);
      } catch (error) {
        console.error("Error while fetching posts in Home.jsx :", error);
      }
    };

    fetchPosts();
  }, [startIndex]);
  
  const handleLoadMore = () => {
    setStartIndex(startIndex + postsPerPage);
  };

  return (
    <div className="home-feed">
      <div className="home-container">
        <div className="home-post">
          <h2 className="home-title">Saved posts</h2>
          {isPostLoading && loadedPosts.length === 0 ? (
            <Loader />
          ) : (
            <>
              {loadedPosts &&
                loadedPosts.map((post) => (
                  <div key={post.id} className="post-card">
                    <PostCard postData={post.saved} />
                  </div>
                ))}
              {loadedPosts.length < totalPosts && (
                <button onClick={handleLoadMore} className="load-more">
                  Load More
                </button>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Saved;
