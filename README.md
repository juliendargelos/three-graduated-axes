# Three graduated axes

Generate and manipulate x/y axes graduations and labels.

## Usage

- [Creating axes](#creating-axes)
- [Editing axes parameters](#editing-axes-parameters)
- [Generate axes from dataset](#generate-axes-from-dataset)
- [Add and size objects into axes](#add-and-size-objects-into-axes)

#### Creating axes

```typescript
import { Axes } from 'three-graduated-particles'

// These are the default parameters
const axes = new Axes({
  x: {
    size: 10, // Size of the axis
    labels = [], // Array of numbers or strings to use as graduation labels
    prefix = '', // Prefix for labels
    suffix = '', // Suffix for labels
    decimals = undefined, // Number of decimals to keep when rounding labels, set to undefined to disable rounding
    graduations = 1, // Number of graduations per label. If there is no label, it will be used as the total number of graduations.
    root = false, // Set to true to always display root graduation
    relative = false, // Set to true to align root graduation and labels at 0
    lineWidth = 0.02, // Line width of graduations
    margin = 0.2, // Space between labels and graduations
    padding = 0 // Graduation padding
  },
  y: {
    // Same as x parameters
  },
  labels: {
    opacity: 1, // Opacity of labels
    color: '#aaaaaa', // Color of labels (can only be a string)
    fontSize: 0.1, // Font size of labels
    fontFamily: 'sans-serif', // Font family of labels
    faceCamera: false // Set to true to make labels looking at camera
  },
  opacity: 1, // Opacity of graduations
  color: 0xaaaaaa, // Color of graduations (hexadecimal number, string or Color instance)
  autoRenderCSS3D: true // Tells axes to handle labels rendering themself by creating a CSS3DRenderer and syncing it with axes rendering
})
```

#### Editing axes parameters

All the parameters of the `Axes` constructor (except `autoRenderCSS3D`) are editable from the instance according to the same structure (eg: `axes.x.graduations`, `axes.labels.fontSize`, ...). But you will need to regenerate or resize either the graduations or the labels (or both) depending on the parameters you edited.

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
| `x\|y.size` | | | × | × |
| `x\|y.relative` | | | × | × |
| `x\|y.padding` | | | × | × |
| `x\|y.margin` | | | | × |

#### Generate axes from dataset

*Coming soon*

#### Add and size objects into axes

*Coming soon*
