import "./Home.css";
import PostList from "../../Component/PostList/PostList.jsx";
import { useNavigate } from "react-router";
import { useEffect } from "react";

export default function Home() {
    const navigate = useNavigate();

    useEffect(() => {
        if (!localStorage.getItem("token")) {
            navigate("/login");
        }
    }, []);

    return (
        <div className="Home">
            <PostList />
        </div>
    );
}