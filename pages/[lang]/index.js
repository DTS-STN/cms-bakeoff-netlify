import Head from 'next/head'
import Layout, { siteTitle } from '../../components/layout'
import utilStyles from '../../styles/utils.module.css'
import { getSortedPostData } from '../../lib/posts'
import Link from 'next/link'
import Date from '../../components/date'
import { useRouter } from 'next/router'

export async function getStaticProps(ctx) {
  const allPostsData = getSortedPostData();
  return {
    props: {
      locale: ctx.params?.lang || "fr",
      allPostsData,
    },
  };
}

// Generates static files on export
export async function getStaticPaths() {
  // All supported languages must be listed in 'paths'.
  // If not informed, the static page will not be generated.
  return {
    paths: [{ params: { lang: "en" } }, { params: { lang: "fr" } }],
    fallback: false,
  }
}

export default function Home(props) {
  
  const allPostsData = props.allPostsData

  const languageFilteredPosts = () => {
    return allPostsData[0] === undefined ? null : 
    allPostsData.map(({ id, date, title, lang }) => {if (lang === props.locale) return(
      <li className={utilStyles.listItem} key={id}>
        <Link href={`/posts/${id}`}>
          <a>{title}</a>
        </Link>
        <br />
        <small className={utilStyles.lightText}>
          <Date dateString={date} />
        </small>
      </li>
    )
  })
  }

  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
        <script src="https://identity.netlify.com/v1/netlify-identity-widget.js"></script>
      </Head>
      <section className={utilStyles.headingMd}>
        <p>Web dev learning Next.js</p>
        <p>
          (This is a sample website - you’ll be building a site like this on{" "}
          <a href="https://nextjs.org/learn">our Next.js tutorial</a>.)
        </p>
      </section>
      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        <h2 className={utilStyles.headingLg}>Blog</h2>
        <ul className={utilStyles.list}>{languageFilteredPosts()}</ul>
      </section>
    </Layout>
  );
}
