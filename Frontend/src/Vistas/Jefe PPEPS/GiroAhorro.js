import React from 'react';
import {estiloCuerpo1,estiloTitulo,
        estiloSubtitulo,estiloTituloTabla} from '../../pdf/estilos';
import { PDFDownloadLink as DWLink,Page, Text, View, Document} from '@react-pdf/renderer';



// Crear el documento pdf del giro de ahorro
function PDF1(){

return(
  <Document>
    <Page size="A4" style={estiloCuerpo1.page}>
      <View style={estiloCuerpo1.section}>
        <Text>Seccion1</Text>
      </View>
      <View style={estiloCuerpo1.section}>
        <Text>Section #2</Text>
      </View>
    </Page>
  </Document>
  );
}


function PDF2(){

  return(
    <Document>
      <Page size="A4" style={estiloCuerpo1.page}>
        <View style={estiloCuerpo1.section}>
          <Text>Seccion1</Text>
        </View>
        <View style={estiloCuerpo1.section}>
          <Text>Section #2</Text>
        </View>
      </Page>
    </Document>
    );
  }


export default function Giro(){

  return(
      <Div>
          <PDF1/>
          <Button>
              ESTE BOTON ES EL PDF DE PRUEBA
          </Button>
          <Button>
              ESTE BOTON ES OTRO PDF DE PRUEBA
          </Button>
      </Div>
  );
}