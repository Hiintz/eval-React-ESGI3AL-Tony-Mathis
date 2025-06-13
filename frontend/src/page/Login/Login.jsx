import { useEffect, useState } from "react";
import PasswordField from "../../component/PasswordField/PasswordField"
import "./Login.css"
import { useNavigate } from "react-router";

function Inscription() {
    const navigate = useNavigate();

    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    function handleSubmit() {
        setIsLoading(true);
        fetch("http://localhost:3000/auth/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email: email,
                password: password
            })
        })
            .then(response => response.json())
            .then(data => {
                if (data.jwt) {
                    localStorage.setItem("token", data.jwt);
                    localStorage.setItem("idUser", data.idUser);
                    // alert("Connexion réussie");
                    navigate("/");
                } else {
                    setError(data.error || "Utilisateur ou mot de passe incorrect");
                }
            })
            .catch(error => {
                console.error("Erreur:", error);
                setError("Une erreur s'est produite.");
            })
            .finally(() => {
                setIsLoading(false);
            });
    }

    function login() {
        if (email && password) {
            handleSubmit();
        } else {
            setError("Veuillez remplir tous les champs");
        }
    }

    function onPasswordChange(value) {
        setPassword(value);
    }

    return (
        <>
            <div className="form">
                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input type="email" name="email" id="email" onKeyUp={(e) => setEmail(e.target.value)} />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Mot de passe</label>
                    <PasswordField onKeyUp={onPasswordChange} />
                </div>
                {error && <div className="error-message">{error}</div>}
                <div className="form-group">
                    <button onClick={login} disabled={isLoading}>
                        {isLoading ? "Chargement..." : "Connexion"}
                    </button>
                </div>
                <div className="form-group">
                    <p>Pas de compte ? <span style={{ textDecoration: "underline" }} onClick={() => navigate("/signin")}>C'est par ici</span></p>
                </div>
            </div>
        </>
    );
}

export default Inscription;