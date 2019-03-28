import React, { Component } from "react";
import { View, FlatList, Text } from "react-native";
import { Icon } from "react-native-elements";

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
      <View style={{ flex: 1 }}>
        <FlatList
          keyExtractor={item => item.id.toString()}
          horizontal={true}
          data={this.state.cards}
          renderItem={({ item }) => (
            <View
              style={{
                flex: 1,
                borderRadius: 3,
                borderWidth: 1,
                borderColor: "black",
                alignItems: "flex-start",
                width: 250,
                height: 100,
                margin: 10
              }}
            >
              <View
                style={{
                  flex: 1,
                  flexDirection: "row",
                  alignItems: "center",
                  padding: 10,
                  backgroundColor: "white"
                }}
              >
                <Icon
                  name="user"
                  type="feather"
                  containerStyle={{ paddingRight: 10 }}
                />
                <Text> {item.title}</Text>
              </View>
              <Text style={{ padding: 10 }}>{item.description}</Text>
            </View>
          )}
        />
      </View>
    );
  }
}
