# simple-feedback-widget

Simple feedback widget with useful functions.

[![NPM version][npm-url] 

[npm-url]: https://www.npmjs.com/package/si-widgets


## install

[![si-widgets]](https://www.npmjs.com/package/si-widgets))

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


