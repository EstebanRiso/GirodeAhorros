import React ,{ useState,useEffect }from 'react';
import {estilopagina,estiloTitulo} from './estilos/estilospdf2';
import {Box, h1Field, Button, Container, Typography} from "@material-ui/core"
import { useForm } from 'react-hook-form';
import axios from 'axios'
import imagen from "../img/serviu_estado.jpg"
import Pdf from "react-to-pdf";
import ReactExport from "react-export-excel";




const ExcelFile = ReactExport.ExcelFile;
const  ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;

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
  const [dataDesbloqueo,setDataDesbloqueo]=useState([])
  const [dataCertificado,setData7]=useState([])
  const [NombreBanco,setData8]=useState([])
  const [filtrado,setData9]=useState([])
  const [descargar,setDescarga]=useState(false)
  const [BancoFiltrado,setBancoFiltrado]=useState([])
  const [BeneficiarioFiltrado,setBeneficiarioFiltrado]=useState([])
  
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

    const Listar_BeneficiariosByAuth=async()=>{
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

              console.log("PARA EL SET BANCO ESTO ES: "+dataBanco)
          },
          (error) => {
              console.log(error)
          }
      );
    }

    const Listar_DesbloqueoCuentaByAuth=()=>{
      axios.get(
        host+"/api/autorizacionDesbloqueo/consultaespecifica/1/"+props.numeroautorizacion
      ).then(
        (response)=>{
          setDataDesbloqueo(response.data)
        },(error)=>{
          console.log(error)
        }
      )
    }

    const bancos= ()=>{


      axios
      .get(
          host+"/api/beneficiario/consultaespecifica/"+props.numeroautorizacion
      )
      .then(
          (response) => {
            var nombresBanco=[]
            var filtrado=[]
            
            response.data.map((banco)=>{
                nombresBanco.push(banco.banco.nombre_banco)
            })
      
            filtrado.push(nombresBanco[0])
            setData8(nombresBanco[0])
            console.log("el nombre del banco inicial es "+NombreBanco)
            console.log(nombresBanco.length)
      
      
            for(let a=1;a<nombresBanco.length;a++){
      
              var contador=0
              filtrado.map((nombrebanco,num)=>{
                  if(nombresBanco[a]!=nombrebanco && contador==0){
                    const encontrar=filtrado.find((element)=>{
                      return element == nombresBanco[a]
                    })
      
                    if(!encontrar){
                      filtrado.push(nombresBanco[a])
                    }
                  }
                  else{
                    contador++
                  }
                })
      
            }
            //HOLA
            console.log("AQUI ESTA EL FILTRADO"+filtrado)
            setData9(filtrado)
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
    Listar_DesbloqueoCuentaByAuth()
    bancos()
    
  },[props.numeroautorizacion])

  console.log("PRUEBA")
  const FilaBenef = (data1,data2,filtro) => {

    var contador=-1
   return( data1.map((item) => {
                
                
                contador=contador+1
              
              if(chequeoNombreBanco(data2,contador,filtro) == true){
                return( 
                        <tr>
                          <td>{item.rut_beneficiario +"-"+item.dv_beneficiario}</td>
                          <td>{item.nombre_beneficiario}</td>
                          {FilaBanco(data2,contador)}
                        </tr>
                 );
              }
              else{
                return null
              }
        })
            
        )
    
  };

  const FilaBenefFiltro = (data1,data2,filtro) => {

    var contador=-1
   return( data1.map((item) => {
                
                
                contador=contador+1
              
              if(chequeoNombreBanco(data2,contador,filtro) == true){
                return({
                        rut_beneficiario:item.rut_beneficiario,
                        nombre_beneficiario:item.nombre_beneficiario,
                        numero_cuenta: data2[contador].numero_cuenta,
                        nombre_banco: data2[contador].nombre_banco,
                        cantidad_ahorro: data2[contador].cantidad_ahorro
                }
                );
              }
              else{
                return null
              }
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

const chequeoNombreBanco=(data1,data2,data3)=>{
  if(data3==data1[data2].nombre_banco){
    return true
  }
  else{
    return false
  }
}


    const nombre_proyecto=dataProyecto.nombre_proyecto
    const comuna=datagiro.comuna
    //constructora
    const constructora=dataconstructora.nombre_constructora
    const rut_constructora=dataconstructora.rut_constructora
    const dv_constructora=dataconstructora.dv_constructora
   //giroahorro
    const numeroautorizacion=props.numeroautorizacion
    const titulodescarga="Desbloqueo Cuenta N°"+numeroautorizacion+".pdf"

    const fecha=new Date()
    const fecha_hoy= fecha.getDate()+"/"+(fecha.getMonth()+1)+"/"+fecha.getFullYear()
    const filtro=NombreBanco

    

    const losbancos=()=>{
      
      const nombredelosbancos=filtrado
      
      return nombredelosbancos.map((elemento)=>{
          return(<Button color="secondary" variant="contained" onClick={()=>{setData8(elemento)}}>{elemento}</Button>)
      })
    }

    const DESCARGAR_EXCEL=()=>{
      console.log(dataBeneficiario)
      
      const arreglo=FilaBenefFiltro(dataBeneficiario,dataBanco,filtro)
      console.log(arreglo)
      const filtrado=arreglo.filter((element)=>{return element!=null})
      console.log(filtrado)
      console.log("FUNCION DESCARGAR")
      if(descargar==true){
      return(
        <ExcelFile filename={"Excel_Desbloqueo_Cuenta_N°"+numeroautorizacion+" "+NombreBanco}>
            <ExcelSheet data={filtrado} name="beneficiarios">
                  <ExcelColumn label="Nombre" value="nombre_beneficiario"></ExcelColumn>
                  <ExcelColumn label="RUT" value="rut_beneficiario"></ExcelColumn>
                  <ExcelColumn label="N° de cuenta" value="numero_cuenta"></ExcelColumn>
                  <ExcelColumn label="UF" value="cantidad_ahorro"></ExcelColumn>
            </ExcelSheet>
        </ExcelFile>
      )
      }
      else{
        return null
      }

    }
  
    const EXCEL=()=>{

      return(
            <Button variant="contained" color="primary" onClick={()=>{setDescarga(true)}}>DESCARGAR EXCEL</Button>
      )
    }

    const PDF=()=>{
      
      return (
      <div>
          <div ref={ref} style={estilopagina.section}>

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


          <div style={{textAlign:"auto"}}>
            <p>Junto con saludar, y considerando la Resolución Exenta a Registro N° 195 de fecha<br></br>
            27/08/2021 que me delega facultades para emitir oficios, me permito solicitar a usted girar<br></br>
            el ahorro depositado en la Cuenta de Ahorro para la vivienda, del beneficiario indicado en<br></br>
            nómina adjunta, pertenecientes al proyecto {nombre_proyecto},de la comuna de<br></br>
            {comuna}, hasta el monto máximo que se señala y que formó parte de su postulación y<br></br>
            posterior adjudicación del subsidio habitacional. Además se requiere que estos giros de<br></br>
            ahorro sean depositados a nombre de {constructora}, Rut {rut_constructora}-{dv_constructora},<br></br>
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
            
             {FilaBenef(dataBeneficiario,dataBanco,filtro)}   
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
      {EXCEL()}
    </div>
    )}
  
  
    if(props.index1==false && props.index2==true){
    return(
        
        <div >
              <br></br>
              {losbancos()}
              {PDF()}
              {DESCARGAR_EXCEL()}
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
