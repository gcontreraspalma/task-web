// File: src/components/TaskTracker.jsx
import React, { useState, useEffect } from 'react';
import { List, Button, Layout, Typography, Card, Space, Menu } from 'antd';
import { PlusOutlined, DeleteOutlined, CheckOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';
import TaskForm from './TaskForm';
import CategoryForm from './CategoryForm';

import { createCategory, getCategories } from '../services/CategoryService';
import { createTask, getTasks, deleteTask, updateStatusTask} from '../services/TaskService';

const TaskTracker = () => {
    const [tasks, setTasks] = useState([]);
    const [visible, setVisible] = useState(false);
    const [visibleCategory, setVisibleCategory ] = useState(false)
    const [categories, setCategories] = useState([])


    const addTask = async (task) => {
        console.log(task)
        //setTasks([...tasks, task]);
        const newTask = await createTask(task)
        console.log(newTask)
        loadTasks()
        setVisible(false);
    };

    const addCategory = async (category) =>{
        console.log(category)
        await createCategory(category)
        loadCategories()
        setVisibleCategory(false)
    }
    const loadTasks = async() =>{
        let tasks = await getTasks()
        tasks = tasks.map(task => {
            return { ...task, deadline: dayjs(task.deadline)}
        })
        
        setTasks(tasks)
    }
    const loadCategories = async () => {
        const categories = await getCategories()
        setCategories(categories)
    };

    const handleDeleteTask = async (taskId) => {
        try {
            await deleteTask(taskId);
            loadTasks();  // Recargar tareas después de eliminar
        } catch (error) {
            console.error('Error al eliminar tarea:', error);
        }
    };

    const handleUpdateStatusTask = async (taskId) => {
        try {
            await updateStatusTask(taskId, 'completed');
            loadTasks();  // Recargar tareas después de actualizar el estado
        } catch (error) {
            console.error('Error al actualizar estado de tarea:', error);
        }
    };
    useEffect(()=>{
        loadTasks()
        loadCategories()
    }, [])

    return (
        <Layout style={{height: '100vh', width: '100vw'}}>
            <Layout.Header style={{backgroundColor: 'white', display: 'flex', alignItems: 'center'}}>
                <Typography.Title >
                    Tareas
                </Typography.Title>
                <Menu
                    theme="dark"
                    mode="horizontal"
                    defaultSelectedKeys={['2']}
                    style={{ flex: 1, minWidth: 0 }}
                >
                    <Menu.Item>Home</Menu.Item>
                    <Menu.Item>About</Menu.Item>
                </Menu>
            </Layout.Header>
            <Layout.Content>

                <div>
                    
                    <Button
                        type="primary"
                        shape="circle"
                        icon={<PlusOutlined />}
                        size="large"
                        onClick={() => setVisible(true)}
                        style={{ marginBottom: '20px' }}
                    />
                    
                <Button
                        type="primary"
                        size="large"
                        onClick={()=>{
                            setVisibleCategory(true)
                        }}
                        style={{marginBottom:'20px'}}
                    >
                        Categorias
                    </Button>
                    <TaskForm
                        open={visible}
                        categories={categories}
                        onCreate={addTask}
                        onCancel={() => setVisible(false)}
                    />
                    <CategoryForm
                        open={visibleCategory}
                        onCreate={addCategory}
                        onCancel={()=> setVisibleCategory(false)}
                    />
                    <List
                        size="large"
                        bordered
                        grid={{ gutter: 16, column: 4 }}
                        dataSource={tasks}
                        renderItem={item => (
                            <List.Item key={item.id}>
                                <Card
                                    title={item.name}
                                    extra={
                                        <Space>
                                            <Button 
                                                type="primary"
                                                shape="circle"
                                                icon={<CheckOutlined />} 
                                                onClick={()=> handleUpdateStatusTask(item.id)}
                                            />
                                            <Button
                                                type="default" 
                                                shape="circle"
                                                icon={<DeleteOutlined />} 
                                                onClick={()=>handleDeleteTask(item.id)}
                                            />

                                        </Space>
                                    }
                                >
                                    <p>{item.description}</p>
                                    <p>Plazo: {item.deadline?.format('DD-MM-YYYY')} </p>
                                    <p>Categoría: {item.category}</p>
                                    <p>Estado: {item.status}</p>
                                </Card>
                            </List.Item>
                        )}
                        style={{ marginTop: '20px' }}
                    />
                </div>
            </Layout.Content>

        </Layout>

    );
};

export default TaskTracker;
