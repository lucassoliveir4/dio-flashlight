import React, {useState, useEffect} from 'react'
import {View, StyleSheet, Image, TouchableOpacity} from 'react-native'
import Torch from 'react-native-torch'
import RNShake from 'react-native-shake'


const lampOn = './assets/icons/eco-light.png'
const lampOff = './assets/icons/eco-light-off.png'
const logo = './assets/icons/logo-dio.png'
const logoWhite = './assets/icons/logo-dio-white.png'



const App = () => {
  const [toggle, setToggle] = useState(false)
  const handleChangeToggle = () =>{
    setToggle (oldToggle => !oldToggle)
  }     

  useEffect(()=> {
    //Liga flash do celular
    Torch.switchState(toggle)
  },[toggle])

  useEffect(()=>{
    const subscription = RNShake.addListener(() => {
      setToggle(oldToggle => !oldToggle)
    })

    return () => subscription.remove()
  },[])

  return <View style={toggle ? style.containerLight : style.container} >
    <TouchableOpacity onPress={handleChangeToggle}>

      <Image style={toggle ? style.lightOn : style.lightOff} source={
        toggle ? require(lampOn) : require(lampOff)}/>

      <Image style={style.dioLogo} source={
        toggle ? require(logo) : require(logoWhite)}/>

    </TouchableOpacity>
    
  </View>
}

export default App

const style = StyleSheet.create({
  container:{
    flex: 1,
    backgroundColor: 'black',
    alignItems: 'center',
    justifyContent: 'center',
  },
  containerLight:{
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  lightOn:{
    resizeMode: 'contain',
    alignSelf: 'center',
    width: 150,
    height:150,
  },
  lightOff:{
    resizeMode: 'contain',
    alignSelf: 'center',
    tintColor:'white',
    width: 150,
    height:150,
  },
  dioLogo:{
    resizeMode: 'contain',
    alignSelf: 'center',
    width: 250,
    height:250,
  },
})