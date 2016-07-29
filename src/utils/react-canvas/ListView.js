'use strict';

var React = require('react');
var Scroller = require('../Scroller');
var Group = require('./Group');
import _ from 'underscore'
import PureRenderMixin from 'react/lib/ReactComponentWithPureRenderMixin'

var ListView = React.createClass({
  propTypes: {
    style: React.PropTypes.object,
    numberOfItems: React.PropTypes.number.isRequired,
    itemHeightArray: React.PropTypes.array.isRequired,
    itemGetter: React.PropTypes.func.isRequired,
    scrollingDeceleration: React.PropTypes.number,
    scrollingPenetrationAcceleration: React.PropTypes.number,
    onScroll: React.PropTypes.func,
    activatePullToRefresh: React.PropTypes.array, // Refer to utils/Scroller.js#activatePullToRefresh
  },

  mixins: [PureRenderMixin],

  getDefaultProps: function () {
    return {
      style: { left: 0, top: 0, width: 0, height: 0 },
      scrollingDeceleration: 0.95,
      scrollingPenetrationAcceleration: 0.08,
      activatePullToRefresh: [],
    };
  },

  getInitialState: function () {
    return {
      scrollTop: 0
    };
  },

  componentWillMount: function () {
    this.createScroller();
    this.updateScrollingDimensions();
    this.updateScrollTopFrameArray();
  },

  componentWillReceiveProps(){
    this.updateScrollingDimensions()
    this.updateScrollTopFrameArray()
    this.setState({
      scrollTop: 0,
    })
  },

  render: function () {
    var items = this.getVisibleItemIndexes().map(this.renderItem);
    return (
      React.createElement(Group, {
        style: this.props.style,
        onTouchStart: this.handleTouchStart,
        onTouchMove: this.handleTouchMove,
        onTouchEnd: this.handleTouchEnd,
        onTouchCancel: this.handleTouchEnd},
        items
      )
    );
  },

  renderItem: function (itemIndex) {
    var item = this.props.itemGetter(itemIndex);
    var itemHeight = this.props.itemHeightArray[itemIndex];
    var style = {
      top: 0,
      left: 0,
      width: this.props.style.width,
      height: itemHeight,
      translateY: this._accumulateToScrollTop[itemIndex] - this.state.scrollTop,
      zIndex: itemIndex
    };

    return (
      React.createElement(Group, {style: style, key: itemIndex},
        item
      )
    );
  },

  // Events
  // ======

  handleTouchStart: function (e) {
    if (this.scroller) {
      this.scroller.doTouchStart(e.touches, e.timeStamp);
    }
  },

  handleTouchMove: function (e) {
    if (this.scroller) {
      this.scroller.doTouchMove(e.touches, e.timeStamp, e.scale);
    }
  },

  handleTouchEnd: function (e) {
    if (this.scroller) {
      this.scroller.doTouchEnd(e.timeStamp);
    }
  },

  handleScroll: function (left, top) {
    this.setState({ scrollTop: top });
    if (this.props.onScroll) {
      this.props.onScroll(top);
    }
  },

  // Scrolling
  // =========

  createScroller: function () {
    var options = {
      scrollingX: false,
      scrollingY: true,
      bouncing: true,
      decelerationRate: this.props.scrollingDeceleration,
      penetrationAcceleration: this.props.scrollingPenetrationAcceleration,
    };
    this.scroller = new Scroller(this.handleScroll, options);
    this.scroller.activatePullToRefresh(...this.props.activatePullToRefresh)
  },

  updateScrollingDimensions: function () {
    var width = this.props.style.width;
    var height = this.props.style.height;
    var scrollWidth = width;
    var scrollHeight = _.reduce(this.props.itemHeightArray, (memo, num)=>memo+num, 0);
    this.scroller.setDimensions(width, height, scrollWidth, scrollHeight);
  },

  updateScrollTopFrameArray(){
    // Calculate the scrollTop of every item. 
    let temp = 0
    return this._accumulateToScrollTop = _.map(this.props.itemHeightArray, v => {
      temp += v
      return temp - v
    })
  },

  getVisibleItemIndexes: function () {
    var itemIndexes = [];
    var scrollTop = this.state.scrollTop;
    var itemScrollTop = 0;

    for (var index = 0; index < this.props.numberOfItems; index++) {
      itemScrollTop = this._accumulateToScrollTop[index] - scrollTop;

      // Item is completely off-screen bottom
      if (itemScrollTop >= this.props.style.height) {
        continue;
      }

      // Item is completely off-screen top
      if (itemScrollTop <= -this.props.style.height) {
        continue;
      }

      // Part of item is on-screen.
      itemIndexes.push(index);
    }

    return itemIndexes;
  },
});

module.exports = ListView;
