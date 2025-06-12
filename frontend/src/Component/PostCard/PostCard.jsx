import "./PostCard.css";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCirclePlus, faHeart, faThumbsUp} from "@fortawesome/free-solid-svg-icons";
import {useState} from "react";
import {usePostRequest} from "../../Utils/Hooks/usePostRequest.js";
import {useDeleteRequest} from "../../Utils/Hooks/useDeleteRequest.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCirclePlus, faHeart, faThumbsUp } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { usePostRequest } from "../../Utils/Hooks/usePostRequest.js";


export default function PostCard({ post }) {
    const userId = localStorage.getItem("idUser") || null

export default function PostCard({post}) {
    const [menu, setMenu] = useState(false);
    const [reactions, setReactions] = useState(post.emoticons || []);
    const {postData} = usePostRequest(`emoticon`);
    const {deleteData} = useDeleteRequest(`emoticon/${post.id}`);
    const idUser = localStorage.getItem('idUser');
=======
    const [menu, setMenu] = useState(false);
    const [reactions, setReactions] = useState(post.emoticons || []);
    const { postData } = usePostRequest(`emoticon`);

    const addReaction = async (type) => {
        console.log(`Reaction :  ${type}`);
        reactions.map((reaction) => {
            if (reaction.emoticon === type && reaction.userId === idUser) {
               deleteData(type, idUser);
            }
        });
        try {
            const newreaction = {
                "emoticon": type,
                "postId": post.id,
                "userId": idUser
            }

            await postData(newreaction);
            setReactions([...reactions, {newreaction}]);
            await postData(reaction);
            setReactions([...reactions, { reaction }]);

        } catch (error) {
            console.error("error reactions : ", error);
        }
        setMenu(false);
    };


    const deletePost = async () => {
        try {
            if (confirm("Êtes-vous sûr de vouloir supprimer ce post ?")) {
                const response = await fetch(`http://localhost:3000/post/${post.id}`, {
                    method: 'DELETE',
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                    },
                });
                if (response.ok) {
                    console.log("Post supprimé avec succès");
                } else {
                    console.error("Erreur lors de la suppression du post");
                }
            }
        } catch (error) {
            console.error("Erreur lors de la suppression du post :", error);
        }
    }


    return (
        <div className="card">
            <div className="card-header">
                <h3>{post.authorId}</h3>
                <p className="card-date">Created: {post.createdAt}</p>
                <p className="card-date">Updated: {post.updatedAt}</p>
                {console.log("post authorId", post.authorId)}
                {console.log("userId", userId)}
                {userId == post.authorId && (
                    <button className="delete-button" onClick={deletePost}>Supprimer</button>
                )}
            </div>
            <div className="card-body">
                <p className="card-message">{post.message}</p>
                {post.picture ? (
                    <img src={`http://localhost:3000/image/${post.picture}`}
                        alt="Post"
                        className="card-image" />
                ) : (
                    <p className="card-placeholder"></p>
                )}
                <span className="card-emoticons">

                {reactions && post.emoticons.length > 1 ? (
                    <span>{post.emoticons.length} personnes ont réagis à ce post</span>
                ) : reactions && post.emoticons[0]?.type === "like" ? (
                    <div>1 <FontAwesomeIcon icon={faThumbsUp}/></div>
                ) : reactions && post.emoticons[0]?.type === "love" ? (
                    <div>1 <FontAwesomeIcon icon={faHeart}/></div>
                ) : null}


                    <FontAwesomeIcon
                        className="reaction-button"
                        onClick={() => {
                            setMenu(!menu);
                        }}
                        icon={faCirclePlus}
                    />
                    {reactions && post.emoticons.length > 2 ? (
                        <span>{post.emoticons.length} personnes ont réagis à ce post</span>
                    ) : reactions && post.emoticons[0]?.type === "like" ? (
                        <div>1 <FontAwesomeIcon icon={faThumbsUp} /></div>
                    ) : reactions && post.emoticons[0]?.type === "love" ? (
                        <div>1 <FontAwesomeIcon icon={faHeart} /></div>
                    ) : null}
                    <FontAwesomeIcon className="reaction-button" onClick={() => {
                        setMenu(!menu);
                    }} icon={faCirclePlus} />
                    {menu && (
                        <div className="reaction-menu">
                            <button onClick={() => addReaction("like")}>
                                <FontAwesomeIcon icon={faThumbsUp}/>
                            </button>
                            <button onClick={() => addReaction("love")}>
                                <FontAwesomeIcon icon={faHeart}/>
                            </button>
                        </div>
                    )}
            </span>
            </div>
        </div>
    );
}