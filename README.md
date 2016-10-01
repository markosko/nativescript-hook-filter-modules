# NativeScript-hook-filter-modules
Shrinking size of built application by deleting defined set of node_modules inside tns_modules


## License
This plugin is licensed under the MIT license by Marek Maszay

## Installation

```
tns plugin add nativescript-hook-filter-modules
```

## Usages

You don't use all the modules exposed by NativeScript in the core-modules. By default they're bundled with your application during a build.
This leads to a larger file size in the end. This hook will remove those modules during the build phase to reduce the overall application size.
This isn't as sophisticated as webpack but it works and is pretty simple to setup and use to reduce your app size on the device.

The more you remove the smaller the final build will be of course. Remove only what you don't need or the app will crash if it tries to require a module.
This is easily fixed by updating the filter-modules.json and rebuilding your application.

## Example

##### filter-modules.json
 In this example the hook will remove the `connectivity` module from your built application.
```
{
    "to_be_deleted": [
        "connectivity"
    ],
    "to_be_kept": [

    ]
}
```
