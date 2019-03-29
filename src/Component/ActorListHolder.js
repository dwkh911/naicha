import React, { Component } from "react";
import { View, FlatList, Text, Button, Image } from "react-native";
import { Icon, Divider } from "react-native-elements";

export default class ActorListHolder extends Component {
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
        <Text style={{ color: "white", fontWeight: "bold" }}>Actor List</Text>
        <FlatList
          keyExtractor={(item, index) => item.id.toString()}
          data={this.state.cards}
          renderItem={({ item }) => (
            <View style={{ flex: 1 }}>
              <View style={{ flex: 1, paddingTop: 20 }}>
                <Divider
                  style={{
                    alignSelf: "center",
                    width: "95%",
                    backgroundColor: "grey"
                  }}
                />
              </View>
              <View style={{ flex: 1, flexDirection: "row", padding: 10 }}>
                <Icon
                  name="user"
                  type="feather"
                  reverse={true}
                  containerStyle={{ paddingRight: 10 }}
                />
                <View style={{ flex: 1, justifyContent: "center" }}>
                  <Text style={{ color: "white" }}>{item.title}</Text>
                  <Text style={{ color: "white" }}>
                    Description: {item.description}
                  </Text>
                </View>
              </View>
              <FlatList
                horizontal={true}
                keyExtractor={(item, index) => item.id.toString()}
                data={this.state.cards}
                renderItem={({ item }) => (
                  <Image
                    style={{
                      width: 100,
                      height: 150,
                      marginRight: 15,
                      resizeMode: "contain"
                    }}
                    source={{
                      uri:
                        "http://portra.wpshower.com/wp-content/uploads/2014/03/martin-schoeller-emma-watson-portrait-up-close-and-personal-1126x1280.jpg"
                    }}
                  />
                )}
              />
            </View>
          )}
        />
      </View>
    );
  }
}
