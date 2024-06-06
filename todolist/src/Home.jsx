import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Create from './Create';
import axios from 'axios';

export default function TodoList() {
    const [todos, setTodos] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:3001/get')
            .then(result => setTodos(result.data))
            .catch(err => console.log(err));
    }, []);

    const handleEdit = (id) => {
        // Implement your edit logic here
        console.log(`Edit task with id: ${id}`);
    };

    const handleDelete = (id) => {
        setTodos(todos.filter(todo => todo.id !== id));
        // Optionally make a DELETE request to your backend
        axios.delete(`http://localhost:3001/delete/${id}`)
            .catch(err => console.log(err));
    };

    return (
        <div className="container mx-auto p-4">
            <h2 className="mb-6 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white text-center">
                To Do List
            </h2>
            <Create />
            {
                todos.length === 0 ? (
                    <div className="flex justify-center items-center">
                        <h2 className="mt-6 mb-4 text-2xl font-bold leading-none tracking-tight text-gray-900 md:text-3xl lg:text-4xl dark:text-black">
                            No Records
                        </h2>
                    </div>
                ) : (
                    <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        <AnimatePresence>
                            {todos.map(todo => (
                                <motion.div
                                    key={todo.id}
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.9 }}
                                    transition={{ duration: 0.3 }}
                                    className="p-4 bg-white shadow-md rounded-lg flex flex-col justify-between"
                                >
                                    <p className="text-lg font-medium text-gray-900 mb-4">{todo.task}</p>
                                    <div className="flex justify-end space-x-2">
                                        <button
                                            onClick={() => handleEdit(todo.id)}
                                            className="px-2 py-1 text-white bg-blue-500 rounded hover:bg-blue-600"
                                        >
                                            Edit
                                        </button>
                                        <button
                                            onClick={() => handleDelete(todo.id)}
                                            className="px-2 py-1 text-white bg-red-500 rounded hover:bg-red-600"
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </div>
                )
            }
        </div>
    );
}
