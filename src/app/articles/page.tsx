import ArticlesClient from './ArticlesClient';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Articles & Resources | TOS Lanka',
  description: 'Read the latest insights, news, and technical articles from TOS Lanka on contract electronics manufacturing, IoT, and more.',
};

export default function ArticlesPage() {
  return <ArticlesClient />;
}
