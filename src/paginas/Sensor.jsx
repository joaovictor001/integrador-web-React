
import React, { useEffect, useState } from "react";
import axios from "axios";
import estilos from './Sensor.module.css';
import { Sensores } from "../componentes/sensores_card";

export function Sensor() {
    const [sensores, setSensores] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function fetchSensores() {
            try {
                const token = localStorage.getItem('access_token');
                const response = await axios.get('http://127.0.0.1:8000/api/sensores/', {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                setSensores(response.data);
                setLoading(false);
            } catch (err) {
                setError(err);
                setLoading(false);
            }
        }
        fetchSensores();
    }, []);

    if (loading) {
        return <div className={estilos.loading}>Carregando</div>;
    }

    if (error) {
        return <div className={estilos.error}>Erro ao carregar os dados: {error.message}</div>;
    }

    // Add a guard clause to check if sensores is an array
    if (!Array.isArray(sensores)) {
        return <div className={estilos.error}>Erro: dados de sensores inválidos</div>;
    }

    return (
        <main className={estilos.container}>
             {sensores.map(umSensor=> <Sensores propsSensores={umSensor} /> ) }
        </main>
    );
}