import React, { useState } from 'react'
import '../App.css';
import { useParams } from 'react-router-dom';
import Form from '../components/Form';
import Header from '../components/Header';

const Edit = (props) => {
    const {_id} = useParams();
    return (
        <div>
            <Header />
            <Form _id={_id} />
        </div>
    )
}
export default Edit;