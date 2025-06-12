import "./Home.css";
import PostForm from "../../component/PostForm/PostForm.jsx";
import PostList from "../../Component/PostList/PostList.jsx";
import { useNavigate } from "react-router";
import { useEffect } from "react";

export default function Home() {
    const navigate = useNavigate();

    const handleCreatePost = async (formData) => {
        try {
            const response = await fetch('http://localhost:3000/post', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
                body: formData
            });
        } catch (error) {
            console.error('Erreur lors de la création du post:', error);
        }
    };

    useEffect(() => {
        if (!localStorage.getItem("token")) {
            navigate("/login");
        }
    }, []);

    return (
        <div className="Home">
            <h1>Bienvenue sur le super Réseau Social de Mathou et Tony</h1>
            <PostForm onSubmit={handleCreatePost} />
            <PostList />
        </div>
    );
}