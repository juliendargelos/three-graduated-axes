import { Matrix4, Object3D, BufferAttribute, BufferGeometry, Vector2, Box2, Mesh } from 'three';
import { CSS3DObject, CSS3DRenderer } from 'three/examples/jsm/renderers/CSS3DRenderer';

/*! *****************************************************************************
Copyright (c) Microsoft Corporation. All rights reserved.
Licensed under the Apache License, Version 2.0 (the "License"); you may not use
this file except in compliance with the License. You may obtain a copy of the
License at http://www.apache.org/licenses/LICENSE-2.0

THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
MERCHANTABLITY OR NON-INFRINGEMENT.

See the Apache Version 2.0 License for specific language governing permissions
and limitations under the License.
***************************************************************************** */
/* global Reflect, Promise */

var extendStatics = function(d, b) {
    extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return extendStatics(d, b);
};

function __extends(d, b) {
    extendStatics(d, b);
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
}

var __assign = function() {
    __assign = Object.assign || function __assign(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};

function floorRelative(value, decimals) {
    if (decimals === void 0) { decimals = 0; }
    if (decimals === undefined)
        return value;
    var factor = Math.pow(10, decimals);
    return value > 0
        ? Math.floor(value * factor) / factor
        : Math.ceil(value * factor) / factor;
}
function ceilRelative(value, decimals) {
    if (decimals === void 0) { decimals = 0; }
    return -floorRelative(-value, decimals);
}
function roundStep(value, decimals, divider, direction) {
    if (direction === void 0) { direction = 1; }
    var step = 1 / Math.pow(divider, decimals);
    var roundedValue;
    if (direction > 0) {
        roundedValue = Math.floor(value);
        while (roundedValue < value)
            roundedValue += step;
    }
    else {
        roundedValue = Math.ceil(value);
        while (roundedValue > value)
            roundedValue -= step;
    }
    return roundedValue;
}
function smallerDividerOf(value, maximum) {
    if (maximum === void 0) { maximum = 10; }
    for (var divider = 2; divider < maximum; divider++) {
        if (!(value % divider))
            return divider;
    }
    return 0;
}

var Axis = /** @class */ (function () {
    function Axis(_a) {
        var orientation = _a.orientation, spacing = _a.spacing, _b = _a.size, size = _b === void 0 ? 10 : _b, _c = _a.labels, labels = _c === void 0 ? [] : _c, _d = _a.prefix, prefix = _d === void 0 ? '' : _d, _e = _a.suffix, suffix = _e === void 0 ? '' : _e, _f = _a.decimals, decimals = _f === void 0 ? undefined : _f, _g = _a.graduations, graduations = _g === void 0 ? 1 : _g, _h = _a.root, root = _h === void 0 ? false : _h, _j = _a.relative, relative = _j === void 0 ? false : _j, _k = _a.lineWidth, lineWidth = _k === void 0 ? 0.02 : _k, _l = _a.progress, progress = _l === void 0 ? 1 : _l, _m = _a.margin, margin = _m === void 0 ? 0.2 : _m, _o = _a.padding, padding = _o === void 0 ? 0 : _o, _p = _a.distance, distance = _p === void 0 ? 0 : _p;
        this.minimumOffset = 0;
        this.maximumOffset = 0;
        this.orientation = orientation;
        this.spacing = spacing;
        this.size = size;
        this._labels = labels;
        this.prefix = prefix;
        this.suffix = suffix;
        this.decimals = decimals;
        this.graduations = graduations;
        this.root = root;
        this.relative = relative;
        this.lineWidth = lineWidth;
        this.progress = progress;
        this.margin = margin;
        this.padding = padding;
        this.distance = distance;
    }
    Axis.prototype.updateRootPosition = function () {
        if (!this.relative) {
            this.rootPosition = 0;
        }
        else if (!this.labels.length) {
            this.rootPosition = 0.5;
        }
        else {
            var index = this.labels.findIndex(function (label) { return (parseFloat(label) === 0); });
            this.rootPosition = index === -1
                ? 0
                : index / (this.labels.length - 1);
        }
    };
    Object.defineProperty(Axis.prototype, "labels", {
        get: function () {
            return this._labels;
        },
        set: function (labels) {
            this._labels = labels;
            this.updateRootPosition();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Axis.prototype, "relative", {
        get: function () {
            return this._relative;
        },
        set: function (relative) {
            this._relative = relative;
            this.updateRootPosition();
        },
        enumerable: true,
        configurable: true
    });
    Axis.prototype.generate = function (values, _a) {
        var _b = _a === void 0 ? {} : _a, _c = _b.labels, labels = _c === void 0 ? 4 : _c, _d = _b.decimals, decimals = _d === void 0 ? 2 : _d, _e = _b.labelsBasedDecimals, labelsBasedDecimals = _e === void 0 ? true : _e, _f = _b.root, root = _f === void 0 ? false : _f, _g = _b.relative, relative = _g === void 0 ? true : _g, _h = _b.minimumOffset, minimumOffset = _h === void 0 ? 0 : _h, _j = _b.maximumOffset, maximumOffset = _j === void 0 ? 0 : _j;
        this.reset();
        var minimum = Math.min.apply(Math, values);
        var maximum = Math.max.apply(Math, values);
        var shiftedMinimum = minimum - minimumOffset;
        var shiftedMaximum = maximum - maximumOffset;
        if (relative) {
            this.relative = shiftedMinimum < 0 && shiftedMaximum > 0;
        }
        if (this.relative) {
            shiftedMinimum = Math.min(shiftedMinimum, -shiftedMaximum);
            shiftedMaximum = Math.max(-shiftedMinimum, shiftedMaximum);
            if (!(labels % 2))
                labels++;
        }
        else if (root) {
            shiftedMinimum = Math.min(0, shiftedMinimum);
            shiftedMaximum = Math.max(0, shiftedMaximum);
        }
        if (decimals !== undefined) {
            if (labelsBasedDecimals) {
                var divider = 0;
                if (this.relative) {
                    divider = 2;
                }
                else {
                    for (labels; !divider; labels++) {
                        divider = smallerDividerOf(labels);
                    }
                }
                shiftedMinimum = roundStep(shiftedMinimum, decimals, divider, -1);
                shiftedMaximum = roundStep(shiftedMaximum, decimals, divider, 1);
            }
            else {
                shiftedMinimum = floorRelative(shiftedMinimum, decimals);
                shiftedMaximum = ceilRelative(shiftedMaximum, decimals);
            }
        }
        var range = shiftedMaximum - shiftedMinimum;
        this.labels = [];
        for (var graduation = 0; graduation < labels; graduation++) {
            this.labels.push(ceilRelative(graduation / (labels - 1) * range + shiftedMinimum, decimals));
        }
        this.minimumOffset = -(shiftedMinimum - minimum) / range;
        this.maximumOffset = (shiftedMaximum - maximum) / range;
    };
    Axis.prototype.reset = function () {
        this.minimumOffset = this.maximumOffset = 0;
        this.labels.splice(0);
        this.root = false;
        this.relative = false;
    };
    return Axis;
}());

var Label = /** @class */ (function (_super) {
    __extends(Label, _super);
    function Label() {
        var _this = _super.call(this, document.createElement('div')) || this;
        _this.wrapper = document.createElement('div');
        _this.content = document.createElement('div');
        _this.wrapper.appendChild(_this.content);
        _this.element.appendChild(_this.wrapper);
        return _this;
    }
    Object.defineProperty(Label.prototype, "style", {
        get: function () {
            return this.wrapper.style;
        },
        enumerable: true,
        configurable: true
    });
    Label.prototype.generate = function (axis, value) {
        var rounding = (axis.decimals !== undefined &&
            Math.pow(10, axis.decimals));
        this.content.textContent = "" + axis.prefix + (rounding ? Math.round(value * rounding) / rounding : value) + axis.suffix;
    };
    Label.prototype.resize = function (axis, opposite, position, renderingScale) {
        if (renderingScale === void 0) { renderingScale = 10; }
        var oppositeRelative = !!opposite.rootPosition;
        var rootPosition = (opposite.rootPosition - 0.5) * opposite.size;
        position = (position / (axis.labels.length - 1) - 0.5) * axis.size;
        var spacingX = axis.spacing.x * (oppositeRelative || !axis.orientation.x);
        var spacingY = axis.spacing.y * (oppositeRelative || !axis.orientation.y);
        this.content.style.transform = "translate(" + 50 * spacingX + "%, " + -50 * spacingY + "%)";
        this.position
            .setX(renderingScale * (axis.orientation.x * position +
            axis.orientation.y * rootPosition +
            axis.margin * spacingX -
            axis.padding * axis.orientation.y * (1 - oppositeRelative)))
            .setY(renderingScale * (axis.orientation.y * position +
            axis.orientation.x * rootPosition +
            axis.margin * spacingY -
            axis.padding * axis.orientation.x * (1 - oppositeRelative)))
            .setZ(axis.distance * renderingScale);
    };
    return Label;
}(CSS3DObject));

var Labels = /** @class */ (function (_super) {
    __extends(Labels, _super);
    function Labels(_a) {
        var _b = _a === void 0 ? {} : _a, _c = _b.opacity, opacity = _c === void 0 ? 1 : _c, _d = _b.color, color = _d === void 0 ? '#ffffff' : _d, _e = _b.fontSize, fontSize = _e === void 0 ? 0.3 : _e, _f = _b.fontFamily, fontFamily = _f === void 0 ? 'sans-serif' : _f, _g = _b.faceCamera, faceCamera = _g === void 0 ? false : _g, _h = _b.renderingScale, renderingScale = _h === void 0 ? 100 : _h;
        var _this = _super.call(this) || this;
        _this.css3DRenderer = new CSS3DRenderer();
        _this.originalMatrix = new Matrix4();
        _this.style = _this.css3DRenderer.domElement.style;
        _this.opacity = opacity;
        _this.color = color;
        _this.fontSize = fontSize;
        _this.fontFamily = fontFamily;
        _this.faceCamera = faceCamera;
        _this.renderingScale = renderingScale;
        _this.matrixAutoUpdate = false;
        _this.style.position = 'absolute';
        _this.style.pointerEvents = 'none';
        _this.style.top =
            _this.style.left = '0';
        _this.style.zIndex = '2';
        document.body.appendChild(_this.css3DRenderer.domElement);
        return _this;
    }
    Labels.prototype.iterate = function (x, y, callback) {
        return [x, y].reduce(function (index, axis, axisIndex, axes) {
            return axis.labels.reduce(function (index, value, position) {
                callback(axis, axes[(axisIndex + 1) % axes.length], index, position, value);
                return index + 1;
            }, index);
        }, 0);
    };
    Labels.prototype.scaleFont = function () {
        this.style.fontSize = this.fontSize * this.renderingScale + "px";
    };
    Object.defineProperty(Labels.prototype, "opacity", {
        get: function () {
            return parseFloat(this.style.opacity);
        },
        set: function (opacity) {
            this.style.opacity = opacity;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Labels.prototype, "color", {
        get: function () {
            return this.style.color;
        },
        set: function (color) {
            this.style.color = color;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Labels.prototype, "fontFamily", {
        get: function () {
            return this.style.fontFamily;
        },
        set: function (fontFamily) {
            this.style.fontFamily = fontFamily;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Labels.prototype, "faceCamera", {
        get: function () {
            return this._faceCamera;
        },
        set: function (faceCamera) {
            this._faceCamera = faceCamera;
            faceCamera || this.children.forEach(function (label) { return label.rotation.set(0, 0, 0); });
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Labels.prototype, "visible", {
        get: function () {
            return this.style ? this.style.display !== 'none' : true;
        },
        set: function (visible) {
            if (this.style)
                this.style.visibility = visible ? null : 'none';
        },
        enumerable: true,
        configurable: true
    });
    Labels.prototype.setRendererSize = function (width, height) {
        this.css3DRenderer.setSize(width, height);
    };
    Labels.prototype.render = function (camera) {
        var parent = this.parent;
        var xCamera = camera.position.x;
        var yCamera = camera.position.y;
        var zCamera = camera.position.z;
        this.originalMatrix.copy(this.matrix);
        this.parent = null;
        camera.position.multiplyScalar(this.renderingScale);
        this.updateWorldMatrix(true, false);
        parent.updateWorldMatrix(true, false);
        this.applyMatrix(parent.matrixWorld);
        this.updateWorldMatrix(false, false);
        this.faceCamera && this.children.forEach(function (label) {
            label.lookAt(camera.position);
        });
        this.position.multiplyScalar(this.renderingScale);
        this.updateMatrix();
        this.updateMatrixWorld(true);
        this.css3DRenderer.render(this, camera);
        camera.position.set(xCamera, yCamera, zCamera);
        this.parent = parent;
        this.matrix.copy(this.originalMatrix);
        this.matrix.decompose(this.position, this.quaternion, this.scale);
    };
    Labels.prototype.generate = function (x, y) {
        var _this = this;
        this.scaleFont();
        this.children
            .slice(this.iterate(x, y, function (axis, opposite, index, position, value) {
            var label = _this.children[index];
            label || _this.add(label = new Label());
            label.generate(axis, value);
            label.resize(axis, opposite, position, _this.renderingScale);
        }))
            .forEach(function (label) { return _this.remove(label); });
    };
    Labels.prototype.resize = function (x, y) {
        var _this = this;
        this.scaleFont();
        this.iterate(x, y, function (axis, opposite, index, position) {
            var label = _this.children[index];
            label && label.resize(axis, opposite, position, _this.renderingScale);
        });
    };
    return Labels;
}(Object3D));

var Graduations = /** @class */ (function (_super) {
    __extends(Graduations, _super);
    function Graduations() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.graduations = [];
        return _this;
    }
    Graduations.prototype.generate = function (x, y) {
        var _this = this;
        var indicesLength = 6 * [x, y].reduce(function (sum, _a, index) {
            var graduations = _a.graduations, root = _a.root, rootPosition = _a.rootPosition, labels = _a.labels;
            var maximum = labels.length - 1;
            if (!graduations) {
                graduations = 0 + root;
            }
            else if (labels.length) {
                if (graduations < 1) {
                    rootPosition *= maximum;
                    var step = Math.min(maximum, Math.round(1 / graduations));
                    while (maximum % step || rootPosition % step)
                        step--;
                    graduations = Math.ceil(labels.length / step);
                }
                else {
                    graduations = Math.round(graduations) * maximum + 1;
                }
            }
            else {
                graduations = Math.round(graduations);
            }
            _this.graduations[index] = graduations;
            return sum + graduations;
        }, 0);
        var indices = new Uint16Array(indicesLength);
        var index = 0;
        for (var i = 0; i < indicesLength; i += 6) {
            indices[i] = indices[i + 3] = index;
            indices[i + 1] = indices[i + 5] = index + 2;
            indices[i + 2] = index + 1;
            indices[i + 4] = index + 3;
            index += 4;
        }
        this.setIndex(new BufferAttribute(indices, 1));
        this.setAttribute('position', new BufferAttribute(new Float32Array(indicesLength * 2), 3));
        this.resize(x, y);
    };
    Graduations.prototype.resize = function (x, y) {
        var positionAttribute = this.getAttribute('position');
        var vertices = positionAttribute.array;
        var xGraduations = this.graduations[0];
        var yGraduations = this.graduations[1];
        var xHalfSize = x.size / 2;
        var yHalfSize = y.size / 2;
        var xFactor = x.size / Math.max(1, xGraduations - 1);
        var yFactor = y.size / Math.max(1, yGraduations - 1);
        var xHalfPaddedSize = xHalfSize + y.padding;
        var yHalfPaddedSize = yHalfSize + x.padding;
        var xHalfLineWidth = x.lineWidth / 2;
        var yHalfLineWidth = y.lineWidth / 2;
        var xHalfOuterSize = xHalfPaddedSize + xHalfLineWidth;
        var yHalfOuterSize = yHalfPaddedSize + yHalfLineWidth;
        var xRootPosition = xGraduations === 1 ? x.rootPosition * x.size : 0;
        var yRootPosition = yGraduations === 1 ? y.rootPosition * y.size : 0;
        var xProgress = x.progress * 2;
        var yProgress = y.progress * 2;
        var index = 0;
        for (var i = 0; i < xGraduations; i++) {
            var position = i * xFactor - xHalfSize + xRootPosition;
            vertices[index] = vertices[index + 9] = position - xHalfLineWidth;
            vertices[index + 3] = vertices[index + 6] = position + xHalfLineWidth;
            vertices[index + 7] = vertices[index + 10] = -yHalfOuterSize;
            vertices[index + 1] = vertices[index + 4] = -yHalfOuterSize + (yHalfOuterSize * xProgress);
            index += 12;
        }
        for (var i = 0; i < yGraduations; i++) {
            var position = i * yFactor - yHalfSize + yRootPosition;
            vertices[index + 7] = vertices[index + 10] = position - yHalfLineWidth;
            vertices[index + 1] = vertices[index + 4] = position + yHalfLineWidth;
            vertices[index] = vertices[index + 9] = -xHalfOuterSize;
            vertices[index + 3] = vertices[index + 6] = -xHalfOuterSize + (xHalfOuterSize * yProgress);
            index += 12;
        }
        positionAttribute.needsUpdate = true;
    };
    return Graduations;
}(BufferGeometry));

var Container = /** @class */ (function (_super) {
    __extends(Container, _super);
    function Container(points) {
        var _this = _super.call(this) || this;
        _this._size = new Vector2();
        if (points) {
            var pointValues = points.map(function (_a, index) {
                var x = _a.x, y = _a.y;
                var pointValue = {
                    x: parseFloat(x),
                    y: parseFloat(y)
                };
                if (isNaN(pointValue.x))
                    pointValue.x = index / (points.length - 1);
                if (isNaN(pointValue.y))
                    pointValue.y = index / (points.length - 1);
                return pointValue;
            });
            _this.setFromPoints(pointValues);
        }
        return _this;
    }
    Object.defineProperty(Container.prototype, "size", {
        get: function () {
            return this.getSize(this._size);
        },
        enumerable: true,
        configurable: true
    });
    Container.prototype.normalizePoint = function (point, target) {
        if (target === void 0) { target = new Vector2(); }
        return target
            .subVectors(point, this.min)
            .divide(this.size);
    };
    Container.prototype.interpolatePoint = function (point, container, target) {
        if (target === void 0) { target = new Vector2(); }
        return (container ? container.normalizePoint(point, target) : target)
            .multiply(this.size)
            .add(this.min);
    };
    Container.prototype.interpolatePoints = function (points, targets) {
        var _this = this;
        if (targets === void 0) { targets = points.map(function () { return new Vector2(); }); }
        var container = new Container(points);
        points.some(function (point, index) {
            if (index >= targets.length)
                return true;
            var pointValue = {
                x: parseFloat(point.x),
                y: parseFloat(point.y)
            };
            if (isNaN(pointValue.x)) {
                pointValue.x = index / (points.length - 1);
            }
            if (isNaN(pointValue.y)) {
                pointValue.y = index / (points.length - 1);
            }
            _this.interpolatePoint(pointValue, container, targets[index]);
        });
        return targets;
    };
    Container.prototype.resize = function (x, y) {
        var xHalfSize = x.size / 2;
        var yHalfSize = y.size / 2;
        this.min.set(x.minimumOffset * x.size - xHalfSize, y.minimumOffset * y.size - yHalfSize);
        this.max.set(xHalfSize - x.maximumOffset * x.size, yHalfSize - y.maximumOffset * y.size);
    };
    return Container;
}(Box2));

var Axes = /** @class */ (function (_super) {
    __extends(Axes, _super);
    function Axes(_a) {
        var _b = _a === void 0 ? {} : _a, _c = _b.x, x = _c === void 0 ? {} : _c, _d = _b.y, y = _d === void 0 ? {} : _d, _e = _b.labels, labels = _e === void 0 ? {} : _e, _f = _b.opacity, opacity = _f === void 0 ? 1 : _f, _g = _b.color, color = _g === void 0 ? 0xffffff : _g, _h = _b.generate, generate = _h === void 0 ? true : _h;
        var _this = _super.call(this, new Graduations()) || this;
        _this.container = new Container();
        _this.x = new Axis(__assign({}, x, { orientation: new Vector2(1, 0), spacing: new Vector2(1, -1) }));
        _this.y = new Axis(__assign({}, y, { orientation: new Vector2(0, 1), spacing: new Vector2(-1, 1) }));
        _this.graduations = _this.geometry;
        _this.labels = new Labels(labels);
        _this.opacity = opacity;
        _this.color.set(color);
        _this.add(_this.labels);
        generate && _this.generate();
        return _this;
    }
    Object.defineProperty(Axes.prototype, "visible", {
        get: function () {
            return this.labels.visible;
        },
        set: function (visible) {
            if (this.labels)
                this.labels.visible = visible;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Axes.prototype, "color", {
        get: function () {
            return this.material.color;
        },
        set: function (color) {
            this.material.color = color;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Axes.prototype, "opacity", {
        get: function () {
            return this.material.opacity;
        },
        set: function (opacity) {
            this.material.transparent = opacity !== 1;
            this.material.opacity = opacity;
        },
        enumerable: true,
        configurable: true
    });
    Axes.prototype.generate = function (values, _a) {
        var _b = _a === void 0 ? {} : _a, _c = _b.x, x = _c === void 0 ? {} : _c, _d = _b.y, y = _d === void 0 ? {} : _d;
        if (values) {
            var xLabels = values.map(function (_a) {
                var x = _a.x;
                return x;
            });
            var yLabels = values.map(function (_a) {
                var y = _a.y;
                return y;
            });
            var xValues = xLabels.map(parseFloat);
            var yValues = yLabels.map(parseFloat);
            if (xValues.includes(NaN))
                this.x.labels = xLabels;
            else
                this.x.generate(xValues, x);
            if (yValues.includes(NaN))
                this.y.labels = yLabels;
            else
                this.y.generate(yValues, y);
        }
        this.generateGraduations();
        this.generateLabels();
    };
    Axes.prototype.resize = function () {
        this.resizeGraduations();
        this.resizeLabels();
    };
    Axes.prototype.generateGraduations = function () {
        this.graduations.generate(this.x, this.y);
        this.container.resize(this.x, this.y);
    };
    Axes.prototype.resizeGraduations = function () {
        this.graduations.resize(this.x, this.y);
        this.container.resize(this.x, this.y);
    };
    Axes.prototype.generateLabels = function () {
        this.labels.generate(this.x, this.y);
    };
    Axes.prototype.resizeLabels = function () {
        this.labels.resize(this.x, this.y);
    };
    return Axes;
}(Mesh));

export { Axes };
//# sourceMappingURL=index.mjs.map
