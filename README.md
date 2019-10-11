# Sanitizer
Converts Object with snake_case propty to camelCase proprty

## Usage

``` javascript
import { sanitizer } from 'sanitizer';
const data = { 'one_key': 'foo', 'two_key': 'foo' };
sanitizer(data); // { oneKey: 'foo', twoKey: 'foo', }
```
## Deep
Set manually how far getting deep to convert keys with `deep` argument
*Default deep argument is zero*

``` javascript
import { sanitizer } from 'sanitizer';
const data = {
    'third_key': { 'one_key': 'foo', 'two_key': 'foo' },
};
sanitizer(data, 2); // { thirdKey: { oneKey: 'foo', twoKey: 'foo' }, }
```

## convertsArray
Set `convertsArray` argument that tells to sanitizer do you want to convert array objects key or not
*Default convertsArray argument is true*

``` javascript
import { sanitizer } from 'sanitizer';
const data = {
    'third_key': [{ 'one_key': 'foo', 'two_key': 'foo' }],
};
sanitizer(data, 0, fasle ); // { thirdKey: [{ 'one_key': 'foo', 'two_key': 'foo' }], }
```
