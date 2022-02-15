const mongoose = require('mongoose')
require('dotenv').config()
const connectionString = process.env.MONGODB_URI || 'mongodb://localhost:27017/recipe-app'
console.log('this is the key: ', connectionString)
mongoose.connect(connectionString)
    .then(db => console.log(`Connected to database ${db.connections[0].name}`))
    .catch(err => console.log(`Error while creating connection ${err}`))

const Recipe = require('./models/Recipe')
const User = require('./models/User')


const recipes = [{

        "name": "Baked Shrimp Scampi",
        "creater": "620b9a8205b0329c4e5e7cb8",
        "source": "Ina Garten: Barefoot Contessa Back to Basics",
        "cooktime": 0,
        "servings": 6,
        "calories": 2565,
        "instructions": ["Preheat the oven to 425 degrees F.", "Defrost shrimp by putting in cold water.", "Drain and toss with wine, oil, salt, and pepper.", "Place in oven-safe dish and allow to sit at room temperature while you make the butter and garlic mixture.", "In a small bowl, mash the softened butter with the rest of the ingredients and some salt and pepper.", "Spread the butter mixture evenly over the shrimp.", "Bake for 10 to 12 minutes until hot and bubbly.", "If you like the top browned, place under a broiler for 1-3 minutes (keep an eye on it).", "Serve with lemon wedges and French bread.", "Note: if using fresh shrimp, arrange for presentation. Starting from the outer edge of a 14-inch oval gratin dish, arrange the shrimp in a single layer cut side down with the tails curling up and towards the center of the dish.", "Pour the remaining marinade over the shrimp."],
        "ingredients": [
            "2\/3 cup panko\r",
            "1\/4 teaspoon red pepper flakes\r",
            "1\/2 lemon, zested and juiced\r",
            "1 extra-large egg yolk\r",
            "1 teaspoon rosemary, minced\r",
            "3 tablespoon parsley, minced\r",
            "4 clove garlic, minced\r",
            "1\/4 cup shallots, minced\r",
            "8 tablespoon unsalted butter, softened at room temperature\r",
            "<hr>",
            "2 tablespoon dry white wine\r",
            "Freshly ground black pepper\r",
            "Kosher salt\r",
            "3 tablespoon olive oil\r",
            "2 pound frozen shrimp"
        ],
        "url": "/images/recipe-images/baked-shrimp.jpg",
        "tags": [
            "seafood",
            "shrimp",
            "main"
        ]
    },
    {

        "name": "Strawberries Romanov (La Madeleine copycat)",
        "creater": "620b9a8205b0329c4e5e7cb9",
        "source": "http:\/\/cookeatshare.com\/recipes\/la-madeleine-s-strawberries-romanov-318025",
        "cooktime": 0,
        "servings": 4,
        "comments": "",
        "calories": 0,
        "instructions": ["Wash strawberries and cut the tops off.", "Let strawberries drain.", "Mix together heavy whipping cream, powdered sugar, and the brandy.", "Beat with a mixer till this becomes thick.", "Place strawberries into glasses and spoon over the sauce."],
        "ingredients": [
            "2 tbsp powdered sugar\r",
            "1\/2 pt heavy whipping cream\r",
            "1 lb strawberries, (2 pints)\r",
            "4 tbsp brandy"
        ],
        "url": "/images/recipe-images/Strawberries-Romanoff-5.jpg",
        "tags": [
            "fruit",
            "dessert",
            "strawberries",
            "copycat",
            "untried"
        ]
    },
    {

        "name": "Broccoli and Mozzarella Pizza",
        "creater": "620b9a8205b0329c4e5e7cba",
        "source": "Blue Apron",
        "cooktime": 0,
        "servings": 2,
        "calories": 1483,
        "instructions": ["Remove the **dough** from the refrigerator to bring to room temperature.", "Preheat the oven to 475F.", "In a small pot, heat **tomato sauce** over medium-high heat.", "Reduce to a simmer and cook until slightly reduced and thickened.", "In a medium pan, heat 2 teaspoons of olive oil on medium-high until hot.", "Add the **chopped broccoli**, season with salt and pepper.", "Cook, stirring occasionally, 3-4 minutes or until slightly softened.", "Add the **chopped garlic** and **capers**.", "Cook, stirring frequently, 1-2 minutes or until softened. Turn off the heat.", "Lightly oil a sheet pan or sprinkle generously with semolina.", "Using your hands, gently stretch the **dough** to 1\/4-inch thickness.", "Carefully transfer to the sheet pan.", "Leaving a 1-inch border around the edges, spread enough of the **tomato sauce** onto the prepared dough to coat (you may have extra).", "Evenly top with the **cooked broccoli**, **sliced shallot**, **mozzarella cheese**, and **chopped peppers**.", "Season with salt and pepper. Bake, rotating the sheet pan half way through, 17-19 minutes or until the cheese is melted and the crust is golden brown.", "Remove from oven and let stand at least 2 minutes.", "While the pizza bakes, in a bowl, combine the **ricotta cheese**, a drizzle of olive oil, and as much of the chile paste as you'd like, depending on how spicy you'd like the dish to be.", "Season with salt and pepper.", "Transfer the **baked pizza** to a cutting board, evenly top with the **spicy ricotta**.", "Cut the pizza into equal-sized pieces.", "Enjoy!"],
        "ingredients": [
            "1\/2 lb pizza dough\r",
            "8 oz tomato sauce\r",
            "<hr>",
            "1\/2 lb broccoli, roughly chopped\r",
            "2 clove garlic, roughly chopped\r",
            "1 Tbsp capers\r",
            "1 shallot, thinly sliced\r",
            "4 oz mozzarella, shredded or torn into bite-sized pieces\r",
            "1 oz roasted red peppers, roughly chopped\r",
            "1\/2 cup part-skim ricotta\r",
            "1 1\/2 tsp calabrian chile paste"
        ],
        "url": "/images/recipe-images/broccoli-mozzarella-pizza.jpg",
        "tags": [
            "vegetarian",
            "pizza",
            "main"
        ]
    },
    {
        "name": "Warm shrimp and potato salad",
        "creater": "620b9a8205b0329c4e5e7cbb",
        "source": "Food Network Magazine Nov 2011",
        "cooktime": 1800,
        "servings": 4,
        "calories": 1720,
        "instructions": ["Preheat the oven to 400F.", "Toss the potatoes and bell pepper with olive oil, salt and pepper to taste in a shallow baking dish.", "Roast 15 minutes. Meanwhile, toss the shrimp with the garlic, oregano, paprika, olive oil, salt, and pepper to taste in a medium bowl.", "Add the shrimp to the baking dish. Roast, stirring once, until the shrimp are just cooked through and the potatoes are golden brown, 12 to 15 more minutes.", "Toss the romaine in a serving bowl with the lemon juice, olive oil, and salt and pepper to taste.", "Add the warm shrimp and vegetables and toss to combine.", "Top with the feta."],
        "ingredients": [
            "1 lb small red-skinned potatoes, halved\r",
            "1 red bell pepper, thinly sliced\r",
            "1 tbsp extra-virgin olive oil\r",
            "1\/2 tsp salt\r",
            "Freshly ground pepper\r",
            "<hr>\r",
            "1 lb medium shrimp, peeled, deveined and halved crosswise\r",
            "2 clove garlic, chopped\r",
            "1 tsp dried oregano\r",
            "1\/2 tsp paprika\r",
            "1 tbsp extra-virgin olive oil\r",
            "1\/4 tsp salt\r",
            "<hr>\r",
            "4 cup romaine lettuce, torn into bite-sized pieces\r",
            "1 1\/2 tbsp fresh lemon juice\r",
            "3 tbsp extra-virgin olive oil\r",
            "1\/2 cup crumbled feta cheese"
        ],
        "url": "/images/recipe-images/warm-shrimp-and-potato-salad.png",
        "tags": [
            "shrimp",
            "seafood",
            "salad",
            "main"
        ]
    },
    {
        "name": "Mushroom and lentil soup",
        "creater": "620b9a8205b0329c4e5e7cbc",
        "source": "Everyday Food Nov 2011",
        "cooktime": 0,
        "servings": 4,
        "calories": 1656,
        "instructions": ["In a large Dutch oven or other heavy pot, heat oil over medium.", "Add carrots, onion, and garlic and cook, stirring occasionally, until beginning to soften, about 6 minutes.", "Add mushrooms and season with salt and pepper.", "Cook until mushrooms are softened and golden brown at edges, about 8 minutes.", "Add thyme, lentils, soy sauce, lemon, and water; bring to a boil.", "Reduce heat, partially cover, and simmer until lentils are tender, about 25 minutes.", "Season to taste with salt and pepper.", "Serve soup topped with yogurt.", "Alternate recipe: use half rice and half lentils.", "Add the rice with the water; cook for 15 minutes on medium, before boiling.", "Add lentils, bring to a boil, and simmer for 25 minutes."],
        "ingredients": [
            "2 tablespoon extra-virgin olive oil\r",
            "5 small carrots, diced small\r",
            "1 medium red onion, diced small\r",
            "4 clove garlic, minced\r",
            "3\/4 pound cremini mushrooms, trimmed and coarsely chopped (4 cups)\r",
            "Coarse salt and ground pepper\r",
            "9 sprig thyme\r",
            "3\/4 pound brown lentils\r",
            "7 cup water\r",
            "2 tablespoon soy sauce\r",
            "1\/4 lemon, juiced\r",
            "2\/3 cup nonfat plain Greek yogurt, for serving"
        ],
        "url": "/images/recipe-images/mushroom-and-lentil-soup.jpg",
        "tags": [
            "soup",
            "lentils",
            "vegetarian",
            "main"
        ]
    },
    {
        "name": "Tomato-Basil Soup with Ricotta Dumplings",
        "creater": "620b9a8205b0329c4e5e7cbd",
        "source": "http:\/\/new.pamperedchef.com\/recipe\/95261",
        "cooktime": 840,
        "servings": 2,
        "calories": 500,
        "instructions": ["For soup, combine oil and garlic in 3-qt. Saucepan; cook and stir over medium heat 1-2 minutes or just until garlic begins to turn light golden brown.", "Immediately add tomatoes, broth and basil.", "Bring to a boil.", "Reduce heat; simmer 5-7 minutes, stirring occasionally.", "Meanwhile, for dumplings, combine ricotta cheese, Parmesan cheese, egg white, salt and black pepper in Small Bowl; mix well.", "Add flour; stir just until combined.", "Using a Small Scoop or spoons, scoop dumpling mixture directly into simmering soup.", "Cook until dumplings float to the surface, about 2 minutes.", "Remove from heat.", "Ladle soup into bowls; sprinkle with thinly sliced fresh basil."],
        "ingredients": [
            "1 tsp olive oil\r",
            "1 garlic clove, pressed\r",
            "1 15oz can crushed tomatoes, undrained\r",
            "1 1\/2 cup vegetable broth, or chicken broth\r",
            "1\/4 cup fresh basil, snipped\r",
            "<hr>\r",
            "1\/4 cup part-skim ricotta cheese\r",
            "2 tbsp grated fresh Parmesan cheese\r",
            "1 egg white, lightly beaten\r",
            "1\/2 tsp salt\r",
            "1\/4 tsp coarsely ground black pepper\r",
            "1\/3 cup all-purpose flour\r",
            "2 tbsp fresh basil leaves, chiffonade, for garnish"
        ],
        "url": "/images/recipe-images/tomato-basil-soup-with-dumplings.jpg",
        "tags": [
            "soup",
            "vegetarian",
            "main"
        ]
    },
    {

        "name": "Smoked salmon baked potatoes",
        "creater": "620b9a8205b0329c4e5e7cbe",
        "source": "Food Network Magazine 50 Stuffed Potatoes",
        "cooktime": 3600,
        "servings": 4,
        "calories": 1751,
        "instructions": ["Preheat oven to 400F.", "Poke potatoes all over with a fork.", "Place on oven rack and bake for 1 hour.", "Meanwhile mix remaining ingredients together.", "Split potatoes open and fluff with fork.", "Spoon salmon mixture onto potatoes and serve."],
        "ingredients": [
            "4 russet potatoes, scrubbed clean\r",
            "6 oz cream cheese, softened\r",
            "4 oz smoked salmon\r",
            "1 tbsp capers, rinsed and chopped\r",
            "1 tbsp red onion, minced"
        ],
        "url": "/images/recipe-images/smoked-salmon-baked-potatoes.jpg",
        "tags": [
            "potatoes",
            "salmon",
            "main"
        ]
    },
    {

        "name": "Mexican potato omelet",
        "creater": "620b9a8205b0329c4e5e7cbe",
        "source": "http:\/\/www.marthastewart.com\/316610\/mexican-potato-omelet",
        "cooktime": 1800,
        "servings": 4,
        "calories": 1176,
        "instructions": ["Heat 1 tablespoon oil in a 10-inch broiler-proof skillet over medium-low heat.", "Add potato, cover, and cook, stirring occasionally, until golden brown and tender, about 10 minutes.", "Stir in garlic and all but 1 tablespoon of the scallions; season with salt and pepper and cook 1 minute.", "In a large bowl, beat eggs until well combined.", "Add 1\/4 cup each tomato and cheese; stir to combine.", "Add remaining oil to pan, and pour egg mixture over the potatoes.", "Preheat broiler with rack 4 inches from the heat.", "Meanwhile, cook eggs on the stovetop, lifting the edges to allow uncooked egg to flow underneath, until the center is almost set, 8 to 10 minutes.", "Sprinkle remaining 1\/4 cup cheese over the top, then broil in the oven until set, about 2 minutes.", "In a small bowl, make a salsa by combining the remaining tomatoes, scallions, cilantro, and lime juice.", "Run a metal spatula around the edges of the pan and slide the omelette onto a platter.", "Serve cut into wedges with salsa."],
        "ingredients": [
            "2 tablespoon olive oil\r",
            "1 red-skinned potato (6 ounces), well scrubbed, halved, and thinly sliced\r",
            "3 garlic cloves, finely chopped\r",
            "2 scallions, thinly sliced\r",
            "Coarse salt and ground pepper\r",
            "8 large eggs\r",
            "1 1\/4 cup plum tomatoes, coarsely chopped (about 2 tomatoes)\r",
            "2 oz pepper jack cheese, shredded\r",
            "2 tablespoon chopped cilantro\r",
            "1\/2 teaspoon fresh lime juice"
        ],
        "url": "/images/recipe-images/mexican-potato-omelet.jpg",
        "tags": [
            "vegetarian",
            "main",
            "brunch",
            "untried"
        ]
    },

    {

        "name": "Mesquite chocolate chip cookies",
        "creater": "620b9a8205b0329c4e5e7cbf",
        "source": "Super Natural Cooking by Heidi Swanson",
        "cooktime": 600,
        "servings": 48,
        "calories": 0,
        "instructions": ["Preheat the oven to 375F", "position the racks in the upper half of the oven, and line 2 baking sheets with parchment paper.", "Whisk together the flours, baking soda, baking powder, and salt in a bowl. Set aside.", "In a large bowl or stand mixer, beat the butter until light and fluffy, then beat in the sugar until of a consistency like thick frosting.", "Beat in the eggs one at a time, incorporating each fully before adding the next and scraping down the sides of the bowl a few times.", "Stir in the vanilla until evenly incorporated.", "Add the dry ingredients in 3 increments, stirring between each addition.", "At this point, you should have a moist, uniformly brown dough.", "Stir in the oats and chocolate chips by hand, mixing only until evenly distributed.", "Rachel's instructions, makes about 4 dozen:\r\nUse a tablespoon cookie scoop, follow directions as below. \r\nFor the toaster oven, put on 350F with convection and bake for 10 minutes.", "Original instructions, makes 2-3 dozen:\r\nDrop 2 tablespoons of dough for each cookie onto the prepared baking sheets 2 inches apart and bake for about 10 minutes, until golden on both top and bottom. Don't over-bake these; if anything, under-bake them. Cool on wire racks."],
        "ingredients": [
            "2 1\/2 cup whole-wheat pastry flour (or all-purpose flour)\r",
            "1 cup mesquite flour, sifted if clumpy\r",
            "1 tsp baking soda\r",
            "1 tsp baking powder\r",
            "3\/4 tsp fine sea salt\r",
            "1 cup unsalted butter, at room temperature\r",
            "2 cup granulated sugar\r",
            "3 large eggs\r",
            "1 tbsp vanilla extract\r",
            "2 cup rolled oats\r",
            "2 cup semisweet chocolate chips"
        ],
        "url": "/images/recipe-images/Chocolate-Chip-Cookies.jpg",
        "tags": [
            "dessert",
            "cookies"
        ]
    },
    {

        "name": "The best angel food cake",
        "creater": "620b9a8205b0329c4e5e7cbc",
        "source": "Cook's Illustrated",
        "cooktime": 3600,
        "servings": 12,
        "comments": "",
        "calories": 1800,
        "instructions": ["Adjust an oven rack to the lower-middle position and heat oven to 325 degrees.", "Have ready an ungreased large tube pan (9-inch diameter, 16-cup capacity), preferably with a removable bottom. If the pan bottom is not removable, line it with parchment or wax paper.", "In a small bowl, whisk the flour with 3\/4 cup sugar. Place remaining 3\/4 cup sugar in another small bowl next to the mixer.", "In the bowl of a standing mixer, or with a handheld mixer, beat egg whites at low speed until just broken up and beginning to froth. Add cream of tartar and salt and beat at medium speed until whites form very soft, billowy mounds. With the mixer still at medium speed, beat in 3\/4 cup sugar, 1 tablespoon at a time, until all sugar is added and whites are shiny and form soft peaks. Add vanilla, lemon juice, and almond extract and beat until just blended.", "Place flour-sugar mixture in a sifter set over waxed paper. Sift flour-sugar mixture over egg whites about 3 tablespoons at a time, and gently fold it in, using a large rubber spatula. Sift any flour-sugar mixture that falls onto the paper back into the bowl with the whites.", "Gently scrape batter into pan, smooth the top, and give pan a couple of raps on the counter to release any large air bubbles.", "Bake until the cake is golden brown and the top springs back when pressed firmly, 50 to 60 minutes.", "If cake pan has prongs around the rim for elevating the cake, invert pan onto them. If not, invert pan over the neck of a bottle or funnel so that air can circulate all around it. Let the cake cool completely, 2 to 3 hours.", "To unmold, run a knife around edges, being careful not to separate the golden crust from the cake. Slide cake out of pan and cut the same way around removable bottom to release, or peel off parchment or wax paper, if used.", "Place the cake, bottom-side up, on a platter. Cut slices by sawing gently with a serrated knife. Serve the cake the day it is made.", "Read more: http:\/\/www.livestrong.com\/recipes\/the-best-angel-food-cake-cooks-illustrated\/#ixzz4PHieOlr4"],
        "ingredients": [
            "1 1\/2 cup egg whites (10-12 large), room temperature\r",
            "1 1\/2 cup superfine sugar, divided\r",
            "1 cup sifted cake flour\r",
            "1 tsp cream of tartar\r",
            "1\/4 tsp salt\r",
            "2 tsp vanilla extract or vanilla paste\r",
            "1 1\/2 tsp lemon juice\r",
            "1\/2 tsp almond extract"
        ],
        "url": "/images/recipe-images/Angel-Food-Cake.jpg",
        "tags": [
            "dessert",
            "untried"
        ]
    },
    {

        "name": "Black bean and cheese tacos",
        "creater": "620b9a8205b0329c4e5e7cba",
        "source": "Everyday Food June 2011",
        "cooktime": 420,
        "servings": 2,
        "comments": "",
        "calories": 1512,
        "instructions": ["In a small pot, heat oil over medium.", "Add onion and garlic and cook until onion is soft and garlic is fragrant, 3 minutes.", "Add cumin and cook until fragrant, 1 minute.", "Add beans, water, salt, and pepper, and simmer until beans are heated through, 3 minutes.", "Mash in pan with wooden spoon.", "Season to taste with salt and pepper if needed.", "Serve with tortillas, cheese, avocado, lettuce, and jalapenos."],
        "ingredients": [
            "1 tsp extra-virgin olive oil\r",
            "1\/2 small yellow onion, diced small\r",
            "2 garlic cloves, roughly chopped\r",
            "1\/2 tsp ground cumin\r",
            "1 can black beans, rinsed and drained\r",
            "1\/2 cup water\r",
            "coarse salt and ground pepper\r",
            "<hr>\r",
            "4 flour tortillas, warmed or lightly toasted\r",
            "1 cup Monterey Jack cheese, shredded (1 cup \u2248 3 oz)\r",
            "1 avocado, pitted, peeled and thinly sliced\r",
            "1 cup packed shredded romaine lettuce"
        ],
        "url": "/images/recipe-images/tacos.jpg",
        "tags": [
            "vegetarian",
            "mexican",
            "main"
        ]
    },
    {

        "name": "Chocolate dipped coconut macaroons",
        "creater": "620b9a8205b0329c4e5e7cb8",
        "source": "http:\/\/www.kingarthurflour.com\/recipes\/chocolate-dipped-coconut-macaroons-recipe",
        "cooktime": 0,
        "servings": 1,
        "calories": 0,
        "instructions": ["Preheat the oven to 350\u00b0F. Lightly grease a baking sheet, or line with parchment.", "In a medium bowl, mix together the coconut, coconut cream, salt, and coconut flavor, stirring till thoroughly combined.", "Add the coconut milk powder, stirring to combine.", "Drop the sticky mixture in ping pong-sized balls (about 1 1\/2\") onto the prepared baking sheets. It helps to use a tablespoon cookie scoop or small ice cream scoop here. For best results, pack the coconut mixture into the scoop; each ball should weigh about 1 ounce. You can space the balls fairly close together on the baking sheet; they only need about 3\/4\" to 1\" between them.", "Bake the macaroons for about 10 minutes; they won't brown. You may see the merest hint of brown on top.", "Remove from the oven, and cool completely on the baking sheet.", "To make the coating, heat the chocolate chips, butter, and corn syrup until the chips are very soft. A microwave oven works well, as does a saucepan set over very low heat.", "Dip half of each cooled macaroon into the chocolate. Set the macaroons back on the baking sheet, and allow the chocolate to set completely before serving. To store, place in one layer in a closed container. They'll keep for 2 or 3 days, but will gradually become less moist as they sit.", "tips from our bakers\r\nCoconut cream, sweetened condensed coconut milk, is the coconut equivalent of sweetened condensed milk. Substitute sweetened condensed milk, if desired.\r\nCoconut milk powder adds flavor and helps the macaroons hold their nice, smooth shape. Leave it out if you like."],
        "ingredients": [
            "5 cup shredded unsweetened coconut (generous)\r",
            "1 1\/2 cup sweetened coconut cream; one 16-ounce can\r",
            "1\/4 teaspoon salt\r",
            "1\/2 teaspoon coconut flavor, optional\r",
            "1\/3 cup coconut milk powder, optional\r",
            "<hr>\r",
            "1 1\/2 cup semisweet chocolate chips\r",
            "2 1\/2 tablespoon butter or margarine\r",
            "2 tablespoon light corn syrup or honey"
        ],
        "url": "/images/recipe-images/Chocolate-Dipped-Macaroons-3.jpg",
        "tags": [
            "cookies",
            "dessert"
        ]
    },
    {

        "name": "Morning pizza",
        "creater": "620b9a8205b0329c4e5e7cb8",
        "source": "Real Simple",
        "cooktime": 120,
        "servings": 1,
        "calories": 0,
        "instructions": ["Toast bread to desired doneness.", "Spread ricotta on bread, top with herbs and tomato, and drizzle with oil.", "Season with salt and pepper to taste.", "Broil for 3 minutes, then top with parmesan and serve."],
        "ingredients": [
            "1 slice crusty bread\r",
            "3 tbsp part-skim ricotta\r",
            "1 tsp italian seasoning\r",
            "2 slices tomato (or halved grape tomatoes)\r",
            "1 tsp olive oil\r",
            "1 pinch kosher salt\r",
            "black pepper, to taste\r",
            "1\/2 tsp parmesan"
        ],
        "url": "/images/recipe-images/morning_pizza2.jpeg",
        "tags": [
            "breakfast"
        ]
    },
    {

        "name": "Mini hamburger bento (Select a mini burger recipe too)",
        "creater": "620b9a8205b0329c4e5e7cbb",
        "source": "The Just Bento Cookbook by Itoh",
        "cooktime": 0,
        "servings": 1,
        "calories": 348,
        "instructions": ["Make or reheat mini burgers, pack into bento box to cool.", "For carrots: cut out decorative flowers with a small bento cutter. Boil in salted water for 5 minutes or until the carrot slices are tender. Let cool before adding to the bento box.", "For cheese (optional): cut out decorative flowers from sliced cheese. Alternatively, cut into small cubes.", "For red onion salad: sprinkle the onion with a pinch of salt and massage the salt well into the onion with your hands. Squeeze the onion to expel as much moisture as possible. In a bowl, mix the onion, parsley, vinegar, and sugar. Season with pepper to taste. Pack into a cupcake liner or bento divider cup.", "For snow peas: Blanch in boiling water for a few minutes until crisp-tender. Drain and cool rapidly under running water. Drain well before adding to bento box.", "For rice: Pack rice into the bento box and sprinkle with the sesame salt."],
        "ingredients": [
            "1 serving mini burger recipe\r",
            "1 2-inch length of carrot, sliced into 1\/4 inch rounds\r",
            "1\/2 oz cheese\r",
            "<hr>\r",
            "1\/2 medium red onion, very thinly sliced\r",
            "salt\r",
            "1\/4 cup parsley, loosely packed, finely chopped\r",
            "black pepper\r",
            "1 tsp rice vinegar\r",
            "1 pinch sugar\r",
            "<hr>\r",
            "1\/4 cup snow peas\r",
            "<hr>\r",
            "1 cup cooked short-grain white rice\r",
            "sesame salt, for sprinkling"
        ],
        "url": "/images/recipe-images/mini_hamburger.jpg",
        "tags": [
            "bento",
            "main"
        ]
    }

]

