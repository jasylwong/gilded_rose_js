class Item {
  constructor (name, sellIn, quality) {
    this.name = name
    this.sellIn = sellIn
    this.quality = quality
  }
}

function Shop (items = []) {
  this.items = items
}

Shop.prototype.updateQuality = function () {
  const increaseQuality = function (item) {
    item.quality += qualityChangeRate(item)
  }

  const decreaseQuality = function (item) {
    item.quality -= qualityChangeRate(item)
  }

  const qualityChangeRate = function (item) {
    return passedSellByDate(item) ? 2 : 1
  }

  const backstagePass = function (item) {
    if (item.sellIn >= 11) {
      increaseQuality(item)
    } else if (item.sellIn >= 6) {
      [1, 2].forEach(function () { increaseQuality(item) })
    } else if (item.sellIn > 0) {
      [1, 2, 3].forEach(function () { increaseQuality(item) })
    } else {
      item.quality = 0
    }
  }

  const passedSellByDate = function (item) {
    return item.sellIn <= 0
  }

  for (var i = 0; i < this.items.length; i++) {
    if (this.items[i].name === 'Sulfuras, Hand of Ragnaros') { continue }

    if (this.items[i].name === 'Aged Brie') {
      increaseQuality(this.items[i])
    }

    if (this.items[i].name === 'Backstage passes to a TAFKAL80ETC concert') {
      backstagePass(this.items[i])
    }

    if (!['Aged Brie', 'Backstage passes to a TAFKAL80ETC concert'].includes(this.items[i].name)) {
      decreaseQuality(this.items[i])
    }

    if (this.items[i].name.includes('Conjured')) {
      decreaseQuality(this.items[i])
    }

    this.items[i].sellIn--

    this.items[i].quality = Math.min(this.items[i].quality, 50)
    this.items[i].quality = Math.max(this.items[i].quality, 0)
  }
  return this.items
}
