import "./PostCard.css";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCirclePlus, faHeart, faThumbsUp} from "@fortawesome/free-solid-svg-icons";
import {useState} from "react";
import {usePostRequest} from "../../Utils/Hooks/usePostRequest.js";


export default function PostCard({post}) {
const [menu, setMenu] = useState(false);
const [reactions, setReactions] = useState(post.emoticons || []);
    const { postData } = usePostRequest(`emoticon`);

    const addReaction = async (type) => {
        console.log(`Reaction :  ${type}`);
        try {
            const reaction = {
                "emoticon": type,
                "postId": post.id
            }

            await postData(reaction);
            setReactions([...reactions, {reaction}]);

        } catch (error) {
            console.error("error reactions : ", error);
        }
        setMenu(false);
    };

    return (
        <div className="card">
            <div className="card-header">
                <h3>{post.authorId}</h3>
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
                <span className="card-emoticons">
                    {reactions && post.emoticons.length > 2 ? (
                        <span>{post.emoticons.length} personnes ont réagis à ce post</span>
                    ) : reactions && post.emoticons[0]?.type === "like" ? (
                        <div>1 <FontAwesomeIcon icon={faThumbsUp} /></div>
                    ) : reactions && post.emoticons[0]?.type === "love" ? (
                        <div>1 <FontAwesomeIcon icon={faHeart} /></div>
                    ) : null}
                    <FontAwesomeIcon className="reaction-button" onClick={()=>{
                        setMenu(!menu);
                    }} icon={faCirclePlus} />
                    {menu && (
                        <div className="reaction-menu">
                            <button onClick={() => addReaction("like")}>
                                <FontAwesomeIcon icon={faThumbsUp} />
                            </button>
                            <button onClick={() => addReaction("love")}>
                                <FontAwesomeIcon icon={faHeart} />
                            </button>
                        </div>
                    )}
                </span>
            </div>
        </div>
    )
}