const users = [{
        name: "Natalie Millie",
        username: "Natalie98",
        password: "helloNatalie123",
        email: "NatalieMillie@gmail.com",
        gender: "Female",
        age: 23,
        city: "Berlin",
        imageUrl: "/images/user-images/NatalieMillie.jpg",
        introduction: "Hi I'm Natalie, I live in Berlin. I really like cooking and love sharing my recipes with people!",
    },
    {
        name: "Adam Johns",
        username: "Adam_Johns",
        password: "cooking_Adam",
        email: "lyla2004@gmail.com",
        gender: "Male",
        age: 35,
        city: "Berlin",
        imageUrl: "/images/user-images/AdamJohns.jpg",
        introduction: "Hello everyone, I'm Adam! I spend most of my times cooking and I’m always curious about new recipes."
    },
    {
        name: "John J King",
        username: "John.King",
        password: "John123!abc",
        email: "halle2004 @hotmail.com",
        gender: "Male",
        age: 50,
        city: "Berlin",
        imageUrl: "/images/user-images/JohnJKing.jpg",
        introduction: "I'm John, I recently started cooking and I enjoy a lot.So I'm here to look for new recipes and share mine!"
    },
    {
        name: "Ellie Summers",
        username: "ellie_sumers3",
        password: "hello365",
        email: "ellie @gmail.com",
        gender: "Female",
        age: 27,
        city: "Berlin",
        imageUrl: "/images/user-images/Ellie Summers.jpg",
        introduction: "Hi! I'm an enthusiastic chef who loves sharing her recipe ideas"
    },
    {
        name: "Linda Nolan",
        username: "lindaCooks",
        password: "pass465",
        email: "lindaaa @gmail.com",
        gender: "Female",
        age: 23,
        city: "Berlin",
        imageUrl: "/images/user-images/Linda Nolan.jpg",
        introduction: "A web developer who experiments with her cooking on the weekends"
    },
    {
        name: "Cameron Jace",
        username: "cam4u",
        password: "ignite482",
        email: "camjason @gmail.com",
        gender: "Male",
        age: 36,
        city: "Berlin",
        imageUrl: "/images/user-images/Cameron Jace.jpg",
        introduction: "A restaurant owner who is a passionate cook as well"
    },
    {
        name: "Laura M Maysonet",
        username: "laura_84",
        password: "aaa1984",
        email: "lauram1984 @hotmail.com",
        gender: "Female",
        age: 30,
        imageUrl: "/images/user-images/Laura-Maysonet.jpg",
        city: "Berlin",
        introduction: "I like everything related to foods.I'm a food lover."
    },
    {
        name: "Daniel A Dishon",
        username: "daniel_trainer",
        password: "99zzzz",
        email: "danield@gmail.com",
        gender: "Female",
        age: 25,
        imageUrl: "/images/user-images/Daniel-Dishon.jpg",
        city: "Berlin",
        introduction: "I'm a personal trainer in Berlin.I like creating healthy food recipes for my customers and share with others people."
    },
    {
        name: "Judith C Kelly",
        username: "Judith_Berlin",
        password: "mydailyrecipe",
        email: "judith @gmail.com",
        gender: "Female",
        age: 45,
        imageUrl: "/images/user-images/Judith-Kelly.jpg",
        city: "Berlin",
        introduction: "I'm a housewife with 3 kids at home.I like cooking and preparing delicious foods for my family, especially baking cakes."
    }

]

Recipe.insertMany(recipes)
    .then(recipes => {
        console.log(`Success - added ${recipes.length} recipes to the db`)
        mongoose.connection.close()
    })
    .catch(err => console.log(err))



User.insertMany(users)
    .then(users => {
        console.log(`Success - added ${users.length} users to the db`)
        mongoose.connection.close()
    })
    .catch(err => console.log(err))

