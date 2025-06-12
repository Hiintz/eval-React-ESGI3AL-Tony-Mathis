import { useState } from "react";
import "./PasswordField.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

export default function PasswordField({ onKeyUp }) {
    const [visible, setVisible] = useState(false);

    function passwordChange(passwordValue) {
        onKeyUp(passwordValue);
    }

    return (
        <>
            <div className="password-field">
                <input type={visible ? "text" : "password"} onKeyUp={(e) => passwordChange(e.target.value)} />
                <FontAwesomeIcon icon={visible ? faEyeSlash : faEye} onClick={() => setVisible(!visible)} />
            </div>
        </>

    )
}