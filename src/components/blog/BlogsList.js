import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './BlogsList.css';

const BlogList = () => {
  const [blogs, setBlogs] = useState([]);

  const fetchBlogs = async () => {
    const config = {
      url: 'https://rohanpahwa71.pythonanywhere.com/blog/post/',
      method: 'GET',
    };

    try {
      const res = await fetch(config.url, config);
      const data = await res.json();

      if (res.status === 200) {
        setBlogs(data);
      } else {
        console.log(data);
        alert('Cannot fetch Blogs!');
      }
    } catch (e) {
      console.log(e);
      alert('Cannot fetch Blogs!');
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  return (
    <main className="main">
      <div className="container">
        <h2>Blogs</h2>
        <div className="blogsList">
          {blogs.map(blog => (
            <div key={blog.id} className="blogItem">
              <div className="tagsList">
                {blog.tags.map(tag => (
                  <a key={tag.id} href="#" className="tagItem">
                    #{tag.name}
                  </a>
                ))}
              </div>
              <h3>
                <Link to={'/blog/' + blog.id}>{blog.title}</Link>
              </h3>
              <p className="blogCounts">
                <span>Likes: {blog.number_of_likes}</span>
                <span>Views: {blog.number_of_views}</span>
              </p>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
};

export default BlogList;
