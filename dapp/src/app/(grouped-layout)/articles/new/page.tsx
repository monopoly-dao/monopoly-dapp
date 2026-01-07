'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useRef, useState } from 'react';
import { RiCloseLine, RiUpload2Line } from 'react-icons/ri';

import Button from '@/components/buttons/Button';
const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });
import dynamic from 'next/dynamic';
import toast from 'react-hot-toast';

import 'react-quill/dist/quill.snow.css';

import { useCreateArticleMutation } from '@/api/articles';
import { handleErrors } from '@/utils/error';

export default function Page() {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [formData, setFormData] = useState({
    title: '',
    published: false,
  });
  const [loading, setLoading] = useState(false);
  const [coverImage, setCoverImage] = useState<string | null>(null);
  const [coverImageFile, setCoverImageFile] = useState<File | null>(null);

  const [value, setValue] = useState('');
  const [createArticle, { isLoading }] = useCreateArticleMutation();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handlePublishChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      published: e.target.checked,
    }));
  };

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      toast.error('Please select a valid image file');
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast.error('Image size must be less than 5MB');
      return;
    }

    setCoverImageFile(file);

    // Create preview
    const reader = new FileReader();
    reader.onloadend = () => {
      setCoverImage(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const removeCoverImage = () => {
    setCoverImage(null);
    setCoverImageFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    if (!formData.title.trim())
      return toast.error('Please provide article title');
    if (!value.trim()) return toast.error('Please provide article content');

    const form = new FormData();
    form.set('title', formData.title);
    form.set('content', value);
    if (coverImageFile) form.set('cover', coverImageFile);
    form.set('status', formData.published ? 'published' : 'draft');

    try {
      await createArticle(form).unwrap();

      setTimeout(() => {
        router.push('/articles');
      }, 1500);
    } catch (error) {
      handleErrors(e);
    }
  };

  return (
    <section className='h-full overflow-y-auto px-[5%] lg:px-10 xl:px-20'>
      <h1 className='text-3xl font-serif tracking-tight font-bold text-gray-900 mb-6 mt-4 lg:mt-0'>
        Create Article
      </h1>

      <div className='max-w-2xl bg-white p-6 rounded-xl shadow-sm border'>
        <form onSubmit={handleSubmit} className='flex flex-col gap-6'>
          <div>
            <label
              htmlFor='title'
              className='block text-sm font-medium text-gray-700 mb-2'
            >
              Title
            </label>
            <input
              type='text'
              id='title'
              name='title'
              value={formData.title}
              onChange={handleChange}
              placeholder='Enter article title'
              required
              className='w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-navy'
            />
          </div>

          <div>
            <label className='block text-sm font-medium text-gray-700 mb-3'>
              Cover Image
            </label>

            {coverImage ? (
              <div className='relative group'>
                <div className='relative w-full h-48 rounded-lg overflow-hidden bg-gray-100 border border-gray-300'>
                  <Image
                    src={coverImage}
                    alt='Cover preview'
                    fill
                    className='object-cover'
                  />
                </div>
                <button
                  type='button'
                  onClick={removeCoverImage}
                  className='absolute top-2 right-2 bg-red-500 hover:bg-red-600 text-white rounded-full p-2 shadow-md transition-colors opacity-0 group-hover:opacity-100'
                >
                  <RiCloseLine size={18} />
                </button>
              </div>
            ) : (
              <div
                onClick={() => fileInputRef.current?.click()}
                className='border-2 border-dashed border-gray-300 rounded-lg p-8 text-center cursor-pointer hover:border-navy hover:bg-navy/5 transition-colors'
              >
                <RiUpload2Line className='mx-auto h-10 w-10 text-gray-400 mb-2' />
                <p className='text-sm font-medium text-gray-700'>
                  Click to upload cover image
                </p>
                <p className='text-xs text-gray-500 mt-1'>
                  PNG, JPG, GIF up to 5MB
                </p>
              </div>
            )}

            <input
              ref={fileInputRef}
              type='file'
              id='coverImage'
              accept='image/*'
              onChange={handleImageSelect}
              className='hidden'
              aria-label='Upload cover image'
            />
          </div>

          <div>
            <label
              htmlFor='content'
              className='block text-sm font-medium text-gray-700 mb-2'
            >
              Content
            </label>

            <ReactQuill value={value} onChange={setValue} />
          </div>

          <div className='flex items-center gap-3'>
            <input
              type='checkbox'
              id='published'
              name='published'
              checked={formData.published}
              onChange={handlePublishChange}
              className='w-4 h-4 rounded border-gray-300'
            />
            <label
              htmlFor='published'
              className='text-sm font-medium text-gray-700'
            >
              Publish immediately
            </label>
          </div>

          <div className='flex gap-3'>
            <Button
              type='submit'
              isLoading={isLoading}
              disabled={isLoading}
              className='!py-2 px-4'
            >
              {loading ? 'Creating...' : 'Create Article'}
            </Button>
            <Button
              type='button'
              variant='outline'
              className='!py-2 px-4 border-gray-500'
              onClick={() => router.back()}
            >
              Cancel
            </Button>
          </div>
        </form>
      </div>
    </section>
  );
}
