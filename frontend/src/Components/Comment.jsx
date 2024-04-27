import PropTypes from 'prop-types';

function Comment({ commentData }) {
  return (
    <div className="comment">
      <div className="comment-author">{commentData.author}</div>
      <div className="comment-content">{commentData.content}</div>
    </div>
  );
}

Comment.propTypes = {
  commentData: PropTypes.shape({
    author: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
  }).isRequired,
}

export default Comment;