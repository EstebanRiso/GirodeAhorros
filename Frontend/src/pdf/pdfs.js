import React ,{ useState,useEffect }from 'react';
import {estiloCuerpo1,estiloTitulo,
        estiloSubtitulo,estiloTituloTabla, estiloCuerpo2,estiloCuerpo3,estiloCuerpo4,estiloCuerpo5,estiloCuerpo6,estiloCuerpo7, estilopagina, estiloContainer, estiloCuerpoTabla} from './estilospdf1';
import { PDFDownloadLink as DWLink,Page, Text, View, Document} from '@react-pdf/renderer';
import {Box, TextField, Button, Container, Typography} from "@material-ui/core"
import { useForm } from 'react-hook-form';
import axios from 'axios'
import imagen from "../img/serviu_estado.jpg"


const host="http://localhost:8081"







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
    <Document>
      <Page size="A4" >
        <View>
            <br></br>
            <Container>
                <img src={imagen} style={{width:100,height:100}} />
            </Container>

            <Container style={{textAlign:"center"}}>
              <Text style={estiloTitulo.page}>
              <br></br>AUTORIZACIÓN DE GIRO DE AHORROS Nº {numeroautorizacion} 
              </Text>
            </Container>
          
            <Container style={{textAlign:"justify"}}>
              <Text style={estiloCuerpo1.page}>
               <br></br>
                La Jefa del Departamento de Operaciones Habitacionales SERVIU Región del Biobío que suscribe, en virtud de lo 
                dispuesto en el Art. 11 del D.S. N° 255 de (V. y U.) del 2006, y la {resolucion} que me delega la facultad de emitir giros de ahorro, cumplo con autorizar a {constructora}.
                RUT: {rut_constructora}-{dv_constructora} para proceder al Giro de los Ahorros Previos hasta el monto máximo que más adelante se señala, 
                de los fondos acreditados como ahorros del o los beneficiarios de subsidios habitacionales comité {nombre_proyecto}.
                ID:{id_proyecto} de la comuna de {comuna} - Modalidad Programa de Protección del Patrimonio
                Familiar llamado {llamado}, que se encuentran depositados en las Cuentas de Ahorro, que se indican en la siguiente nomina:
                <br></br><br></br></Text>
            </Container>

  
            <Container>
              <Text style={estiloSubtitulo.page}>AUTORIZACIÓN DE PAGO N°:</Text><Text style={estiloCuerpo2.page}> {numeroautorizacion}</Text>
            </Container>
            
            <Container>
              <Text style={estiloSubtitulo.page}>LÍNEA DE SUBSIDIO:</Text><Text style={estiloCuerpo2.page}> PROGRAMA DE PROTECCIÓN DEL PATRIMONIO FAMILIAR (DS. 255)</Text>
            </Container>

            <Container>
              <Text style={estiloSubtitulo.page}>TÍTULO:</Text><Text style={estiloCuerpo2.page}> MEJORAMIENTO VIVIENDA TITULO II </Text>
            </Container>

            <Container>
              <Text style={estiloSubtitulo.page}>AÑO DE LLAMADO:</Text><Text style={estiloCuerpo2.page}> {llamado}</Text>
            </Container>

            <Container>
              <Text style={estiloSubtitulo.page}>BENEFICIARIOS:</Text>
            </Container>

            <Container style={{alignItems:"center"}}>
              
              <table>
                    <thead>
                           <tr>
                           <Text style={estiloTituloTabla.page}>
                              <th>RUT</th>
                              <th>NOMBRE</th>
                              <th>CERTIFICADO</th>
                              <th>CUENTA AHORRO</th>
                              <th>BANCO</th>
                              <th>UF</th>
                            </Text>
                           </tr>
                    </thead>                    
                    <tbody>
                        <Text style={estiloCuerpoTabla.page}>
                            {FilaBenef(dataBeneficiario,dataBanco)}   
                        </Text>
                    </tbody>
              </table>
              
            </Container>

            <Container>
              <Text style={estiloCuerpo3.page}>
                    <Text style={estiloCuerpo4.page}>Sres. Entidades Financieras</Text>, antes del pago, favor solicitar la autenticidad de este documento a los
                    siguientes correos electrónicos del SERVIU Región del Biobío: rcastroh@minvu.cl vpenac@minvu.cl 
                     y/o srojasr@minvu.cl
                     <Container>
                        <Text style={estiloCuerpo4.page}>*** La validación se efectuará en un plazo no mayor a 24 hrs. ***</Text>
                     </Container>
                    
              </Text>
              
              
            </Container>
            
            <Container>

                  <br></br><br></br><br></br><br></br><br></br><br></br>
            </Container>

            <Container style={{alignItems:"right"}}>

                <Container style={{textAlign:"center"}}>
                            
                  <Text style={estiloCuerpo5.page}>
                      KAREN HERNÁNDEZ LORCA 
                  </Text><br></br>
                  <Text style={estiloCuerpo1.page}>
                    Jefa Depto. Operaciones Habitacionales<br></br>
                    SERVIU Región del Biobío
                             
                  </Text>
                </Container>
            </Container>
            <br></br><br></br>
            <Container>
                    <Text style={estiloCuerpo7.page}>
                        <Text style={estiloCuerpo6.page}>“Importante:</Text> En caso de extravío de este documento, el contratista deberá solicitar una copia de él 
                        adjuntando declaración jurada ante notario del extravío de la autorización y declarando que no fue 
                        presentada ante la institución financiera y que por consiguiente no ha percibido los ahorros de las 
                        personas que se individualizan en la misma autorización”
                    </Text>
            </Container>
            <br></br><br></br>
            <Container>
              <Text style={estiloCuerpo1.page}> Concepción,{  fecha_hoy}</Text>
              <br></br><br></br>
            </Container>

        </View>
        
      </Page>
    </Document>
    );
    }
    else{
      return(null)
    }
  }
  
  
export function PDF2(props){

    if(props.index1==false && props.index2 == true){
    return(
      <Document>
        <Page size="A4" style={estiloCuerpo1.page}>
          <View style={estiloCuerpo1.section}>
            <Text>Seccion1</Text><br></br>
          </View>
          <View style={estiloCuerpo1.section}>
            <Text>Section #2</Text>
          </View>
        </Page>
      </Document>
      );
    }
    else 
      return (null);
    }


export function DownloadPDF1(props){

  return (
     <DWLink document={<PDF1 index1={true} index2={false} numeroautorizacion={props.numeroautorizacion}/>} fileName={"GiroAhorro_N°"+props.numeroautorizacion}>
       {({ blob, url, loading, error }) => (loading ? 'Loading document...' : 'Descargar PDF1')}
     </DWLink>
  )
}
