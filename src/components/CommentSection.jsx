import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { UserIcon, StarIcon } from '../assets/icons';
import { formatDate, getInitials } from '../utils/helpers';
import './CommentSection.css';

const CommentSection = ({ comments = [], onAddComment, rideId, allowPosting = true }) => {
  const { user, isAuthenticated } = useApp();
  const [newComment, setNewComment] = useState('');
  const [rating, setRating] = useState(5);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    setIsSubmitting(true);
    try {
      await onAddComment({
        rideId,
        text: newComment,
        rating,
        userId: user?.id,
      });
      setNewComment('');
      setRating(5);
    } catch (error) {
      console.error('Error adding comment:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="comment-section">
      <h3 className="comment-title">
        Comments ({comments.length})
      </h3>

      {isAuthenticated && allowPosting && (
        <form onSubmit={handleSubmit} className="comment-form">
          <div className="comment-user">
            <div className="user-avatar">
              {user?.avatar ? (
                <img src={user.avatar} alt={user.name} />
              ) : (
                <span>{getInitials(user?.name)}</span>
              )}
            </div>
            <span className="user-name">{user?.name}</span>
          </div>

          <div className="rating-input">
            <label>Rating:</label>
            <div className="stars">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  className={`star-btn ${star <= rating ? 'active' : ''}`}
                  onClick={() => setRating(star)}
                >
                  <StarIcon filled={star <= rating} />
                </button>
              ))}
            </div>
          </div>

          <textarea
            className="comment-input"
            placeholder="Share your experience..."
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            rows="3"
            required
          />

          <button
            type="submit"
            className="btn btn-primary"
            disabled={isSubmitting || !newComment.trim()}
          >
            {isSubmitting ? 'Posting...' : 'Post Comment'}
          </button>
        </form>
      )}

      <div className="comments-list">
        {comments.length > 0 ? (
          comments.map((comment) => (
            <div key={comment.id} className="comment-item">
              <div className="comment-header">
                <div className="comment-author">
                  <div className="author-avatar">
                    {comment.user?.avatar ? (
                      <img src={comment.user.avatar} alt={comment.user.name} />
                    ) : (
                      <span>{getInitials(comment.user?.name)}</span>
                    )}
                  </div>
                  <div className="author-info">
                    <span className="author-name">{comment.user?.name}</span>
                    <span className="comment-date">{formatDate(comment.createdAt)}</span>
                  </div>
                </div>
                
                {comment.rating && (
                  <div className="comment-rating">
                    {[...Array(5)].map((_, i) => (
                      <StarIcon key={i} filled={i < comment.rating} />
                    ))}
                  </div>
                )}
              </div>
              
              <p className="comment-text">{comment.text}</p>
            </div>
          ))
        ) : (
          <p className="no-comments">No comments yet. Be the first to share your thoughts!</p>
        )}
      </div>
    </div>
  );
};

export default CommentSection;
