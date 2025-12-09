import React, { useState } from 'react';

const PROMPT_DATA = {
    restaurant: {
        name: '🍽️ Restaurant Prompts (Focus: Food & Ambiance)',
        prompts: [
            {
                goal: 'Hero Dish (Close-up)',
                template: 'Professional food photography of a gourmet [Dish Name] plated on a [Plate Type], shot from a 45-degree overhead angle, garnished with fresh [Garnish], surrounded by complementary ingredients, soft natural window light from the left creating gentle shadows, shallow depth of field (f/2.8), ultra-sharp focus on the main dish, warm color temperature, restaurant-quality presentation, 4K resolution.',
                details: 'Examples: Dish Name (Seared Salmon with Lemon Butter, Truffle Mushroom Risotto, Wagyu Beef Steak), Plate Type (rustic ceramic, white porcelain, black slate), Garnish (microgreens, edible flowers, fresh herbs, lemon zest).'
            },
            {
                goal: 'Signature Cocktail',
                template: 'Photorealistic image of a vibrant [Color] cocktail in a [Glass Type], featuring [Special Effect], positioned on a polished [Surface Material] bar counter, dramatic moody lighting with [Light Color] accent lights in the background, condensation droplets on the glass, professional beverage photography, bokeh effect, cinematic composition, high contrast, 8K quality.',
                details: 'Examples: Color (ruby red, emerald green, golden amber), Glass Type (coupe glass, highball, martini glass with gold rim), Special Effect (dry ice smoke, flaming garnish, layered colors, edible glitter), Surface (dark mahogany, marble, copper), Light Color (neon blue, warm amber, purple).'
            },
            {
                goal: 'Restaurant Atmosphere',
                template: 'Wide-angle architectural photograph of a [Style] restaurant interior during [Time Period], featuring [Key Design Element], warm ambient lighting from [Light Source], diverse group of happy diners engaged in conversation, professional wait staff in the background, depth and layers showing the full space, inviting atmosphere, professional interior photography, HDR, natural color grading.',
                details: 'Examples: Style (rustic Italian trattoria, modern minimalist, vintage French bistro, industrial chic), Time Period (busy dinner service, intimate late evening, Sunday brunch), Key Design Element (exposed brick walls, floor-to-ceiling windows, open kitchen, vintage chandeliers), Light Source (Edison bulb pendants, candles, natural daylight, recessed spotlights).'
            },
            {
                goal: 'Chef in Action',
                template: 'Dynamic action photograph of a professional chef [Action] in a commercial kitchen, wearing pristine white chef coat, intense concentration on face, [Photography Style], dramatic side lighting creating strong shadows, stainless steel kitchen equipment in background, steam and motion blur adding energy, professional culinary photography, high shutter speed freezing the action, shallow depth of field focusing on the chef.',
                details: 'Examples: Action (flambéing a pan with visible flames, precisely plating a dish with tweezers, tossing pasta in a sauté pan, hand-pulling fresh mozzarella, slicing sashimi with a Japanese knife), Photography Style (black and white high contrast, color with warm tones, documentary style, editorial fashion-inspired).'
            },
            {
                goal: 'Wine Pairing Display',
                template: 'Elegant still life photograph featuring a [Wine Type] in a [Glass Style], positioned next to [Paired Dish], on a [Table Setting], [Lighting Mood] creating reflections on the wine glass, [Background Elements] softly blurred, professional food and beverage photography, rich colors, sophisticated composition, magazine-quality styling, sharp focus on wine label and food.',
                details: 'Examples: Wine Type (full-bodied red wine, crisp white wine, sparkling champagne, rosé), Glass Style (Bordeaux glass, white wine glass, champagne flute, stemless modern glass), Paired Dish (cheese and charcuterie board, grilled steak, seafood platter, chocolate dessert), Table Setting (dark wooden table with linen napkin, white marble surface, rustic farmhouse table, elegant fine dining setup), Lighting Mood (warm candlelight, soft natural window light, dramatic side lighting), Background (restaurant interior, vineyard landscape, wine cellar, minimalist studio).'
            },
            {
                goal: 'Dessert Showcase',
                template: 'Decadent close-up photograph of a [Dessert Type] with [Texture Details] visible, garnished with [Topping/Garnish], plated on [Plate Description], [Sauce/Accompaniment] artfully drizzled, [Lighting Type] highlighting the textures and colors, [Additional Elements] in composition, professional pastry photography, ultra-sharp macro detail, appetizing and luxurious presentation, 4K resolution.',
                details: 'Examples: Dessert Type (molten chocolate lava cake, crème brûlée with caramelized top, layered tiramisu, fruit tart, cheesecake slice, chocolate mousse), Texture Details (gooey center flowing out, crispy caramelized sugar, smooth creamy layers, flaky pastry crust), Topping/Garnish (fresh berries, mint leaves, gold leaf, powdered sugar, chocolate shavings, edible flowers), Plate Description (white porcelain with gold rim, black slate, rustic ceramic, modern square plate), Sauce/Accompaniment (raspberry coulis, caramel sauce, vanilla bean anglaise, chocolate ganache), Lighting (soft overhead with shadows, dramatic side light, bright natural light), Additional Elements (coffee cup nearby, scattered ingredients, elegant fork, decorative elements).'
            }
        ]
    },
    bakery: {
        name: '🥐 Bakery Prompts (Focus: Texture & Freshness)',
        prompts: [
            {
                goal: 'Artisan Bread Close-up',
                template: 'Extreme close-up macro photography of freshly baked [Bread Type], showcasing the detailed texture of the [Crust Characteristic], interior crumb structure visible in a torn section, placed on a [Surface], dusted with flour, steam gently rising, golden hour natural lighting from a nearby window, ultra-sharp focus on texture details, warm color palette, professional food photography, shallow depth of field, 8K resolution.',
                details: 'Examples: Bread Type (sourdough boule, rustic baguette, seeded multigrain loaf, chocolate babka), Crust Characteristic (perfectly scored crust with ear, golden-brown crackling surface, flour-dusted artisan scoring), Surface (weathered wooden cutting board, linen cloth, marble countertop, vintage baking sheet).'
            },
            {
                goal: 'Seasonal Pastry Display',
                template: 'Carefully styled flat lay composition featuring [Seasonal Item] as the hero, accompanied by [Beverage] in a [Cup Type], arranged with seasonal props including [Props], shot from directly overhead, soft diffused natural lighting, cohesive color palette of [Colors], Instagram-worthy styling, all elements perfectly placed, professional food styling, sharp focus throughout, warm and inviting mood.',
                details: 'Examples: Seasonal Item (pumpkin spice croissant with autumn spices, strawberry tart with fresh berries, gingerbread cookies with royal icing, lemon poppy seed muffin), Beverage (cappuccino with latte art, herbal tea, hot chocolate), Cup Type (vintage ceramic mug, clear glass cup, rustic pottery), Props (cinnamon sticks and pine cones, fresh flowers and ribbon, holiday ornaments, citrus slices), Colors (warm oranges and browns, pastels and whites, deep reds and greens).'
            },
            {
                goal: 'Bakery Display Case',
                template: 'Bright, inviting photograph of a fully stocked bakery display case, three tiers of [Display Content], pristine glass reflecting soft overhead lighting, handwritten chalkboard menu visible in the background listing items and prices, [Counter Style] counter in foreground, morning light streaming through windows, professional commercial photography, everything in sharp focus, clean and appetizing presentation, welcoming atmosphere.',
                details: 'Examples: Display Content (colorful French macarons arranged by color, assorted croissants and Danish pastries, decorated celebration cakes and cupcakes, artisan bread loaves), Counter Style (vintage wooden, modern white marble, industrial metal and glass, rustic farmhouse).'
            },
            {
                goal: 'Branded Bakery Packaging',
                template: 'Professional product mockup of [Packaging Type] featuring a [Logo Style] bakery logo, filled with [Baked Goods], tied with [Closure Detail], photographed on a [Background], studio lighting with soft shadows, minimalist composition, focus on branding and packaging design, clean aesthetic, commercial product photography, perfect for marketing materials.',
                details: 'Examples: Packaging Type (kraft paper bakery box, white pastry bag with window, branded coffee cup sleeve, wax paper wrap), Logo Style (hand-drawn vintage script, modern minimalist geometric, watercolor artistic, classic serif typography), Baked Goods (assorted cookies visible through window, fresh croissants, cupcakes), Closure Detail (natural jute twine, branded sticker seal, ribbon in brand colors), Background (soft pastel solid color, rustic wooden table, marble surface, neutral linen fabric).'
            },
            {
                goal: 'Baking Process Action',
                template: 'Action-oriented photograph of a baker [Action Details] in a professional kitchen, flour dusting the air, hands covered in [Ingredient], [Lighting] highlighting the motion, [Focus Details] sharp while background is blurred, authentic culinary atmosphere, warm and artisanal mood, capturing the craftsmanship of baking.',
                details: 'Examples: Action Details (kneading sourdough on a wooden bench, piping frosting onto cupcakes, dusting powdered sugar on pastries, pulling hot trays from oven), Ingredient (flour, cocoa powder, dough, icing), Lighting (backlit by oven glow, natural window light, dramatic side lighting), Focus Details (hands and dough, piping bag tip, steam rising).'
            },
            {
                goal: 'Celebration Cake Centerpiece',
                template: 'Stunning centerpiece photograph of a [Cake Style] celebration cake, featuring [Decoration Details], placed on a [Cake Stand], surrounded by [Party Elements], [Background Context] out of focus, soft celebratory lighting, professional food styling, magazine-quality presentation, perfect for wedding or event marketing.',
                details: 'Examples: Cake Style (tall naked cake with fresh flowers, elegant fondant wedding cake, colorful drip cake, rustic buttercream birthday cake), Decoration Details (gold leaf and macarons, fresh roses and eucalyptus, rainbow sprinkles, chocolate shards), Cake Stand (vintage glass, modern gold geometric, white ceramic, rustic wood slice), Party Elements (confetti, champagne glasses, fine china, candles), Background Context (party venue, blurred guests, twinkling lights).'
            }
        ]
    },
    realestate: {
        name: '🏡 Real Estate Prompts (Focus: Aspiration & Detail)',
        prompts: [
            {
                goal: 'Luxury Interior Space',
                template: 'Photorealistic architectural visualization of a [Room Type] in [Design Style] style, featuring [Key Feature] as the focal point, [Flooring Material] flooring, [Natural Light Description] natural light streaming through [Window Type], [Color Palette] color scheme, high-end finishes including [Premium Details], no people, professionally staged, ultra-high resolution 8K, perfect symmetry and composition, magazine-quality interior photography.',
                details: 'Examples: Room Type (gourmet kitchen with island, master bathroom with soaking tub, home office with built-ins, great room with vaulted ceilings), Design Style (contemporary minimalist, traditional farmhouse, mid-century modern, coastal luxury), Key Feature (waterfall edge quartz island, freestanding clawfoot tub, floor-to-ceiling bookshelf, stone fireplace), Flooring (wide-plank hardwood, polished concrete, marble tile, luxury vinyl), Natural Light (golden hour sunlight, bright midday sun, soft morning glow), Window Type (floor-to-ceiling windows, French doors, skylights, bay windows), Color Palette (all-white with gold accents, warm neutrals, navy and brass, greige and black), Premium Details (brushed gold fixtures, custom cabinetry, designer lighting, smart home features).'
            },
            {
                goal: 'Stunning Exterior Shot',
                template: 'Professional real estate photography of a [Architectural Style] home exterior taken during [Time of Day], shot from [Angle], featuring [Landscaping Details], [Weather/Season] conditions, [Sky Description], warm interior lights glowing from windows, [Driveway/Walkway] leading to entrance, HDR photography technique, perfectly balanced exposure, vibrant colors, ultra-sharp detail, drone or elevated perspective.',
                details: 'Examples: Architectural Style (modern farmhouse with board and batten, Mediterranean villa with terracotta roof, craftsman bungalow, colonial revival), Time of Day (blue hour twilight, golden hour sunset, bright sunny afternoon), Angle (front elevation straight-on, dramatic corner view, elevated drone shot), Landscaping (manicured lawn with professional landscaping, mature trees framing the house, colorful flower beds, stone pathways), Weather/Season (spring with blooming flowers, light dusting of snow, autumn foliage, clear summer day), Sky (dramatic sunset clouds, clear blue sky, moody storm clouds clearing), Driveway/Walkway (brick paver driveway, flagstone walkway, circular driveway).'
            },
            {
                goal: 'Virtual Staging Concept',
                template: 'Interior design rendering of a [Room Type] with [Architectural Features], virtually staged with [Furniture Style] furniture in [Color Scheme], including [Specific Furniture Pieces], [Decor Elements], [Lighting Fixtures], [Window Treatments], photorealistic 3D rendering, perfect for showcasing potential, aspirational yet achievable design, professional virtual staging quality.',
                details: 'Examples: Room Type (empty living room, vacant master bedroom, unfurnished dining room, blank home office), Architectural Features (crown molding and hardwood floors, exposed beams and brick, large windows and high ceilings, built-in shelving), Furniture Style (Scandinavian minimalist, bohemian eclectic, traditional elegant, industrial modern), Color Scheme (neutral whites and grays, warm earth tones, navy and blush, monochromatic), Specific Furniture (sectional sofa and coffee table, king bed with nightstands, dining table for 8, executive desk and ergonomic chair), Decor Elements (abstract artwork, indoor plants, throw pillows and blankets, area rugs), Lighting (modern chandelier, floor lamps, pendant lights), Window Treatments (sheer curtains, wooden blinds, roman shades).'
            },
            {
                goal: 'Lifestyle Neighborhood Scene',
                template: 'Aspirational lifestyle photograph capturing [Activity] in a [Neighborhood Type] setting, featuring [People Description] in the foreground, [Background Elements] visible behind them, [Time of Day] lighting, [Weather Description], shot with [Photography Technique], emphasizing community, safety, and quality of life, professional real estate marketing photography, authentic and relatable.',
                details: 'Examples: Activity (family walking dog on tree-lined sidewalk, children playing in community park, neighbors chatting at farmers market, couple jogging on greenway trail), Neighborhood Type (historic district with Victorian homes, modern suburban development, walkable urban area, waterfront community), People Description (diverse multi-generational families, young professionals, active retirees), Background Elements (charming local shops and cafes, well-maintained homes, mountain or water views, community amenities like pools or playgrounds), Time of Day (warm golden hour, bright sunny morning, peaceful evening), Weather (perfect spring day, crisp fall afternoon, gentle summer breeze), Photography Technique (shallow depth of field with bokeh, candid documentary style, slightly elevated angle).'
            },
            {
                goal: 'Twilight Exterior Transition',
                template: 'Magical twilight "blue hour" photograph of a [Property Type] exterior, creating a warm and inviting glow from interior lights against a [Sky Condition] sky, [Landscape Lighting] illuminating the path and garden features, expertly balanced exposure capturing both interior and exterior details, serene and luxurious atmosphere, high-dynamic-range (HDR) architectural photography.',
                details: 'Examples: Property Type (modern glass mansion, cozy cottage, sprawling ranch, urban townhouse), Sky Condition (deep blue indigo with faint stars, sunset fade with purple hues, dramatic clouds), Landscape Lighting (uplayts on trees, path lights, pool lighting, underwater glow), Features (fire pit burning in distance, reflection in pool, illuminated patio).'
            },
            {
                goal: 'Architectural Detail Close-up',
                template: 'Artistic close-up photograph exploring the texture and material of [Architectural Element], highlighting the craftsmanship of [Material Details], featuring [Light Play] grazing the surface, abstract and geometric composition, shallow depth of field, showcasing quality and fine construction, professional architectural detail photography.',
                details: 'Examples: Architectural Element (hand-carved wooden staircase railing, custom marble fireplace surround, intricate crown molding, wrought iron gate), Material Details (grain of reclaimed wood, veins in Calacatta marble, texture of irregular stone, sheen of polished brass), Light Play (shadow patterns from window, sunbeam highlighting texture, soft ambient glow).'
            }
        ]
    },
    grocery: {
        name: '🛒 Grocery Prompts (Focus: Freshness & Organization)',
        prompts: [
            {
                goal: 'Fresh Produce Showcase',
                template: 'Vibrant overhead flat lay photograph of [Produce Type] arranged in [Pattern/Style], featuring [Variety Details], freshly misted with water droplets catching the light, displayed on [Surface], [Lighting Type] creating rich colors and shadows, ultra-sharp macro detail showing texture, professional food photography, farm-fresh aesthetic, appetizing and colorful composition.',
                details: 'Examples: Produce Type (organic heirloom tomatoes in various colors, seasonal citrus fruits, rainbow of bell peppers, leafy greens variety pack), Pattern/Style (color gradient arrangement, rustic scattered display, geometric grid layout, overflowing from wooden crate), Variety Details (different sizes and colors, mix of whole and cut pieces, with stems and leaves attached), Surface (reclaimed wood boards, woven basket, white marble, vintage metal tray), Lighting (bright natural window light, soft diffused studio light, dramatic side lighting).'
            },
            {
                goal: 'Product Shelf Display',
                template: 'Clean commercial photography of a grocery store shelf section dedicated to [Product Category], perfectly stocked and faced with [Brand/Product] products, [Shelf Material] shelving, [Signage Details] visible, [Lighting Conditions], shot straight-on at eye level, professional retail photography, everything in focus, organized and appealing, includes [Additional Details].',
                details: 'Examples: Product Category (artisan pasta sauces, craft beer selection, organic snacks, international foods, specialty coffee), Brand/Product (consistent branded packaging in brand colors, variety of flavors/sizes, promotional end-cap display), Shelf Material (wooden shelves with price rails, modern white wire shelving, industrial metal racks), Signage (chalkboard section headers, digital price tags, promotional sale signs, department markers), Lighting (bright even store lighting, accent spotlights, natural light from windows), Additional Details (price tags clearly visible, promotional materials, shelf talkers, some products slightly pulled forward).'
            },
            {
                goal: 'Sustainable Shopping Lifestyle',
                template: 'Authentic lifestyle photograph of [Shopper Description] engaged in [Sustainable Action] at a [Store Type], using [Eco-Friendly Items], [Background Details] visible but softly blurred, [Lighting Quality], shot with shallow depth of field focusing on the action, natural candid moment, professional lifestyle photography, warm and earthy color palette, emphasizing environmental consciousness.',
                details: 'Examples: Shopper Description (young woman in casual attire, family with children, elderly gentleman, diverse group of shoppers), Sustainable Action (filling reusable containers from bulk bins, selecting produce in reusable mesh bags, comparing organic product labels, using canvas shopping bags), Store Type (modern zero-waste grocery, farmers market stall, co-op natural foods store, traditional grocery with bulk section), Eco-Friendly Items (glass jars and containers, cloth produce bags, bamboo utensils, reusable coffee cup), Background (other shoppers browsing, bulk food dispensers, produce displays, wooden shelving), Lighting (soft natural light, warm ambient store lighting, golden hour through windows).'
            },
            {
                goal: 'Friendly Customer Service',
                template: 'Warm, candid photograph capturing [Interaction Type] between [Staff Description] and [Customer Description] at [Location in Store], both people [Emotional Expression], [Environmental Details] in background, [Lighting Style], shot from [Angle], professional commercial photography emphasizing hospitality and community, genuine human connection, welcoming atmosphere.',
                details: 'Examples: Interaction (cashier handing receipt with smile, deli worker offering sample, produce manager helping select items, bagger carefully packing groceries), Staff Description (friendly cashier in uniform, knowledgeable department specialist, helpful store manager), Customer Description (grateful elderly customer, busy parent with child, young professional), Location (checkout lane, deli counter, produce section, customer service desk), Emotional Expression (genuine smiles and eye contact, helpful gestures, friendly conversation), Environmental Details (well-stocked shelves, clean organized space, other customers in background, seasonal decorations), Lighting (soft warm ambient light, natural light from storefront, even overhead lighting), Angle (slightly elevated perspective, eye-level candid, over-the-shoulder view).'
            },
            {
                goal: 'Seasonal Harvest Festival',
                template: 'Vibrant and abundant display of [Season] [Produce/Items], featuring [Key Elements] arranged in [Container Style], surrounded by [Decorations], warm and inviting [Lighting Condition] emphasizing freshness, [Composition Style], professional commercial photography, capturing the spirit of the season.',
                details: 'Examples: Season (Autumn harvest, Summer berry festival, Winter citrus, Spring greens), Produce/Items (pumpkins and gourds, fresh corn, strawberries and cherries, oranges and grapefruits), Container Style (rustic wooden crates, woven bushel baskets, galvanized metal tubs), Decorations (hay bales, gingham cloth, dried corn stalks, fresh flowers), Lighting (golden hour sunlight, bright crisp morning light), Composition (overflowing abundance, color-blocked arrangement).'
            },
            {
                goal: 'Bulk Food Zero Waste',
                template: 'Clean and organized minimalist photograph of a bulk food section, featuring [Container Types] filled with [Bulk Items], focused on [Specific Ingredient] being scooped or poured, [Texture Details] clearly visible, [Labels/Signage], [Lighting Style], promoting sustainability and conscious consumption, eco-friendly aesthetic.',
                details: 'Examples: Container Types (clear glass gravity bins, stainless steel scoops, glass jars with wooden lids), Bulk Items (organic granola, rainbow quinoa, coffee beans, dried fruits), Specific Ingredient (golden honey, chia seeds, almonds), Texture (grainy, smooth, glossy, rough), Labels (handwritten kraft paper tags, clean modern font on glass), Lighting (bright high-key lighting, soft natural light).'
            }
        ]
    },
    cafe: {
        name: '☕ Cafe Prompts (Focus: Comfort & Product)',
        prompts: [
            {
                goal: 'Perfect Latte Art',
                template: 'Extreme close-up macro photograph of a [Size] latte featuring intricate [Latte Art Pattern] in perfectly textured microfoam, served in a [Cup Description], placed on [Surface Material], [Background Description] softly blurred in background, [Lighting Description] creating dimensional shadows and highlights, steam gently rising, professional coffee photography, ultra-sharp focus on the art, warm inviting tones, 8K detail.',
                details: 'Examples: Size (12oz cappuccino, 16oz latte, cortado in small glass), Latte Art (rosetta with fine details, tulip with multiple layers, swan design, heart with contrast), Cup Description (white ceramic cup with saucer, handmade pottery mug in earth tones, clear glass showing layers, branded cafe cup), Surface (reclaimed wood table, white marble countertop, woven rattan placemat, vintage metal tray), Background (cozy cafe interior with warm lights, window with soft daylight, blurred cafe equipment, other patrons), Lighting (soft window light from left, warm overhead pendant, golden hour glow, studio-quality side lighting).'
            },
            {
                goal: 'Cafe Workspace Lifestyle',
                template: 'Aspirational lifestyle photograph of [Person Description] [Activity] at a cafe table near [Window/Location Detail], [Beverage and Food] artfully arranged nearby, [Personal Items] visible, [Lighting Condition], shot with [Camera Technique], capturing the modern remote work aesthetic, cozy and productive atmosphere, professional lifestyle photography, Instagram-worthy composition.',
                details: 'Examples: Person Description (young professional in casual business attire, creative freelancer, student studying, writer with notebook), Activity (typing on MacBook laptop, writing in leather journal, reading a book, sketching in tablet), Window/Location (large window with street view, corner nook with plants, communal table, window seat with cushions), Beverage and Food (latte with latte art and croissant, pour-over coffee and avocado toast, matcha latte and pastry, espresso and biscotti), Personal Items (smartphone and headphones, glasses and pen, succulent plant, tote bag), Lighting (soft diffused morning light, warm afternoon glow, overcast natural light, golden hour), Camera Technique (shallow depth of field f/1.8, over-the-shoulder perspective, 45-degree angle, environmental portrait).'
            },
            {
                goal: 'Charming Cafe Exterior',
                template: 'Inviting street-level photograph of a [Cafe Style] cafe exterior, featuring [Storefront Details], [Outdoor Seating Description] in front, [Decorative Elements], [Street Scene Details], photographed during [Time/Weather], [Photography Style], professional architectural photography, welcoming and Instagram-worthy, perfect for marketing.',
                details: 'Examples: Cafe Style (Parisian-style bistro, modern minimalist, vintage European, industrial chic, coastal beach), Storefront (large glass windows with views inside, colorful painted facade, brick with ivy, floor-to-ceiling glass doors), Outdoor Seating (small round tables with metal chairs, wooden benches with cushions, umbrella-covered patio, sidewalk cafe setup), Decorative Elements (window boxes with colorful flowers, hanging plants, vintage bicycle, chalkboard menu, string lights, awning with cafe name), Street Scene (cobblestone street, tree-lined sidewalk, pedestrians walking by, parked vintage car), Time/Weather (sunny morning with long shadows, golden hour warm glow, overcast but bright, spring day with blooms), Photography Style (straight-on symmetrical composition, angled corner view, wide-angle environmental shot, tilt-shift miniature effect).'
            },
            {
                goal: 'Coffee Connection Moment',
                template: 'Intimate candid photograph capturing [Interaction Type] between [People Description], focus on [Focal Point], [Mugs/Cups Description] in frame, [Background Blur Description], [Lighting Mood], shot with [Technical Specs], emphasizing human connection and cafe culture, warm emotional tone, professional lifestyle photography, authentic moment.',
                details: 'Examples: Interaction (two friends laughing over coffee, couple having deep conversation, business meeting handshake, solo person enjoying quiet moment), People Description (close friends of similar age, multi-generational family, romantic couple, diverse group), Focal Point (hands wrapped around warm mugs, genuine smiles and eye contact, coffee cups touching in toast, person gazing out window), Mugs/Cups (matching ceramic mugs, vintage mismatched cups, clear glass cups showing layers, branded cafe mugs), Background Blur (bokeh lights from cafe interior, soft shapes of other patrons, blurred cafe equipment, window light creating glow), Lighting Mood (warm and cozy golden tones, soft natural window light, moody with shadows, bright and airy), Technical Specs (shallow depth of field f/2.0, 85mm portrait lens, warm color grading, slight vignette, film-inspired look).'
            },
            {
                goal: 'Artisanal Brewing Method',
                template: 'Detailed action shot of a barista performing a [Brewing Method], capturing the precise moment of [Action Detail], steam rising against [Background Lighting], focusing on the equipment [Equipment Name], [Coffee Texture] visible, professional specialty coffee photography, high contrast dramatic lighting, showcasing craftsmanship and quality.',
                details: 'Examples: Brewing Method (V60 pour-over, Chemex bloom, Aeropress plunge, espresso extraction, siphon brew), Action Detail (water spiral pouring from gooseneck kettle, espresso dripping like warm honey, blooming coffee grounds bubbling), Equipment (copper kettle, glass Chemex with wood collar, chrome espresso portafilter, ceramic dripper), Coffee Texture (rich crema, blooming bubbles, dark amber liquid), Lighting (dark moody atmosphere with rim light, bright clean laboratory style).'
            },
            {
                goal: 'Cafe Seasonal Special',
                template: 'Appetizing marketing photo of a limited edition [Seasonal Drink], styled with [Seasonal Props], served in [Vessel Type], garnished with [Garnish], placed on [Surface] near a window with [Weather Outside] visible, creating a cozy [Season] vibe, professional food and beverage photography, enticing and delicious.',
                details: 'Examples: Seasonal Drink (Pumpkin Spice Latte, Peppermint Mocha, Iced Lavender Matcha, Spiced Apple Cider), Props (fallen leaves, pine branches, spring flowers, summer sunglasses), Vessel (tall glass with condensation, cozy ceramic mug, to-go cup with sleeve), Weather (rainy autumn day, snowy winter morning, sunny summer afternoon).'
            }
        ]
    },
    onlinebusiness: {
        name: '💻 Online Business Prompts (Focus: Digital & Solution)',
        prompts: [
            {
                goal: 'Digital Product Showcase',
                template: '3D rendered product mockup of [Digital Product Type] displayed on [Device/Platform], featuring [UI/Design Elements], floating above or integrated with [Environment Setting], [Color Scheme] color palette matching brand identity, [Lighting Style], ultra-modern composition, professional product visualization, 8K resolution, perfect for SaaS marketing and tech presentations.',
                details: 'Examples: Digital Product (mobile app interface with clean dashboard, responsive website design, SaaS platform screenshot, e-learning course portal, project management tool), Device/Platform (iPhone 15 Pro mockup, MacBook Pro screen, iPad Pro, multiple devices showing responsive design, floating UI panels), UI/Design Elements (modern minimalist interface, colorful data visualizations, intuitive navigation, user-friendly forms, interactive elements), Environment (minimalist white studio background, futuristic abstract space, modern office desk setup, floating in clouds, city skyline backdrop), Color Scheme (vibrant blue and white, purple and teal gradient, brand colors with accents, monochromatic with pops of color), Lighting (futuristic neon glow, soft studio lighting, dramatic rim lighting, holographic effects).'
            },
            {
                goal: 'Entrepreneur Success Story',
                template: 'Aspirational lifestyle photograph of [Entrepreneur Description] [Activity] in [Location Setting], [Time of Day] lighting streaming through [Window/Light Source], [Technology Visible], [Additional Elements] suggesting success and achievement, [Photography Style], professional editorial photography, motivational and inspiring mood, perfect for business coaching and startup marketing.',
                details: 'Examples: Entrepreneur Description (confident young professional in smart casual attire, diverse business owner, female tech founder, successful remote worker, startup CEO), Activity (working intently on laptop with satisfied expression, standing at window overlooking city, video call with team, reviewing analytics on tablet, celebrating milestone), Location (modern high-rise office with city views, stylish home office with designer furniture, trendy co-working space, minimalist studio apartment, rooftop terrace), Time of Day (early morning golden light, productive afternoon, late evening with city lights, sunrise motivation), Window/Light Source (floor-to-ceiling windows, skyline view, natural light flooding space, dramatic backlighting), Technology (MacBook Pro, dual monitors, smartphone, tablet, wireless headphones, smart watch), Additional Elements (coffee cup, notebook with goals, vision board, awards, plants, motivational quotes, success metrics on screen), Photography Style (cinematic with shallow depth of field, editorial magazine quality, environmental portrait, dramatic lighting with contrast).'
            },
            {
                goal: 'Data Visualization Concept',
                template: 'Abstract digital illustration representing [Business Concept], featuring [Visual Elements] in [Style Aesthetic], [Color Palette] color scheme, [Background Description], [Technical Details], perfect for representing [Industry/Topic], modern tech aesthetic, suitable for presentations and marketing materials, high-resolution vector-style artwork.',
                details: 'Examples: Business Concept (network connectivity and growth, data analytics and insights, cybersecurity protection, financial growth trajectory, AI and machine learning, cloud computing infrastructure), Visual Elements (interconnected glowing nodes and lines, flowing data streams, geometric shapes forming patterns, neural network structure, ascending graphs and charts, shield or lock symbols, circuit board patterns), Style Aesthetic (science fiction futuristic, minimalist geometric, organic flowing, wireframe technical, isometric 3D), Color Palette (electric blue and cyan on dark background, purple and pink gradients, green matrix-style, gold and white luxury, neon colors on black), Background (deep space with stars, dark gradient, pure black, subtle grid pattern, abstract bokeh), Technical Details (glowing edges, particle effects, depth and layering, motion blur suggesting movement, transparency and glass effects), Industry/Topic (fintech, healthcare tech, e-commerce, digital marketing, blockchain, artificial intelligence).'
            },
            {
                goal: 'Remote Team Collaboration',
                template: 'Professional photograph showcasing [Meeting Type] with [Team Composition], [Main Focus] in foreground, [Screen/Technology Display] showing [Content on Screen], [Environment Details], [Lighting Conditions], capturing modern remote work culture, diverse and inclusive, professional corporate photography, emphasizing connection and productivity.',
                details: 'Examples: Meeting Type (video conference call, virtual team standup, online presentation, remote brainstorming session, hybrid meeting), Team Composition (diverse team of 4-6 people in grid layout, international team across time zones, cross-functional department heads, startup team members), Main Focus (smiling team member at desk, presenter sharing screen, manager facilitating discussion, team member taking notes), Screen/Technology (large monitor showing video call grid, laptop with collaboration software, dual screens with data, tablet with digital whiteboard, smartphone on stand), Content on Screen (team members in video tiles, shared presentation slides, project management board, data dashboard, collaborative document), Environment (modern home office with plants, professional co-working space, minimalist background with good lighting, branded virtual background, kitchen table setup), Lighting (ring light for even illumination, natural window light, LED panel lighting, warm desk lamp, professional three-point lighting).'
            },
            {
                goal: 'Customer Trust & Testimonial',
                template: 'Warm, authentic portrait of a [Customer Demographic] holding or using [Device/Product] with a [Expression] expression, [Background Environment], [Lighting Style], high-quality resolution, conveying trust and satisfaction, perfect for social proof marketing and website testimonial sections.',
                details: 'Examples: Customer Demographic (smiling small business owner, relieved parent, excited student, professional woman), Device/Product (tablet showing 5-star review, smartphone with app open, product package), Expression (genuine smile, look of relief/solution found, excitement, focus/engagement), Background (blurred home environment, bright office, outdoor park, neutral studio), Lighting (soft natural window light, warm golden hour, bright commercial lighting).'
            },
            {
                goal: 'Cybersecurity & Tech Concept',
                template: 'Abstract 3D digital art representing [Security Concept], featuring [Visual Metaphor] constructed of [Material/Texture], glowing with [Color Palette] light against a dark background, [Technical Effects], high-tech and futuristic aesthetic, emphasizing strength and protection for B2B tech marketing.',
                details: 'Examples: Security Concept (data encryption, cloud security, blockchain verification, firewall protection), Visual Metaphor (digital shield, padlock with circuitry, fingerprint scan, glowing network nodes), Material (glass, polished metal, holographic light, fiber optics), Color Palette (cyan and deep blue, neon green and black, silver and white), Technical Effects (depth of field, bloom, particle systems, motion trails).'
            }
        ]
    },
    menudesign: {
        name: '📄 Menu Design Prompts (Focus: Layout & Aesthetic)',
        prompts: [
            {
                goal: 'Premium Restaurant Menu',
                template: 'High-resolution mockup of a [Menu Format] restaurant menu in [Design Style] aesthetic, featuring [Typography Details], [Color Scheme] color palette, [Material/Texture] finish, [Layout Structure], photographed on [Surface/Setting], [Lighting Setup], professional graphic design showcase, print-ready quality, elegant and sophisticated presentation.',
                details: 'Examples: Menu Format (tri-fold brochure, single-page elegant, leather-bound multi-page, tall narrow wine list, square cocktail menu), Design Style (classic fine dining with ornate borders, modern minimalist with white space, rustic farmhouse, Art Deco geometric, vintage Victorian), Typography (elegant serif fonts with script accents, bold modern sans-serif, hand-lettered calligraphy, classic Garamond or Didot, mixed type hierarchy), Color Scheme (black and gold luxury, navy and cream, earth tones with green accents, all-white with subtle texture, burgundy and ivory), Material/Texture (textured linen paper, leather with gold foil stamping, kraft paper with letterpress, glossy laminated, embossed details), Layout (centered symmetrical, asymmetric modern grid, traditional two-column, illustrated with food sketches, photography-heavy), Surface/Setting (dark wooden table, white marble, leather desk pad, restaurant table setting with wine glass), Lighting (soft overhead with shadows, dramatic side lighting, even studio light, natural window light).'
            },
            {
                goal: 'Cafe Chalkboard Menu',
                template: 'Photorealistic image of a [Size/Placement] chalkboard menu for a [Cafe Type], featuring [Content Layout] with items and prices, [Artistic Elements], [Chalk Style] lettering, [Frame/Border Details], [Background Environment], [Lighting Conditions], authentic hand-drawn aesthetic, Instagram-worthy, perfect for cafe marketing.',
                details: 'Examples: Size/Placement (large wall-mounted 4x6 feet, hanging A-frame sidewalk sign, small countertop easel, full wall behind counter), Cafe Type (artisan coffee shop, bakery cafe, juice bar, breakfast cafe, tea house), Content Layout (categories with decorative headers, grid of items with prices, flowing script list, illustrated menu items, daily specials section), Artistic Elements (hand-drawn coffee bean illustrations, decorative flourishes and borders, small icons next to items, botanical drawings, geometric patterns), Chalk Style (clean modern sans-serif, whimsical script, bold block letters, mixed styles for emphasis, authentic imperfect handwriting), Frame (rustic wooden frame, ornate vintage frame, no frame on brick wall, modern metal frame, painted border), Background Environment (exposed brick wall, white subway tile, wooden paneling, visible cafe interior, outdoor patio), Lighting (warm diffused natural light, even overhead cafe lighting, dramatic spotlights, morning sunlight, Edison bulbs).'
            },
            {
                goal: 'Modern Digital Menu Design',
                template: 'Sleek UI/UX design mockup of a [Platform Type] digital menu interface, showing [Screen Layout] with [Navigation Elements], [Visual Hierarchy] for different sections, [Color Scheme] matching brand, [Interactive Elements], [Food Photography/Graphics], professional app design, user-friendly and intuitive, ready for development.',
                details: 'Examples: Platform (tablet restaurant table display, mobile app for ordering, website menu page, QR code-accessed mobile site, digital kiosk touchscreen), Screen Layout (scrollable single page, tabbed categories, card-based grid, list view with filters, carousel of featured items), Navigation (top tab bar with icons, side hamburger menu, bottom navigation, category chips, search functionality), Visual Hierarchy (large hero images, clear section headers, price emphasis, description text hierarchy, call-to-action buttons), Color Scheme (dark mode with neon accents, light and airy pastels, brand colors with white space, monochromatic with photo pops, vibrant and playful), Interactive Elements (add to cart buttons, quantity selectors, customization options, favorites heart icon, dietary filter tags), Food Photography (high-quality product photos, illustrated icons, minimal lifestyle shots, ingredient close-ups, styled flat lays).'
            },
            {
                goal: 'Specialty Drinks Menu Card',
                template: 'Clean, professional flat lay photograph of a [Size/Shape] menu card for [Beverage Category], featuring [Design Elements], [Color Treatment], [Graphic Components], [Typography Style], placed on [Surface] with [Styling Props], [Lighting Type], perfect for printing and social media, boutique cafe aesthetic.',
                details: 'Examples: Size/Shape (square 5x5 inch coaster-style, tall narrow 4x9 inch, A5 folded card, circular die-cut, standard postcard size), Beverage Category (specialty coffee drinks, craft cocktails, wine list, tea menu, seasonal drinks, smoothie bar), Design Elements (minimalist with lots of white space, watercolor background wash, geometric patterns, botanical illustrations, vintage labels), Color Treatment (soft pastel gradient, bold single color, black and white with one accent, earthy natural tones, metallic gold accents), Graphic Components (simple line drawings of drinks, coffee bean motifs, citrus slice illustrations, abstract shapes, decorative borders, icons for drink types), Typography (modern sans-serif clean, elegant script for names, bold for prices, mixed hierarchy, hand-lettered feel), Surface (white marble, weathered wood, concrete, linen fabric, cafe table), Styling Props (actual drink next to menu, coffee beans scattered, fresh herbs or fruit, vintage spoon, branded coaster), Lighting (bright natural overhead, soft diffused window light, flat even lighting, subtle shadows for depth).'
            },
            {
                goal: 'Kids Menu & Activity Sheet',
                template: 'Fun and engaging flat lay of a [Sheet Size] kids menu and activity placement, featuring [Illustrations] and [Games/Puzzles], printed on [Paper Type], with [Crayons/Pencils] scattered nearby, vibrant [Color Palette], designed for [Restaurant Theme], top-down view with even lighting, playful and child-friendly design.',
                details: 'Examples: Size (11x17 placement size, A4 handout), Illustrations (cartoon animals, space theme mascots, food characters, underwater scene), Games (tic-tac-toe, word search, connect the dots, maze, coloring section), Paper (uncoated coloring paper, kraft paper, recycled matte), Colors (primary red/blue/yellow, bright rainbow, pastel nursery tones), Theme (family diner, pizza place, seafood restaurant, burger joint).'
            },
            {
                goal: 'Elegant Wedding/Event Menu',
                template: 'Sophisticated close-up photograph of a [Shape] wedding menu card, placed on a [Charger Plate] with a [Napkin Description], featuring [Typography Details] and [Luxury Finishes], surrounded by [Table Decor], soft romantic lighting, shallow depth of field, conveying luxury and attention to detail for event planning marketing.',
                details: 'Examples: Shape (long vertical, round, arch-shaped, die-cut geometric), Plate (gold rim charger, crystal glass plate, rustic wood slice), Napkin (folded linen, velvet ribbon tie, sprig of lavender), Typography (calligraphy script names, classic serif body text, gold foil stamping, letterpress indentation), Finishes (wax seal, ribbon tassel, torn deckle edge, vellum overlay), Decor (candlelight, rose petals, crystal glassware, eucalyptus runner).'
            }
        ]
    },
    marketingflyer: {
        name: '📢 Marketing Flyer Prompts (Focus: Attention & Promotion)',
        prompts: [
            {
                goal: 'Real Estate Promotional Flyer',
                template: 'High-impact [Size] real estate flyer design for [Property Type], featuring [Image Placement] with [Photo Description], [Layout Style] layout, [Color Scheme] color palette, [Typography Hierarchy], [Information Sections] clearly organized, [Design Elements], professional print-ready design, attention-grabbing and informative.',
                details: 'Examples: Size (standard 8.5x11 letter, A4, 11x17 tabloid, square Instagram format), Property Type (luxury home open house, new listing announcement, price reduction alert, coming soon teaser, sold success story), Image Placement (large hero image at top third, full-bleed background with overlay, small inset photos in corner, photo strip across middle, before/after comparison), Photo Description (stunning twilight exterior shot, modern kitchen interior, aerial drone view, lifestyle neighborhood scene), Layout (bold geometric sections, elegant traditional centered, modern asymmetric grid, magazine-style editorial), Color Scheme (navy and gold luxury, bright blue and white clean, earth tones professional, brand colors, black and white with red accent), Typography (large bold headline, clear property details, agent info footer, call-to-action emphasis, QR code), Information Sections (property highlights, price and details, agent contact, open house info, neighborhood features), Design Elements (property stats icons, decorative borders, transparent overlays, diagonal design elements, luxury badge or seal).'
            },
            {
                goal: 'Grand Opening Event Flyer',
                template: 'Vibrant, energetic [Size] poster design for [Business Type] grand opening, featuring [Illustration/Photo Style], [Headline Treatment] with placeholder text for "GRAND OPENING", [Decorative Elements], [Color Palette] high-saturation colors, [Layout Approach], [Information Hierarchy], celebratory and exciting mood, perfect for print and social media.',
                details: 'Examples: Size (A3 poster, 18x24 large format, square social media, 8.5x11 handout), Business Type (bakery, restaurant, retail store, cafe, gym, salon), Illustration/Photo (hand-drawn confetti and balloons, watercolor celebration, bold graphic shapes, actual photo of storefront, illustrated food items, cartoon mascot), Headline Treatment (bold retro script typography, modern sans-serif all caps, playful hand-lettered, 3D effect text, curved text following shape), Decorative Elements (bursting stars and sparkles, ribbon banners, festive bunting flags, fireworks graphics, floral arrangements, geometric patterns), Color Palette (rainbow bright, red and yellow energetic, pastel party colors, brand colors vibrant, gold and white celebration), Layout (centered symmetrical, dynamic diagonal, layered collage, clean modern grid, vintage poster style), Information (date and time prominent, special offers/discounts, address and directions, RSVP or registration, social media handles).'
            },
            {
                goal: 'Weekly Deals Promotional Ad',
                template: '[Format] grocery store promotional layout for [Campaign Type], featuring [Product Photography] of [Featured Items], [Price Display] with [Pricing Style], [Layout Structure], [Color Scheme] for urgency and value, [Branding Elements], [Call-to-Action], professional retail advertising design, clear visual hierarchy.',
                details: 'Examples: Format (full-page magazine ad, half-page newspaper insert, digital banner, email newsletter, social media carousel), Campaign Type (weekly specials, seasonal sale, category promotion, new product launch, loyalty member exclusive), Product Photography (bright appetizing food photos, fresh produce close-ups, packaged goods on white, lifestyle cooking scene, ingredient groupings), Featured Items (fresh meat and seafood, organic produce, bakery items, pantry staples, seasonal favorites), Price Display (large bold numbers, strikethrough original price, percentage off badges, "Buy One Get One" callouts, price per pound), Pricing Style (bright yellow starburst, red sale tags, circular badges, rectangular price blocks, handwritten style), Layout (two-column grid, scattered product placement, category sections, featured deal hero, comparison chart), Color Scheme (red and yellow classic sale, fresh green and white, brand colors, high contrast, seasonal colors), Branding (store logo prominent, tagline, quality badges, "Fresh Daily" messaging), Call-to-Action (limited time offer, shop now button, valid dates, store locations, QR code for digital coupons).'
            },
            {
                goal: 'Digital Service Advertisement',
                template: 'Minimalist [Dimensions] digital ad banner for [Service Type], featuring [Background Treatment], [Icon/Symbol] representing [Concept], [Text Layout] with placeholder for [Headline] and [Call-to-Action], [Color Gradient], [Design Style] aesthetic, optimized for [Platform], modern tech branding, high conversion design.',
                details: 'Examples: Dimensions (1080x1080 Instagram square, 1200x628 Facebook link, 728x90 web banner, 1080x1920 story format, 300x250 sidebar ad), Service Type (SaaS software, online course, consulting services, app download, webinar registration, free trial offer), Background (soft gradient purple to teal, abstract geometric shapes, subtle texture, solid bold color, blurred tech imagery, particle effects), Icon/Symbol (simple line icon, 3D rendered object, abstract logo mark, minimalist illustration, geometric shape), Concept (connectivity and network, growth and success, security and protection, innovation and ideas, speed and efficiency), Text Layout (centered minimal, left-aligned modern, large headline focus, stacked hierarchy, floating elements), Headline (benefit-driven statement, question format, bold claim, problem/solution, urgency message), Call-to-Action (bright button, underlined link, arrow pointer, "Learn More", "Get Started", "Sign Up Free"), Color Gradient (blue to purple, teal to green, orange to pink, monochromatic, brand colors), Design Style (Web 3.0 modern, flat design 2.0, glassmorphism, neumorphism, brutalist bold), Platform (Facebook ads, Google display, LinkedIn sponsored, Instagram feed, website banner, email header).'
            },
            {
                goal: 'Lead Magnet E-Book Cover',
                template: 'Professional 3D product shot of an [Book Format] titled with placeholder text, featuring [Cover Imagery] that relates to [Topic], [Typography Style] title design, [Background Composition], [Color Scheme], realistic lighting and shadows, high-quality rendering, designed to capture leads and email signups.',
                details: 'Examples: Format (tablet showing digital ebook, stacked hardcover books, thick spiral bound workbook, magazine style), Imagery (abstract financial tracking graph, healthy food bowl photo, fitness transformation silhouette, computer code matrix), Topic (marketing guide, recipe collection, fitness challenge, investment strategies, coding bootcamp), Typography (bold sans-serif impact, elegant serif trustworthy, modern handwritten personal, luxury wide-tracking), Colors (trustworthy blue, energetic orange/red, growth green, refined black/gold).'
            },
            {
                goal: 'Workshop/Webinar Announcement',
                template: 'Engaging [Dimension] promotional graphic for a [Event Type] featuring [Speaker/Host Presentation], [Event Details Layout], [Background Elements], [Visual Style], clear differentiation between title and details, professional educational marketing design, encouraging registration.',
                details: 'Examples: Dimension (LinkedIn post size, Instagram story, email header, Facebook event cover), Event Type (live webinar masterclass, in-person weekend workshop, online summit, Q&A session), Speaker Presentation (photo of speaker in circle frame, silhouette of presenter, group photo of panel, illustrated avatar), Layout (split screen photo/text, centered overlay, diagonal dynamic, sidebar info), Background (modern office blur, abstract gradient, tech circuit pattern, clean solid color), Visual Style (corporate professional, creative artistic, bold energetic, trustworthy medical/legal).'
            }
        ]
    },
    fitness: {
        name: '💪 Fitness & Gym Prompts (Focus: Energy & Form)',
        prompts: [
            {
                goal: 'High-Intensity Output',
                template: 'Energetic action shot of an athlete performing a [Exercise Move] in a modern [Gym Environment], capturing the peak of movement, [Lighting Style] highlighting muscle definition and sweat, motion blur on background elements, intensity and determination on face, cinematic color grading, high contrast, motivating and powerful.',
                details: 'Examples: Exercise Move (heavy deadlift, box jump, kettlebell swing, sprinting on treadmill, battle ropes), Gym Environment (CrossFit box with industrial look, sleek commercial gym with mirrors, outdoor track at sunrise, home garage gym), Lighting (dramatic rim lighting, moody dark atmosphere, bright neon accents), Color (desaturated with pops of red, cool blue steely tones).'
            },
            {
                goal: 'Mind & Body Yoga',
                template: 'Serene and peaceful photograph of a yogi in [Pose Name] pose, located in [Location], soft natural light streaming in, [Time of Day] atmosphere, wearing [Outfit Colors], shallow depth of field, focus on form and balance, calming and Zen aesthetic, high resolution.',
                details: 'Examples: Pose (Tree pose, Warrior II, Pigeon pose, Headstand), Location (minimalist yoga studio, beach at sunset, forest clearing, mountain top), Time of Day (golden hour, misty morning, twilight), Outfit (earthy tones, pastel soft colors, all white).'
            },
            {
                goal: 'Personal Training Session',
                template: 'Motivating lifestyle shot of a [Trainer Description] correcting the form of a [Client Description] doing [Exercise], genuine smile and encouragement, clear connection, [Gym Background], bright and airy professional lighting, portraying expert guidance and support.',
                details: 'Examples: Trainer (fit male trainer with tablet, female coach in branded gear), Client (focused beginner, senior maintaining mobility, athlete training), Exercise (squat form, dumbbell press, stretching), Background (blurred gym equipment, private studio wall).'
            },
            {
                goal: 'Healthy Fuel Nutrition',
                template: 'Appetizing flat lay of [Post-Workout Meal/Drink] prepared on a [Surface], surrounded by [Ingredients/Props], [Lighting] highlighting freshness, [Color Palette], professional food photography for fitness nutrition.',
                details: 'Examples: Meal/Drink (protein smoothie bowl with berries, grilled chicken and quinoa prep containers, protein shaker bottle with splash), Surface (gym bench, kitchen island, yoga mat), Ingredients (fresh fruit, supplement powder scoop, water bottle, dumbbell nearby), Lighting (bright morning light, crisp studio light).'
            },
            {
                goal: 'Gym Detail Aesthetic',
                template: 'Artistic close-up of [Gym Equipment] with [Texture Detail], [Lighting] creating dramatic shadows, chalk dust or sweat condensation visible, focus on the equipment material, heavy metal aesthetic, motivational wallpaper background.',
                details: 'Examples: Equipment (knurled barbell handle, stack of bumper plates, kettlebell handle, dumbbells on rack), Texture (iron texture, rubber grip, chalked hands), Lighting (moody overhead, shaft of light).'
            },
            {
                goal: 'Virtual Class Production',
                template: 'Behind-the-scenes style shot of a [Instructor] filming a workout class, facing a [Camera Setup], ring light reflection in eyes, bright and energetic studio setting, on-screen graphics overlay concept, modern digital fitness business vibe.',
                details: 'Examples: Instructor (charismatic cardio instructor, calm pilates teacher), Camera Setup (professional tripod, smartphone on gimbal, laptop webcam), Setting (branded studio background, living room setup).'
            }
        ]
    },
    hotel: {
        name: '🏨 Hotel & Travel Prompts (Focus: Luxury & Escape)',
        prompts: [
            {
                goal: 'Luxury Suite Interior',
                template: 'Architectural masterpiece photograph of a [Room Type] in a [Hotel Style], featuring [Key Feature], [Bedding Details], crisp white linens, [View from Window], warm ambient lighting combined with natural light, wide angle lens, high-end interior design magazine quality, inviting and expensive.',
                details: 'Examples: Room Type (Presidential Suite, Ocean View Balcony Room, Boutique Loft), Hotel Style (modern luxury resort, historic grand hotel, eco-lodge, urban boutique), Key Feature (freestanding bathtub, floor-to-ceiling windows, fireplace), View (turquoise ocean, city skyline at night, mountain range).'
            },
            {
                goal: 'Resort Poolside Paradise',
                template: 'Dreamy travel photography of a [Pool Type] at a luxury resort, crystal clear blue water, [Lounge Furniture] neatly arranged, palm tree shadows, [Time of Day] sun flare, infinity edge blending with [Background], vibrant tropical colors, perfect vacation atmosphere.',
                details: 'Examples: Pool Type (infinity pool, lagoon style, rooftop lap pool, private plunge pool), Furniture (white cabanas, teak lounge chairs with striped towels), Time of Day (golden hour sunset, bright midday sun), Background (ocean horizon, jungle canopy, city skyscrapers).'
            },
            {
                goal: 'Concierge Welcome',
                template: 'Professional hospitality shot of a [Staff Member] at the front desk, smiling warmly and handling [Item], majestic hotel lobby background with [Lobby Features], soft warm lighting, uniform details, welcoming and helpful service atmosphere.',
                details: 'Examples: Staff Member (concierge in suit, receptionist, bellhop), Item (room key card, vintage luggage cart, phone), Lobby Features (grand chandelier, marble floors, fresh flower arrangement), Lighting (warm gold tones, grand architectural lighting).'
            },
            {
                goal: 'Fine Dining Experience',
                template: 'Elegant dining atmosphere in a hotel restaurant, table set for two with [Tableware], [Food/Wine] served, view of [View] in background, romantic candlelit mood, bokeh effect on background lights, sophisticated and culinary excellence.',
                details: 'Examples: Tableware (crystal glasses, silver cutlery, white tablecloth), Food/Wine (champagne bucket, gourmet appetizers), View (city lights, garden courtyard, harbor), Mood (intimate, celebratory, quiet luxury).'
            },
            {
                goal: 'Spa & Wellness Retreat',
                template: 'Serene spa environment showing [Treatment Room/Area], [Element] creating tranquility, steam or mist, soft towels and robes folded perfectly, [Lighting Mood], Zen composition, promoting relaxation and rejuvenation.',
                details: 'Examples: Treatment Room (massage table with orchid, hot stone setup, hydrotherapy pool, sauna interior), Element (flowing water feature, bamboo plants, candles), Lighting (dim soothing low-light, soft natural filtered light).'
            },
            {
                goal: 'Business Travel Lifestyle',
                template: 'Modern lifestyle shot of a [Traveler Description] working in the [Hotel Area], laptop open, coffee nearby, [View/Background], productive and comfortable, emphasizing the "bleisure" (business + leisure) travel market.',
                details: 'Examples: Traveler (businessman in suit, creative nomad), Hotel Area (club lounge, desk in room, lobby bar), View (airport runway distance, city financial district), Mood (focused, successful, comfortable).'
            }
        ]
    },
    fashion: {
        name: '👗 Fashion & Retail Prompts (Focus: Style & Trend)',
        prompts: [
            {
                goal: 'Editorial Lookbook Shot',
                template: 'High-fashion editorial photograph of a [Model Description] wearing [Outfit Details], posing in a [Location/Set], dramatic [Lighting Style], [Color Grading] mood, wind in hair, strong eye contact or aloof expression, magazine cover quality, 8K resolution.',
                details: 'Examples: Model (androgynous model, diverse group of models, senior fashion icon), Outfit (avant-garde sculptural dress, sustainable linen suit, neon streetwear), Location (brutalist concrete architecture, blooming flower field, neon-lit alleyway, minimalist studio), Lighting (harsh direct flash, soft butterfly lighting, colored gels).'
            },
            {
                goal: 'Product Flat Lay',
                template: 'Stylized fashion flat lay of [Item Type] surrounded by [Accessories/Props], arranged on [Background Texture], pleasing [Color Palette], soft even lighting with minimal shadows, sharp focus on fabric texture and details, professional e-commerce photography.',
                details: 'Examples: Item (denim jacket, leather handbag, canvas sneakers, silk scarf), Accessories (sunglasses, jewelry, dried flowers, vintage camera), Background (white fur rug, marble tile, pink velvet, distressed wood), Props (fashion magazine, latte, succulent).'
            },
            {
                goal: 'Street Style Candid',
                template: 'Authentic street style photography of a [Person] walking in [City/Neighborhood], wearing [Trend Focus], mid-stride action, [Background] blurred but recognizable, natural daylight, candid and effortless vibe, capturing current fashion trends.',
                details: 'Examples: Person (stylish influencer, cool teenager, sophisticated business person), City (SoHo NYC, Harajuku Tokyo, Le Marais Paris), Trend (oversized blazer, chunky sneakers, layered monochrome), Background (city traffic, yellow taxi, historic brownstones).'
            },
            {
                goal: 'Jewelry Macro Detail',
                template: 'Macro beauty shot of [Jewelry Piece] worn by [Model Feature], catching the light with sparkles, [Skin Texture] visible and natural, shallow depth of field, [Lighting] enhancing the metal and stones, luxury commercial photography.',
                details: 'Examples: Piece (diamond engagement ring, gold hoop earrings, layered chain necklaces), Feature (earlobe, elegant hand, collarbone), Lighting (star filter effect, soft box reflection, golden hour).'
            },
            {
                goal: 'Seasonal Collection Banner',
                template: 'Panoramic banner image for a [Season] fashion collection, featuring [Models/Items], consistent [Color/Theme], text space available on [Side], high-energy or mood-setting, perfect for website hero image.',
                details: 'Examples: Season (Spring/Summer Resort, Fall/Winter Coats, Back to School), Theme (bohemian festival, corporate power dressing, athletic leisure), Side (left, right, center overlay).'
            },
            {
                goal: 'Sustainable Fashion Concept',
                template: 'Conceptual fashion photography highlighting sustainability, featuring [Eco Material] clothing in a [Nature Setting], clean and fresh aesthetic, soft earth tones, connection between nature and fashion, eco-conscious marketing.',
                details: 'Examples: Material (organic cotton, recycled polyester, mushroom leather), Setting (forest, beach dunes, greenhouse), Aesthetic (raw, unretouched, ethereal).'
            }
        ]
    },
    healthcare: {
        name: '🏥 Healthcare & Medical Prompts (Focus: Trust & Care)',
        prompts: [
            {
                goal: 'Compassionate Care',
                template: 'Heartwarming photograph of a [Healthcare Professional] interacting with a [Patient], genuine smile and eye contact, holding hands or offering support, [Clinical Setting] in background, soft bright lighting, blue and white color palette, expressing trust and empathy.',
                details: 'Examples: Professional (doctor in white coat, nurse in scrubs, physical therapist), Patient (elderly person, smiling child, pregnant woman), Setting (hospital room, modern clinic, consultation office).'
            },
            {
                goal: 'Modern Medical Technology',
                template: 'Sleek and professional shot of [Medical Device/Tech] in use or display, futuristic interface elements, [Lighting] emphasizing innovation, clean sterile environment, focus on precision and advancement.',
                details: 'Examples: Device (MRI machine, robotic surgery arm, tablet with health data, microscope), Lighting (cool blue LEDs, bright white clinical light).'
            },
            {
                goal: 'Digital Health & Telemedicine',
                template: 'Lifestyle shot of a patient using a [Device] for a video consultation, happy and relieved expression, home environment, "Doctor" visible on screen, easy and accessible healthcare concept.',
                details: 'Examples: Device (smartphone, laptop, tablet), Patient (sick person on couch, busy parent in kitchen).'
            },
            {
                goal: 'Healthy Lifestyle Prevention',
                template: 'Vibrant image representing preventative health, showing [Activity/Habit], [Demographic], bright and energetic colors, outdoor or clean indoor setting, promoting wellness and vitality.',
                details: 'Examples: Activity (jogging, eating salad, drinking water, washing hands), Demographic (active senior, young family).'
            },
            {
                goal: 'Pharmacy & Medication',
                template: 'Clean composition of [Medication Type] arranged neatly, focus on packaging or pill texture, [Background] blurred pharmacy shelves, professional medical stock photography.',
                details: 'Examples: Medication (prescription bottles, blister packs, vitamins, herbal supplements).'
            },
            {
                goal: 'Dental/Specialist Clinic',
                template: 'Interior architectural shot of a modern [Specialty] waiting room or treatment area, [Design Elements], calming atmosphere, professional and high-tech, welcoming to patients.',
                details: 'Examples: Specialty (Dental, Dermatology, Optometry), Design (plant wall, comfortable seating, large windows).'
            }
        ]
    },
    eventplanning: {
        name: '🎉 Event Planning Prompts (Focus: Celebration & Design)',
        prompts: [
            {
                goal: 'Elegant Wedding Reception',
                template: 'Magical photograph of a [Wedding Style] reception dinner, featuring [Table Decor] with lush floral arrangements, soft candlelight, [Lighting] creating a romantic ambiance, hanging installations, shallow depth of field, capturing the anticipation of a celebration.',
                details: 'Examples: Style (rustic barn, modern industrial, classic ballroom, garden tent), Decor (gold charger plates, eucalyptus runners, crystal glassware), Lighting (string lights, uplighting, chandeliers).'
            },
            {
                goal: 'Corporate Event Setup',
                template: 'Professional wide shot of a [Corporate Event Type] setup in a [Venue], featuring stage design with [Branding], rows of [Seating Style], dynamic [Lighting], empty anticipation before guests arrive, high-tech and organized aesthetic.',
                details: 'Examples: Type (conference keynote, awards gala, trade show, product launch), Venue (hotel ballroom, convention center, outdoor amphitheater), Branding (large screens, banners, branded podium), Seating (theater style, round tables, lounge areas).'
            },
            {
                goal: 'Birthday Party Detail',
                template: 'Fun and colorful close-up of [Party Detail] for a [Age Group] birthday, vibrant [Color Theme], balloons and streamers in background, [Action/Moment] captured, joyous and festive mood, high energy photography.',
                details: 'Examples: Detail (cake table with candles, gift pile, party favors), Age Group (kids, sweet 16, milestone 50th), Color Theme (rainbow, pastel unicorn, black and gold, superheroes), Action (blowing candles, popping confetti).'
            },
            {
                goal: 'Floral Arrangement Showcase',
                template: 'Artistic still life of a huge [Flower Type] arrangement for an event, placed on a [Surface], [Lighting] highlighting textures and colors, blurred background context, showcasing the florist\'s artistry and design capability.',
                details: 'Examples: Flower Type (wildflower arch, white rose centerpiece, tropical installation), Surface (pedestal, entrance table, hung from ceiling).'
            },
            {
                goal: 'Catering Spread',
                template: 'Mouth-watering shot of an event [Catering Style], featuring [Food Items] beautifully displayed, [Serving Vessel] details, guests blurred in background interacting, abundance and variety, professional food photography.',
                details: 'Examples: Style (charcuterie grazing table, passed hors d\'oeuvres, buffet line, dessert wall), Food (artisan cheeses, mini sliders, macarons, sushi boats).'
            },
            {
                goal: 'Live Entertainment Moment',
                template: 'Action shot of [Entertainer] performing at an event, [Lighting Effects] framing them, crowd reaction visible in foreground (blurred), conveying energy and excitement, concert-quality event photography.',
                details: 'Examples: Entertainer (live band singer, DJ with hands in air, string quartet, keynote speaker), Lighting (spotlight, laser beams, warm stage wash).'
            }
        ]
    }
};

