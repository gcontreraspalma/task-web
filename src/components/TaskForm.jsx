// File: src/components/TaskForm.jsx
import React, { useState, useEffect } from 'react';
import { Modal, Input, DatePicker, Select, Form } from 'antd';
const { Option } = Select;

const TaskForm = ({ open, categories, onCreate, onCancel }) => {
    const [form] = Form.useForm();


    return (
        <Modal
            open={open}
            title="Crear una nueva tarea"
            okText="Crear"
            cancelText="Cancelar"
            onCancel={onCancel}
            onOk={() => {
                form.validateFields()
                    .then(values => {
                        form.resetFields();
                        onCreate(values);
                    })
                    .catch(info => {
                        console.log('Validación fallida:', info);
                    });
            }}
        >
            <Form form={form} layout="vertical" name="task_form">
                <Form.Item
                    name="name"
                    label="Nombre de la Tarea"
                    rules={[{ required: true, message: 'Por favor ingresa el nombre de la tarea' }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    name="description"
                    label="Descripción"
                >
                    <Input.TextArea />
                </Form.Item>
                <Form.Item
                    name="deadline"
                    label="Plazo"
                >
                    <DatePicker style={{ width: '100%' }} />
                </Form.Item>
                <Form.Item
                    name="category"
                    label="Categoría"
                    rules={[{ required: true, message: 'Por favor selecciona una categoría' }]}
                >
                    <Select placeholder="Selecciona una categoría">
                        {categories.map(category => (
                            <Option key={category.id} value={category.name}>
                                {category.name}
                            </Option>
                        ))}
                    </Select>
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default TaskForm;
