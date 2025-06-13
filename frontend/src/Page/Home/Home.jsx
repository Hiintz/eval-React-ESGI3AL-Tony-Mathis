import "./Home.css";
import PostForm from "../../component/PostForm/PostForm.jsx";
import PostList from "../../component/PostList/PostList.jsx";
import { useNavigate } from "react-router";
import { useEffect, useState } from "react";
import { useGetRequest } from "../../Utils/Hooks/useGetRequest.js";
import { usePostRequest } from "../../Utils/Hooks/usePostRequest.js";
import errorImage from "./../../assets/lorax_chokbar.jpg"


export default function Home() {
    const [posts, setPosts] = useState([]);
    const [refreshForce, setRefreshForce] = useState(0);
    const { data: resources, isLoading, error } = useGetRequest("post", refreshForce);
    // on recupère les user pour les afficher dans les posts
    const { data: users, isLoading: usersLoading, error: usersError } = useGetRequest("user");

    const navigate = useNavigate();
    const { postData } = usePostRequest(`post`);

    // pour forcer le rafraichissement des posts
    const forceRefresh = () => {
        setRefreshForce((prev) => prev + 1);
    }

    const handleCreatePost = async (formData) => {
        try {
            await postData(formData);
            forceRefresh();
        } catch (error) {
            console.error("Erreur lors de la création du post :", error);
        }
    }

    // 1. Au premier chargement de la page on va récupérer les posts via la requête qui s'appellent ressources et les mettre dans post
    // 2. on recharge l'élément à chaque fois qu'on utilise setPosts d'ou l'affichage dynamique ;)
    useEffect(
        () => {
            if (resources) {
                setPosts(resources);
            }
        }, [resources, setPosts]
    )

    useEffect(() => {
        if (!localStorage.getItem("token")) {
            navigate("/login");
        }
    }, []);

    return (
        <div className="Home">
            <div className="Deconnect">
                <button onClick={() => {
                    localStorage.removeItem("token");
                    localStorage.removeItem("idUser");
                    navigate("/login");
                }}>
                    Déconnexion
                </button>
            </div>

            <h1>Bienvenue sur le super Réseau Social de Mathou et Tony</h1>

            {/* Petit loader si le hook nous renvoie loading */}
            {isLoading && <div className="loading">Chargement de l'application...</div>}

            {/* Si le hook renvoie une erreur on affiche un message d'erreur personnalisé fait spécialement pour toi mon petit tony */}
            {error &&
                <div className="error">
                    <h2>Par mes moustaches !</h2>
                    <br />
                    <img src={errorImage} alt="Erreur" />
                </div>}

            {/* Affichage des éléments de la page */}
            {posts && !error && (
                <div className={"home-content"}>
                    <PostForm onSubmit={handleCreatePost} />
                    {/* on lui passe la fonction setPosts pour mettre à jour les posts */}
                    {/* et on passe users pour les afficher dans les posts */}
                    <PostList posts={posts} setPosts={setPosts} refreshPosts={forceRefresh} users={users} />
                </div>
            )}
        </div>
    );
}
