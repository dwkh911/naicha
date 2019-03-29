import React, { Component } from "react";
import { View, FlatList, Text, Button } from "react-native";
import { Icon, Divider } from "react-native-elements";

export default class ScrollViewHolder extends Component {
  state = {
    cards: [
      {
        id: 1,
        title: "Example 1",
        description: "Lorem ipsum",
        date: "12/12/12"
      },
      {
        id: 2,
        title: "Example 2",
        description: "Lorem ipsum",
        date: "12/12/12"
      },
      {
        id: 3,
        title: "Example 3",
        description: "Lorem ipsum",
        date: "12/12/12"
      },
      {
        id: 4,
        title: "Example 4",
        description: "Lorem ipsum",
        date: "12/12/12"
      }
    ]
  };

  render() {
    return (
      <View style={{ flex: 1, paddingTop: 20, paddingBottom: 20 }}>
        <Text style={{ fontWeight: "bold", color: "white" }}>
          2019 must read
        </Text>
        <FlatList
          showsHorizontalScrollIndicator={false}
          keyExtractor={item => item.id.toString()}
          horizontal={true}
          data={this.state.cards}
          renderItem={({ item }) => (
            <View
              style={{
                flex: 1,
                borderRadius: 5,
                alignItems: "flex-start",
                backgroundColor: "white",
                width: 250,
                height: 150,
                margin: 10
              }}
            >
              <View
                style={{
                  flex: 1,
                  flexDirection: "row",
                  alignItems: "center",
                  padding: 10
                }}
              >
                <Icon
                  name="user"
                  type="feather"
                  containerStyle={{ paddingRight: 10 }}
                />
                <View style={{ flex: 1 }}>
                  <Text>{item.title}</Text>
                  <Text>Date uploaded: {item.date}</Text>
                </View>
              </View>
              <Text style={{ padding: 10 }}>{item.description}</Text>
              <Divider
                style={{
                  alignSelf: "center",
                  width: "90%",
                  backgroundColor: "black"
                }}
              />
              <Button title={"Read Now"} color="black" />
            </View>
          )}
        />
      </View>
    );
  }
}
