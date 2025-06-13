import { useEffect, useState } from "react";
import PasswordField from "../../component/PasswordField/PasswordField"
import "./Signin.css"
import { useNavigate } from "react-router";

function Inscription() {
    const navigate = useNavigate();

    const [email, setEmail] = useState();
    const [username, setUsername] = useState();
    const [password, setPassword] = useState();
    const [passwordCheck, setPasswordCheck] = useState();
    const [pwdError, setPwdError] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    function handleSubmit() {
        setIsLoading(true);
        fetch("http://localhost:3000/auth/signin", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email: email,
                nickname: username,
                password: password
            })
        })
            .then(response => response.json())
            .then(data => {
                if (data.error) {
                    setError(data.error);
                } else {
                    alert("Inscription réussie, vous pouvez maintenant vous connecter");
                    navigate("/login");
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
        if (email && password && passwordCheck) {
            if (password !== passwordCheck) {
                setError("Les mots de passe ne correspondent pas");
            } else {
                handleSubmit();
            }
        } else {
            setError("Veuillez remplir tous les champs");
        }
    }

    function onPasswordChange(value) {
        setPassword(value);
    }

    function onPasswordCheckChange(value) {
        setPasswordCheck(value);
        if (password !== value) {
            setPwdError(true)
        } else {
            setPwdError(false)
        }
    }

    return (
        <>
            <div className="form">
                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input type="email" name="email" id="email" onKeyUp={(e) => setEmail(e.target.value)} />
                </div>
                <div className="form-group">
                    <label htmlFor="username">Nom d'utilisateur</label>
                    <input type="text" name="username" id="username" onKeyUp={(e) => setUsername(e.target.value)} />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Mot de passe</label>
                    <PasswordField onKeyUp={onPasswordChange} />
                </div>
                <div className="form-group">
                    <label htmlFor="passwordCheck">Ressaisir MdP</label>
                    <PasswordField onKeyUp={onPasswordCheckChange} />
                </div>
                {pwdError && <div>Les deux mots de passes ne sont pas identiques</div>}
                {error && <div className="error">{error}</div>}
                <div className="form-group">
                    <button onClick={login} disabled={isLoading}>
                        {isLoading ? "Chargement..." : "Créer Compte"}
                    </button>
                </div>
                <div className="form-group">
                    <p>Déjà un compte ? <span style={{ textDecoration: "underline" }} onClick={() => navigate("/login")}>Connectez-vous</span></p>
                </div>
            </div>
        </>
    );
}

export default Inscription;