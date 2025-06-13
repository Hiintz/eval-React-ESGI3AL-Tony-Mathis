import { useEffect, useState } from "react";
import "./PostForm.css";

function PostForm({ content = null, onSubmit, isEditing = false, onCancel = null, existingPicture = null }) {
    const [postContent, setPostContent] = useState(content || "");
    const [picture, setPicture] = useState(null);

    useEffect(() => {
        if (content) {
            setPostContent(content);
        }
    }, [content]);

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData();
        const postData = {
            message: postContent
        }
        formData.append("post", JSON.stringify(postData));

        if (picture) {
            formData.append("file", picture);
        }

        onSubmit(formData);

        if (!isEditing) {
            setPostContent("");
            setPicture(null);
        }
    }

    const handleCancel = () => {
        if (onCancel) {
            onCancel();
        }
    }

    return (
        <form onSubmit={handleSubmit} className={isEditing ? "edit-form" : ""}>
            <div className="form-group">
                <input
                    type="text"
                    placeholder={isEditing ? "Modifier le post" : "Nouveau post"}
                    id="postInput"
                    name="postInput"
                    value={postContent}
                    onChange={(e) => setPostContent(e.target.value)}
                    required
                />
            </div>
            <div className="form-group">
                <label htmlFor="file">(optionnel)</label>
                <input
                    type="file"
                    id="file"
                    name="file"
                    onChange={(e) => setPicture(e.target.files[0])}
                />
                {existingPicture && !picture && (
                    <div className="existing-picture">
                        <p>Image actuelle:</p>
                        <img
                            src={`http://localhost:3000/image/${existingPicture}`}
                            alt="Image actuelle"
                            style={{ width: "100px", height: "100px", objectFit: "cover" }}
                        />
                    </div>
                )}
            </div>
            <div className="form-buttons">
                <button type="submit">
                    {isEditing ? "Modifier" : "Valider"}
                </button>
                {isEditing && (
                    <button type="button" onClick={handleCancel} className="cancel-btn">
                        Annuler
                    </button>
                )}
            </div>
        </form>
    );
}

export default PostForm;