import { CommentProps } from '@/types';

interface SingleCommentProps {
  comment: CommentProps;
}

const SingleComment = ({ comment }: SingleCommentProps) => {
  return (
    <div>
      <h1>{comment.commenter.userName}</h1>
      <input value={comment.content} />
    </div>
  );
};

export default SingleComment;
