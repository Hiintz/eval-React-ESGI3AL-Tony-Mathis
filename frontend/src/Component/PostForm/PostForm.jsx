import { useEffect, useState } from "react";
import "./PostForm.css";


function PostForm({ content = null, onSubmit }) {
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

        setPostContent("");
        setPicture(null);
    }

    return (
        <form onSubmit={handleSubmit}>
            <div className="form-group">
                <input type="text" placeholder="Nouveau post" id="postInput" name="postInput" value={postContent} onChange={(e) => setPostContent(e.target.value)} required />
            </div>
            <div className="form-group">
                <label htmlFor="file">(optionnel)</label>
                <input type="file" id="file" name="file" onChange={(e) => setPicture(e.target.files[0])} />
            </div>
            <button type="submit">Valider</button>
        </form>
    );
}

export default PostForm;