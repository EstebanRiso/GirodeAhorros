import React ,{ useState,useEffect }from 'react';
import {estiloCuerpo1,estiloTitulo,
        estiloSubtitulo,estiloTituloTabla, estiloCuerpo2,estiloCuerpo3,estiloCuerpo4,estiloCuerpo5,estiloCuerpo6,estiloCuerpo7, estilopagina, estiloContainer, estiloCuerpoTabla} from './estilos/estilospdf1';
import { PDFDownloadLink as DWLink,Page, Text, View, Document,Image} from '@react-pdf/renderer';
import { Table, TableRow, td } from "react-table-pdf";
import {Box, h1Field, Button, Container, Typography} from "@material-ui/core"
import { useForm } from 'react-hook-form';
import axios from 'axios'
import imagen from "../img/serviu_estado.jpg"
import Pdf from "react-to-pdf";

const host="http://localhost:8081"

const ref = React.createRef();





// Crear el documento pdf del giro de ahorro
export  function PDF2(props){

  const [datagiro,setData]=useState([])
  const [dataconstructora,setData2]=useState([])
  const [dataBeneficiario,setData3]=useState([])
  const [dataBanco,setData4]=useState([])
  const [dataProyecto,setData5]=useState([])
  const [datapago,setData6]=useState([])
  const [dataCertificado,setData7]=useState([])
  
  useEffect(()=>{

    const ListarCertificadoByAuth=()=>{
      axios.get(
        host+"/api/certificado/consultaespecifica/1/"+props.numeroautorizacion
      ).then((response)=>{
        console.log("log de certificado")
        console.log(response.data)
        setData7(response.data)
      })
    }
    const Tomar_GiroAhorroByAuth=()=>{
      axios
      .get(
          host+"/api/giroahorro/consultaespecifica/1/"+props.numeroautorizacion
      )
      .then(
          (response) => {
              setData(response.data)
              setData6(response.data.autorizacion_pago)
          },
          (error) => {
              console.log(error)
          }
      );
    }
    const ListarProyectoByAuth=()=>{
      axios.get(
        host+"/api/proyecto/consultaespecifica/1/"+props.numeroautorizacion
      ).then(
        (response)=>{
          setData2(response.data.constructora)
          setData5(response.data)
        }
      )

    }

    const Listar_BeneficiariosByAuth=()=>{
      axios
      .get(
          host+"/api/beneficiario/consultaespecifica/"+props.numeroautorizacion
      )
      .then(
          (response) => {
              setData3(response.data)
              setData4( response.data.map((dato)=>{
                  return{
                    nombre_banco:dato.banco.nombre_banco,
                    numero_cuenta:dato.banco.numero_cuenta,
                    certificado:dato.banco.certificado,
                    cantidad_ahorro:dato.banco.cantidad_ahorro
                  }
              }))
          },
          (error) => {
              console.log(error)
          }
      );
    }
    

    Tomar_GiroAhorroByAuth()
    Listar_BeneficiariosByAuth()
    ListarProyectoByAuth()
    ListarCertificadoByAuth()
    
  },[])

  const FilaBenef = (data1,data2) => {

    var contador=-1
   return( data1.map((item) => {
                
                
                contador=contador+1
                
                return( 
                        <tr>
                          <td>{item.rut_beneficiario +"-"+item.dv_beneficiario}</td>
                          <td>{item.nombre_beneficiario}</td>
                          {FilaBanco(data2,contador)}
                        </tr>
                 );
            })
        )
    
  };

  
  const FilaBanco= (data1,data2)=>{

    return(
          <>
           <td>{dataCertificado[data2][0].certificado_nombre+" N° "+dataProyecto.siglas_proyecto+"-"+dataCertificado[data2][0].certificado_anio+"-"+dataCertificado[data2][0].id_certificado}</td>
           <td>{data1[data2].numero_cuenta}</td>
           <td>{data1[data2].nombre_banco}</td>
           <td>{data1[data2].cantidad_ahorro}</td>
           
          </>
      )
    }    
  
  
    //constructora
    const constructora=dataconstructora.nombre_constructora
    const rut_constructora=dataconstructora.rut_constructora
    const dv_constructora=dataconstructora.dv_constructora
   //giroahorro
    const numeroautorizacion=props.numeroautorizacion
    const resolucion_numero=datagiro.numero_resolucion
    const resolucion_fecha=datagiro.fecha_resolucion
    const nombre_proyecto=dataProyecto.nombre_proyecto
    const id_proyecto=dataProyecto.id_proyecto
    const comuna=datagiro.comuna
    const llamado=datapago.llamado
  
    const titulodescarga="Desbloqueo Cuenta N°"+numeroautorizacion+".pdf"

    const fecha=new Date()
    const fecha_hoy= fecha.getDate()+"/"+(fecha.getMonth()+1)+"/"+fecha.getFullYear()
  
    if(props.index1==false && props.index2==true){
    return(
        
        <div >
              <div ref={ref}>

                <div>
                    <h3>OFICIO ORDINARIO N°{numeroautorizacion}</h3> 
                    <p>ANT</p><p>{}</p>
                    <p>MAT</p><p>{}</p>
                    <p>ADJ</p><p>{}</p>
                </div>
                <br></br>
                <div>
                  <p>Concepción,</p> <br></br>
                  <p>DE :</p><div><p>KAREN HERNÁNDEZ LORCA</p><br></br>
                                  <p>JEFA DEPARTAMENTO OPERACIONES HABITACIONALES</p><br></br>
                                  <p>SERVIU REGIÓN DEL BIOBIO</p><br></br>
                              </div>
                </div>


                <div>
                    <p>Junto con saludar, y considerando la Resolución Exenta a Registro N° 195 de fecha 
                      27/08/2021 que me delega facultades para emitir oficios, me permito solicitar a usted girar
                      el ahorro depositado en la Cuenta de Ahorro para la vivienda, del beneficiario indicado en 
                      nómina adjunta, pertenecientes al Conjunto Habitacional CNT Tumbes,de la comuna de
                      Talcahuano, hasta el monto máximo que se señala y que formó parte de su postulación y
                      posterior adjudicación del subsidio habitacional. Además se requiere que estos giros de
                      ahorro sean depositados a nombre de {constructora}, Rut {rut_constructora}-{dv_constructora},
                      Cta. Cte. N° 53309162982, del los siguientes beneficiario:</p>
                </div>
                <br></br>
                <div>
                <table>
                    <thead>
                           
                         <tr>
                              <th>RUT</th>
                              <th>NOMBRE</th>
                              <th>CERTIFICADO</th>
                              <th>CUENTA AHORRO</th>
                              <th>BANCO</th>
                              <th>UF</th>
                         </tr>
                           
                    </thead>                    
                    <tbody>
                      
                       {FilaBenef(dataBeneficiario,dataBanco)}   
                      </tbody>
                   
                    </table>
                </div>
                <br></br>
                <div>
                  <p>A su vez, una vez depositado el ahorro a la cuenta SERVIU, se solicita desbloquear las
                     cuentas, quedando a libre disposición del beneficiario el uso de su cuenta y los excedentes
                     de ahorro que pudiera poseer.</p>
                </div>
                <br></br>
                <div>
                  <p>Para consulta y/o dar respuesta de la gestión, favor contactar a  don  Víctor Torres Zurita,
                     Jefe de Unidad Plataforma de Pago y Ejecución Presupuestaria de Subsidios, a las siguientes 
                     direcciones de correo vtorres@minvu.cl o srojasr@minvu.cl.
                  </p>
                </div>
                <br></br>
                <div>
                  <p>Sin otro particular, saluda atentamente a usted,</p>
                </div>
                
                <div><h1>KAREN HERNÁNDEZ LORCA</h1>
                      <h3>Jefa Depto. Operaciones Habitacionales</h3>
                      <h3>SERVIU Región del Biobío</h3>
                </div>

                <div>
                  <p>VTZ/hsp</p><br></br>
                  <p>Distribución:</p><br></br>
                  <p>Jefe (a) de Atención Clientes, Banco Estado.  O´Higgins N°84, Concepción.</p><br></br>
                </div>
              </div>
            


             <Pdf targetRef={ref} filename={titulodescarga}>
            {({ toPdf }) => <Button variant="contained" color="primary" onClick={toPdf}>Generar PDF</Button>}
            </Pdf>
       </div>
    );
    }
    else{
      return(null)
    }
  }

/*export function DownloadPDF1(props){

  return (
     <DWLink document={<PDF1 index1={true} index2={false} numeroautorizacion={props.numeroautorizacion}/>} fileName={"GiroAhorro_N°"+props.numeroautorizacion}>
       {({ blob, url, loading, error }) => (loading ? 'Loading document...' : 'Descargar PDF1')}
     </DWLink>
  )
}*/
