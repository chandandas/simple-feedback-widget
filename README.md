# simple-feedback-widget

Simple feedback widget with useful functions.

[![NPM version][npm-image]][npm-url]

[npm-image]: http://img.shields.io/npm/v/rc-table.svg?style=flat-square
[npm-url]: https://www.npmjs.com/package/simple-feedback-widget

## install

```
npm i simple-feedback-widget
npm start
```

## Example


## Usage
```js

import { SimpleFeedbackWidget } from 'simple-feedback-widget';

import 'simple-feedback-widget/dist/css/floating-button.css';
import FeedbackSnapShotPlaceHolder from 'simple-feedback-widget/dist/images/image-placeholder.jpg';
const FeedbackAPI = "";
const FeedbackAPIKey = "Iv2ogmILjSiFll4zXD7GNnHJ5f2S1aGindoh6dL54E2";
import logo from "public/images/trigent_logo.svg";

export default function FeedbackWidget() {
  
  return (
      
   <SimpleFeedbackWidget logo={logo.src} imagePlaceHolder={FeedbackSnapShotPlaceHolder} 
   apiUrl={FeedbackAPI} apikey={FeedbackAPIKey}
   buttonType='plus' dimension={30} top={'630px'} left={'1450px'} direction="right"/>
  );
}



<FeedbackWidget />
     


```


