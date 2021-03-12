import Head from 'next/head'
import React, { useState } from 'react';
import Layout, { siteTitle } from '../components/layout'
import ToggleButton from '../components/toggleButton'
import utilStyles from '../styles/utils.module.css'
import { getSortedPostsData } from '../lib/posts'
import Link from 'next/link'
import Date from '../components/date'

export async function getStaticProps() {
  const allPostsData = getSortedPostsData()
  return {
    props: {
      allPostsData
    }
  }
}

export default function Home({ allPostsData }) {
  const [language, setLanguage] = useState("en");
  const toggleLanguage = (language) =>{
    language === "fr"?setLanguage("en"):setLanguage("fr")
  }
  const languageFilteredPosts = () =>{
    return allPostsData[0] === undefined ? null : 
    allPostsData.map(({ id, date, title }) => {if (id.slice(-2) === language) return(
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
      <ToggleButton language={language} toggleLanguage={toggleLanguage}/>
      <section className={utilStyles.headingMd}>
        <p>Web dev learning Next.js</p>
        <p>
          (This is a sample website - you’ll be building a site like this on{' '}
          <a href="https://nextjs.org/learn">our Next.js tutorial</a>.)
        </p>
      </section>
      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        <h2 className={utilStyles.headingLg}>Blog</h2>
        <ul className={utilStyles.list}>
          {languageFilteredPosts()}
        </ul>
      </section>
    </Layout>
  )
}