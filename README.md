# Gilded Rose

## Objective

JavaScript - Jasmine


All
* sellIn decreases by one

Aged Brie
* Quality increases by one
* Once the sell by date has passed, Quality increases twice as fast
* Quality never more than 50


Sulfuras
* Never changes in quality (always 80)
* Never has to be sold

Backstage passes
* Quality increases by 1 when there are 11 <= sellIn days
* Quality increases by 2 when there are 6 <= sellIn days < 11
* Quality increases by 3 when there are 0 < sellIn days < 5
* Quality drops to 0 after concert
* Quality never more than 50
* Quality never negative

Conjured


Other
* Quality decreases by one
* Quality never negative
* Once the sell by date has been reached, quality degrades twice as fast


Questions
- updatequality method once a day?
- All valid inputs? Spelling mistakes
- What value is Sulfuras sellIn date given as? Does it matter if it changes? Just ignored?
  Input of 80 always correct?
- Aged Brie quality decreases after sellIn
