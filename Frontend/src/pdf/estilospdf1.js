import {StyleSheet} from '@react-pdf/renderer';

export const estilopagina = StyleSheet.create({
    section: {
      margin: 10,
      padding: 10,
      flexDirection:'column',
      flex:1,
    }
  
})


export const estiloTitulo = StyleSheet.create({
    page: {
      color:'black',
      fontWeight: 'bold',
      fontStyle:'Arial',
      fontSize:'10pt',
      textDecorationLine: "underline",
    },
  });

export const estiloCuerpo1 = StyleSheet.create({
    page: {
      color:'black',
      fontStyle:'Arial',
      fontSize:'9pt', 
    },
  
  });


  export const estiloSubtitulo = StyleSheet.create({
    page: {
      color:'#990000',
      fontSyle:'Verdana',
      fontWeight: 'bold',
      fontSize:'7pt',
      
    },
  });

  export const estiloCuerpo2= StyleSheet.create({
    page: {
      color:'black',
      fontStyle:'Verdana',
      fontSize:'7pt',
      
    },
  });

export const estiloTituloTabla = StyleSheet.create({
    page: {
      backgroundColor:'#666666',
      color:'white',
      fontSize:'6pt',
      fontWeight: 'bold',
     
    }, 
  });

  export const estiloCuerpoTabla = StyleSheet.create({
    page: {
      color:'black',
      fontStyle:'Times New Roman',
      fontSize:'6pt'
    }
  });

  export const estiloCuerpo3 = StyleSheet.create({
    page: {
      color:'black',
      fontStyle:'Arial',
      fontSize:'11pt'
    }
  });

  export const estiloCuerpo4 = StyleSheet.create({
    page: {
      color:'black',
      fontStyle:'Arial',
      fontSize:'11pt',
      fontWeight:'bold'
    }
  });

  export const estiloCuerpo5 = StyleSheet.create({
    page: {
      color:'black',
      fontStyle:'Century Gothic',
      fontSize:'9pt',
      fontWeight:'bold',
    }
  });


  export const estiloCuerpo6 = StyleSheet.create({
    page: {
      color:'black',
      fontStyle:'Century Gothic',
      fontSize:'9pt'
    }
  });

