import "./PostList.css";
import PostCard from "./../PostCard/PostCard.jsx";

export default function PostList({ posts, setPosts, refreshPosts, users }) {
    return (
        <div className="post-list">
            {posts ? (
                posts
                    .slice()
                    .reverse() // pour inverser l'ordre des posts, sans toucher à la backend
                    .map((post) => (
                        <div key={post.id} className="post-card">
                            <PostCard post={post} setPosts={setPosts} refreshPosts={refreshPosts} users={users} /> {/* on lui passe aussi la fonction de rafraichissement des posts */}
                        </div>
                    ))
            ) : (
                <div className="loading">Chargement des posts...</div>
            )}
        </div>
    );
}