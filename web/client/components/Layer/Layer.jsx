/**
 * Copyright 2015, GeoSolutions Sas.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */

var React = require('react');
var Legend = require('../Legend/Legend');
var assign = require('object-assign');

var Layer = React.createClass({
    propTypes: {
        layer: React.PropTypes.object,
        propertiesChangeHandler: React.PropTypes.func
    },
    renderLayerLegend(layer) {
        if (layer && layer.visibility && layer.type === "wms" && layer.group !== "background") {
            return <div style={{marginLeft: "15px"}}><Legend layer={layer}/></div>;
        }
        return null;
    },
    render() {
        return (
            <div key={this.props.layer.name}>
                <div>
                    <input style={{marginRight: "2px"}} data-position={this.props.layer.storeIndex} type="checkbox" checked={this.props.layer.visibility ? "checked" : ""} onChange={this.changeLayerVisibility} />{this.props.layer.title || this.props.layer.name}
                </div>
                {this.renderLayerLegend(this.props.layer)}
            </div>
        );
    },
    changeLayerVisibility(eventObj) {
        let position = parseInt(eventObj.currentTarget.dataset.position, 10);
        var newLayer = assign({}, this.props.layer, {visibility: !this.props.layer.visibility});
        this.props.propertiesChangeHandler(newLayer, position);
    }
});

module.exports = Layer;