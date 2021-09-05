import logo from './logo.svg';
import "./App.css";
import List from "./List";
import { useState } from 'react';
import {uid} from "uid";

function App() {
  const [contacts, setContacts] = useState([
    {
    id: 1,
    name: "jaka",
    telp: "09817283",
    },  
    {
      id: 2,
      name: "jakala",
      telp: "098172123",
      },
      {
      id: 3,
      name: "jakala",
      telp: "098172123",
      },
      {  id: 4,
        name: "jakala",
        telp: "098172123",
        }
  ]);

  const[isUpdate,setIsUpdate] = useState({id:null, status:false});

  const [formData, setFormData] = useState({
    name: "",
    telp: "", 
  });

  function handleChange(e){
    let data = {...formData};
    data[e.target.name] = e.target.value;
    setFormData(data);
  }

  function hadleSubmit(e) {
    e.preventDefault();
    alert("oke");
    let data = [...contacts];

    if(formData.name === ""){
      return false;
    }
    if (formData.telp === ""){
      return false;
    }

  if(isUpdate.status){
    data.forEach((contact) => {
      if(contact.id === isUpdate.id){
        contact.name = formData.name;
        contact.telp = formData.telp;
      }
    });
  } 
  else{
    data.push({id: uid(), name: formData.name,telp: formData.telp});
  }

  //menambahkan kontak

  setContacts(data);
  setFormData({ name : "", telp : ""});
  setIsUpdate({id: null, status : "false"});
  }

  function handleEdit(id){

    let data =[... contacts];
    let foundData = data.find(contact => contact.id === id);
    setFormData({name: foundData.name, telp: foundData.telp});
    setIsUpdate({id :id, status:true});
  }

  function handleDelete(id){
    let data = [... contacts];
    let filteredData = data.filter(contact => contact.id !== id);
    setContacts(filteredData);
  }

  return (
    <div className="App">
      <h1 className="px-3 py-3">My Contact List</h1>

      <form onSubmit={hadleSubmit} className="px-3 py-4">
        <div className="form-group">
          <label htmlFor="">Name</label>
          <input type="text" className="form-control" 
          onChange={handleChange}
          value={formData.name} name="name" />
        </div>
        <div className="form-group mt-3">
          <label htmlFor="">Password</label>
          <input type="text" className="form-control" 
          onChange={handleChange}
          value={formData.telp} name="telp" />
        </div>
        <div>
          <button type="submit" className="btn btn-primary w-100 mt-3">
            Save
          </button>
          <button type="Close" className="btn btn-primary w-100 mt-3">
            Close
          </button>
        </div>
      </form>
      <List 
        handleDelete = {handleDelete}
        handleEdit={handleEdit} 
        data={contacts}/> 

    </div>
  );
}

export default App;
