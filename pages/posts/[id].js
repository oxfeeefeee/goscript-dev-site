import Layout from '../../components/layout';
import Head from 'next/head';
import Link from 'next/link';
import utilStyles from '../../styles/utils.module.css';
import { getAllPostIds, getPostData } from '../../lib/posts';

export async function getStaticProps({ params }) {
    const postData = await getPostData(params.id);
    return {
        props: {
            postData,
        },
    };
}

export async function getStaticPaths() {
    const paths = getAllPostIds();
    return {
        paths,
        fallback: false,
    };
}

export default function Post({ postData }) {
    return (
        <Layout>
            <Head>
                <title>{postData.title}</title>
            </Head>
            <article>
                <h1 className={utilStyles.headingXl}>{postData.title}</h1>
                {typeof postData.translation === "string" ?
                    <div className={utilStyles.lightText}>
                        <a href="https://github.com/oxfeeefeee/">oxfeeefeee</a>
                        {' '}<Date dateString={postData.date} />{' //'}
                        {postData.translation &&
                            <Link href={`/posts/${postData.translation}`}>
                                <a>{postData.translation_lang}</a>
                            </Link>
                        }
                    </div>
                    : <div className={utilStyles.lightText}>
                        <a href="https://github.com/oxfeeefeee/">oxfeeefeee</a>
                        {' '}{postData.date}
                    </div>
                }
                <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
            </article >
        </Layout >
    );
}