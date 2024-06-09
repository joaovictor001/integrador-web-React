import React from 'react';
import axios from 'axios';
import estilos from './Login.module.css';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate, Link } from 'react-router-dom';

const schemaLogin = z.object({
    usuario: z.string()
        .min(2, "O mínimo é de 5 caracteres")
        .max(15, "O máximo são 15 caracteres"),
    senha: z.string()
        .min(1, "Informe no mínimo 4 caracteres")
        .max(20, "O máximo são 20 caracteres"),
});

export function Login() {
    const navigate = useNavigate();
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: zodResolver(schemaLogin)
    });

    async function obterDadosFormulario(data) {
        try {
            const response = await axios.post('http://127.0.0.1:8000/api/token/', {
                username: data.usuario,
                password: data.senha
            });
            const { access, refresh } = response.data;
            localStorage.setItem('access_token', access);
            localStorage.setItem('refresh_token', refresh);

            navigate('home');
        } catch (error) {
            alert("Erro na autenticação: " + (error.response?.data?.detail || error.message));
        }
    }

    return (
        <div className={estilos.conteiner}>
            <form className={estilos.formulario} onSubmit={handleSubmit(obterDadosFormulario)}>
                <input
                    {...register('usuario')}
                    className={estilos.campo}
                    placeholder="Usuário"
                    value={"joao"}
                />
                {errors.usuario && (
                    <p>{errors.usuario.message}</p>
                )}
                <input
                    {...register('senha')}
                    type="password"
                    className={estilos.campo}
                    placeholder="Senha"
                    value={123}
                />
                {errors.senha && (
                    <p>{errors.senha.message}</p>
                )}
                <div  className={estilos.divbutton}><button className={estilos.botao}>Entrar</button>
                <Link
                    className={estilos.botaoCad}
                    to='/cadastroUser'
                >
                    Cadastre-se
                </Link>
                </div>
            </form>
        </div>
    );
}
