# simple-feedback-widget

Simple feedback widget with useful functions.

[![NPM version][npm-image]][npm-url] [![dumi](https://img.shields.io/badge/docs%20by-dumi-blue?style=flat-square)](https://github.com/umijs/dumi) [![build status][github-actions-image]][github-actions-url] [![Test coverage][codecov-image]][codecov-url] [![npm download][download-image]][download-url] [![bundle size][bundlephobia-image]][bundlephobia-url]

[npm-image]: http://img.shields.io/npm/v/rc-table.svg?style=flat-square
[npm-url]: http://npmjs.org/package/rc-table
[github-actions-image]: https://github.com/react-component/table/workflows/CI/badge.svg
[github-actions-url]: https://github.com/react-component/table/actions
[coveralls-image]: https://img.shields.io/coveralls/react-component/table.svg?style=flat-square
[coveralls-url]: https://coveralls.io/r/react-component/table?branch=master
[codecov-image]: https://img.shields.io/codecov/c/github/react-component/table/master.svg?style=flat-square
[codecov-url]: https://codecov.io/gh/react-component/table/branch/master
[david-url]: https://david-dm.org/react-component/table
[david-image]: https://david-dm.org/react-component/table/status.svg?style=flat-square
[david-dev-url]: https://david-dm.org/react-component/table?type=dev
[david-dev-image]: https://david-dm.org/react-component/table/dev-status.svg?style=flat-square
[download-image]: https://img.shields.io/npm/dm/rc-table.svg?style=flat-square
[download-url]: https://npmjs.org/package/rc-table
[bundlephobia-url]: https://bundlephobia.com/result?p=rc-table
[bundlephobia-image]: https://badgen.net/bundlephobia/minzip/rc-table

## install

[![rc-table](https://nodei.co/npm/rc-table.png)](https://npmjs.org/package/rc-table)

## Development

```
npm install
npm start
```

## Example

## Usage

```js
import { FeedbackWidget } from 'si-widgets';

import 'si-widgets/dist/css/floating-button.css';
import FeedbackSnapShotPlaceHolder from 'si-widgets/dist/images/image-placeholder.jpg';
import FeedbackLogo from 'Company Logo';
const FeedbackAPI = "";
const FeedbackAPIKey = "GENERATED KEY";


   
   <FeedbackWidget logo={FeedbackLogo} imagePlaceHolder={FeedbackSnapShotPlaceHolder} 
                            apiUrl={FeedbackAPI} apikey={FeedbackAPIKey}
                            buttonType='plus' dimension={30} top={'630px'} left={'1450px'} direction="right"/>;
```


