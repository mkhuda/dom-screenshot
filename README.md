# dom-screenshot
DOM screenshot by dom-to-image forked & modified from [dom-to-image](https://github.com/tsayen/dom-to-image)

## Added & Fix:
- Change to rollup build
- Add encodeURIComponent on makeSvgDataUri. Based on [this](https://github.com/tsayen/dom-to-image/issues/78) issue
- Add Typescript support, (.d.ts) battery included.

## TODO:
- Adding `chai` test (on progress).

## Usages (React)
```typescript
import DomScreenshot from "@mkhuda/dom-screenshot";
....

return(
    <button
        onClick={() => {
          const getElement = document.getElementById("root") as HTMLElement;
          const image = DomScreenshot.toPng(document.body, {});
          image.then((generatedImage) => {
            window.open(generatedImage);
          });
        }}
      >
        Test
    </button>
)
...
```

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License

[MIT](https://choosealicense.com/licenses/mit/)
