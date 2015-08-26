'use strict';

var React = require('react'),
      FontAwesome = require('react-fontawesome');

var FilterItem = React.createClass({displayName: "FilterItem",
  getInitialState: function() {
    return {
      isMouseOver: false
    }
  },

  toggleChecked: function() {
    this.props.toggleChecked(this.props);
  },

  setIconVisibility: function() {
    if (this.props.hasChecked === true) {
      return ''
    } else {
      return 'index-filter_invisible'
    }
  },

  setTextColor: function() {
    if (this.props.hasChecked === true) {
      return 'index-filter_checked'
    } else {
      return ''
    }
  },

  toggleIconStyle: function() {
    this.setState({ isMouseOver: !this.state.isMouseOver})
  },

  getIconStyle: function() {
    if (this.state.isMouseOver === true) {
      return 'times-circle';
    } else {
      return 'check';
    }
  },

  render: function() {
    return(
      React.createElement("li", {className: "index-filter__item-wrapper " + this.setTextColor()},
          React.createElement("div", {className: "index-filter__item ui-checkbox", onClick: this.toggleChecked, onMouseOver: this.toggleIconStyle, onMouseOut: this.toggleIconStyle},
              React.createElement("div", {className: "index-filter__image-wrapper"}, React.createElement("img", {className: "index-filter__image", src: this.props.iconUrl})),
              React.createElement("div", {className: "index-filter__label"}, this.props.id),
              React.createElement(FontAwesome, {className: "index-filter__check-icon " + this.setIconVisibility(), name: this.getIconStyle(), size: "lg"})
          )
      )
    )
  }
});

var IndexFilter = React.createClass({displayName: "IndexFilter",
  getInitialState: function() {
    return {
      options: this.props.options,
      isRevealed: true
    }
  },

  toggleFilterOption: function(){
    this.setState({
      isRevealed: !this.state.isRevealed
    });
  },

  toggleChecked: function(selectedOption) {
    var options = this.state.options
      .filter(function(option) {
        return option.id === selectedOption.id;
      })
      .map(function(option){
        return option.hasChecked = !option.hasChecked;
      })

    this.setState({ options: this.state.options });
  },

  render: function() {
    var rows = [];
    this.state.options.forEach(function(option) {
      rows.push(
        React.createElement(FilterItem, {key: option.id, id: option.id, iconUrl: option.iconUrl, hasChecked: option.hasChecked, toggleChecked: this.toggleChecked})
      )
    }.bind(this));

    return(
      React.createElement("div", {className: "index-filter"},
          React.createElement("h5", {className: "index-filter__header", onClick: this.toggleFilterOption}, this.props.title, React.createElement(FontAwesome, {name: "chevron-down", rotate:  this.state.isRevealed ? "180" : null, size: "lg"})),
          React.createElement("ul", {className: "index-filter__item-list " + (this.state.isRevealed ? 'index-filter_revealed' : '')},
              rows
          )
      )
    );
  }
})

module.exports = IndexFilter;
