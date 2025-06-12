import "./PostList.css";
import {useGetRequest} from "../../Utils/Hooks/useGetRequest.js";
import {useEffect} from "react";
import PostCard from "./../PostCard/PostCard.jsx";

export default function PostList() {
    const { data: resources, isLoading, error } = useGetRequest("post");


    useEffect(() => {
        console.log(resources);
    }, [resources]);


    return (

        <div className="post-list">
            {isLoading && <div className="loading">Loading posts...</div>}
            {error && <div className="error">Error: {error}</div>}
            {resources ? (
                resources.map((post) => (
                    <div key={post.id} className="post-card">
                        <PostCard post={post} />
                    </div>
                ))
            ) : (
                <div className="loading">
                    {isLoading ? "LOADING" : "Redémarre la backend concon"}
                </div>
            )}
        </div>
    );
}