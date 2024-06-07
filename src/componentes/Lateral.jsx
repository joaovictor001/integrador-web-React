    import estilos from './Lateral.module.css'
    import { Link } from 'react-router-dom'

    export function Lateral() {
        return (
            <aside className={estilos.container}>
                <header>
                    <div className={estilos.perfil}>
                        <img
                            className={estilos.avatar}
                            src='https://avatars.githubusercontent.com/u/74721656?v=4'
                        />

                        <p>João Victor</p>

                    </div>

                </header>
                <section>
                <Link className={estilos.botao} 
                      to='/home'>
                        Home
                    </Link>
                    
                    <Link className={estilos.botao} 
                          to='/home/cadUser'>
                        Cadastrar Usuário
                    </Link>
                    <Link 
                        className={estilos.botao}
                        to='/home/localizacao'
                    >Mapa
                    </Link>
                    <Link 
                        className={estilos.botao}
                        to='/home/cadSensor'
                    >Cadastrar Sensor
                    </Link>
                
                    <Link 
                        className={estilos.botao}
                        to='/home/Filtro'
                    >Filtro
                    </Link>

                    <Link className={estilos.botao} to='/'>
                        Sair
                    </Link>
                </section>

            </aside>
        )
    } 