import Axios from 'axios'
import Cookie from 'js-cookie'

const url = 'http://localhost:3700/escrutinio_mesa/'
var token = Cookie.get('auth')

function getResultadoPresidente() {
    return Axios.get(url + 'obtener_resultado_presidente', {
        headers: { 'access-token': token }
    }).then(res => res.data.result)
}

function getResultadoSenadores() {
    return Axios.get(url + 'obtener_resultado_senadores', {
        headers: { 'access-token': token }
    }).then(res => res.data.result)
}

function getResultadoDiputados() {
    return Axios.get(url + 'obtener_resultado_diputados', {
        headers: { 'access-token': token }
    }).then(res => res.data.result)
}

export default {
    getResultadoPresidente,
    getResultadoSenadores,
    getResultadoDiputados
}
