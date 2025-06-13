import "./PostCard.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCirclePlus, faHeart, faThumbsUp, faTrash } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { usePostRequest } from "../../Utils/Hooks/usePostRequest.js";
import { useDeleteRequest } from "../../Utils/Hooks/useDeleteRequest.js";

export default function PostCard({ post, setPosts, refreshPosts }) {
    const userId = localStorage.getItem("idUser") || null;
    const [menu, setMenu] = useState(false);
    const [reactions, setReactions] = useState(post.emoticons || []);
    const { postData } = usePostRequest(`emoticon`);


    const { deleteData: deleteReactions } = useDeleteRequest(`emoticon/${post.id}`);
    const { deleteData: deletePost } = useDeleteRequest(`post/${post.id}`);

    const addReaction = async (type) => {
        try {
            const newReaction = {
                emoticon: type,
                postId: post.id,
                userId: userId,
            };
            await postData(newReaction);
            // Mets à jour avec la nouvelle réaction dans le state
            setReactions((prev) => [...prev, newReaction])
        } catch (error) {
            console.error("Erreur lors de l'ajout de réaction :", error);
        }
        setMenu(false);
    };


    // Supprimer les réactions
    const deletePostReaction = async () => {
        try {
            await deleteReactions()
            // Mets à jour le nouveau tableau vidé
            setReactions([])
            alert("Les reactions du post ont été supprimées");
        }
        catch (error) {
            console.error("Erreur lors de la suppression de la réaction :", error);
        }
    }

    // Supprimer le post (j'avais pas d'inspi sur le nom j'avoue)
    const deleteThePost = async () => {
        try {
            if (confirm("Êtes-vous sûr de vouloir supprimer ce post ?")) {
                console.log("delete" + post.id)
                await deletePost();
                // Rafraîchit la liste des posts après suppression
                refreshPosts();
            }
        } catch (error) {
            console.error("Erreur lors de la suppression du post :", error);
        }
    }

    return (
        <div className="card">

            <div className="card-header">
                <h3>{post.authorId}</h3>
                <p className="card-date">
                    Created: {new Date(post.createdAt).toLocaleString("fr-FR", {
                        day: "2-digit",
                        month: "2-digit",
                        year: "numeric",
                        hour: "2-digit",
                        minute: "2-digit"
                    })}
                </p>
                <p className="card-date">
                    Updated: {new Date(post.updatedAt).toLocaleString("fr-FR", {
                        day: "2-digit",
                        month: "2-digit",
                        year: "numeric",
                        hour: "2-digit",
                        minute: "2-digit"
                    })}
                </p>
            </div>

            <div className="card-body">
                <p className="card-message">{post.message}</p>
                {post.picture ? (
                    <img
                        src={`http://localhost:3000/image/${post.picture}`}
                        alt="Post"
                        className="card-image"
                    />
                ) : (
                    <p className="card-placeholder"></p>
                )}


                {/* les réactions en fonction du nombre de celles-ci */}
                <span className="card-emoticons">
                    {reactions.length > 1 ? (
                        <span>{reactions.length} personnes ont réagi à ce post</span>
                    ) : reactions.length === 1 && reactions[0]?.emoticon ? (
                        <span>
                            1{" "}<FontAwesomeIcon
                                icon={reactions[0].emoticon === "like" ? faThumbsUp : reactions[0].emoticon === "love" ? faHeart : null} />
                        </span>
                    ) : null}
                </span>


                {/* Bouton d'ajout de réactions */}
                <FontAwesomeIcon
                    className="reaction-button"
                    onClick={() => setMenu(!menu)}
                    icon={faCirclePlus}
                />

                {/* menu des réactions */}
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

                {/* Bouton de suppression du post */}
                <FontAwesomeIcon
                    className="reaction-button"
                    onClick={() => deletePostReaction()}
                    icon={faTrash} />
            </div>

            {/* attention ici on laisse bien que 2 == sinon ça pète */}
            {userId == post.authorId && <button onClick={deleteThePost} className="close-button">Supprimer le post</button>}
        </div>
    );
}
