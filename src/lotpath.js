var L = require('leaflet');

L.Map.include({
    shouldGetActionStar: function (layer) {
        return layer.options.organizing || layer.options.friendly_owner;
    },

    actionStarFill: function (layer) {
        // Override to get color for layer
        return '#000000';
    }
});

L.LotPathMixin = {
    initActionPath: function() {
        if (!this._map.shouldGetActionStar(this)) return;
        this._actionPath = this._createElement('path');
        this._actionPath.setAttribute('style', 'fill:' + this._map.actionStarFill(this) + '; fill-opacity:1;');
        this._actionPath.setAttribute('d', this.getActionPathSvgStr());
        this._container.insertBefore(this._actionPath, this._path);
        this.updateActionPathScale();
    },

    // TODO make this an option / extensible
    getActionPathSvgStr: function () {
        return 'M 0,-39 c -0.6 0 -2.2 3.4 -3.5 7.6 -1.3 4.2 -3 7.8 -3.7 8.1 -0.7 0.3 -4.2 -1.6 -7.7 -4.1 -5.8 -4.1 -8.6 -5.5 -8.6 -4.2 0 0.2 1.1 4.1 2.6 8.6 1.4 4.5 2.4 8.3 2.1 8.6 -0.2 0.2 -4.3 0.7 -9.1 1.1 -4.7 0.3 -8.6 1 -8.6 1.5 0 0.5 2.9 3 6.5 5.5 3.6 2.6 6.5 5.2 6.5 5.8 0 0.6 -2.9 3.2 -6.5 5.8 -3.6 2.6 -6.5 5.1 -6.5 5.5 0 0.5 3.9 1.1 8.6 1.5 4.7 0.3 8.8 0.8 9.1 1.1 0.2 0.2 -0.7 4.1 -2.1 8.6 -1.4 4.5 -2.6 8.3 -2.6 8.6 0 1.3 2.8 -0 8.6 -4.2 3.5 -2.5 7 -4.4 7.7 -4.1 0.7 0.3 2.3 3.9 3.7 8.1 1.3 4.2 2.9 7.6 3.5 7.6 0.6 0 2.2 -3.4 3.5 -7.6 1.3 -4.2 3 -7.8 3.7 -8.1 0.7 -0.3 4.2 1.6 7.7 4.1 5.8 4.1 8.6 5.5 8.6 4.2 0 -0.2 -1.1 -4.1 -2.6 -8.6 -1.4 -4.5 -2.4 -8.3 -2.1 -8.6 0.2 -0.2 4.3 -0.7 9.1 -1.1 4.7 -0.3 8.6 -1 8.6 -1.5 0 -0.5 -2.9 -3 -6.5 -5.5 -3.6 -2.6 -6.5 -5.2 -6.5 -5.8 0 -0.6 2.9 -3.2 6.5 -5.8 3.6 -2.6 6.5 -5.1 6.5 -5.5 0 -0.5 -3.9 -1.1 -8.6 -1.5 -4.7 -0.3 -8.8 -0.8 -9.1 -1.1 -0.2 -0.2 0.7 -4.1 2.1 -8.6 1.4 -4.5 2.6 -8.3 2.6 -8.6 0 -1.3 -2.8 0 -8.6 4.2 -3.5 2.5 -7 4.4 -7.7 4.1 -0.7 -0.3 -2.3 -3.9 -3.7 -8.1 -1.3 -4.2 -2.9 -7.6 -3.5 -7.6 z';
    },

    // TODO make this an option / extensible
    updateActionPathScale: function () {
        if (this._actionPath) {
            var point = this._map.latLngToLayerPoint(this.getBounds().getCenter()),
                zoom = this._map.getZoom(),
                scale = 0.5;

            // Translate and scale around the layer's point
            if (zoom >= 18) {
                scale = 1.5;
            }
            else if (zoom >= 15) {
                scale = 0.75;
            }
            this._actionPath.setAttribute('transform', 'translate(' + point.x + ',' + point.y + ') scale(' + scale + ')');
        }
    }
};
