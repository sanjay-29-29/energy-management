import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import Modal from 'react-modal';
import UserContext from '../Context/UserContext';
import { supabase } from '../Database/db';

const HorizontalNavbar = () => {
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const { login } = useContext(UserContext);
    const navigate = useNavigate();

    const openModal = () => {
        setModalIsOpen(true);
    };

    const closeModal = () => {
        setModalIsOpen(false);
    };

    const handleLogin = async (event) => {
        event.preventDefault();

        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;

        const { user, session, error } = await supabase.auth.signIn({
            email: 'example@email.com',
            password: 'example-password',
        })

        console.log(user, session, error)

        if (error) {
            console.error('Error: ', error.message);
            setErrorMessage('An error occurred. Please try again.');
        } else if (users.length === 0) {
            setErrorMessage('Invalid credentials');
        } else {
            login('admin');
            console.log('Logged in');
            navigate('/');;
        }
    };
    return (
        <>
            <div className="flex flex-container h-[5vh] bg-white items-center font-roboto  justify-between">
                <div className="flex">
                    <div className="text-3xl font-bold text-green-500 ">
                        Green
                    </div>
                    <div className="text-3xl font-bold text-black">
                        AI
                    </div>
                </div>
                <div className="text-black font-bold p-5 h-[5vh] transition-colors duration-300 hover:bg-gray-200 hover:text-gray-800">
                    <button onClick={openModal}>Login</button>                </div>
            </div>
            <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                contentLabel="Login Modal"
                className="w-[60vw] h-[40vh] mx-auto mt-20 bg-white rounded shadow p-4"
            >
                <button onClick={closeModal} className="float-right p-2">X</button>
                <form className="flex flex-col" onSubmit={handleLogin}>
                    <label htmlFor="username" className="mb-2">Username</label>
                    <input type="text" id="username" className="mb-4 p-2 border rounded" />

                    <label htmlFor="password" className="mb-2">Password</label>
                    <input type="password" id="password" className="mb-4 p-2 border rounded" />

                    <button type="submit" className="p-2 bg-blue-500 text-white rounded">Login</button>
                    {errorMessage && <p>{errorMessage}</p>}
                </form>
            </Modal>
        </>
    );
}

export default HorizontalNavbar;