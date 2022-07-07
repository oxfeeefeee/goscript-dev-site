import Layout from '../../components/layout';
import Head from 'next/head';
import { getAllCodeIds, getCodeData } from '../../lib/goCode';
import Playground from '../../components/playground';



export async function getStaticProps({ params }) {
    const codeData = await getCodeData(params.id);
    const codeIds = getAllCodeIds();
    return {
        props: {
            codeData,
            codeIds,
        },
    };
}

export async function getStaticPaths() {
    const paths = getAllCodeIds();
    return {
        paths,
        fallback: false,
    };
}

export default function Post({ codeData, codeIds }) {
    return (
        <Layout>
            <Head>
                <title>{codeData.id}</title>
            </Head>
            <Playground code={codeData.codeContent} codeIds={codeIds}></Playground>
        </Layout >
    );
}