import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchData } from "./store/slice";
import { RootState } from "./store/rootReducers";

interface PostProps {
  post: {
    id: number;
    title: string;
    body: string;
  };
}

// Memoize the Post component to prevent re-rendering when props don't change
const Post: React.FC<PostProps> = React.memo(({ post }) => (
  <li key={post.id}>
    <h2>{post.title}</h2>
    <p>{post.body}</p>
  </li>
));

const App: React.FC = () => {
  const dispatch = useDispatch();
  const { data, loading, error } = useSelector(
    (state: RootState) => state.data
  );

  const fetchHandler = () => {
    dispatch(fetchData());
  };

  useEffect(() => {
    // Fetch data on component mount
    fetchHandler();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h1>Posts</h1>
      {/* <button onClick={fetchHandler}>click</button> */}
      <ul>
        {data.map((post) => (
          <Post key={post.id} post={post} /> // Use the memoized Post component
        ))}
      </ul>
    </div>
  );
};

export default App;
