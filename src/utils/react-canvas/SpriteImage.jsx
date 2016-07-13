'use strict';

var React = require('react');
var assign = require('object-assign');
var createComponent = require('./createComponent');
var LayerMixin = require('./LayerMixin');
var Layer = require('./Layer');
var Group = require('./Group');
var ImageCache = require('./ImageCache');
var Easing = require('./Easing');
var clamp = require('./clamp');

var RawImage = createComponent('Image', LayerMixin, {

  applyImageProps: function(prevProps, props) {
    var layer = this.node;

    layer.type = 'sprite-image';
    layer.imageUrl = props.src;
  },

  mountComponent: function(rootID, transaction, context) {
    var props = this._currentElement.props;
    var layer = this.node;
    this.applyLayerProps({}, props);
    this.applyImageProps({}, props);
    return layer;
  },

  receiveComponent: function(nextComponent, transaction, context) {
    var prevProps = this._currentElement.props;
    var props = nextComponent.props;
    this.applyLayerProps(prevProps, props);
    this.applyImageProps(prevProps, props);
    this._currentElement = nextComponent;
    this.node.invalidateLayout();
  },

});

var Image = React.createClass({

  propTypes: {
    src: React.PropTypes.string.isRequired,
    style: React.PropTypes.object,
    useBackingStore: React.PropTypes.bool,
    animationDuration: React.PropTypes.number,
    frameCount: React.PropTypes.number.isRequired,
  },

  getDefaultProps(){
    return {
      animationDuration: 1000,
    }
  },

  getInitialState: function () {
    var loaded = ImageCache.get(this.props.src).isLoaded();
    return {
      loaded: loaded,
      frameIndex: 0,
    };
  },

  componentDidMount: function () {
    ImageCache.get(this.props.src).on('load', this.handleImageLoad);
  },

  componentWillUpdate: function(nextProps, nextState) {
    if(nextProps.src !== this.props.src) {
      ImageCache.get(this.props.src).removeListener('load', this.handleImageLoad);
      ImageCache.get(nextProps.src).on('load', this.handleImageLoad);
      var loaded = ImageCache.get(nextProps.src).isLoaded();
      this.setState({loaded: loaded});
    }
  },

  componentWillUnmount: function() {
    if (this._pendingAnimationFrame) {
      cancelAnimationFrame(this._pendingAnimationFrame);
    }
    ImageCache.get(this.props.src).removeListener('load', this.handleImageLoad);
  },

  componentDidUpdate: function(prevProps, prevState) {
    if (this.refs.image) {
      this.refs.image.invalidateLayout();
    }
  },

  render: function () {
    var rawImage;
    var imageStyle = assign({}, this.props.style);
    var style = assign({}, this.props.style);
    var useBackingStore = this.state.loaded ? this.props.useBackingStore : false;

    // Hide the image until loaded.
    imageStyle.alpha = this.state.loaded ? 1 : 0;
    imageStyle.frameIndex = this.state.frameIndex
    imageStyle.frameCount = this.props.frameCount

    // Hide opaque background if image loaded so that images with transparent
    // do not render on top of solid color.
    style.backgroundColor = imageStyle.backgroundColor = null;

    return (
      React.createElement(Group, {ref: 'main', style: style, onTouchStart: this.handleClick},
        React.createElement(RawImage, {ref: 'image', src: this.props.src, style: imageStyle, useBackingStore: useBackingStore})
      )
    );
  },

  handleImageLoad: function () {
    this.setState({loaded: true});
  },

  handleClick: function(evt){
    evt.preventDefault()
    evt.stopPropagation()

    if (this.state.loaded && !this._pendingAnimationFrame) {
      if (this.state.frameIndex === this.props.frameCount-1) {
        // move back to head 
        this.setState({
          frameIndex: 0,
        })
      }else{
        // start frame from head to tail
        this._animationStartTime = Date.now();
        this._pendingAnimationFrame = requestAnimationFrame(this.stepThroughAnimation);
      }
    }
  },

  stepThroughAnimation: function() {
    const nextIndex = ~~((Date.now() - this._animationStartTime) * this.props.frameCount / this.props.animationDuration)
    this.setState({
      frameIndex: nextIndex
    })
    this._pendingAnimationFrame = null

    if (nextIndex < this.props.frameCount-1) {
      this._pendingAnimationFrame = requestAnimationFrame(this.stepThroughAnimation);
    }
  }

});

module.exports = Image;
