class Item {
  constructor(name, sellIn, quality){
    this.name = name;
    this.sellIn = sellIn;
    this.quality = quality;
  }
}

class Shop {
  constructor(items=[]){
    this.items = items;
  }

  increaseQuality(item) {
    item.quality += this.qualityChangeRate(item);
  }

  decreaseQuality(item) {
    item.quality -= this.qualityChangeRate(item);
  }

  qualityChangeRate(item) {
    return this.passedSellByDate(item) ? 2 : 1;
  }

  backstagePass(item) {
    item.quality += Math.max( Math.floor((20 - item.sellIn) / 5), 1);
    if (this.passedSellByDate(item)) item.quality = 0;
  }

  passedSellByDate(item) {
    return item.sellIn <= 0;
  }

  updateQuality() {
    for (var i = 0; i < this.items.length; i++) {
      if (this.items[i].name === "Sulfuras, Hand of Ragnaros") { continue; }
      
      if (this.items[i].name === 'Aged Brie') {
        this.increaseQuality(this.items[i]);
      }

      if (this.items[i].name === 'Backstage passes to a TAFKAL80ETC concert') {
        this.backstagePass(this.items[i]);
      }

      if (!['Aged Brie', "Backstage passes to a TAFKAL80ETC concert"].includes(this.items[i].name) ) {
        this.decreaseQuality(this.items[i]);
      }

      if (this.items[i].name === 'Conjured') {
        this.decreaseQuality(this.items[i]);
      }

      this.items[i].sellIn --;

      this.items[i].quality = Math.min(this.items[i].quality, 50);
      this.items[i].quality = Math.max(this.items[i].quality, 0);
    }
    return this.items;
  }
}
