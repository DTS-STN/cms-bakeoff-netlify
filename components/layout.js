import Head from 'next/head'
import styles from './layout.module.css'
import utilStyles from '../styles/utils.module.css'
import Link from 'next/link'
import ToggleButton from './toggleButton'
import { useRouter } from 'next/router'
import { useState, useEffect, useContext } from 'react'
import { LanguageContext, locales } from '../i18n/LanguageProvider';

export const siteTitle = 'Next.js Sample Website'
const name = 'DTS-STN'

export default function Layout({ children, home }) {
  const [locale, setLocale] = useContext(LanguageContext);
  const router = useRouter()
  
  function handleLocaleChange() {
    const language = locale === 'en' ? 'fr' : 'en'

    const regex = new RegExp(`^/(${locales.join('|')})`);
    localStorage.setItem('lang', language);
    setLocale(language);

    router.push(router.pathname, router.asPath.replace(regex, `/${language}`));
  }
  
  return (
    <div className={styles.container}>
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <meta
          name="description"
          content="Learn how to build a personal website using Next.js"
        />
        <meta
          property="og:image"
          content={`https://og-image.vercel.app/${encodeURI(
            siteTitle
          )}.png?theme=light&md=0&fontSize=75px&images=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Ffront%2Fassets%2Fdesign%2Fnextjs-black-logo.svg`}
        />
        <meta name="og:title" content={siteTitle} />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>
      <header className={styles.header}>
        <ToggleButton language={locale} toggleLanguage={handleLocaleChange} />
        {home ? (
          <>
            <img
              src="/images/profile.jpg"
              className={utilStyles.borderCircle}
              height={144}
              width={144}
              alt={name}
            />
            <h1 className={utilStyles.heading2Xl}>{name}</h1>
          </>
        ) : (
          <>
            <Link href="/">
              <a>
                <img
                  src="/images/profile.jpg"
                  className={utilStyles.borderCircle}
                  height={108}
                  width={108}
                  alt={name}
                />
              </a>
            </Link>
            <h2 className={utilStyles.headingLg}>
              <Link href="/">
                <a className={utilStyles.colorInherit}>{name}</a>
              </Link>
            </h2>
          </>
        )}
      </header>
      <main>{children}</main>
      {!home && (
        <div className={styles.backToHome}>
          <Link href={`/${locale}`}>
            <a>← Back to home</a>
          </Link>
        </div>
      )}
    </div>
  )
}