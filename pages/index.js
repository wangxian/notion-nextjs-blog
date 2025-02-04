import Image from 'next/image'
import Container from '../components/Container'
import Link from 'next/link'
import { getNotionData } from '../lib/getNotionData'

export default function Home({ posts }) {
  return (
    <Container
      title="说说"
      description="说说，基于 Notion 和 Next.js 的个人博客，发布一些简短话语～"
    >
      <div className="max-w-2xl mx-auto mb-16">
        <div className="flex justify-center items-center mb-4 max-w-sm mx-auto">
          发布一些，个人日常动态，简短博客
        </div>

        <h2 className="font-bold text-2xl md:text-3xl tracking-tight mb-4 mt-8 text-black">
          Posts Timeline
        </h2>

        {!posts.length && <p className="text-gray-600 mb-4">No posts found.</p>}

        {posts.map((post) => {
          return (
            <Link key={post.id} href={`/${post.properties.Slug.rich_text[0].plain_text}`}>
              <a className="w-full">
                <div className="mb-8 w-full">
                <span className="text-sm text-gray-700">
                  {new Date(post.properties.Date.date ? post.properties.Date.date.start : post.created_time).toLocaleString('en-US', {
                    month: 'short',
                    day: '2-digit',
                    year: 'numeric',
                  })}
                  </span>

                  <h3 className="text-xl font-medium w-full text-gray-900">
                    {post.properties.Post.title[0].plain_text}
                  </h3>

                  <p className="text-gray-700 text-md">
                    {post.properties.Description.rich_text.length>0 ? post.properties.Description.rich_text[0].plain_text : ''}
                  </p>
                </div>
              </a>
            </Link>
          )
        })}
      </div>
    </Container>
  )
}

export const getStaticProps = async () => {
  const database = await getNotionData(process.env.NOTION_DATABASE_ID)

  // console.log(database);

  return {
    props: {
      posts: database,
    },
  }
}
