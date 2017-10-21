// These are fixes for conflicting recipes, as well as additional recipes to fix issues.

// To simplify the process, we'll make an array in which everything will be identified and assigned a recipe.
// Legend:  Output Quantity, Output ID, [recipe in 3 rows], mod

var ShapedRecipes = [
    // The wooden shield and wooden gear coincide.  This should fix it.
    [1, "battlegear2:shield.wood", [[null, "slabWood", null ], ["slabWood", "plankWood", "slabWood"], [null, "slabWood", null]], "battlegear2"], 
    // Why on earth does the saddle not have a recipe?!
    [1, "minecraft:saddle", [["materialLeather", "materialLeather", "materialLeather"], ["materialLeather", "materialLeather", "materialLeather" ], ["ingotIron", null, "ingotIron"]], null], 
    // Same for horse armor!
    [1, "minecraft:iron_horse_armor", [["ingotIron", "ingotIron", "ingotIron"], ["ingotIron", "ingotIron", "ingotIron"], ["ingotIron", null, "ingotIron"]], null], 
    [1, "minecraft:golden_horse_armor", [["ingotGold", "ingotGold", "ingotGold"], ["ingotGold", "ingotGold", "ingotGold"], ["ingotGold", null, "ingotGold"]], null], 
    [1, "minecraft:diamond_horse_armor", [["gemDiamond", "gemDiamond", "gemDiamond"], ["gemDiamond", "gemDiamond", "gemDiamond"], ["gemDiamond", null, "gemDiamond"]], null], 
    // The Vegan Option recipe for the wither skull makes the Wither monster too cheap.  This should fix that.
    [1, "minecraft:skull:1", [[bedrockDust, "slimeball", bedrockDust], ["slimeball", "VeganOption:mobHeadBlank", "slimeball"], [bedrockDust, "slimeball", bedrockDust]], "VeganOption"], 
    // Using nether materials for a railcraft blast furnace makes it too late-game.  This will bring its recipe to an earlier place in the game.
    [1, "Railcraft:machine.alpha:12", [["sand", brickblock, "sand" ], [brickblock, "minecraft:magma_cream", brickblock ], ["sand", brickblock, "sand" ]], "Railcraft"], 
    // The GardenStuff lattices interfere with other recipes.  Let's make some unique recipes for them.
    [1, "GardenStuff:lattice", [[null, "barsIron", null ], ["barsIron", "ingotIron", "barsIron" ], [null, "barsIron", null ]], "GardenStuff"], 
    [1, "GardenStuff:lattice_wood", [[null, "stickWood", null ], ["stickWood", "minecraft:planks", "stickWood" ], [null, "stickWood", null ]], "GardenStuff"], 
    [1, "GardenStuff:lattice_wood:1", [[null, "stickWood", null ], ["stickWood", "minecraft:planks:1", "stickWood" ], [null, "stickWood", null ]], "GardenStuff"], 
    [1, "GardenStuff:lattice_wood:2", [[null, "stickWood", null ], ["stickWood", "minecraft:planks:2", "stickWood" ], [null, "stickWood", null ]], "GardenStuff"], 
    [1, "GardenStuff:lattice_wood:3", [[null, "stickWood", null ], ["stickWood", "minecraft:planks:3", "stickWood" ], [null, "stickWood", null ]], "GardenStuff"], 
    [1, "GardenStuff:lattice_wood:4", [[null, "stickWood", null ], ["stickWood", "minecraft:planks:4", "stickWood" ], [null, "stickWood", null ]], "GardenStuff"], 
    [1, "GardenStuff:lattice_wood:5", [[null, "stickWood", null ], ["stickWood", "minecraft:planks:5", "stickWood" ], [null, "stickWood", null ]], "GardenStuff"], 
    // The Random Things fertilizer is too specific.  Let's oredict that sucker.
    [1, "RandomThings:fertilizedDirt", [["itemFertilizer", "materialRotten", "itemFertilizer" ], ["materialRotten", "minecraft:dirt", "materialRotten" ], ["itemFertilizer", "materialRotten", "itemFertilizer" ]], "RandomThings"],
    // The fossil obsidian spikes conflict with the obsidian boots recipe from Moh's Mining.  Let's fix that.
    [2, "fossil:obsidianSpikes", [["blockObsidian", null, "blockObsidian"], [null, null, null],  [null, null, null]], "fossil"]
];

