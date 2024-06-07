import React from "react"
import { Routes, Route } from "react-router-dom"
import {Login} from '../paginas/Login'
import {Home} from '../paginas/Home'
import {Sensor} from '../paginas/Sensor'
import { Localizacao } from "../paginas/Localizacao"
import { CadastroUsuario } from "../paginas/CadastroUsuario"
import { CadastroSensores } from "../paginas/CadastroSensores"
import { atualizarSensores } from "../paginas/AtualizarSensores"
import { Filtro } from "../paginas/Filtro"



export function Rotas() {
    return (
        <Routes>

            <Route path='/' element={<Login />} />
            <Route path='/cadastroUser' element={<CadastroUsuario />} />
            <Route path='/cadastroSensor' element={<CadastroSensores />} />


            <Route path='/home' element={<Home />}>
                <Route index element={<Sensor/>}></Route>
                <Route path='localizacao' element={ <Localizacao /> } />
                <Route path='cadUser' element={<CadastroUsuario/>}/>
                <Route path='cadSensor' element={<CadastroSensores/>}/>
                <Route path='atualizarSensor' element={<CadastroSensores/>}/>
                <Route path='Filtro' element={<Filtro/>}/>

               
            </Route>

        </Routes>
    )
}