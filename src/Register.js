import { useState } from 'react';

function Register() {
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');

    const handleRegister = async (e) => {
        e.preventDefault();
        const response = await fetch("https://localhost:7188/register", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ userName, password, firstName, lastName }),
        });

        if (response.ok) {
            // handle successful registration
            alert("Registration successful!");
        } else {
            // handle registration error
            alert("Registration failed.");
        }
    };

    return (
        <form onSubmit={handleRegister}>
            <input type="text" placeholder="Username" value={userName} onChange={e => setUserName(e.target.value)} required />
            <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} required />
            <input type="text" placeholder="First Name" value={firstName} onChange={e => setFirstName(e.target.value)} required />
            <input type="text" placeholder="Last Name" value={lastName} onChange={e => setLastName(e.target.value)} required />
            <button type="submit">Register</button>
        </form>
    );
}

export default Register;
