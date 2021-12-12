import React ,{ useState,useEffect }from 'react';
import {estiloCuerpo1,estiloTitulo,
        estiloSubtitulo,estiloTituloTabla, estiloCuerpo2, estilopagina, estiloContainer} from '../../pdf/estilospdf1';
import { PDFDownloadLink as DWLink,Page, Text, View, Document} from '@react-pdf/renderer';
import {Box, TextField, Button, Container, Typography} from "@material-ui/core"
import { useForm } from 'react-hook-form';
import axios from 'axios'





// Crear el documento pdf del giro de ahorro
function PDF1(props){

  const numeroautorizacion=props.numeroautorizacion
  /*const resolucion=props.resolucion
  const constructora=props.constructora
  const rut_constructora=props.rut_constructora
  const dv_constructora=props.dv_constructora
  const nombre_proyecto=props.nombre_proyecto
  const id_proyecto=props.id_proyecto
  const comuna=props.comuna
  const llamado=props.llamado
 */

  const resolucion="Resolución Exenta a Registro N° 147 del 31/07/2020"
  const constructora="CONSTRUCTORA OGUEDA LIMITADA"
  const rut_constructora="76.262.944"
  const dv_constructora="5"
  const nombre_proyecto="Colectores Solares Hualpen 2019"
  const id_proyecto="147001"
  const comuna="Hualpen"
  const llamado="2020"

  const beneficiario={
      rut_beneficiario:"15.177.637",
      dv_beneficiario:"K",
      id_banco:1,
      numero_autorizacion_giro:numeroautorizacion,
      nombre_beneficiario:"DENISS JOEL BRAVO FUENTEALBA"

  }

  const banco={
    nombre_banco:"Banco estado",
    numero_cuenta:"52763412326",
    certificado:"HM2 N° CS2-2020-318052",
    cantidad_ahorro:3.00
  }


  if(props.index1==true && props.index2==false){
  return(
  <Document>
    <Page size="A4" >
      <View>

          <Container style={{textAlign:"center"}}>
            <Text style={estiloTitulo.page}>
                AUTORIZACIÓN DE GIRO DE AHORROS Nº {numeroautorizacion} 
            </Text>
          </Container>
        
          <Container style={{textAlign:"justify"}}>
            <Text style={estiloCuerpo1.page}>La Jefa del Departamento de Operaciones Habitacionales SERVIU Región del Biobío que suscribe, en virtud de lo 
              dispuesto en el Art. 11 del D.S. N° 255 de (V. y U.) del 2006, y la {resolucion}
              que me delega la facultad de emitir giros de ahorro, cumplo con autorizar a {constructora}.
              RUT: {rut_constructora}-{dv_constructora} para proceder al Giro de los Ahorros Previos hasta el monto máximo que más adelante se señala, 
              de los fondos acreditados como ahorros del o los beneficiarios de subsidios habitacionales comité {nombre_proyecto}.
              ID:{id_proyecto} de la comuna de {comuna} - Modalidad Programa de Protección del Patrimonio
              Familiar llamado {llamado}, que se encuentran depositados en las Cuentas de Ahorro, que se indican en la siguiente nomina:
            </Text>
          </Container>
        

          <Container>
            <Text style={estiloSubtitulo.page}>
                AUTORIZACIÓN DE PAGO N°: 
                LÍNEA DE SUBSIDIO: 
                TÍTULO: 
                AÑO DE LLAMADO: 
                BENEFICIARIOS:
            </Text>
          </Container>
  
          <Text style={estiloCuerpo2.page}>
                {numeroautorizacion}
                PROGRAMA DE PROTECCIÓN DEL PATRIMONIO FAMILIAR (DS. 255) 
                MEJORAMIENTO VIVIENDA TITULO II 
                {llamado}
          </Text>
        
          <Container>
            <Text style={estiloSubtitulo.page}>
              BENEFICIARIOS:
            </Text>
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


function PDF2(props){
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


export default function Giro(){

  const [pressB1,setpressB1]=useState(false);
  const [pressB2,setpressB2]=useState(false);

  return(
      <Container>
        
      
          <Button  fullWidth
                   variant="contained"
                   color="primary"
                   onClick={
                        
                        ()=>{
                          if(pressB1==false){
                            setpressB1(true)
                            console.log("BOTON1 ACTIVADO")
                          }
                          else{
                            if(pressB2==true && pressB1==true || pressB2==false && pressB1==true){
                              setpressB1(false)
                              setpressB2(false)
                            console.log("BOTON1 DESACTIVADO")
                            }
                            else{
                              setpressB1(false)
                            }
                          }
                        
                        }
                     
                     }>
              ESTE BOTON ES EL PDF DE PRUEBA
          </Button>
          <Button 
                fullWidth
                variant="contained"
                color="primary"
                onClick={
               
                  ()=>{
                    if(pressB2==false){
                      setpressB2(true)
                      console.log("BOTON2 ACTIVADO")
                    }
                    else{
                      if(pressB2==true && pressB1==true || pressB2==true && pressB2==false){
                      setpressB2(false)
                      setpressB1(false)
                      console.log("BOTON2 DESACTIVADO")
                      }
                      else{setpressB2(false)}

                    }
               
                  }
            
            }>
              ESTE BOTON ES OTRO PDF DE PRUEBA
          </Button>

          <PDF1 index1={pressB1} index2={pressB2} numeroautorizacion={"2071057"} ></PDF1>
          <PDF2 index1={pressB1} index2={pressB2}></PDF2>
       </Container>
  );
}