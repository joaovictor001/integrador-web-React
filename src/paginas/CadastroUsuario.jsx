import React, { useEffect } from 'react';
import axios from "axios";
import estilos from './Login.module.css';
import { useForm } from 'react-hook-form';
import { z } from "zod";
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate } from 'react-router-dom';

const schemaLogin = z.object({
    usuario: z.string()
        .min(1, "O mínimo é de 5 caracteres")
        .max(15, "O máximo são 15 caracteres"),
    senha: z.string()
        .min(2, "Informe no mínimo 4 caracteres")
        .max(20, "O máximo são 8 caracteres"),
    email: z.string()
        .email({ message: 'Por favor, insira um e-mail válido' })
});

export function CadastroUsuario() {
    const navigate = useNavigate();
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: zodResolver(schemaLogin)
    });

    const obterToken = async () => {
        try {
            console.log("Tentando obter token...");
            const response = await axios.post('http://127.0.0.1:8000/api/token/', {
                username: "smart_user",
                password: "123456"
            });
            const { access, refresh } = response.data;
            localStorage.setItem('access_token', access);
            localStorage.setItem('refresh_token', refresh);
            console.log("Token obtido com sucesso");
        } catch (error) {
            console.error('Erro ao obter token:', error);
        }
    };

    useEffect(() => {
        obterToken();
    }, []);

    async function obterDadosFormulario(data) {
        try {
            const token = localStorage.getItem('access_token');
            if (!token) {
                throw new Error("Token não encontrado. Por favor, tente novamente.");
            }

            const response = await axios.post('http://127.0.0.1:8000/api/create_user', 
            {
                username: data.usuario,
                email: data.email,
                password: data.senha
            },
            {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            console.log("Cadastro bem sucedido", response.data);
            navigate('/');
        } catch (error) {
            console.log("Erro na autenticação", error);
        }
    }

    return (
        <div className={estilos.conteiner}>
            <form className={estilos.formulario} onSubmit={handleSubmit(obterDadosFormulario)}>
                <input
                    {...register('usuario')}
                    className={estilos.campo}
                    placeholder="Usuário"
                />
                {errors.usuario && (
                    <p>{errors.usuario.message}</p>
                )}
                <input
                    {...register('email')}
                    type="email"
                    className={estilos.campo}
                    placeholder="E-mail"
                />
                {errors.email && (
                    <p>{errors.email.message}</p>
                )}
                <input
                    {...register('senha')}
                    type="password"
                    className={estilos.campo}
                    placeholder="Senha"
                />
                {errors.senha && (
                    <p>{errors.senha.message}</p>
                )}
                <button type="submit" className={estilos.botao}>Entrar</button>
            </form>
        </div>
    );
}
