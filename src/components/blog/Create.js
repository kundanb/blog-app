import { useContext, useState } from 'react';
import UserContext from '../../contexts/UserContext';
import './Create.css';

const Create = () => {
  const [{ token }] = useContext(UserContext);

  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [tags, setTags] = useState('');

  const handleSubmit = async e => {
    e.preventDefault();

    const config = {
      url: 'https://rohanpahwa71.pythonanywhere.com/blog/post/',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Token ' + token,
      },
      body: JSON.stringify({
        title,
        body_text: body,
        tags: tags.split(',').map(t => t.trim()),
      }),
    };

    try {
      const res = await fetch(config.url, config);
      const data = await res.json();

      if (res.status === 200) {
        alert(data.msg);
        setTitle('');
        setBody('');
        setTags('');
      } else {
        console.log(data);
        alert('Cannot create post!');
      }
    } catch (e) {
      console.log(e);
      alert('Cannot create post!');
    }
  };

  return (
    <main className="main">
      <div className="container">
        <h2>Create</h2>

        <form id="createForm" className="form form-lg" onSubmit={handleSubmit}>
          <div className="fCtrlRow">
            <label className="fLabel">Title</label>
            <input
              type="text"
              className="fCtrl"
              value={title}
              onChange={e => setTitle(e.target.value)}
            />
          </div>
          <div className="fCtrlRow">
            <label className="fLabel">Body</label>
            <textarea
              className="fCtrl"
              rows="5"
              value={body}
              onChange={e => setBody(e.target.value)}></textarea>
          </div>
          <div className="fCtrlRow">
            <label className="fLabel">Tags (with comma ',' seperated)</label>
            <input
              type="text"
              className="fCtrl"
              value={tags}
              onChange={e => setTags(e.target.value)}
            />
          </div>
          <div className="fSubmitRow">
            <button type="submit">Create Blog</button>
          </div>
        </form>
      </div>
    </main>
  );
};

export default Create;
