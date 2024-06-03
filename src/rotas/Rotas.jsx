import React from "react"
import { Routes, Route } from "react-router-dom"
import {Login} from '../paginas/Login'
import {Home} from '../paginas/Home'
import {Sensor} from '../paginas/Sensor'
import { Localizacao } from "../paginas/Localizacao"



export function Rotas() {
    return (
        <Routes>

            <Route path='/' element={<Login />} />

            <Route path='/home' element={<Home />}>
                <Route index element={<Sensor/>}></Route>
                <Route path='localizacao' element={ <Localizacao /> } />
               
            </Route>

        </Routes>
    )
}