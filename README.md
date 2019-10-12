# Sanitizer
Converts Object with snake_case propty to camelCase proprty

## Usage

``` javascript
import { sanitizer } from 'sanitizer';
const data = { 'one_key': 'foo', 'two_key': 'foo' };
sanitizer(data); // { oneKey: 'foo', twoKey: 'foo', }
```
### Deep
Set manually how far getting deep to convert keys with `deep` option
*Default deep option is zero*

``` javascript
import { sanitizer } from 'sanitizer';
const data = {
    'third_key': { 'one_key': 'foo', 'two_key': 'foo' },
};
sanitizer(data, { deep: 2 }); // { thirdKey: { oneKey: 'foo', twoKey: 'foo' }, }
```

### convertsArray
Set `convertsArray` option that tells to sanitizer do you want to convert array objects key or not
*Default convertsArray option is true*

``` javascript
import { sanitizer } from 'sanitizer';
const data = {
    'third_key': [{ 'one_key': 'foo', 'two_key': 'foo' }],
};
sanitizer(data, { deep: 0, convertsArray: false } ); // { thirdKey: [{ 'one_key': 'foo', 'two_key': 'foo' }], }
```
### infinite
Set infinite to prevent check how far getting deep
*Default infinite option is false*