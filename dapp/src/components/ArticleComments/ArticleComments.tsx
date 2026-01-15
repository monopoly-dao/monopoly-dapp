'use client';

import { useFormik } from 'formik';
import { AnimatePresence, motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { MdDelete, MdSend, MdVerifiedUser } from 'react-icons/md';
import * as Yup from 'yup';

import { cn } from '@/lib/utils';

import Button from '@/components/buttons/Button';
import MultiLine from '@/components/input/multi-line';

import {
  useAddArticleCommentMutation,
  useDeleteArticleCommentMutation,
} from '@/api/articles';
import { ArticleComment } from '@/api/articles/articles-types.server';
import { useGetUserDetailsQuery } from '@/api/profile';
import { handleErrors } from '@/utils/error';

interface ArticleCommentsProps {
  articleId: string;
  comments: ArticleComment[];
}

const commentValidationSchema = Yup.object({
  content: Yup.string()
    .required('Comment cannot be empty')
    .min(3, 'Comment must be at least 3 characters')
    .max(1000, 'Comment must not exceed 1000 characters'),
});

export default function ArticleComments({
  articleId,
  comments,
}: ArticleCommentsProps) {
  const { data: session, status } = useSession();
  const router = useRouter();
  const isLoggedIn = status === 'authenticated';
  const userFirebaseId = session?.userFirebaseId || ';';
  const [addComment, { isLoading: isAddingComment }] =
    useAddArticleCommentMutation();
  const [deleteComment, { isLoading: isDeletingComment }] =
    useDeleteArticleCommentMutation();
  const [deletingCommentId, setDeletingCommentId] = useState<string | null>(
    null
  );

  const { data: profileData } = useGetUserDetailsQuery(userFirebaseId, {
    skip: !isLoggedIn,
  });
  const userDetails = profileData?.data;

  function redirectToLogin() {
    router.push(`/login?redirectUrl=/articles/${articleId}`);
  }

  const formik = useFormik({
    initialValues: {
      content: '',
    },
    validationSchema: commentValidationSchema,
    onSubmit: async (values, { resetForm }) => {
      if (!isLoggedIn) {
        toast.error('Please sign in to comment');
        return;
      }

      try {
        await addComment({
          articleId,
          content: values.content,
          userFirebaseId,
          author: userDetails?.firstName
            ? `${userDetails?.firstName} ${userDetails?.lastName}`
            : '',
        }).unwrap();

        toast.success('Comment added successfully!');
        resetForm();
      } catch (error) {
        handleErrors(error);
      }
    },
  });

  const handleDeleteComment = async (commentId: string) => {
    if (!window.confirm('Are you sure you want to delete this comment?')) {
      return;
    }

    setDeletingCommentId(commentId);
    try {
      await deleteComment({
        articleId,
        commentId,
        userFirebaseId,
      }).unwrap();

      toast.success('Comment deleted successfully!');
    } catch (error) {
      handleErrors(error);
    } finally {
      setDeletingCommentId(null);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div className='mt-12 space-y-8'>
      {/* Comments Header */}
      <div className='border-b border-gray-200 pb-6'>
        <h2 className='text-2xl font-bold text-gray-900 mb-2'>Comments</h2>
        <p className='text-sm text-gray-600'>
          {comments.length} {comments.length === 1 ? 'comment' : 'comments'}
        </p>
      </div>

      {/* Comment Input Section */}
      {isLoggedIn ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className='bg-gradient-to-br from-blue-50 to-indigo-50 p-6 rounded-xl border border-blue-100'
        >
          <form onSubmit={formik.handleSubmit} className='space-y-4'>
            <div className='flex items-center gap-3 mb-4'>
              <div className='w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-indigo-600 flex items-center justify-center'>
                <span className='text-white font-semibold text-sm'>
                  {session?.user?.name?.charAt(0) || 'U'}
                </span>
              </div>
              <div>
                <p className='font-semibold text-gray-900 text-sm'>
                  {session?.user?.name || 'Anonymous'}
                </p>
                <p className='text-xs text-gray-600'>{session?.user?.email}</p>
              </div>
            </div>

            <MultiLine
              id='content'
              placeholder='Share your thoughts about this article...'
              rows={4}
              variant='primary'
              {...formik.getFieldProps('content')}
              error={formik.touched.content ? formik.errors.content : ''}
              touched={formik.touched.content}
            />

            <div className='flex justify-end gap-3'>
              <Button
                type='button'
                variant='outline'
                onClick={() => formik.resetForm()}
                disabled={!formik.dirty || isAddingComment}
              >
                Cancel
              </Button>
              <Button
                type='submit'
                variant='primary'
                isLoading={isAddingComment}
                rightIcon={MdSend}
                disabled={!formik.isValid || !formik.dirty}
              >
                Post Comment
              </Button>
            </div>
          </form>
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className='bg-amber-50 border border-amber-200 p-6 rounded-xl text-center'
        >
          <p className='text-gray-700 mb-4'>
            Sign in to participate in the discussion
          </p>
          <Button variant='primary' onClick={redirectToLogin}>
            Sign In to Comment
          </Button>
        </motion.div>
      )}

      {/* Comments List */}
      <div className='space-y-4'>
        <AnimatePresence>
          {comments.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className='text-center py-12 text-gray-500'
            >
              <p className='text-lg font-medium'>No comments yet</p>
              <p className='text-sm'>Be the first to share your thoughts!</p>
            </motion.div>
          ) : (
            comments.map((comment, index) => (
              <motion.div
                key={comment._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ delay: index * 0.1 }}
                className={cn(
                  'bg-white rounded-lg border border-gray-200 p-4 hover:shadow-md transition-shadow duration-200',
                  deletingCommentId === comment._id && 'opacity-50'
                )}
              >
                <div className='flex justify-between items-start mb-3'>
                  <div className='flex-1'>
                    <div className='flex items-center gap-2 mb-1'>
                      <p className='font-semibold text-gray-900 text-sm'>
                        {comment?.author || 'Anonymous'}
                      </p>
                      <span className='text-blue-500 text-lg'>
                        <MdVerifiedUser />
                      </span>
                    </div>
                    <p className='text-xs text-gray-500'>
                      {formatDate(comment.createdAt)}
                    </p>
                  </div>

                  {/* Delete Button */}
                  {isLoggedIn && session?.userFirebaseId === comment.userId && (
                    <button
                      onClick={() => handleDeleteComment(comment._id)}
                      disabled={isDeletingComment}
                      className='ml-2 p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed'
                      title='Delete comment'
                    >
                      <MdDelete className='text-lg' />
                    </button>
                  )}
                </div>

                <p className='text-gray-700 text-sm leading-relaxed whitespace-pre-wrap'>
                  {comment.content}
                </p>

                {comment.updatedAt !== comment.createdAt && (
                  <p className='text-xs text-gray-500 mt-2 italic'>(edited)</p>
                )}
              </motion.div>
            ))
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
