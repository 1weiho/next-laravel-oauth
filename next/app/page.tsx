import { BlogPostList } from '@/components/blog-post-list';
import axios from '@/lib/axios';

const getData = async () => {
  const res = await axios.get('/api/posts');

  return res.data;
};

export default async function Home() {
  const data = await getData();

  return <BlogPostList posts={data} />;
}
