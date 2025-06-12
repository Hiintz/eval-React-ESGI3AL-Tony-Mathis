import "./PostCard.css";

export default function PostCard({post}) {


    return (
        <div className="card">
            <div className="card-header">
                <h3>{post.authorId || "Anonymous"}</h3>
                <p className="card-date">Created: {post.createdAt}</p>
                <p className="card-date">Updated: {post.updatedAt}</p>
            </div>
            <div className="card-body">
                <p className="card-message">{post.message}</p>
                {post.picture ? (
                    <img src={post.picture} alt="Post" className="card-image"/>
                ) : (
                    <p className="card-placeholder"></p>
                )}
                <p className="card-emoticons">
                    {post.emoticons.length > 0 ? post.emoticons.join(", ") : "No emoticonos"}
                </p>
            </div>
        </div>
    );
}

