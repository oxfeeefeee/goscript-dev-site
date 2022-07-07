import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/global.css';
import "prismjs/themes/prism.css";
import '../styles/utils.prism.css';

export default function App({ Component, pageProps }) {
    return <Component {...pageProps} />;
}