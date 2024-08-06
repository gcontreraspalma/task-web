//File: src/components/CategoryForm.jsx

import React, { useState} from 'react';
import { Modal, Input, Form} from 'antd'


const CategoryForm = ({open, onCreate, onCancel}) => {
    const [form] = Form.useForm();
    return (
        <Modal
            open={open}
            title="Crear una nueva categoría"
            okText="Crear"
            cancelText="Cancelar"
            onCancel={onCancel}
            onOk={ () =>{
                form.validateFields()
                    .then(values =>{
                        form.resetFields()
                        onCreate(values)
                    })
                    .catch(info =>{
                        console.log('Validación fallida:', info)
                    })
            }}
        >
            <Form
                form={form} layout="vertical" 
                name="category_form"
            >
                <Form.Item
                    name='name'
                    label='Nombre de la Categoría'
                    rules={[{required: true, message: 'Por favor ingresa el nombre de la categoría'}]}
                >
                    <Input />
                    
                </Form.Item>

            </Form>
            
        </Modal>
    )
}

export default CategoryForm