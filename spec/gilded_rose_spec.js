describe("Gilded Rose", function() {

  describe("All items except Sulfurus", function() {
    const guanciale = new Item("Guanciale", 1, 1) 
    const agedBrie = new Item("Aged Brie", 2, 1) 
    const backstagePass = new Item("Backstage passes to a TAFKAL80ETC concert", 3, 1) 
    const gildedRose = new Shop( [guanciale, agedBrie, backstagePass]);
    const items = gildedRose.updateQuality();

    it("have sellIn decrease by one after update", function() {
      expect(items[0].sellIn).toEqual(0);
      expect(items[1].sellIn).toEqual(1);
      expect(items[2].sellIn).toEqual(2);
    });
  })

  describe("Normal item", function() {
      const manchego = new Item("manchego", 2, 7);
      const artichoke = new Item("artichoke", 0, 6);
      const anchovies = new Item("anchovies", -1, 1);
      const gildedRose = new Shop([manchego, artichoke, anchovies]);
      const items = gildedRose.updateQuality();

    it("sellIn reduces by one each update", function() {
      expect(items[0].sellIn).toEqual(1);
    });

    it("reduces in quality by one each update", function() {
      expect(items[0].quality).toEqual(6);
    });

    it("reduces in quality by two if at or past sellIn date", function() {
      expect(items[1].quality).toEqual(4);
    });

    it("can't have negative quality", function() {
      expect(items[2].quality).toBeGreaterThanOrEqual(0);
    });
  });

  describe("Aged Brie", function(){
    it("increases in quality by one each update", function() {
      const gildedRose = new Shop([ new Item("Aged Brie", 2, 5)]);
      const items = gildedRose.updateQuality();
      expect(items[0].quality).toEqual(6);
    })

    it("increases in quality by two each update at or after sellIn date", function() {
      const gildedRose = new Shop([ new Item("Aged Brie", 0, 5)]);
      const items = gildedRose.updateQuality();
      expect(items[0].quality).toEqual(7);
    })

    it("can't exceed quality of 50", function() {
      const gildedRose = new Shop([ new Item("Aged Brie", 4, 50)]);
      const items = gildedRose.updateQuality();
      expect(items[0].quality).toBeLessThanOrEqual(50)
    })
  })

  describe("Sulfuras, Hand of Ragnaros", function(){
    it("doesn't change in quality", function() {
      const gildedRose = new Shop([ new Item("Sulfuras, Hand of Ragnaros", 0, 80)]);
      const items = gildedRose.updateQuality();
      expect(items[0].quality).toEqual(80);
    })

    it("never has to be sold (sellIn doesn't change)", function() {
      const gildedRose = new Shop([ new Item("Sulfuras, Hand of Ragnaros", 0, 80)]);
      const items = gildedRose.updateQuality();
      expect(items[0].sellIn).toEqual(0);
    })
  })

  describe("Backstage passes to a TAFKAL80ETC concert", function(){
    var items;

    beforeAll(function() {
      const pass0 = new Item("Backstage passes to a TAFKAL80ETC concert", 11, 1)
      const pass1 = new Item("Backstage passes to a TAFKAL80ETC concert", 6, 5)
      const pass2 = new Item("Backstage passes to a TAFKAL80ETC concert", 5, 9)
      const pass3 = new Item("Backstage passes to a TAFKAL80ETC concert", 0, 8)
      const pass4 = new Item("Backstage passes to a TAFKAL80ETC concert", 5, 49)
      const pass5 = new Item("Backstage passes to a TAFKAL80ETC concert", -2, 0)
      const gildedRose = new Shop([pass0, pass1, pass2, pass3, pass4, pass5]);
      items = gildedRose.updateQuality();
    });

    it("quality increases by 1 when sellIn >= 11", function() {
      expect(items[0].quality).toEqual(2);
    })

    it("quality increases by 2 when 6 <= sellIn < 11", function() {
      expect(items[1].quality).toEqual(7);
    })

    it("quality increases by 3 when 0 <= sellIn < 6", function() {
      expect(items[2].quality).toEqual(12);
    })

    it("quality drops to zero after the concert", function() {
      expect(items[3].quality).toEqual(0);
    })

    it("can't exceed quality of 50", function() {
      expect(items[4].quality).toEqual(50);
    })

    it("can't have negative quality", function() {
      expect(items[5].quality).toEqual(0);
    })
  })
});
