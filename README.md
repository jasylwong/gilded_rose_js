# The Gilded Rose 🌹 

[Objective](#Objective) | [Process](#process) | [Running the program](#running_the_program) | [Self-reflection](#self_reflection)

## Objective

This is based on the infamous Kata developed by [Terry Hughes](http://iamnotmyself.com/2011/02/13/refactor-this-the-gilded-rose-kata/).
It is included as one of the tech test exercises used by Makers in [week 10](https://github.com/makersacademy/course/tree/master/individual_challenges).

The requirements specification is as follows: 

Hi and welcome to team Gilded Rose. As you know, we are a small inn with a prime location in a
prominent city ran by a friendly innkeeper named Allison. We also buy and sell only the finest goods.
Unfortunately, our goods are constantly degrading in quality as they approach their sell by date. We
have a system in place that updates our inventory for us. It was developed by a no-nonsense type named
Leeroy, who has moved on to new adventures. Your task is to add the new feature to our system so that
we can begin selling a new category of items. First an introduction to our system:

- All items have a SellIn value which denotes the number of days we have to sell the item
- All items have a Quality value which denotes how valuable the item is
- At the end of each day our system lowers both values for every item

Pretty simple, right? Well this is where it gets interesting:

- Once the sell by date has passed, Quality degrades twice as fast
- The Quality of an item is never negative
- "Aged Brie" actually increases in Quality the older it gets
- The Quality of an item is never more than 50
- "Sulfuras", being a legendary item, never has to be sold or decreases in Quality
- "Backstage passes", like aged brie, increases in Quality as its SellIn value approaches;
	Quality increases by 2 when there are 10 days or less and by 3 when there are 5 days or less but
	Quality drops to 0 after the concert

We have recently signed a supplier of conjured items. This requires an update to our system:

- "Conjured" items degrade in Quality twice as fast as normal items

Feel free to make any changes to the UpdateQuality method and add any new code as long as everything
still works correctly. However, do not alter the Item class or Items property as those belong to the
goblin in the corner who will insta-rage and one-shot you as he doesn't believe in shared code
ownership (you can make the UpdateQuality method and Items property static if you like, we'll cover
for you).

Just for clarification, an item can never have its Quality increase above 50, however "Sulfuras" is a
legendary item and as such its Quality is 80 and it never alters.

## Process

I decided to try the JavaScript variant for this tech test, as it is a language I had recently started learning,
but wanted to improve on.

This is the approach I took for designing and creating this solution:

- Set up repo:
  	- Jasmine for testing
	- ESLint for code quality

- Read the legacy code, and along with the requirements specification, categorise the
characteristics of each of the different types of items:

| Item  | Characteristic(s) |
| ------------- | ------------- |
| All  | sellIn decreases by one  |
|  | Never changes in quality (always 80)Never has to be sold |
| | |
| Sulfuras | Never changes in quality (always 80) |
|  | Never has to be sold |
| | |
| Aged Brie | Quality increases by one|
| | Once the sell by date has passed, Quality increases twice as fast |
| | Quality never more than 50 |
| | |
| Backstage passes | Backstage passes | Quality increases by 1 when there are 11 <= sellIn days
| | Quality increases by 2 when there are 6 <= sellIn days < 11
| | Quality increases by 3 when there are 0 < sellIn days < 5
| | Quality drops to 0 after concert
| | Quality never more than 50
| | Quality never negative|
| | |
| Other | Quality decreases by one |
| | Quality never negative |
| | Once the sell by date has been reached, quality degrades twice as fast |
| | |
| Conjured| As per Other, but quality decreases twice as fast |
| | |

- Research all the World of Warcraft references ;)

- Start writing the feature and units tests for each item, and for a variety of items together.
	- I did not to touch the legacy code at all until I was sure
	that my tests were completely covering all the possible outcomes. This was to give me
	confidence that no functionality was lost in the next stage.

- Refactor the legacy code, whilst still adhering to the tests I had written:
    - Methods were made to adhere to the Single Responsibility Principle as much as possible.
  - As many methods as possible were made private within their respective classes.

- Address the additional "Conjured" items requirement, using TDD.

## <a name="running_the_program">Running the program</a>

### Setup
```
$ git clone https://github.com/jasylwong/gilded_rose_js
$ cd gilded_rose_js
```

### Testing and running
```
$ open SpecRunner.html # This displays the test statuses on the webpage
```

### Example usage in the browser console

Open the SpecRunner.html file as per the last section, and enter your preferred browser's console.

```
> const guanciale = new Item("Guanciale", 1, 1) 
> const agedBrie = new Item("Aged Brie", 2, 1) 
> const backstagePass = new Item("Backstage passes to a TAFKAL80ETC concert", 3, 1) 
> const conjured = new Item("Conjured Mana Cake", 4, 1) 
> const gildedRose = new Shop( [guanciale, agedBrie, backstagePass, conjured]);
> const items = gildedRose.updateQuality();
```

## <a name="self_reflection">Self-reflection</a>

I found this a really difficult task, but actually also really enjoyed it in the process. 
It took me a while to fully get to grips with what the objective was. However, once I did, the strategy
I wanted to use came easily: 
1. Get passing tests with the legacy code
2. Refactor the legacy code to ensure my tests remain green
3. Refactor my own code

(Which now that I look back at it, isn't that far from the original TDD cycle 😉 )

It also took me quite a while to get my head around all those nested if/else conditionals!
What I found helpful was making each type of item a sub-title in my notepad. I then went through the code, listing each item characteristic down as I went.

Another major hurdle for me was being fairly new to JavaScript, with Ruby being my programming "mother tongue".
This proved challenging for both reading the legacy code, and writing my own code. Lots of time was
spent researching and experimenting with unfamiliar syntax. Key finding: Ruby and JS have lots of differences!

Something else I'm still developing is the ability to make judgement calls where multiple 'good coding practices'
may conflict. For example, I tried to keep classes and objects as short as possible, but still adhere to
the Single Responsibility Principle. I prioritised the latter, thinking that having slightly more lines in a class would warrant having clear, simple, functions that do only one thing. This is definitely
a skill I want to really improve on, as it will save me significant time.
