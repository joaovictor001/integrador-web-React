import estilos from './sensores_card.module.css'
import { Card } from './Card';



export function Sensores({propsSensores}){
    return(
        <Card>
            <figure className={estilos.conteiner}>
                <figcaption>{propsSensores.tipo}</figcaption>
                <p>Id: {propsSensores.id}</p>
                <p>{propsSensores.tipo}</p>
                <p>{propsSensores.localizacao}</p>
                <p>{propsSensores.latitude}</p>
                <p>{propsSensores.longitude}</p>
            </figure>
        </Card>
    )
}
