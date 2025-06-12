import "./PostList.css";
import PostCard from "./../PostCard/PostCard.jsx";

export default function PostList({posts, setPosts} ) {


    return (

        <div className="post-list">
            {posts ? (
                posts.map((post) => (
                    <div key={post.id} className="post-card">
                        <PostCard post={post} setPosts={setPosts} />
                    </div>
                ))
            ) : (
                <div className="loading">Chargement des posts...</div>
            )}
        </div>
    );
}