const PromptSelector = ({ onSelectPrompt }) => {
    const [selectedBusinessType, setSelectedBusinessType] = useState('');
    const [selectedPrompt, setSelectedPrompt] = useState(null);

    const handleBusinessTypeChange = (e) => {
        setSelectedBusinessType(e.target.value);
        setSelectedPrompt(null);
    };

    const handlePromptSelect = (prompt) => {
        setSelectedPrompt(prompt);
    };

    const handleInsertPrompt = () => {
        if (selectedPrompt) {
            onSelectPrompt(selectedPrompt.template);
        }
    };

    return (
        <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-6 rounded-lg shadow-sm border border-blue-100 mb-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-brand-blue" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                </svg>
                Prompt Templates
            </h3>

            {/* Business Type Dropdown */}
            <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                    Select Business Type
                </label>
                <select
                    value={selectedBusinessType}
                    onChange={handleBusinessTypeChange}
                    className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-brand-blue focus:border-transparent transition-all"
                >
                    <option value="">-- Choose a business type --</option>
                    <option value="restaurant">{PROMPT_DATA.restaurant.name}</option>
                    <option value="bakery">{PROMPT_DATA.bakery.name}</option>
                    <option value="realestate">{PROMPT_DATA.realestate.name}</option>
                    <option value="grocery">{PROMPT_DATA.grocery.name}</option>
                    <option value="cafe">{PROMPT_DATA.cafe.name}</option>
                    <option value="onlinebusiness">{PROMPT_DATA.onlinebusiness.name}</option>
                    <option value="menudesign">{PROMPT_DATA.menudesign.name}</option>
                    <option value="marketingflyer">{PROMPT_DATA.marketingflyer.name}</option>
                    <option value="fitness">{PROMPT_DATA.fitness.name}</option>
                    <option value="hotel">{PROMPT_DATA.hotel.name}</option>
                    <option value="fashion">{PROMPT_DATA.fashion.name}</option>
                    <option value="healthcare">{PROMPT_DATA.healthcare.name}</option>
                    <option value="eventplanning">{PROMPT_DATA.eventplanning.name}</option>
                </select>
            </div>

            {/* Prompt Templates Grid */}
            {selectedBusinessType && (
                <div className="space-y-3">
                    <label className="block text-sm font-medium text-gray-700">
                        Choose a Prompt Template
                    </label>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-96 overflow-y-auto">
                        {PROMPT_DATA[selectedBusinessType].prompts.map((prompt, index) => (
                            <div
                                key={index}
                                onClick={() => handlePromptSelect(prompt)}
                                className={`cursor-pointer p-4 rounded-lg border-2 transition-all hover:shadow-md ${
                                    selectedPrompt === prompt
                                        ? 'border-brand-blue bg-blue-50 shadow-md'
                                        : 'border-gray-200 bg-white hover:border-blue-300'
                                }`}
                            >
                                <div className="flex items-start justify-between mb-2">
                                    <h4 className="font-semibold text-gray-800 text-sm">{prompt.goal}</h4>
                                    {selectedPrompt === prompt && (
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-brand-blue" viewBox="0 0 20 20" fill="currentColor">
                                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                        </svg>
                                    )}
                                </div>
                                <p className="text-xs text-gray-600 mb-2 line-clamp-3">{prompt.template}</p>
                                <p className="text-xs text-gray-500 italic">💡 {prompt.details}</p>
                            </div>
                        ))}
                    </div>

                    {/* Insert Button */}
                    {selectedPrompt && (
                        <button
                            onClick={handleInsertPrompt}
                            className="w-full mt-4 bg-brand-blue hover:bg-blue-600 text-white font-semibold py-3 px-6 rounded-lg transition-colors flex items-center justify-center gap-2"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
                            </svg>
                            Use This Prompt
                        </button>
                    )}
                </div>
            )}
        </div>
    );
};

export default PromptSelector;
