import Link from 'next/link';
import { Metadata } from 'next';
import css from './not-found.module.css'


export const metadata: Metadata = {
  title: '404 - Page not found',
  description: 'Sorry, the page you are looking for does not exist.',
  openGraph: {
    title: '404 - Page not found',
    description: 'Sorry, the page you are looking for does not exist.',
    url: 'https://08-zustand-opal.vercel.app/not-found',
    images: [{
      url: 'https://ac.goit.global/fullstack/react/notehub-og-meta.jpg',
      width: 1200,
      height: 630,
      alt: 'Page not found preview'
    }]
  }
};

const NotFound = () => {
    return (
        <div className={css.container}>
          <h1 className={css.title}>404 - Page not found</h1>
          <p className={css.description}>Sorry, the page you are looking for does not exist.</p>  
          <Link href='/'>Go back home</Link>
        </div>
    )
}
export default NotFound;