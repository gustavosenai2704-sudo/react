import React from "react";
import {Text, StyleSheet} from "react-native"

export default function Texto({txt}){
    return(

        <Text style={test.txt}>{txt}</Text>

    );
}
 const test = StyleSheet.create({

    txt:{

      color:"#0dff00",
      fontSize:50,
    }


 })
