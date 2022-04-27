import React, { useState } from 'react'
import '../App.css';
import AuthorTable from '../components/AuthorTable';
import Header from '../components/Header';

const Main = () => {
    const [authors, setAuthors] = useState([]);
    return (
        <div>
            <Header />
            <AuthorTable authors={authors} setAuthors={setAuthors} />
        </div>
    )
}
export default Main;