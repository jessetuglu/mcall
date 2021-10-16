import React from "react";
import { StyleSheet, Text} from 'react-native';

export type HeaderProps = {
  title:string
}

export const Header: React.FC<HeaderProps> = ({title}) => {
  return (
    <Text style={styles.header}>{title}</Text>
  );
};

const styles = StyleSheet.create({
  header: {
    fontSize: 50,
  }
});