var AdditionalShapedRecipes = [
    // Pam's mods have cooking utensils, but not earthenware.  Let's fix that, using flint for bladed utensils.
    [1, "harvestcraft:potItem", [["stickWood", "ingotBrick", "ingotBrick" ], [null, "ingotBrick", "ingotBrick" ], [null, null, null ]], "harvestcraft"], 
    [1, "harvestcraft:skilletItem", [["ingotBrick", null, null ], [null, "ingotBrick", null ], [null, null, "stickWood" ]], "harvestcraft"], 
    [1, "harvestcraft:saucepanItem", [["ingotBrick", null, null ], [null, "stickWood", null ], [null, null, null ]], "harvestcraft"], 
    [1, "harvestcraft:cuttingboardItem", [["itemFlint", null, null ], [null, "stickWood", null ], [null, null, "plankWood" ]], "harvestcraft"]
];


// Legend:  Output, [ingredient list], mod

var ShapelessRecipes = [
    /*// A wooden bucket of milk should make a bucket of fresh milk.
    // NOTE:  JMODs are undetectable at present, so this recipe won't check for Simple Wooden Bucket.
    [1, "harvestcraft:freshmilkItem", ["SimpleWoodenBucket:itemWoodenBucket_milk"], "harvestcraft"], */
    // There should be a recipe to "sift for flint."  I'm not fond of the "digging gravel" grind.
    [1, "minecraft:flint", ["minecraft:gravel"], null]
];


/// This is to make sure that both harvestcraft and OreFlowers are present for the recipe to work, since the recipe loop only checks for one.

if (isModLoaded("OreFlowers")) { 
    var ofShapelessRecipes = [
        [2, "harvestcraft:mustardseedItem", ["OreFlowers:ore_flowers2", "OreFlowers:ore_flowers2"], "harvestcraft"]
    ];

    ShapelessRecipes.push.apply(ShapelessRecipes, ofShapelessRecipes);  // Merge the two recipe lists.
}



/// Do not edit past this point. ////////////////////////////////////////////////////

// Code for making shapeless recipes.
(function(recipes){
    for (var m in recipes) {
        var recipe = recipes[m];
        if (recipe[3] == null || isModLoaded(recipe[3])) {
            var quantity="";
            if (recipe[0] > 1) quantity = "@"+recipe[0];
            removeRecipes(recipe[1]);
            addShapelessRecipe(recipe[1]+quantity, recipe[2]);
        }
    }
})(ShapelessRecipes);

// Code for making shaped recipes.
(function(recipes){
    for (var m in recipes) {
        var recipe = recipes[m];
        if (recipe[3] == null || isModLoaded(recipe[3])) {
            var quantity="";
            if (recipe[0] > 1) quantity = "@"+recipe[0];
            removeRecipes(recipe[1]);
            addShapedRecipe(recipe[1]+quantity, recipe[2]);
        }
    }
})(ShapedRecipes);

// Code for making shaped recipes.
(function(recipes){
    for (var m in recipes) {
        var recipe = recipes[m];
        if (recipe[3] == null || isModLoaded(recipe[3])) {
            var quantity="";
            if (recipe[0] > 1) quantity = "@"+recipe[0];
            addShapedRecipe(recipe[1]+quantity, recipe[2]);
        }
    }
})(AdditionalShapedRecipes);


// Vegan Option Plant Milk fix
// The Vegan Option's Plant Mil Recipe introduces an item dupe bug with RoCs Autocrafter, let's work around that
(function(){
	if(isModLoaded("VeganOption")){									// if Vegan Option is loaded
		removeRecipes("VeganOption:bucketPlantMilk"); 					// purge the old recipe
		addItem("CoreItem").set({
			name: "itemPlantMilk",
			stacksize: 64,
			tab : "SurvivalIndustry.general"
		});																// add our item replacement
		addOreDict("SurvivalIndustry:itemPlantMilk","listAllmilk"); 	// assign the new item to the proper ore dictionary
		addShapelessRecipe("SurvivalIndustry:itemPlantMilk", 
			["listAllwater","listAllsugar","sourcePlantMilk@2"]);		// and add a proper shapeless recipe

	}

})();



