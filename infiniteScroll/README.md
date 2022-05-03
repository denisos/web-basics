## infinte scroll
fetch testimonials 5 at a time and render in ui list; when user scrolls to bottom of list fetch and render more

* each message is a styled p element with content
* fetch 5 at a time 
* once page loads fetch 5 and append to end of container
* fetch another 5 and append when user scrolls to the to bottom of container
* only 1 api call at a time, so if pending api then no other call issued
* once all fetched then issue no more calls even if user scrolls
* use fetch
* listen to scroll events
* I also added a "Get More" button to also get more (as well as scroll)
* scrolled to bottom is true for containing div if: scrollHeight - scrollTop - clientHeight <= 0

### json response data format
```
{
  hasNext: true,         // means more can be fetched
  testimonials: [
    {
      "message": "Excellent products!",
      "id": 1
    },
    {
      "message": "Five Stars",
      "id": 55
    },
  ]
}
```

### html
```
<div id="testimonial-container">
  <p class="testimonial">{message}</p>
</div>
```

## to dos
* refactor api throttle
* complete debounce
