import React ,{ useState,useEffect }from 'react';
import axios from 'axios'
import MaterialDatatable from "material-datatable";
import {Box, TextField, Button, Container, Typography} from "@material-ui/core"
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import $ from "jquery";
import flatpickr from "flatpickr";


const host="http://localhost:8081" 
// Crear el documento pdf del giro de ahorro
export default function CreacionGiro(){

  const [dataPago,setDataPago]=useState("")
  const [dataGiro,setDataGiro]=useState("")
  const [dataDesbloqueo,setDataDesbloqueo]=useState("")
  const [numAutorizacion,setNumAutorizacion]=useState("")

  useEffect(()=>{
  
    

    ListarAutorizacionPago();
    ListarAutorizacionGiro();
    ListarAutorizacionDesbloqueo();
  },[]);

  const ListarAutorizacionPago=()=>{
    axios
    .get(
        host+`/api/autorizacionPago`
    )
    .then(
        (response) => {
            console.log(response.data)
            setDataPago(response.data)
     
        },
        (error) => {
            console.log(error)
        }
    );
  }

  const ListarAutorizacionDesbloqueo=()=>{
    axios
    .get(
        host+`/api/autorizacionDesbloqueo`
    )
    .then(
        (response) => {
            console.log(response.data)
            setDataDesbloqueo(response.data)
        },
        (error) => {
            console.log(error)
        }
    );
  }

  const ListarAutorizacionGiro=()=>{
    axios
    .get(
        host+`/api/giroahorro`
    )
    .then(
        (response) => {
            console.log(response.data)
            setDataGiro(response.data)
     
        },
        (error) => {
            console.log(error)
        }
    );
  }

  const ColumnasAutorizacionPago=[
    {
      name:'N° Autorizacion de Pago',
      field:'numero_autorizacion_pago'
    },
    {
      name:'Titulo',
      field:'titulo'
    },
    {
      name:'Tipo de Autorización',
      field:'tipo_autorizacion'
    },
    {
      name: "Crear Giro Ahorro",
      options: {
        customBodyRender: (item) => {
          return (
            <Button
              variant="contained"
              color="primary"
              className="medium"
              onClick={() =>{
                  setNumAutorizacion(item.numero_autorizacion_pago)
                  CrearGiro() 
                  
                  console.log("apretando boton")
              }}
            >
              Crear Giro
            </Button>
          );
        },
      },
    },
  ]

  const limpiar= ()=>{
    setNumAutorizacion("")
  }
  
  function CrearGiro(){
    console.log(numAutorizacion)
    axios
    .get(
        host+`/api/giroahorro/consultaespecifica/1/`+numAutorizacion
    )
    .then(
        async (response) => {

          console.log(response.data)

            if(!response.data){
              
              const steps=[1,2,3,4]
              const Queue = Swal.mixin({
                  confirmButtonText: 'Siguiente',
                  cancelButtonText: 'Atrás',
                  showCancelButton: true,
                  progressSteps: steps,
                  reverseButtons: true,
              })
              
              const tipoinput=['text','number']
              const tipotitulo=['Comuna',"Numero de Resolucion","Fecha de Resolucion"]
              const tipotext=['Ingrese nombre de la Comuna','Ingrese Numero de Resolución','Ingrese Fecha Resolución']
              const valores=[]

              console.log("RESPONSE")
              var currentStep
              var result
              var aproval=false
              console.log(steps.length)
              for(currentStep=0;currentStep<steps.length;){
               
                console.log("step actual"+currentStep)
               if(currentStep<2){
                 result= await Queue.fire({

                                      input: tipoinput[currentStep],
                                      title: tipotitulo[currentStep],
                                      currentProgressStep: currentStep,
                                      text:tipotext[currentStep],
                                      showClass: { backdrop: 'swal2-noanimation' },
                                      inputValidator: (value) => {
                                        if(currentStep === 0){
                                              if(!value) {
                                                  return 'Debes ingresar algun nombre a la Comuna'
                                                }
                                          }
                                        if(currentStep === 1){
                                            if (!value) {
                                                return 'Debes ingresar algun numero de resolucion'
                                            }
                                        if(!esNumero(value)){
                                            return 'Debes ingresar numeros solamente'
                                        }
                                        if(value<0){
                                            return 'No pueden ser números negativos'
                                        }
                                      }
                                      }
                                  })

                    if (result.value) {
                          valores[currentStep] = result.value
                          currentStep++
                        } else if (result.dismiss === Swal.DismissReason.cancel) {
                          if(currentStep>0){
                          currentStep--
                          }
                        } else {
                        break
                        }
               }
               
               if(currentStep===2){

              
                  result =await Queue.fire({
                      title: tipotitulo[currentStep],
                      html: '<input type="date" id="swal-input" class="swal2-input">',
                      focusConfirm: false,
                      allowOutsideClick: false,
                    preConfirm: () => {
                      return document.getElementById('swal-input').value;
                    }
                  }
                  )
                    console.log(result)
                  if (result.value) {
                    valores[currentStep] = result.value
                    currentStep++
                  } else if (result.dismiss === Swal.DismissReason.cancel) {
                    currentStep--
                  } else {
                  break
                  }

               }

               if(currentStep===3){
                  
                  result=await Queue.fire(  {
                    icon: "warning",
                    title: '¡Un momento!',
                    text: 'Se Creará el Giro de Ahorro',         
                  })
                  
                

                  if (result.dismiss === Swal.DismissReason.cancel) {
                    currentStep--
                  }
                  else{
                    console.log("APROBADO")
                    aproval=true
                    console.log(valores)
                    currentStep++
                  }
                
                }
              



              }
              if(aproval===true){
                  console.log(valores[1])
                  const fecha=new Date()
                  const fecha_hoy= fecha.getFullYear()+"-"+(fecha.getMonth()+1)+"-"+fecha.getDate()
                    axios.post(
                        host+'/api/giroahorro/',{
                            numero_autorizacion_giro:numAutorizacion,
                            numero_autorizacion_pago:numAutorizacion,
                            comuna:valores[0],
                            numero_resolucion:valores[1],
                            fecha_emision_documento:fecha_hoy,
                            fecha_resolucion:valores[2],
                            id_estado:2
                    }
                    ).then((response) => {
                     if (response.status == 200) {
                          //alert("Registro Correcto")
                          Swal.fire({
                            title: 'Perfecto!',
                          text: 'Registro Correcto',
                          icon: 'success',
                          confirmButtonText: 'ok'
                        })
                      limpiar();
                      ListarAutorizacionGiro();
                    }
                })
              }
            }
            else{
              Swal.fire({
                title: 'Ya hay registro de Giro de Ahorro',
                text: 'Registro Incorrecto',
                icon: 'error',
                confirmButtonText: 'ok'
              })
              limpiar()
            }
            
        },
        (error) => {
            console.log(error)
        }
    );
  }

  function esNumero(numero) {
    //console.log(numero);
        return /^\d*$/.test(numero);
    }

  const ColumnasAutorizacionGiro=[
    {
     name:'N° Autorizacion Giro',
     field:'numero_autorizacion_giro'
    },
    {
      name:'N° resolución',
      field:'numero_resolucion'
    },
    {
      name:'Fecha Emision',
      field:'fecha_emision_documento'
    },
    {
      name:'Comuna',
      field:'comuna'
    },
    {
      name: 'Fecha Resolución',
      field:'fecha_resolucion'
    },
    {
      name: "Crear Autorizacion Desbloqueo",
      options: {
        customBodyRender: (item) => {
          return (
            <Container style={{
              flex:1,
              flexDirection:"column"}}>
              <div style={{flex:1}} >
              <Button
                
                variant="contained"
                color="primary"
                className="medium"
                onClick={() =>{
                  setNumAutorizacion(item.numero_autorizacion_pago)
                  CrearAuthDesbloqueo() 
                  console.log("apretando boton")
              }}
              >
              Crear Autorización Desbloqueo
              </Button>
              </div>
              <br></br>
              <div style={{flex:1}}>
              <Button
                style={{flex:1}}
                   variant="contained"
                    color="secondary"
                    className="medium"
                    onClick={() =>{
                      setNumAutorizacion(item.numero_autorizacion_pago)
                      CrearAuthDesbloqueo() 
                    console.log("apretando boton")
                }}>
                Modificar Giro Ahorro
            </Button>
            </div>
            </Container>
            
            
          );
        },
      },
    }
  ]

  function CrearAuthDesbloqueo(){
    console.log(numAutorizacion)
    axios
    .get(
        host+`/api/giroahorro/consultaespecifica/1/`+numAutorizacion
    )
    .then(
        async (response) => {

          console.log(response.data)

            if(!response.data){
              
              const steps=[1,2,3,4]
              const Queue = Swal.mixin({
                  confirmButtonText: 'Siguiente',
                  cancelButtonText: 'Atrás',
                  showCancelButton: true,
                  progressSteps: steps,
                  reverseButtons: true,
              })
              
              const tipoinput=['text','number']
              const tipotitulo=['Comuna',"Numero de Resolucion","Fecha de Resolucion"]
              const tipotext=['Ingrese nombre de la Comuna','Ingrese Numero de Resolución','Ingrese Fecha Resolución']
              const valores=[]

              console.log("RESPONSE")
              var currentStep
              var result
              var aproval=false
              console.log(steps.length)
              for(currentStep=0;currentStep<steps.length;){
               
                console.log("step actual"+currentStep)
               if(currentStep<2){
                 result= await Queue.fire({

                                      input: tipoinput[currentStep],
                                      title: tipotitulo[currentStep],
                                      currentProgressStep: currentStep,
                                      text:tipotext[currentStep],
                                      showClass: { backdrop: 'swal2-noanimation' },
                                      inputValidator: (value) => {
                                        if(currentStep === 0){
                                              if(!value) {
                                                  return 'Debes ingresar algun nombre a la Comuna'
                                                }
                                          }
                                        if(currentStep === 1){
                                            if (!value) {
                                                return 'Debes ingresar algun numero de resolucion'
                                            }
                                        if(!esNumero(value)){
                                            return 'Debes ingresar numeros solamente'
                                        }
                                        if(value<0){
                                            return 'No pueden ser números negativos'
                                        }
                                      }
                                      }
                                  })

                    if (result.value) {
                          valores[currentStep] = result.value
                          currentStep++
                        } else if (result.dismiss === Swal.DismissReason.cancel) {
                          if(currentStep>0){
                          currentStep--
                          }
                        } else {
                        break
                        }
               }
               
               if(currentStep===2){

              
                  result =await Queue.fire({
                      title: tipotitulo[currentStep],
                      html: '<input type="date" id="swal-input" class="swal2-input">',
                      focusConfirm: false,
                      allowOutsideClick: false,
                    preConfirm: () => {
                      return document.getElementById('swal-input').value;
                    }
                  }
                  )
                    console.log(result)
                  if (result.value) {
                    valores[currentStep] = result.value
                    currentStep++
                  } else if (result.dismiss === Swal.DismissReason.cancel) {
                    currentStep--
                  } else {
                  break
                  }

               }

               if(currentStep===3){
                  
                  result=await Queue.fire(  {
                    icon: "warning",
                    title: '¡Un momento!',
                    text: 'Se Creará el Giro de Ahorro',         
                  })
                  
                

                  if (result.dismiss === Swal.DismissReason.cancel) {
                    currentStep--
                  }
                  else{
                    console.log("APROBADO")
                    aproval=true
                    console.log(valores)
                    currentStep++
                  }
                
                }
              



              }
              if(aproval===true){
                  console.log(valores[1])
                  const fecha=new Date()
                  const fecha_hoy= fecha.getFullYear()+"-"+(fecha.getMonth()+1)+"-"+fecha.getDate()
                    axios.post(
                        host+'/api/giroahorro/',{
                            numero_autorizacion_giro:numAutorizacion,
                            numero_autorizacion_pago:numAutorizacion,
                            comuna:valores[0],
                            numero_resolucion:valores[1],
                            fecha_emision_documento:fecha_hoy,
                            fecha_resolucion:valores[2],
                            id_estado:2
                    }
                    ).then((response) => {
                     if (response.status == 200) {
                          //alert("Registro Correcto")
                          Swal.fire({
                            title: 'Perfecto!',
                          text: 'Registro Correcto',
                          icon: 'success',
                          confirmButtonText: 'ok'
                        })
                      limpiar();
                      ListarAutorizacionGiro();
                    }
                })
              }
            }
            else{
              Swal.fire({
                title: 'Ya hay registro de Giro de Ahorro',
                text: 'Registro Incorrecto',
                icon: 'error',
                confirmButtonText: 'ok'
              })
              limpiar()
            }
            
        },
        (error) => {
            console.log(error)
        }
    );
  }

  const ColumnasAutorizacionDesbloqueo=[
    {
     name:'N° Autorizacion Desbloqueo',
     field:'numero_autorizacion_desbloqueo'
    },
    {
      name:'Antecedentes',
      field:'antecedentes'
    },
    {
      name:'Materia',
      field:'materia'
    },
    {
      name:'Adjunto',
      field:'adjunto'
    }
  ]

  const options= {
    selectableRows:false,
    download:false,
    print:false,
  };


return(
    <div >

        <h1>CREACION DE GIRO</h1>
      <Container>  
          <h3>Autorizaciones de Pago</h3>
          <MaterialDatatable
              columns={ColumnasAutorizacionPago}
              options={options}
              data={dataPago}
          />
      </Container>  

      <Container>
          <h3>Giros de Ahorro</h3>
          <MaterialDatatable
              columns={ColumnasAutorizacionGiro}
              options={options}
              data={dataGiro}
          />
      </Container>

      <Container>
          <h3>Desbloqueo de Cuentas</h3>
          <MaterialDatatable
              columns={ColumnasAutorizacionDesbloqueo}
              options={options}
              data={dataDesbloqueo}
          />
      </Container>

    </div>
  );
}