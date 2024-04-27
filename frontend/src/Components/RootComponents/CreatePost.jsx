import PostForm from "../forms/PostForm";

const CreatePost = () => {
  return (
    <div className="flex flex-1">
      <div className="common-container">
        <div className="create-post-div">
          <img
            src="frontend\src\assets\icons\add-post.svg"
            width={36}
            height={36}
            alt="add"
          />
          <h2 className="create-post-title">Create Post</h2>
        </div>

        <PostForm action="Create" />
      </div>
    </div>
  );
};

export default CreatePost;