import React, {useState, useEffect} from 'react'
import axios from 'axios';
import {useNavigate} from 'react-router-dom';

const AuthorTable = (props) => {
    const navigate = useNavigate();
    const {_id} = props;
    const [name, setName] = useState('');
    const [errors, setErrors] = useState([]);

    useEffect(()=>{
        axios.get(`http://localhost:8000/api/authors/${_id}`)
        .then((res)=>{
        console.log(res.data);
            setName(res.data.name);
        })
        .catch((err)=>{
            console.log(err);
        })
    }, [])

    const submitHandler = (e) => {
        e.preventDefault();
        if(_id !== undefined){
            console.log(`name is: ${name}`);
            axios.put(`http://localhost:8000/api/authors/${_id}`, {
                name
            })
                .then( res => {
                    console.log(res);
                    navigate('/');
                })
                .catch((err)=>{
                    const errorResponse = err.response.data.errors;
                    const errorArr = [];
                    for (const key of Object.keys(errorResponse)) {
                        errorArr.push(errorResponse[key].message)
                    }
                    setErrors(errorArr);
                })
        } else {
            console.log(`name is: ${name}`);
            axios.post('http://localhost:8000/api/authors', {
                name
            })
                .then(res=>{
                    console.log(res);
                    console.log(res.data);
                    navigate('/');
                })
                .catch((err)=>{
                    const errorResponse = err.response.data.errors;
                    const errorArr = [];
                    for (const key of Object.keys(errorResponse)) {
                        errorArr.push(errorResponse[key].message)
                    }
                    setErrors(errorArr);
                })
        }
    }
    const cancelHandler = (e) => {
        e.preventDefault();
        navigate('/')
    }

    return (
        <div>
            <form onSubmit={submitHandler}>
                {errors.map((err, index) => <p key={index}>{err}</p>)}
                {
                    _id ?
                    <div>
                        <h2>Edit this author</h2>
                        <label>
                            Name:
                            <input type="text" value={name} onChange={(e) => setName(e.target.value)} class="inputBox" />
                        </label>
                    </div> :
                    <div>
                        <h2>Add a new author</h2>
                        <label>
                            Name:
                            <input type="text" onChange={(e) => setName(e.target.value)} class="inputBox" />
                        </label>
                    </div>
                }
                <button onClick={cancelHandler}>Cancel</button>
                <input type="submit" class="submitBtn" />
            </form>
        </div>
    )
}
export default AuthorTable;