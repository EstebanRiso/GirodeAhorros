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
export  function PDF1(props){

  const [datagiro,setData]=useState("")
  const [dataconstructora,setData2]=useState("")
  const [dataBeneficiario,setData3]=useState([])
  const [dataBanco,setData4]=useState([])

  useEffect(()=>{
    const Tomar_GiroAhorroByAuth=()=>{
      axios
      .get(
          host+"/api/giroahorro/consultaespecifica/1/"+props.numeroautorizacion
      )
      .then(
          (response) => {
              setData(response.data)
              setData2(response.data.constructora)
          },
          (error) => {
              console.log(error)
          }
      );
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
           <td>{data1[data2].certificado}</td>
           <td>{data1[data2].numero_cuenta}</td>
           <td>{data1[data2].cantidad_ahorro}</td>
          </>
      )
    }    
  
  
    console.log(dataBanco)
    console.log(dataBeneficiario)
  
    //constructora
    const constructora=dataconstructora.nombre_constructora
    const rut_constructora=dataconstructora.rut_constructora
    const dv_constructora=dataconstructora.dv_constructora
   //giroahorro
    const numeroautorizacion=props.numeroautorizacion
    const resolucion=datagiro.resolucion
    const nombre_proyecto=datagiro.nombre_proyecto
    const id_proyecto=datagiro.id_proyecto
    const comuna=datagiro.comuna
    const llamado=datagiro.llamado
  
    

    const fecha=new Date()
    const fecha_hoy= fecha.getDate()+"/"+(fecha.getMonth()+1)+"/"+fecha.getFullYear()
  
    if(props.index1==true && props.index2==false){
    return(
        
        <div >
             <br></br>
            <Pdf targetRef={ref} filename="code-example.pdf">
            {({ toPdf }) => <button onClick={toPdf}>Generate Pdf</button>}
            </Pdf>
            <br></br>
            
            <div ref={ref}>
                <img src={imagen} style={{width:100,height:100}} />
      

        
              <h1 style={estiloTitulo.estilo}>
              <br></br>AUTORIZACIÓN DE GIRO DE AHORROS Nº {numeroautorizacion} 
              </h1>
   
          
 
              <p style={estiloCuerpo1.estilo}>
               <br></br>
                La Jefa del Departamento de Operaciones Habitacionales SERVIU Región del Biobío que suscribe, en virtud de lo 
                dispuesto en el Art. 11 del D.S. N° 255 de (V. y U.) del 2006, y la {resolucion} que me delega la facultad de emitir giros de ahorro, cumplo con autorizar a {constructora}.
                RUT: {rut_constructora}-{dv_constructora} para proceder al Giro de los Ahorros Previos hasta el monto máximo que más adelante se señala, 
                de los fondos acreditados como ahorros del o los beneficiarios de subsidios habitacionales comité {nombre_proyecto}.
                ID:{id_proyecto} de la comuna de {comuna} - Modalidad Programa de Protección del Patrimonio
                Familiar llamado {llamado}, que se encuentran depositados en las Cuentas de Ahorro, que se indican en la siguiente nomina:
                <br></br><br></br>
              </p>
             
  

              <h2 style={estiloSubtitulo.estilo}>AUTORIZACIÓN DE PAGO N°:</h2><h2 style={estiloCuerpo2.estilo}> {numeroautorizacion}</h2>
      
      
              <h2 style={estiloSubtitulo.estilo}>LÍNEA DE SUBSIDIO:</h2><h2 style={estiloCuerpo2.estilo}> PROGRAMA DE PROTECCIÓN DEL PATRIMONIO FAMILIAR (DS. 255)</h2>
    

    
              <h2 style={estiloSubtitulo.estilo}>TÍTULO:</h2><h2 style={estiloCuerpo2.estilo}> MEJORAMIENTO VIVIENDA TITULO II </h2>
      

      
              <h2 style={estiloSubtitulo.estilo}>AÑO DE LLAMADO:</h2><h2 style={estiloCuerpo2.estilo}> {llamado}</h2>
           

        
              <h2 style={estiloSubtitulo.estilo}>BENEFICIARIOS:</h2>
       

      
          
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
         
       
          
              <p style={estiloCuerpo3.estilo}>
                    <p style={estiloCuerpo4.estilo}>Sres. Entidades Financieras</p>, antes del pago, favor solicitar la autenticidad de este documento a los
                    siguientes correos electrónicos del SERVIU Región del Biobío: rcastroh@minvu.cl vpenac@minvu.cl 
                     y/o srojasr@minvu.cl
                    
                        <p style={estiloCuerpo4.estilo}>*** La validación se efectuará en un plazo no mayor a 24 hrs. ***</p>
             
                    
              </p>
        
            


                  <br></br><br></br><br></br><br></br><br></br><br></br>
     


            
                  <h1 style={estiloCuerpo5.estilo}>
                      KAREN HERNÁNDEZ LORCA 
                  </h1><br></br>

                  <p style={estiloCuerpo1.estilo}>
                    Jefa Depto. Operaciones Habitacionales<br></br>
                    SERVIU Región del Biobío
                             
                  </p>
         
           
           
            <br></br><br></br>
    
             <h1 style={estiloCuerpo7.estilo}>
                        <h1 style={estiloCuerpo6.estilo}>“Importante:</h1> En caso de extravío de este documento, el contratista deberá solicitar una copia de él 
                        adjuntando declaración jurada ante notario del extravío de la autorización y declarando que no fue 
                        presentada ante la institución financiera y que por consiguiente no ha percibido los ahorros de las 
                        personas que se individualizan en la misma autorización”
              </h1>
         
            <br></br><br></br>
        
              <h1 style={estiloCuerpo1.estilo}> Concepción,{  fecha_hoy}</h1>
              <br></br><br></br>
   

     
        
          </div>
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
