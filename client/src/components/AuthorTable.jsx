import React, {useState, useEffect} from 'react'
import axios from 'axios';
import {useNavigate, Link} from 'react-router-dom';

const AuthorTable = (props) => {
    const navigate = useNavigate();
    const {authors, setAuthors} = props;

    const removeFromDom = authorId => {
        setAuthors(authors.filter(author => author._id != authorId))
    }
    const deleteAuthor = (authorId) => {
        axios.delete(`http://localhost:8000/api/authors/${authorId}`)
            .then(res => {
                removeFromDom(authorId)
            })
            .catch(err => console.log(err))
    }

    useEffect(()=>{
        axios.get("http://localhost:8000/api/authors")
        .then((res)=>{
        console.log(res.data);
            setAuthors(res.data);
        })
        .catch((err)=>{console.log(err)})
    }, [])

    return (
        <div>
            <Link to="/authors/add" class="addAuthorBtn">Add Author</Link>
            <table>
                <thead>
                    <tr>
                        <th>Author</th>
                        <th>Available Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        authors.map((author, index) => {
                            return(
                                <tr key={index}>
                                    <td>{author.name}</td>
                                    <td>
                                        <button onClick={(e) => navigate(`authors/edit/${author._id}`)}>Edit</button>
                                        <button onClick={(e) => deleteAuthor(author._id)}>Delete</button>
                                    </td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>
        </div>
    )
}
export default AuthorTable;