describe('Gilded Rose', function() {
  describe('All items except Sulfurus', function() {
    const GUANCIALE = new Item("Guanciale", 1, 1) 
    const AGED_BRIE = new Item("Aged Brie", 2, 1) 
    const BACKSTAGE_PASS = new Item("Backstage passes to a TAFKAL80ETC concert", 3, 1) 
    const CONJURED = new Item("Conjured Mana Cake", 4, 1) 
    const GILDED_ROSE = new Shop( [GUANCIALE, AGED_BRIE, BACKSTAGE_PASS, CONJURED]);
    const ITEMS = GILDED_ROSE.updateQuality();

    it("have sellIn decrease by one after update", function() {
      expect(ITEMS[0].sellIn).toEqual(0);
      expect(ITEMS[1].sellIn).toEqual(1);
      expect(ITEMS[2].sellIn).toEqual(2);
      expect(ITEMS[3].sellIn).toEqual(3);
    });
  })

  describe("Conjured item", function() {
    const CONJURED_1 = new Item("Conjured Mana Cake", 2, 7);
    const CONJURED_2 = new Item("Conjured Mana Bread", 0, 6);
    const CONJURED_3 = new Item("Conjured Mana Donut", -1, 1);
    const GILDED_ROSE = new Shop([CONJURED_1, CONJURED_2, CONJURED_3]);
    const ITEMS = GILDED_ROSE.updateQuality();

  it("reduces in quality by two each update", function() {
    expect(ITEMS[0].quality).toEqual(5);
  });

  it("reduces in quality by four if at or passed sell by date", function() {
    expect(ITEMS[1].quality).toEqual(2);
  });

  it("can't have negative quality", function() {
    expect(ITEMS[2].quality).toBeGreaterThanOrEqual(0);
  });
});

  describe("Other item", function() {
      const MANCHEGO = new Item("manchego", 2, 7);
      const ARTICHOKES = new Item("artichoke", 0, 6);
      const ANCHOVIES = new Item("anchovies", -1, 0);
      const GILDED_ROSE = new Shop([MANCHEGO, ARTICHOKES, ANCHOVIES]);
      const ITEMS = GILDED_ROSE.updateQuality();

    it("reduces in quality by one each update", function() {
      expect(ITEMS[0].quality).toEqual(6);
    });

    it("reduces in quality by two if at or passed sell by date", function() {
      expect(ITEMS[1].quality).toEqual(4);
    });

    it("can't have negative quality", function() {
      expect(ITEMS[2].quality).toBeGreaterThanOrEqual(0);
    });
  });

  describe("Aged Brie", function(){
    it("increases in quality by one each update", function() {
      const GILDED_ROSE = new Shop([ new Item("Aged Brie", 2, 5)]);
      const ITEMS = GILDED_ROSE.updateQuality();
      expect(ITEMS[0].quality).toEqual(6);
    })

    it("increases in quality by two each update at or after sell by date", function() {
      const GILDED_ROSE = new Shop([ new Item("Aged Brie", 0, 5)]);
      const ITEMS = GILDED_ROSE.updateQuality();
      expect(ITEMS[0].quality).toEqual(7);
    })

    it("can't exceed quality of 50", function() {
      const GILDED_ROSE = new Shop([ new Item("Aged Brie", 4, 50)]);
      const ITEMS = GILDED_ROSE.updateQuality();
      expect(ITEMS[0].quality).toBeLessThanOrEqual(50)
    })
  })

  describe("Sulfuras, Hand of Ragnaros", function(){
    it("doesn't change in quality", function() {
      const GILDED_ROSE = new Shop([ new Item("Sulfuras, Hand of Ragnaros", 0, 80)]);
      const ITEMS = GILDED_ROSE.updateQuality();
      expect(ITEMS[0].quality).toEqual(80);
    })

    it("never has to be sold (sellIn doesn't change)", function() {
      const GILDED_ROSE = new Shop([ new Item("Sulfuras, Hand of Ragnaros", 0, 80)]);
      const ITEMS = GILDED_ROSE.updateQuality();
      expect(ITEMS[0].sellIn).toEqual(0);
    })
  })

  describe("Backstage passes to a TAFKAL80ETC concert", function(){
    var items;

    beforeAll(function() {
      const PASS0 = new Item("Backstage passes to a TAFKAL80ETC concert", 11, 1)
      const PASS1 = new Item("Backstage passes to a TAFKAL80ETC concert", 6, 5)
      const PASS2 = new Item("Backstage passes to a TAFKAL80ETC concert", 5, 9)
      const PASS3 = new Item("Backstage passes to a TAFKAL80ETC concert", 0, 8)
      const PASS4 = new Item("Backstage passes to a TAFKAL80ETC concert", 5, 49)
      const PASS5 = new Item("Backstage passes to a TAFKAL80ETC concert", -2, 0)
      const GILDED_ROSE = new Shop([PASS0, PASS1, PASS2, PASS3, PASS4, PASS5]);
      ITEMS = GILDED_ROSE.updateQuality();
    });

    it("quality increases by 1 when sellIn >= 11", function() {
      expect(ITEMS[0].quality).toEqual(2);
    })

    it("quality increases by 2 when 6 <= sellIn < 11", function() {
      expect(ITEMS[1].quality).toEqual(7);
    })

    it("quality increases by 3 when 0 <= sellIn < 6", function() {
      expect(ITEMS[2].quality).toEqual(12);
    })

    it("quality drops to zero after the concert", function() {
      expect(ITEMS[3].quality).toEqual(0);
    })

    it("can't exceed quality of 50", function() {
      expect(ITEMS[4].quality).toEqual(50);
    })

    it("can't have negative quality", function() {
      expect(ITEMS[5].quality).toEqual(0);
    })
  })
});
