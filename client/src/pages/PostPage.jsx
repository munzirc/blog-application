import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Button, Spinner } from 'flowbite-react'
import CommentSection from '../components/CommentSection';
import PostCard from '../components/PostCard';

export default function PostPage() {

  const { postSlug } = useParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [post, setPost] = useState(null);
  const [recentPosts, setRecentPosts] = useState(null);


  useEffect(()=>{
      const fetchPost = async () =>{
        try {
          setLoading(true);
          const res = await fetch(`/api/post/getposts?slug=${postSlug}`);
          const data = await res.json();

          if(!res.ok){
            setError(true);
            setLoading(false);
            return;
          }
          if(res.ok){
            setPost(data.posts[0]);
            setError(false);
            setLoading(false);
          }
        } catch (error) {
          setError(true);
          setLoading(false);
        }
      };
      fetchPost();
  },[postSlug])


  useEffect(()=>{
    const fetchRecentPosts = async () => {
      try {
        const res = await fetch(`/api/post/getposts?limit=3&order=asc`);
        const data = await res.json();
        if(res.ok) {
          setRecentPosts(data.posts);
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchRecentPosts();
  },[])


  if(loading) return (
      <div className='flex justify-center items-center min-h-screen'>
      <Spinner size='xl' />
      </div>
  );


  return (
    <main className='p-3 flex flex-col max-w-full mx-auto min-h-screen overflow-hidden'>
      <h1 className='text-3xl mt-10 p-3 text-center font-serif max-w-2xl mx-auto lg:text-4xl'>
        {post && post.title}</h1>
      <Link to={`/search?category=${post && post.category}`} className='self-center mt-5'>
        <Button color='gray' pill size='xs'>{post && post.category}</Button>
      </Link>
      <img src={post && post.image} alt={post.title} className='mt-10 mb-10 max-h-[600px] w-full md:w-[70%] mx-auto object-cover shadow-md' />
      <div className='flex justify-between p-3 border-b  border-slate-500 mx-auto w-full max-w-3xl text-xs'>
          <span>{post && new Date(post.createdAt).toLocaleDateString()}</span>
          <span className='italic'>{post && (post.content.length / 1000).toFixed(0)} mins read</span>
      </div>
      <div className='p-3 max-w-3xl mx-auto w-full post-content' 
         dangerouslySetInnerHTML={{__html: post && post.content}}>
      </div>

      <CommentSection postId={post._id} />
      {/* ===========================recent articles============================= */}
      <div className='flex flex-col justify-center items-center mb-5'>
         <h1 className='text-xl mt-5'>Recent Articles</h1>
         <div className='flex flex-wrap gap-5 mt-5 justify-center'>
           { recentPosts && 
             recentPosts.map((recentpost) => (
                <PostCard key={recentpost._id} post={recentpost}/>
             ))
           }
         </div>
      </div>
    </main>
  )
}
