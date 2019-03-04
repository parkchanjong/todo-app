import React from "react";
import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  Dimensions,
  Platform,
  ScrollView,
  TextInput
} from "react-native";

import ToDo from "./ToDo";
import { AppLoading } from "expo";
import uuidv1 from "uuid/v1";

const { height, width } = Dimensions.get("window");

export default class App extends React.Component {
  state = {
    newToDo: "",
    loadedToDos: false,
    toDos: {}
  };
  componentDidMount = () => {
    this._loadToDos();
  };
  render() {
    const { newToDo, loadedToDos, toDos } = this.state;
    if (!loadedToDos) {
      return <AppLoading />;
    }
    return (
      <View style={styles.container}>
        <StatusBar barStyle="light-content" />
        <Text style={styles.title}>cute To Do</Text>
        <View style={styles.card}>
          <TextInput
            style={styles.input}
            placeholder={"New To Do"}
            value={newToDo}
            onChangeText={this._controllNewToDo}
            placeholderTextColor={"#999"}
            returnKeyType={"done"}
            autoCorrect={false}
            onSubmitEditing={this._addToDo}
          />
          <ScrollView contentContainerStyle={styles.toDos}>
            {Object.values(toDos).map(toDo => (
              <ToDo key={toDo.id} {...toDo} />
            ))}
          </ScrollView>
        </View>
      </View>
    );
  }
  _controllNewToDo = text => {
    this.setState({
      newToDo: text
    });
  };
  _loadToDos = () => {
    this.setState({
      loadedToDos: true
    });
  };
  _addToDo = () => {
    const { newToDo } = this.state;
    if (newToDo !== "") {
      this.setState(prevSate => {
        const ID = uuidv1();
        const newToDoObject = {
          [ID]: {
            id: ID,
            isCompleted: false,
            text: newToDo,
            crratedAt: Date.now()
          }
        };
        const newState = {
          ...prevSate,
          newToDo: "",
          toDos: {
            ...prevSate.toDos,
            ...newToDoObject
          }
        };
        return { ...newState };
      });
    }
  };
  _deleteToDo = () => {
    this.setState(prevSate => {
      const toDos = prevSate.toDos;
      delete toDos[id];
    });
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F23657",
    alignItems: "center"
  },
  title: {
    color: "white",
    fontSize: 30,
    marginTop: 50,
    fontWeight: "200",
    marginBottom: 30
  },
  card: {
    backgroundColor: "white",
    flex: 1,
    width: width - 25,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    ...Platform.select({
      ios: {
        shadowColor: "rgb(50, 50, 50)",
        shadowOffset: {
          height: -1,
          width: 0
        },
        shadowOpacity: 0.5,
        shadowRadius: 5
      },
      android: {
        elevation: 3
      }
    })
  },
  input: {
    padding: 20,
    borderBottomColor: "#bbb",
    borderBottomWidth: 1,
    fontSize: 20
  },
  toDos: {
    alignItems: "center"
  }
});
