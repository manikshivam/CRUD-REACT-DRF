import { useEffect, useState } from "react";

import {
    getTodos,
    createTodo,
    updateTodo,
    deleteTodo
} from "../services/todoService";


import Loader from "../components/Loader";


const Todos = () => {


    const [todos,setTodos] = useState([]);

    const [title,setTitle] = useState("");

    const [description,setDescription] = useState("");
    const [editId,setEditId] = useState(null);

    const [loading,setLoading] = useState(true);



    useEffect(()=>{

        fetchTodos();

    },[]);



    const fetchTodos = async()=>{

        try{

            const data = await getTodos();

            setTodos(data);

        }
        catch(error){

            console.log(error);

        }
        finally{

            setLoading(false);

        }

    };



    const addTodo = async(e)=>{

        e.preventDefault();

        if(!title)
            return;


        try{

            if(editId){

                const updated = await updateTodo(
                    editId,
                    {
                        title,
                        description,
                        completed:false
                    }
                );


                setTodos(
                    todos.map(item =>
                        item.id === editId
                        ? updated
                        : item
                    )
                );


                setEditId(null);


            }
            else{


                const todo = await createTodo({

                    title,
                    description,
                    completed:false

                });


                setTodos([
                    ...todos,
                    todo
                ]);

            }


            setTitle("");

            setDescription("");


        }
        catch(error){

            console.log(error);

        }

    };



    const toggleComplete = async(todo)=>{


        const updated = await updateTodo(
            todo.id,
            {
                title:todo.title,
                description:todo.description,
                completed:!todo.completed
            }
        );


        setTodos(
            todos.map(item =>
                item.id === todo.id
                ? updated
                : item
            )
        );

    };



    const removeTodo = async(id)=>{


        await deleteTodo(id);


        setTodos(
            todos.filter(
                item=>item.id !== id
            )
        );

    };
    const editTodo = (todo)=>{

        setTitle(todo.title);

        setDescription(todo.description);

        setEditId(todo.id);

    };



    if(loading)
        return <Loader/>;



    return (

        <div>


            <h2 className="fw-bold mb-4">
                My Todos
            </h2>



            <div className="card shadow-sm mb-4">

                <div className="card-body">


                    <form onSubmit={addTodo}>


                        <input

                            className="form-control mb-3"

                            placeholder="Todo title"

                            value={title}

                            onChange={
                                e=>setTitle(e.target.value)
                            }

                        />



                        <textarea

                            className="form-control mb-3"

                            placeholder="Description"

                            value={description}

                            onChange={
                                e=>setDescription(e.target.value)
                            }

                        />



                        <button className="btn btn-primary">

    {
        editId
        ?
        "Update Todo"
        :
        "Add Todo"
    }

</button>


                    </form>


                </div>

            </div>





            <div className="row">


            {
                todos.map(todo=>(


                    <div
                        className="col-md-4 mb-3"
                        key={todo.id}
                    >


                        <div className="card shadow-sm">


                            <div className="card-body">


                                <h5
                                    className={
                                        todo.completed
                                        ?
                                        "text-decoration-line-through"
                                        :
                                        ""
                                    }
                                >

                                    {todo.title}

                                </h5>



                                <p>
                                    {todo.description}
                                </p>




                                <button

                                    className="btn btn-success btn-sm me-2"

                                    onClick={
                                        ()=>toggleComplete(todo)
                                    }

                                >

                                    {
                                        todo.completed
                                        ?
                                        "Undo"
                                        :
                                        "Complete"
                                    }

                                </button>




                                <button

className="btn btn-warning btn-sm me-2"

onClick={() => editTodo(todo)}

>
Edit
</button>


<button

className="btn btn-danger btn-sm"

onClick={
    ()=>removeTodo(todo.id)
}

>
Delete
</button>



                            </div>


                        </div>


                    </div>


                ))
            }


            </div>


        </div>

    );

};


export default Todos;