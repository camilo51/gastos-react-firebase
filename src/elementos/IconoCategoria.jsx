import IconoComida from './../images/cat_comida.svg?react';
import IconoCompras from './../images/cat_compras.svg?react';
import IconoCuentasYPagos from './../images/cat_cuentas-y-pagos.svg?react';
import IconoDiversion from './../images/cat_diversion.svg?react';
import IconoHogar from './../images/cat_hogar.svg?react';
import IconoRopa from './../images/cat_ropa.svg?react';
import IconoSaludEHigiene from './../images/cat_salud-e-higiene.svg?react';
import IconoTransporte from './../images/cat_transporte.svg?react';

const IconoCategoria = ({id}) => {
    switch (id) {
        case 'comida':
            return <IconoComida />
        case 'compras':
            return <IconoCompras />
        case 'cuentas y pagos':
            return <IconoCuentasYPagos />
        case 'diversion':
            return <IconoDiversion />
        case 'hogar':
            return <IconoHogar />
        case 'ropa':
            return <IconoRopa />
        case 'salud e higiene':
            return <IconoSaludEHigiene />
        case 'transporte':
            return <IconoTransporte />
        default:
            break;
    }
}
 
export default IconoCategoria;