import React ,{ useState,useEffect }from 'react';
import {estiloCuerpo1,estiloTitulo,
        estiloSubtitulo,estiloTituloTabla, estiloCuerpo2,estiloCuerpo3,estiloCuerpo4,estiloCuerpo5,estiloCuerpo6,estiloCuerpo7, estilopagina, estiloContainer, estiloCuerpoTabla} from './estilos/estilospdf1'
import {Box, h1Field, Button, Container, Typography} from "@material-ui/core"
import { useForm } from 'react-hook-form';
import axios from 'axios'
import imagen from "../img/serviu_estado.jpg"
import Pdf from "react-to-pdf";


const host="http://localhost:8081"

const ref = React.createRef();





// Crear el documento pdf del giro de ahorro
export  function PDF2(props){

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

            <Pdf targetRef={ref} filename="code-example.pdf">
            {({ toPdf }) => <button onClick={toPdf}>Generate Pdf</button>}
            </Pdf>

            <div ref={ref}>
                <img src={imagen} style={{width:100,height:100}} />
      

        
              <h1 style={estiloTitulo.estilo}>OFICIO ORDINARIO N°:{numeroautorizacion}</h1>


              <h1 style={estiloTitulo.estilo}>ANT:</h1>
   

               
          
 
              <h1 style={estiloCuerpo1.estilo}>

                <br></br><br></br></h1>
       

      
          
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
         
       
     
     
            


                  <br></br><br></br><br></br><br></br><br></br><br></br>
     


            
                  <h1 style={estiloCuerpo5.estilo}>
                      KAREN HERNÁNDEZ LORCA 
                  </h1><br></br>
                  <h1 style={estiloCuerpo1.estilo}>
                    Jefa Depto. Operaciones Habitacionales<br></br>
                    SERVIU Región del Biobío
                             
                  </h1>
         
           
           
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