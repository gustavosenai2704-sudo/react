import React from "react";

import {
View,
Text,
StyleSheet,
ScrollView,
Image,
TouchableOpacity
} from "react-native";

export default function Home() {

const noticias = [
{
categoria:"Tech",
titulo:"Nova IA revoluciona mercado de trabalho",
desc:"Empresas adotam inteligência artificial para aumentar produtividade",
imagem:"https://images.unsplash.com/photo-1518770660439-4636190af475"
},
{
categoria:"Negócios",
titulo:"Mercado financeiro apresenta crescimento",
desc:"Investimentos aumentam após novos indicadores",
imagem:"https://images.unsplash.com/photo-1559526324-593bc073d938"
}
];

return (

<ScrollView style={styles.container}>

{/* HEADER */}

<View style={styles.header}>

<View style={styles.headerTop}>

<View style={{flexDirection:"row",alignItems:"center"}}>

<View style={styles.logoBox}>
<Text style={{fontSize:18}}>📰</Text>
</View>

<View>
<Text style={styles.logo}>NewsPulse</Text>
<Text style={styles.subtitle}>Notícias em tempo real</Text>
</View>

</View>

<View>
<Text style={styles.date}>26 de fev.</Text>
<Text style={styles.time}>13:33</Text>
</View>

</View>


{/* CLIMA */}

<View style={styles.weatherCard}>

<View style={styles.weatherTop}>

<View style={styles.weatherIcon}>
<Text style={{fontSize:25}}>☀</Text>
</View>

<View style={{marginLeft:10}}>
<Text style={styles.temp}>28°C</Text>
<Text style={styles.weatherText}>Ensolarado</Text>
</View>

<View style={styles.weatherInfo}>

<Text style={styles.weatherDetail}>🌬 15 km/h</Text>
<Text style={styles.weatherDetail}>💧 65%</Text>
<Text style={styles.weatherDetail}>☁ Parcial</Text>

</View>

</View>

<View style={styles.divider}/>

<View style={styles.week}>

<View style={styles.day}>
<Text>Sex</Text>
<Text>☀</Text>
<Text>29°</Text>
</View>

<View style={styles.day}>
<Text>Sáb</Text>
<Text>☁</Text>
<Text>27°</Text>
</View>

<View style={styles.day}>
<Text>Dom</Text>
<Text>🌧</Text>
<Text>24°</Text>
</View>

<View style={styles.day}>
<Text>Seg</Text>
<Text>☀</Text>
<Text>26°</Text>
</View>

<View style={styles.day}>
<Text>Ter</Text>
<Text>☀</Text>
<Text>28°</Text>
</View>

</View>

</View>

</View>


{/* CATEGORIAS */}

<ScrollView
horizontal
showsHorizontalScrollIndicator={false}
style={styles.categories}
>

<TouchableOpacity style={styles.catActive}>
<Text style={styles.catTextActive}>📰 Tudo</Text>
</TouchableOpacity>

<TouchableOpacity style={styles.cat}>
<Text style={styles.catText}>💻 Tech</Text>
</TouchableOpacity>

<TouchableOpacity style={styles.cat}>
<Text style={styles.catText}>💼 Negócios</Text>
</TouchableOpacity>

<TouchableOpacity style={styles.cat}>
<Text style={styles.catText}>⚽ Esportes</Text>
</TouchableOpacity>

</ScrollView>


<Text style={styles.trending}>📈 Em alta agora</Text>


{/* NOTICIAS */}

{noticias.map((item,index)=>(
<View key={index} style={styles.card}>

<Image
source={{uri:item.imagem}}
style={styles.image}
/>

<View style={styles.tag}>
<Text style={styles.tagText}>{item.categoria}</Text>
</View>

<View style={styles.cardContent}>

<Text style={styles.title}>{item.titulo}</Text>

<Text style={styles.desc}>{item.desc}</Text>

<View style={styles.stats}>

<Text style={styles.stat}>🕒 2h atrás</Text>
<Text style={styles.stat}>👁 15.2k</Text>
<Text style={styles.stat}>💬 234</Text>

</View>

</View>

</View>
))}

</ScrollView>

);
}

const styles = StyleSheet.create({

container:{
flex:1,
backgroundColor:"#f3f4f6"
},

header:{
padding:20,
backgroundColor:"#2563eb",
borderBottomLeftRadius:40,
borderBottomRightRadius:40
},

headerTop:{
flexDirection:"row",
justifyContent:"space-between",
alignItems:"center",
marginBottom:20
},

logoBox:{
backgroundColor:"#ffffff30",
padding:10,
borderRadius:12,
marginRight:10
},

logo:{
color:"#fff",
fontSize:18,
fontWeight:"bold"
},

subtitle:{
color:"#dbeafe"
},

date:{
color:"#fff"
},

time:{
color:"#dbeafe"
},

weatherCard:{
backgroundColor:"#ffffff20",
padding:15,
borderRadius:20
},

weatherTop:{
flexDirection:"row",
alignItems:"center"
},

weatherIcon:{
backgroundColor:"#ffffff30",
padding:15,
borderRadius:15
},

temp:{
color:"#fff",
fontSize:26,
fontWeight:"bold"
},

weatherText:{
color:"#dbeafe"
},

weatherInfo:{
marginLeft:"auto"
},

weatherDetail:{
color:"#fff"
},

divider:{
height:1,
backgroundColor:"#ffffff30",
marginVertical:10
},

week:{
flexDirection:"row",
justifyContent:"space-between"
},

day:{
alignItems:"center",
color:"#fff"
},

categories:{
padding:15
},

cat:{
backgroundColor:"#e5e7eb",
paddingHorizontal:15,
paddingVertical:10,
borderRadius:20,
marginRight:10
},

catActive:{
backgroundColor:"#2563eb",
paddingHorizontal:15,
paddingVertical:10,
borderRadius:20,
marginRight:10
},

catText:{
color:"#333"
},

catTextActive:{
color:"#fff"
},

trending:{
marginLeft:15,
marginBottom:10,
color:"red"
},

card:{
backgroundColor:"#fff",
borderRadius:20,
marginHorizontal:15,
marginBottom:20,
overflow:"hidden",
elevation:4
},

image:{
width:"100%",
height:180
},

tag:{
position:"absolute",
top:10,
left:10,
backgroundColor:"#2563eb",
paddingHorizontal:10,
paddingVertical:4,
borderRadius:20
},

tagText:{
color:"#fff",
fontSize:12
},

cardContent:{
padding:15
},

title:{
fontSize:16,
fontWeight:"bold"
},

desc:{
color:"#555",
marginTop:5
},

stats:{
flexDirection:"row",
marginTop:10
},

stat:{
marginRight:15,
color:"#666"
}

});
