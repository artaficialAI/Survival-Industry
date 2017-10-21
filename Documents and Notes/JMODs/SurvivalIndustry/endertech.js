// #### Ender Technology Gating

// The key to ender-tech gating, the Cherenkov Singularity.
addItem("CoreItem").set({
    name : "itemCherenkovSingularity", 
    stacksize: 1, 
    tab : "SurvivalIndustry.general"
});

var ShapelessRecipes = [
    [1, cherenkov, [plutonium, "minecraft:ender_pearl"], "ReactorCraft"]
];

var ShapedRecipes = [
    // Ender Storage
    [1, "EnderStorage:enderChest", 
        [["itemBlazeRod", "materialBedding", "itemBlazeRod" ], ["plankWood", "chestWood", "plankWood" ], ["itemBlazeRod", cherenkov, "itemBlazeRod" ]], "EnderStorage"], 
    [1, "EnderStorage:enderChest:4096", 
        [["itemBlazeRod", "materialBedding", "itemBlazeRod" ], ["plankWood", "minecraft:cauldron", "plankWood" ], ["itemBlazeRod", cherenkov, "itemBlazeRod" ]], "EnderStorage"], 
    [1, "EnderStorage:enderPouch", 
        [["itemBlazePowder", "materialLeather", "itemBlazePowder" ], ["materialLeather", cherenkov, "materialLeather" ], ["itemBlazePowder", "materialBedding", "itemBlazePowder" ]], "EnderStorage"], 
        
    // Enhanced Portals 3
    [1, "enhancedportals:frame", 
        [[bedrockDust, "ingotIron", bedrockDust], ["ingotIron", "blockQuartz", "ingotIron"], [bedrockDust, "ingotIron", bedrockDust]], "enhancedportals"], 
        
    // Extra Utilities' "Ender Infused Obsidian, " needed for much of ExU's ender machinery
    [1, "ExtraUtilities:decorativeBlock1:1", 
        [[null, "blockObsidian", null ], ["blockObsidian", cherenkov, "blockObsidian" ], [null, "blockObsidian", null ]], "ExtraUtilities"], 
        
    // Ender Utilities
    [3, "enderutilities:enderpart:20",
        [["stickWood", "stickWood", "stickWood"], [cherenkov, cherenkov, cherenkov], ["stickWood", "stickWood", "stickWood"]], "enderutilities"],
    [3, "enderutilities:enderpart:21",
        [["minecraft:string", "minecraft:string", "minecraft:string"], ["materialLeather", cherenkov, "materialLeather"], ["minecraft:string", "minecraft:string", "minecraft:string"]], "enderutilities"],
    [1, "enderutilities:enderpearlreusable",
        [["nuggetGold", "pearlEnder", "nuggetGold"], [cherenkov, "blockRedstone", cherenkov ], ["nuggetGold", "pearlEnder", "nuggetGold"]], "enderutilities"],
    [4, "enderutilities:enderarrow",
        [[null, "nuggetGold", cherenkov ],  [null, "minecraft:arrow", "nuggetGold" ],  ["minecraft:arrow", null, null ]], "enderutilities"],
    [3, "enderutilities:enderpart",
        [["ingotIron", "ingotIron", "ingotIron" ], [cherenkov, cherenkov, cherenkov ],  ["ingotIron", "ingotIron", "ingotIron" ]], "enderutilities"],
    [3, "enderutilities:enderpart:1",
        [["ingotGold", "ingotGold", "ingotGold" ], [cherenkov, cherenkov, cherenkov ],  ["ingotIron", "ingotIron", "ingotIron" ]], "enderutilities"],
    [3, "enderutilities:enderpart:2",
        [["ingotIron", cherenkov, "ingotIron" ], ["ingotGold", "gemDiamond", "ingotGold" ], ["blockObsidian", cherenkov, "blockObsidian" ]], "enderutilities"],
        
    // The end portal stone, specifically to allow players to make their own end portals.
    [1, "minecraft:end_portal_frame", 
        [[cherenkov, cherenkov, cherenkov], [cherenkov, "mod_Invasion:riftFlux", cherenkov], [cherenkov, cherenkov, cherenkov]], null], 
];
  
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
