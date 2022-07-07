import Head from 'next/head';
import Link from 'next/link';
import Date from '../components/date';
import Layout, { siteTitle } from '../components/layout';
import Playground from '../components/playground';
import utilStyles from '../styles/utils.module.css';
import { getSortedPostsData } from '../lib/posts';
import { getAllCodeIds } from '../lib/goCode';

export async function getStaticProps() {
  const allPostsData = getSortedPostsData();
  const codeIds = getAllCodeIds();
  return {
    props: {
      allPostsData,
      codeIds,
    },
  };
}

export default function Home({ allPostsData, codeIds }) {
  const editor_options = {
    lineNumbers: false,
  };
  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <section>
        <h2 className={utilStyles.headingLg}>Playground</h2>
        <Playground embedded={"fibonacci.go"} codeIds={codeIds}></Playground>
      </section>

      <section id={'blog-section'} className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        <h2 className={utilStyles.headingLg}>Blog</h2>
        <ul className={utilStyles.list}>
          {allPostsData.map(({ id, date, title }) => (
            <li className={utilStyles.listItem} key={id}>
              <Link href={`/posts/${id}`}>
                <a>{title}</a>
              </Link>
              <br />
              <small className={utilStyles.lightText}>
                <Date dateString={date} />
              </small>
            </li>
          ))}
        </ul>
      </section>
    </Layout >
  );
}