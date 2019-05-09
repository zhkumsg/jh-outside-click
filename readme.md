# jh-outside-click
> Vue click outside directive.

## Installation
``` bash
$ npm install jh-outside-click
```

## Example
_main.js_
``` js
import JhOutsideClick from 'jh-outside-click';
Vue.use(JhOutsideClick);
```
_template_
``` xml
<div  v-jh-outside-click="todo">
  Todo
</div>
```
_methods_
``` js
methods:{
  todo(e){

  }
}
```

## Blog

[简体中文](https://www.jianshu.com/p/5bdeca5a39d8)

In daily development, we often encounter such needs

> Trigger an event when clicking outside a specific element

Specifically, when making a pop-up window, click on any part outside the pop-up window, such as the mask layer, the pop-up window is automatically closed.

`Specific element`：_Popup content layer_
`External element`：_Everything except the content layer_

The conventional approach is to set the mask layer and the content layer is not a parent-child element, and then specifically register the click event on the mask layer, and when the mask layer is clicked, trigger the method of closing the pop-up window.
This is actually a way to `save the country by curve`, but it only achieves the effect of triggering a specific event, and does not listen to clicks on external elements.

If at this time I said, **there is no mask layer**, then how to achieve it?

![](https://upload-images.jianshu.io/upload_images/13908708-ae6d2a898ccbe1fb.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

The method is actually very simple, isn't it an external element? We register the temporary event directly on the body to determine whether the click element is outside the `specific element`, and if so, trigger the close method.

**How to register for a temporary event?**    

Registering events on the body is global, and every element is listened to. How can it be done temporarily?

We only need to remove the body listener in the close method, so we can temporarily listen.

**How to judge whether it is an external element?**

There are two ways, the first one is the simplest, using `contains`

> node.contains( otherNode )

- Whether node contains a otherNode node.
- Whether otherNode is a descendant node of node.

Returns true if otherNode is a descendant node of node or the node node itself, otherwise returns false.

The second method is to use `getBoundingClientRect`

> Element.getBoundingClientRect() ,returns the size of the element and its position relative to the viewport

By comparing the coordinates of the currently clicked element with the location information of the specific element, it can also be determined whether it is an external click.

---

**Implemented on native javascript**

```js
document.body.append(this.el); // Insert popup content
// Add a custom attribute (method) on the pop-up window dom
this.el.__outsideClickEvent__ = e => {
  if (!this.el.contains(e.target)) {
    this.hide();
  }
};
setTimeout(() => {
  // Registration event
  document.body.addEventListener('click', this.el.__outsideClickEvent__);
});
```

```js
hide(){
    // todo
    // Remove event
    document.body.removeEventListener('click', this.el.__outsideClickEvent__);
    // Delete attribute
    delete this.el.__outsideClickEvent__;
}
```

**Implemented on vue**
On vue we use more custom instructions, as follows

```js
directives: {
  'out-side-click': {
    bind(el, binding) {
      el.__outsideClickEvent__ = e => {
        // Can also be checked using getBoundingClientRect
        if (!el.contains(e.target)) {
          binding.value(e);
        }
      };
      setTimeout(() => {
        document.body.addEventListener('click', el.__outsideClickEvent__);
      });
    },
    unbind(el) {
      document.body.removeEventListener('click', el.__outsideClickEvent__);
      delete el.__outsideClickEvent__;
    },
  },
},
```

```xml
<div class="content" v-out-side-click="close"></div>
```

---

**By the way**

If there is no mask layer element, how do you achieve the translucent effect of the non-popular window area?

`outline` can help us solve the problem, set a size large enough.

```css
{
  rgba(0,0,0,0.8) solid 9999px
}
```

![](https://upload-images.jianshu.io/upload_images/13908708-3643d7b5b4431768.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

Of course, if there is a need to do operational guidance, `outline` is also a good choice.
