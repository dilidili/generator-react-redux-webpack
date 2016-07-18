'use strict';

var createComponent = require('./createComponent');
var LayerMixin = require('./LayerMixin');

var Gradient = createComponent('Gradient', LayerMixin, {

  applyGradientProps: function (prevProps, props) {
    var layer = this.node;
    layer.type = 'gradient';
    layer.colorStops = props.colorStops || [];
    this.applyLayerProps(prevProps, props);
  },

  mountComponent: function (rootID, transaction, context) {
    var props = this._currentElement.props;
    var layer = this.node;
    this.applyGradientProps({}, props);
    return layer;
  },

  receiveComponent: function (nextComponent, transaction, context) {
    var props = nextComponent.propsReact;
    this.applyGradientProps({}, props);
    this._currentElement = nextComponent;
    this.node.invalidateLayout();
  },

});


module.exports = Gradient;
