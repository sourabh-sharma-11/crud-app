import React, { useEffect, useState } from 'react'
import axios from "axios"
import "./user.css"
import { Link } from 'react-router-dom'
import toast from 'react-hot-toast'

const User = () => {
    const [users, setUsers] = useState([])
    useEffect(() => {
        const fetchData = async () => {
            const response = await axios.get("http://localhost:3005/api/getAll")
            setUsers(response.data)
        }
        fetchData();

    }, [])
    
    const deleteUser = async(userId) => {
        const confirmDelete = window.confirm("Are You sure want to delete this user")
        if(! confirmDelete)return;
 await axios.delete(`http://localhost:3005/api/delete/${userId}`)
 .then((response)=>{
   console.log(response)
   setUsers((prevUser)=> prevUser.filter((users)=> users._id !==userId))
   console.log(response)
    toast.success(response.data.msg, {position: " top-right"})
 })
 .catch((error)=>{
    console.log(error)
 })
    }
    return (
        <>
            <div className='userTable'>
                <Link to={"/add"} className='addButton'>Add User</Link>
                <table border={1} cellPadding={10} cellSpacing={0}>
                    <thead>
                        <tr>
                            <th>S.No.</th>
                            <th>User name</th>
                            <th>User Email</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            users.map((users, index) => {
                                return (
                                    <tr key = {users._id}>
                                        <td>{index +1}</td>
                                        <td>{users.fname} {users.lname}</td>
                                        <td>{users.email}</td>
                                        <td className='actionButton'>
                                            <button onClick={() => deleteUser(users._id)}><i className="fa-solid fa-trash"></i></button>
                                            <Link to={`/edit/`+users._id}><i className="fa-solid fa-pen-to-square"></i></Link>
                                        </td>
                                    </tr>
                                )
                            })
                        }

                    </tbody>
                </table>
            </div>
        </>
    )
}

export default User