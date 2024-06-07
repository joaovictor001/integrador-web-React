import React, { useState } from 'react';
import axios from 'axios';
import estilos from './Filtro.module.css';
 
export function Filtro() {
    const [filters, setFilters] = useState({
        responsavel: '',
        status_operacional: false,
        tipo: '',
        localizacao: '',
    });
 
    const [sensors, setSensors] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
 
    const handleChange = (e) => {
        const { name, type, checked, value } = e.target;
        setFilters({
            ...filters,
            [name]: type === 'checkbox' ? checked : value,
        });
    };
 
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
 
        try {
            const token = localStorage.getItem('access_token');
            const response = await axios.post('http://127.0.0.1:8000/api/sensor_filter/', filters, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });
            setSensors(response.data);
        } catch (error) {
            console.error('Error fetching sensors:', error);
            setError(error);
        } finally {
            setLoading(false);
        }
    };
 
    return (
        <body className={estilos.body}>
            <div className={estilos.container}>
            <form onSubmit={handleSubmit} className={estilos.formulario}>
 
                    <h2 className={estilos.titulos}>Preencha os campos para filtrar...</h2>
 
                    <label>Responsável</label>
                    <input type="text" name="responsavel" value={filters.responsavel} onChange={handleChange} className={estilos.input}/>
 
                    <label>Status Operacional *</label>
                    <input type="checkbox" name="status_operacional" checked={filters.status_operacional} onChange={handleChange} className={estilos.checkBox}/>
 
                    <label>Tipo</label>
                    <input type="text" name="tipo" value={filters.tipo} onChange={handleChange} className={estilos.input}/>
 
                    <label>Localização</label>
                    <input type="text" name="localizacao" value={filters.localizacao} onChange={handleChange} className={estilos.input}/>
 
                    <div className={estilos.containerButton}>
                        <button className={estilos.botao} type="submit">Filtrar</button>
                    </div>
                   
            </form>
 
            {loading && <div className={estilos.conteiner}><h1>Carregando...</h1></div>}
            {error && <div className={estilos.conteiner}><h1>Erro ao buscar sensores: {error.message}</h1></div>}
 
            <div className={estilos.tabela}>
                <h1 className={estilos.titulos}>Sensores Filtrados</h1>
               
                <table className={estilos.sensorTable}>
                <thead className={estilos.sensorTable}>
                        <tr className={estilos.sensorTable}>
                            <th className={estilos.sensorTable}>ID</th>
                            <th className={estilos.sensorTable}>Tipo</th>
                            <th className={estilos.sensorTable}>Localização</th>
                            <th className={estilos.sensorTable}>Responsável</th>
                        </tr>
                    </thead>
                {sensors.map(sensor=>(
                    <tbody className={estilos.sensorTable}>
                        <td key={sensor.id}>{sensor.id}</td>
                        <td>{sensor.tipo}</td>
                        <td>{sensor.localizacao}</td>
                        <td> {sensor.responsavel}</td>
                    </tbody>
                ))}  
                </table>
               
            </div>
        </div>
        </body>
       
    );
};
 