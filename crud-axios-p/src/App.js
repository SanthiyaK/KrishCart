import { useEffect, useState } from 'react';
import './App.css';
import axios from 'axios'

function App() {
   const [data,setData] = useState([])
   const [name,setName] = useState([])
   const [email,setEmail] = useState([])
   const [editname,setEditName] = useState([])
   const [editemail,setEditEmail] = useState([])
   const [editid,setEditid] = useState(1)
    useEffect( ()=> {
       axios.get('http://localhost:4000/users')
        .then(response => setData(response.data))
      .catch(err => console.log(err))
    },[])
   
    const handleSubmit= (e) =>{
      e.preventDefault();
      const id= data.length +1;
      axios.post('http://localhost:4000/users',{id:id,name: name, email: email})
      .then(response =>{
       window.location.reload()
      })  
      .catch(err => console.log(err))
    }   
    const handleEdit= (id) =>{
      axios.get('https://jsonplaceholder.typicode.com/users/'+editid)
      .then(response =>{
          setEditName(response.data.name)
          setEditEmail(response.data.email)
          setEditid(id)
      }).catch(err => console.log(err))
     
    }
    const handleUpdate= ()=>{
      axios.put('https://jsonplaceholder.typicode.com/users/'+editid, {id: editid,name: editname,email:editemail})
      .then(response =>{
        console.log(response)
        window.location.reload()
        setEditid(-1)
       }) 
    }
    const handleDelete= (id)=>{
      axios.delete('https://jsonplaceholder.typicode.com/users/',+editid)
      .then(response =>{
          setEditName(response.data.name)
          setEditEmail(response.data.email)
          setEditid(id)
      }).catch(err => console.log(err))
     
    }
  return (
    <>
    <div>
   <form onSubmit={handleSubmit}>
     <input type="text" placeholder='Enter the name' onChange={(e) => setName(e.target.value)}/> 
     <input type="text" placeholder='Enter the email' onChange={(e) => setEmail(e.target.value)}/> 
     <button> Add Items</button>
   </form>
    </div>
     <div>
      <table>
        <thead>
          <tr>
            <th> ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {
             data.map((user,id)=>(
              user.id=== editid ?
              <tr>
              <td>{user.id}</td>
              <td><input type="text" vaule={editname} onChange={(e) => setEditName(e.target.value)}/></td>
              <td><input type="text" vaule={editemail} onChange={(e) => setEditEmail(e.target.value)}/></td>
              <button onClick={handleUpdate}>Update</button>
              </tr>
              :
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
             
                <td>
                 <button onClick={()=>handleEdit(user.id)}>Edit</button>
                 <button onClick={()=>handleDelete(user.id)}>Delete</button>
                 </td>
              </tr>
             ))
          }
        </tbody>
      </table>
    </div> 
    </>
  )}

export default App;
