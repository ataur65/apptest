export default function SingleBlogPostPage({ params }: { params: { id: string } }) {
  return <div>Blog post ID: {params.id}</div>;
}
