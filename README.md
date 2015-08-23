## Descriptoin

It is `ionic-clock-face-time-picker` the great fully responsive circle clock face time chooser. Easy and fast set date. You need not use any more!


## How to use:

1. Add from dist folder link on `angular-clock-picker.js`

```html

    <!-- path to ionic/angularjs -->
    <script src="../dist/angular-clock-picker.js"></script>
    
```

2. Add from dist folder link on `angular-clock-picker.css`

```html
    <link rel="stylesheet" href="../dist/angular-clock-picker.css"/>
 ```   

3. In your application module inject the dependency `angular-clock-picker`, in order to work with the ionic clock time picker

```javascript
    angular.module('main', ['ionic', 'angular-clock-picker']){
        //........
    }
```

4. In any place of your view add directive, for example

```html
    <analog-clock ng-model="time"></analog-clock>
```

Get or set time by specified ng-model.

## Do you use SASS?

It is easy just import `angular-clock-picker.sass` from scss folder instead link on css.

You can rewrite color for you own datePicker!

Just change:

`$dark`, `$positive`, `$point-color`, `$point-bg-color`, `$point-active-color`, `$point-active-bg-color`, `$arrow-color`, `$arrow-color-active`, `$circle-center-color` as you wish.

Enjoy!