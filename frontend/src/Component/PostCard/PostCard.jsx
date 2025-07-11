import "./PostCard.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCirclePlus, faHeart, faThumbsUp, faTrash, faEdit } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { usePostRequest } from "../../Utils/Hooks/usePostRequest.js";
import { useDeleteRequest } from "../../Utils/Hooks/useDeleteRequest.js";
import { usePutRequest } from "../../Utils/Hooks/usePutRequest.js";
import PostForm from "../PostForm/PostForm.jsx";

export default function PostCard({ post, setPosts, refreshPosts, users }) {
    const userId = localStorage.getItem("idUser") || null;
    const [menu, setMenu] = useState(false);
    const [reactions, setReactions] = useState(post.emoticons || []);
    const [isEditing, setIsEditing] = useState(false);
    const [confirmDeleteEmotions, setConfirmDeleteEmotions] = useState(false);
    const [AskConfimDeletePost, setAskConfirmDeletePost] = useState(false); // pour demander une confirmation avant de supprimer le post
    const { postData } = usePostRequest(`emoticon`);
    const { putData } = usePutRequest(`post/${post.id}`);

    const { deleteData: deleteReactions } = useDeleteRequest(`emoticon/${post.id}`);
    const { deleteData: deletePost } = useDeleteRequest(`post/${post.id}`);

    // on cherche le nom de l'auteur du post
    const getUserName = (authorId) => {
        // console.log('liste des users', users);
        if (!users || !Array.isArray(users)) {
            return `Casper ${authorId}`;
        }
        const user = users.find((user) => user.id === authorId);
        return user ? user.nickname : "Casper";
    };

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
            // on enleve le message de confirmation de suppression
            setConfirmDeleteEmotions(false);
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
            // alert("Les reactions du post ont été supprimées");
            // on affiche plutot un message de confirmation
            setConfirmDeleteEmotions(true);
        }
        catch (error) {
            console.error("Erreur lors de la suppression de la réaction :", error);
        }
    }

    // Supprimer le post (j'avais pas d'inspi sur le nom j'avoue)
    const deleteThePost = async () => {
        try {
            if (AskConfimDeletePost) {
                console.log("delete" + post.id)
                await deletePost();
                // Rafraîchit la liste des posts après suppression
                refreshPosts();
            } else {
                // Si on n'a pas encore confirmé, on demande confirmation
                setAskConfirmDeletePost(true);
            }
        } catch (error) {
            console.error("Erreur lors de la suppression du post :", error);
        }
    }

    // modif le post (le mien est mieux)
    const handleEditPost = async (formData) => {
        try {
            await putData(formData);
            setIsEditing(false);
            refreshPosts();
        } catch (error) {
            console.error("Erreur lors de la modification du post :", error);
        }
    }

    // pour les incertains
    const handleCancelEdit = () => {
        setIsEditing(false);
    }

    // affichage du formulaire si on est en modif
    if (isEditing) {
        return (
            <div className="card editing-card">
                <div className="card-header">
                    <h3>Modifier le post de {getUserName(post.authorId)}</h3>
                </div>
                <PostForm
                    content={post.message}
                    onSubmit={handleEditPost}
                    isEditing={true}
                    onCancel={handleCancelEdit}
                    existingPicture={post.picture}
                />
            </div>
        );
    }

    return (
        <div className="card">

            <div className="card-header">
                <h3>{getUserName(post.authorId)}</h3>
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
                    <p className="nothing"></p>
                )}

                <div className="card-footer">
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

                    {/* Bouton de suppression des reactions */}
                    <FontAwesomeIcon
                        className="reaction-button"
                        onClick={() => deletePostReaction()}
                        icon={faTrash} />
                </div>
            </div>
            {/* message de confirmation de suppression des reactions */}
            {confirmDeleteEmotions && (<div>Les réactions du post ont été supprimées.</div>)}
            {/* attention ici on laisse bien que 2 == sinon ça pète */}
            {/* delete et update du post */}
            {userId == post.authorId && (
                <div className="post-actions">
                    <button onClick={() => setIsEditing(true)} className="edit-button">
                        <FontAwesomeIcon icon={faEdit} /> Modifier
                    </button>
                    <button onClick={deleteThePost} className="close-button">
                        {AskConfimDeletePost ? "Confirmer la suppression ?" : "Supprimer le post"}
                    </button>
                </div>
            )}
        </div>
    );
}
