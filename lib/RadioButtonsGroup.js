import React, { Component } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default class RadioGroup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      radioButtons: this.validate(this.props.radioButtons, this.props.initialValue),
    };
  }

  validate(data, initialValue) {
    let selected = false; // Variable to check if "selected: true" for more than one button.
    data.map(e => {
      e.color = e.color ? e.color : '#444';
      e.disabled = e.disabled ? e.disabled : false;
      e.label = e.label ? e.label : 'You forgot to give label';
      e.labelColor = e.labelColor ? e.labelColor : '#444';
      e.layout = e.layout ? e.layout : 'row';
      e.selected = e.selected ? e.selected : false;
      if (initialValue && initialValue === e.value) {
        e.selected = true
      }
      if (e.selected) {
        if (selected) {
          e.selected = false; // Making "selected: false", if "selected: true" is assigned for more than one button.
          console.log('Found "selected: true" for more than one button');
        } else {
          selected = true;
        }
      }
      e.size = e.size ? e.size : 24;
    });
    return data;
  }

  onPress = label => {
    const radioButtons = this.state.radioButtons;
    const selectedIndex = radioButtons.findIndex(e => e.selected == true);
    const selectIndex = radioButtons.findIndex(e => e.label == label);
    if (selectedIndex != selectIndex) {
      if(selectedIndex >= 0) {
        radioButtons[selectedIndex].selected = false;
      }
      radioButtons[selectIndex].selected = true;
      this.setState({ radioButtons });
      this.props.onPress(this.state.radioButtons);
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={{ flexDirection: this.props.flexDirection , flex: 1}}>
          {this.state.radioButtons.map(data => (
            <RadioButton style = {[{flexDirection: 'row', flex: 1}]}
              key={data.label}
              data={data}
              onPress={this.onPress}
            />
          ))}
        </View>
      </View>
    );
  }
}

class RadioButton extends Component {
  render() {
    const data = this.props.data;
    const opacity = data.disabled ? 0.2 : 1;
    let layout = { flexDirection: 'row', flex: 1, alignItems: 'space-between' };
    let margin = { marginLeft: 15 };
    if (data.layout === 'column') {
      layout = { alignItems: 'center' };
      margin = { marginTop: 10 };
    }
    return (
      <TouchableOpacity
        style={[layout, {opacity, marginVertical: 5 }]}
        onPress={() => {
          data.disabled ? null : this.props.onPress(data.label);
        }}>
        <View>
        <Text style={[{ alignSelf: 'center' }, margin, {color: data.labelColor}]}>{data.label}</Text>
        </View>        
        <View
          style={[
            styles.border,
            {
              borderColor: data.color,
              width: data.size,
              height: data.size,
              borderRadius: data.size / 2,
              alignSelf: 'center',
              marginLeft: 'auto'
            },
          ]}>
          {data.selected &&
            <View
              style={{
                backgroundColor: data.color,
                width: data.size / 2,
                height: data.size / 2,
                borderRadius: data.size / 2,
              }}
            />}
        </View>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'space-between',
    flex: 1,
  },
  border: {
    borderWidth: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
