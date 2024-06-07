import React from 'react';
import axios from "axios";
import estilos from './CadastroSensores.module.css';
import { useForm } from 'react-hook-form';
import { z } from "zod";
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate } from 'react-router-dom';



const schemaCadastro = z.object({
    tipo: z.string(),
    mac_address: z.string(),
    latitude: z.number(),
    longitude: z.number(),
    localizacao: z.string(),
    responsavel: z.string(),
    unidade_medida: z.string(),
    status_operacional: z.boolean(),
    observacao: z.string()
});

export function CadastroSensores() {
    const navigate = useNavigate();
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: zodResolver(schemaCadastro)
    });

    async function obterDadosFormulario(data) {
        try {
            const response = await axios.post(
                'http://127.0.0.1:8000/api/sensores/',
                {
                    tipo: data.tipo,
                    mac_address: data.mac_address,
                    latitude: data.latitude,
                    longitude: data.longitude,
                    localizacao: data.localizacao,
                    responsavel: data.responsavel,
                    unidade_medida: data.unidade_medida,
                    status_operacional: data.status_operacional,
                    observacao: data.observacao
                },
                {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                }
            );
            console.log("Cadastro bem-sucedido");
            navigate('/');
        } catch (error) {
            console.log("Erro no cadastro", error);
        }
    }

    return (
        <div className={estilos.container}>
            <form className={estilos.formulario} onSubmit={handleSubmit(obterDadosFormulario)}>
                <input
                    {...register('tipo')}
                    className={estilos.campo}
                    placeholder="Tipo"
                    
                />
                {errors.tipo &&(
                    <p>{errors.tipo.message}</p>
                )}
                <input
                    {...register('mac_address')}
                    className={estilos.campo}
                    placeholder="mac_address"
                    type='number'
                    
                />
                {errors.mac_address &&(
                    <p>{errors.mac_address.message}</p>
                )}
                <input
                    {...register('latitude')}
                    className={estilos.campo}
                    placeholder="latitude"
                    
                />
                {errors.latitude &&(
                    <p>{errors.latitude.message}</p>
                )}
                <input
                    {...register('longitude')}
                    className={estilos.campo}
                    placeholder="longitude"
                   
                />
                {errors.longitude &&(
                    <p>{errors.longitude.message}</p>
                )}
                <input
                    {...register('localizacao')}
                    className={estilos.campo}
                    placeholder="localizacao"
                   
                />
                {errors.localizacao &&(
                    <p>{errors.localizacao.message}</p>
                )}
                <input
                    {...register('responsavel')}
                    className={estilos.campo}
                    placeholder="responsavel"
                   
                />
                {errors.responsavel &&(
                    <p>{errors.responsavel.message}</p>
                )}
                <input
                    {...register('unidade_medida')}
                    className={estilos.campo}
                    placeholder="unidade_medida"
                   
                />
                {errors.unidade_medida &&(
                    <p>{errors.unidade_medida.message}</p>
                )}
                <input
                    
                    {...register('status_operacional')}
                    className={estilos.campo}
                    placeholder="status_operacional"
                    type="checkbox"
                    
                />
                {errors.status_operacional &&(
                    <p>{errors.status_operacional.message}</p>
                )}
                <input
                    {...register('observacao')}
                    className={estilos.campo}
                    placeholder="Observação"
                    
                />
                {errors.observacao &&(
                    <p>{errors.observacao.message}</p>
                )}
                <button
                    className={estilos.botao}
                    type="submit"
                >
                    Cadastrar
                </button>
            </form>
        </div>
    );
}    