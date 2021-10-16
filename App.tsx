import React from 'react';
import { StyleSheet, SafeAreaView } from 'react-native';
import { Header } from './src/comps/Header';

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <Header title={"Therapist App"}/>

    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: '#fff',
    flexDirection: "row",
    paddingHorizontal: 25,
    paddingBottom: 10,
  }
});
