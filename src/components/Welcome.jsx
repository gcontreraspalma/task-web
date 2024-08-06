// File: src/components/Welcome.jsx
import React from 'react';
import { Button } from 'antd';

const Welcome = ({ onEnter }) => {
    return (
        <div style={{ textAlign: 'center', marginTop: '20%' }}>
            <h1>Bienvenido al Seguimiento de Tareas</h1>
            <Button type="primary" size="large" onClick={onEnter}>
                Entrar
            </Button>
        </div>
    );
};

export default Welcome;
