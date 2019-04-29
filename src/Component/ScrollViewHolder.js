import React, { Component } from "react";
import { View, FlatList, Text } from "react-native";
import { Icon, Divider, Button, Card } from "react-native-elements";

import styles from '../Stylesheet/Channel-stylesheet'

export default class ScrollViewHolder extends Component {

  state = {
    novels:'',
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
      <View style={styles.novelContainer}>
        {/* <Text style={{ fontWeight: "bold", color: "white" }}>
          2019 必阅
        </Text> */}

        <FlatList
          showsVerticalScrollIndicator={false}
          keyExtractor={(item, index) => index.toString()}
          data={this.props.novels}
          renderItem={({ item }) => (
            <Card 
              containerStyle={{ flex: 1, padding: 10, borderRadius: 5 }}
              title={
                <View style={{ flex: 1, alignItems: 'center', flexDirection: 'row', justifyContent: 'center', marginHorizontal: 15, marginBottom: 10 }}>
                  <Icon
                    color="red"
                    name="playcircleo"
                    type="antdesign"
                    size={20}
                    containerStyle={{ justifyContent: 'center', alignItems: 'center', paddingRight: 10 }}
                  />
                  <Text style={{ fontWeight: 'bold' }}>{item.art_name}</Text>
                </View>
              }
              dividerStyle={{ flex: 1 }}
            >
              <Text style={{ color:'black', padding: 5 }}>
                类型: {item.type_name}
              </Text>

              <Text style={{ padding: 5 }}>
                <Text style={{ color: 'black' }}>上载日期: </Text>{item.art_time}
              </Text>

              <Button 
                onPress={() => this.props.onPress(item.art_name, item.art_time, item.art_hits, item.art_content, item.type_name)} 
                title={"开始阅读"} 
                containerStyle={styles.novelBtnContainer}
                buttonStyle={styles.novelBtnStyle}
              />
            </Card>
          )}
        />
      </View>
    );
  }
}


{/* <Card
title='HELLO WORLD'>
<Text style={{marginBottom: 10}}>
  The idea with React Native Elements is more about component structure than actual design.
</Text>
<Button
  icon={<Icon name='code' color='#ffffff' />}
  backgroundColor='#03A9F4'
  buttonStyle={{borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0}}
  title='VIEW NOW' />
</Card>

<View style={styles.novelHeader}>
                <Icon
                  name="book"
                  type="antdesign"
                  containerStyle={{ paddingRight: 10 }}
                />

                <Text style={styles.blackText}>
                  {item.art_name.replace("- 奶茶视频", "")}
                </Text>
              </View>

              <Text style={{ color: 'black', padding: 10 }}>
                类型: {item.type_name}
              </Text>

              <Text numberOfLines={1} style={{ padding: 10 }}>
                上载日期: {item.art_time}
              </Text>

              <Divider style={styles.divider} />

              <Button 
                onPress={() => this.props.onPress(item.art_name, item.art_time, item.art_hits, item.art_content, item.type_name)} 
                title={"开始阅读"} 
                containerStyle={styles.novelBtnContainer}
                buttonStyle={styles.novelBtnStyle}
              /> */}