import { View, Text } from "react-native";
import React from "react";
import CheckBox from "@/components/ui/checkbox";
import Container from "@/components/layout/container";

export default function generator() {
  return (
    <Container>
      <View style={{flex:1, justifyContent:"center", alignItems:"center"}}>
        <CheckBox />
      </View>
    </Container>
  );
}
