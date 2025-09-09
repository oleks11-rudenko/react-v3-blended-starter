import { fetchPosts, fetchUserById } from '@/lib/api';
import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
import PostsClient from './Posts.client';

interface PostsPageProps {
  params: Promise<{ slug: string[] }>;
}

export async function generateMetadata({ params }: PostsPageProps) {
  const { slug } = await params;
  const userId = slug[0];
  const user = await fetchUserById(Number(userId));

  return {
    title: userId === 'All' ? 'Posts - All Users' : `Posts - User ${user.name}`,
  };
}

export default async function PostsPage({ params }: PostsPageProps) {
  const { slug } = await params;
  const userId = slug[0];

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['posts', { searchText: '', page: 1, userId }],
    queryFn: () => fetchPosts({ searchText: '', page: 1, ...(userId !== 'All' && { userId }) }),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <PostsClient userId={userId} />
    </HydrationBoundary>
  );
}
