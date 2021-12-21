import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styles from './Blog.module.css';

const Blog = props => {
  const { blogId } = useParams();

  const [pageLoaderText, setPageLoaderText] = useState('Loading Blog...');
  const [blog, setBlog] = useState('');

  const fetchBlog = async () => {
    const config = {
      url: 'https://rohanpahwa71.pythonanywhere.com/blog/post/' + blogId + '/',
      method: 'GET',
    };

    try {
      const res = await fetch(config.url, config);
      const data = await res.json();

      if (res.status === 200) {
        setBlog(data);
        console.log('aa');
      } else {
        setPageLoaderText('Error in fetching blog details!');
      }
    } catch (e) {
      console.log(e);
      setPageLoaderText('Error in fetching blog details!');
    }
  };

  useEffect(() => {
    fetchBlog();
  }, []);

  return blog ? (
    <main className="main">
      <div className="container">
        <h2>{blog.title}</h2>
        <p className={styles.counts}>
          <span className={styles.count}>Likes: {blog.number_of_likes}</span>
          <span className={styles.count}>Views: {blog.number_of_likes}</span>
        </p>
        <p className={styles.body}>{blog.body_text}</p>
        <p className={styles.tags}>
          {blog.tags.map(t => (
            <a key={t.id} href={'/tag/' + t.id} className={styles.tag}>
              #{t.name}
            </a>
          ))}
        </p>
      </div>
    </main>
  ) : (
    <div className="pageLoader">{pageLoaderText}</div>
  );
};

export default Blog;
