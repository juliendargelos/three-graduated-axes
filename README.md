# Three graduated axes

Generate and manipulate x/y axes graduations and labels.

## Usage

- [Creating axes](#creating-axes)
- [Editing axes parameters](#editing-axes-parameters)
- [Generate axes from dataset](#generate-axes-from-dataset)
- [Add and size objects into axes](#add-and-size-objects-into-axes)

#### Creating axes

```javascript
import { Axes } from 'three-graduated-axes'

// These are the default parameters
let axes = new Axes({
  x: {
    size: 10, // Size of the axis
    labels: [], // Array of numbers or strings to use as graduation labels
    prefix: '', // Prefix for labels
    suffix: '', // Suffix for labels
    decimals: undefined, // Number of decimals to keep when rounding labels, set to undefined to disable rounding
    graduations: 1, // Number of graduations per label. If there is no label, it will be used as the total number of graduations.
    root: false, // Set to true to always display root graduation
    relative: false, // Set to true to align root graduation and labels at 0
    lineWidth: 0.02, // Line width of graduations
    progress: 1, // Line drawing progress (0-1)
    margin: 0.2, // Space between labels and graduations
    padding: 0, // Graduation padding
    distance: 0 // Z position of labels from graduations
  },
  y: {
    // Same as x parameters
  },
  labels: {
    opacity: 1, // Opacity of labels
    color: '#ffffff', // Color of labels (can only be a string)
    fontSize: 0.1, // Font size of labels
    fontFamily: 'sans-serif', // Font family of labels
    faceCamera: false, // Set to true to make labels looking at camera
    renderingScale: 100 // Scale/unscale html sizes to fix rendering issues
  },
  opacity: 1, // Opacity of graduations
  color: 0xffffff, // Color of graduations (hexadecimal number, string or Color instance)
  generate: true, // Set to false to prevent geometry and labels from being generated at instantiation
})
```

Then add the axes (which extend `Object3D`) to your threejs scene:

```javascript
scene.add(axes)
```

The labels are dom elements rendered by a CSS3DRenderer, you must manually render them in your loop:

```javascript
axes.labels.render(camera)
```

You must also manually resize the labels renderer when needed:

```
axes.labels.setRendererSize(width, height)
```

#### Editing axes parameters

All the parameters of the `Axes` constructor (except `generate`) are editable from the instance according to the same structure (eg: `axes.x.graduations`, `axes.labels.fontSize`, ...). But you will need to regenerate or resize either the graduations or the labels (or both) depending on the parameters you edited.

To generate graduations or labels, call `axes.generateGraduations()` or `axes.generateLabels()`.
To generate both graduations and labels, call `axes.generate()`.

To resize graduations or labels, call `axes.resizeGraduations()` or `axes.resizeLabels()`.
To resize both graduations and labels, call `axes.resize()`.

Note that the generate methods always call the corresponding resize methods. So whatever editing you make to the axes, calling `axes.generate()` will always apply them, but it's not always the optimal way of doing that (generating is greedier than resizing).

This table shows which methods needs to be called to update the axes after editing its parameters:

| Parameter | `generateGraduations` | `generateLabels` | `resizeGraduations` | `resizeLabels` |
|-|:-:|:-:|:-:|:-:|
| `x\|y.graduations` | × | | | |
| `x\|y.root` | × | | | |
| `x\|y.labels` | × | × | | |
| `x\|y.prefix` | | × | | |
| `x\|y.suffix` | | × | | |
| `x\|y.decimals` | | × | | |
| `x\|y.lineWidth` | | | × | |
| `x\|y.progress` | | | × | |
| `x\|y.size` | | | × | × |
| `x\|y.relative` | | | × | × |
| `x\|y.padding` | | | × | × |
| `x\|y.margin` | | | | × |
| `x\|y.distance` | | | | × |
| `labels.fontSize` | | | | × |
| `labels.renderingScale` | | | | × |

#### Generate axes from dataset

*Documentation coming soon*

#### Add and size objects into axes

*Documentation coming soon*
