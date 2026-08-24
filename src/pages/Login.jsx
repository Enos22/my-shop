import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Login.module.css"

export default function Login({ onLogin }) {
    const [role, setRole] = useState("user")
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const navigate = useNavigate();

    function handleLogin(event) {
        event.preventDefault();

        setError("");

        //Demo login Demo

        if (
            role === "admin" && username === "admin" && password === "admin123"
        ) {
            onLogin({
                username: "admin",
                role: "admin"
            });
            navigate("/admin");
            return;
        }
        //customer login Demo
        if (
            role === "user" && username === "user" && password === "user123"
        ) {
            onLogin({
                username: "user",
                role: "user",
                discount: 10
            });
            navigate("/");
        }
        setError("Invalid username or password.");
    }


    return (
        <main className={styles.login}>
            <h1>Login</h1>
            <div className={styles.roles}>

                <button
                    type="button"
                    className={
                        role === "user" ? styles.activeRole : ""
                    }
                    onClick={() => setRole("user")}
                >
                    Customer
                </button>

                <button
                    type="button"
                    className={
                        role === "admin" ? styles.activeRole : ""
                    }
                    onClick={() => setRole("admin")}
                >
                    Admin
                </button>

            </div>

            <form className={styles.form}
                onSubmit={handleLogin}
            >
                <label>
                    username
                </label>

                <input
                    type="text"
                    value={username}
                    onChange={(event) => setUsername(event.target.value)

                    }
                    placeholder="Enter username"
                />

                <label>
                    Password
                </label>

                <input
                    type="password"
                    value={password}
                    onChange={(event) => setPassword(event.target.value)
                    }
                    placeholder="Enter password"
                />

                {error && (
                    <p className={styles.error}>
                        {error}
                    </p>
                )}
                <button type="submit">
                    Login
                </button>

            </form>

            <div className={styles.demo}>
                <p>
                    <strong>Customer:</strong> user / user123
                </p>

                <p>
                    <strong> Admin:</strong> admin / admin123
                </p>

            </div>
        </main>
    );
}