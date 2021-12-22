import React ,{ useState,useEffect }from 'react';
import {Box, TextField, Button, Container, Typography} from "@material-ui/core"
import { useForm } from 'react-hook-form';
import axios from 'axios'
import {PDFDownloadLink as DWLink} from '@react-pdf/renderer';
import {PDF1} from "../../pdf/PDF_GiroAhorro"
import MaterialDatatable from "material-datatable";

const host="http://localhost:8081"




function Renderizar(props){
  if(props.numeroautorizacion){
    return( <PDF1 index1={props.b1} index2={props.b2} numeroautorizacion={props.numeroautorizacion} />)
  }
  else{
    return(null)
  }
  
}


export default function Giro(){

  const [pressB1,setpressB1]=useState(false);
  const [pressB2,setpressB2]=useState(false);
  const [numauto,setNum]=useState(null);
  const [data,setData]=useState("")


  useEffect(()=>{
    const ListarGiro=()=>{
      axios
      .get(
          host+`/api/giroahorro`
      )
      .then(
          (response) => {
              setData(response.data)
       
          },
          (error) => {
              console.log(error)
          }
      );
    }
    ListarGiro();
  },[]);

  const options = {
    selectableRows:true,
    onlyOneRowCanBeSelected:true,
    download:false,
    print:false,
    onRowClick:(data,data2)=>{
      setNum(data.numero_autorizacion_giro)
    }
  };
  
  

  const ColumnasGiros=[
        { 
          name:'N° Autorizacion de Giro',
          field:'numero_autorizacion_giro'
        },

        {
         name:'Año Llamado',
         field:'llamado'
        },

        {
         name:'Nombre del Proyecto',
         field:'nombre_proyecto'
        }
  ]

  
  
  

  return(
          

    <Container>
        
       <Container>
         <h1>
             GESTION GIRO DE AHORRO
         </h1>
          <MaterialDatatable
             title={"Lista de Giros de Ahorro"}
             data={data}
             columns={ColumnasGiros}
             options={options}

          />


       </Container>



        
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
                Ver Autorización Giro de Ahorro
            </Button>
        </Container>

         <Container>
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
              Ver Autorización Desbloqueo de Cuentas
            </Button>
               <Renderizar b1={pressB1} b2={pressB2} numeroautorizacion={numauto}></Renderizar>
            </Container>
       </Container>
  );
}