import React, { useEffect, useState } from "react";

export const TaskList = () => {
    const [task, setTask] = useState("");
    const [data, setData] = useState([]);

    //Para crear Usuario
    const createUser=()=>{
        fetch('https://playground.4geeks.com/todo/users/aaron', 
            { method: 'POST', headers: { 'Content-Type': 'application/json' }}).then(response=>{
                    if(!response.ok){
                        throw new Error(`Error en la respuesta del servidor: ${response.status}`);
                    }return response.json();
                }).then(data=>getUser()).catch(error=>console.log(error));
    }

    const getUser=()=>{
        //Visualizar Lista de usuarios
        fetch('https://playground.4geeks.com/todo/users/aaron').then(response=>{
            if(!response.ok) throw new Error(`Error en la respuesta del servidor: ${response.status}`);
            return response.json();
        }).then(parsedJson=>setData(parsedJson)).catch(error=>createUser);
    }

    const createTask=()=>{
        fetch('https://playground.4geeks.com/todo/todos/aaron',{method: 'POST',
            headers:{
                'Content-Type': 'application/json'},
                body: JSON.stringify({label: task, is_done:false})
        }).then(response=>{
            if(!response.ok) throw new Error(`Error en la respuesta del servidor: ${response.status}`);
            return response.json();
        }).then(data=>getUser()).catch(error=>console.log(error));
    }

    const handleDelete=id=>{
        fetch('https://playground.4geeks.com/todo/todos/'+id, {
            method:'DELETE'
        }).then(response=>getUser()).catch(error=>console.log(error));

    }

    useEffect(() => {
        getUser();
    }, []);

    const handleSubmit=e=>{
        e.preventDefault();
        createTask();
        setTask("");
    }

    return (
        <div className="container">
            <form onSubmit={handleSubmit}>
                <input type="text" className="form-control fs-4" placeholder="Escribe una tarea..." value={task} onChange={e=>setTask(e.target.value)} />
                <input type="submit" hidden />
            </form>
            <div>
                <ul className="list-unstyled">
                    {data.length===0?(<li className="fs-4 text-muted">No hay tareas, ¿Deseas añadir una?</li>):(data.todos?.map((el, i)=> <li className="d-flex justify-content-between fs-4 todo-item" key={i}>{el.label}<span className="delete-btn" onClick={()=>handleDelete(el.id)}><i className="fa-solid fa-delete-left"></i></span></li>))}
                </ul>
            </div>
        </div>

    )
}