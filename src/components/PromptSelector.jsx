import React, { useState } from 'react';

const PROMPT_DATA = {
    restaurant: {
        name: '🍽️ Restaurant Prompts (Focus: Food & Ambiance)',
        prompts: [
            {
                goal: 'Hero Dish (Close-up)',
                template: 'Professional food photography of a [Dish Name], overhead view, on a rustic wooden table, with soft natural window light, shallow depth of field.',
                details: 'Dish Name (e.g., Spicy Pad Thai), Table/Plate (e.g., slate plate, white linen), Garnish (e.g., fresh basil leaves).'
            },
            {
                goal: 'Vibrant Cocktail',
                template: 'Photorealistic image of a bright red cocktail in a coupe glass, with a subtle smoke effect, set against a dark, moody bar background, cinematic lighting.',
                details: 'Color/Glass (e.g., gold rimmed glass, emerald martini), Effect (e.g., frost, fizz), Lighting (e.g., neon blue glow).'
            },
            {
                goal: 'Cozy Interior',
                template: 'Architectural rendering of a busy, cozy restaurant interior, with exposed brick and warm pendant lighting, a mix of laughing patrons, golden hour glow.',
                details: 'Interior Style (e.g., modern minimalist, vintage diner), Action (e.g., staff serving, people clinking glasses).'
            },
            {
                goal: 'Kitchen Action',
                template: 'Black and white candid photo of a chef plating a dish with intense focus, stainless steel kitchen background, dramatic rim lighting, high contrast.',
                details: 'Chef Action (e.g., tossing pasta, chopping vegetables), Lighting (e.g., soft shadows, industrial light).'
            }
        ]
    },
    bakery: {
        name: '🥐 Bakery Prompts (Focus: Texture & Freshness)',
        prompts: [
            {
                goal: 'Freshly Baked Goods',
                template: 'Close-up, high-detail product photo of a stack of chocolate croissants, steam rising gently, on a flour-dusted marble counter, morning sunlight, macro lens.',
                details: 'Item (e.g., sourdough loaf, glazed donuts), Surface (e.g., baking sheet, cooling rack), Detail (e.g., perfect crackle, melting butter).'
            },
            {
                goal: 'Seasonal Dessert',
                template: 'Flat lay composition of a pumpkin spice cake slice and a mug of coffee, styled with autumn leaves and cinnamon sticks, warm, soft lighting, Instagram-ready.',
                details: 'Season/Holiday (e.g., Christmas cookies, summer berry tart), Props (e.g., gift wrapping, twinkle lights).'
            },
            {
                goal: 'Bakery Counter Display',
                template: 'Bright, inviting photo of a full bakery display case, abundant with colorful pastries and cakes, chalkboard menu in the background, clean, sharp focus.',
                details: 'Counter Material (e.g., glass display, wooden shelves), Vibe (e.g., bustling, peaceful, vintage).'
            },
            {
                goal: 'Branded Packaging',
                template: 'Product mockup of a branded pastry box with a minimalist logo, tied with natural twine, on a pastel color background, studio lighting.',
                details: 'Packaging Type (e.g., coffee cup, brown paper bag), Color Palette (e.g., brand\'s colors), Style (e.g., watercolor, simple line art).'
            }
        ]
    },
    realestate: {
        name: '🏡 Real Estate Prompts (Focus: Aspiration & Detail)',
        prompts: [
            {
                goal: 'Luxury Kitchen',
                template: 'Photorealistic architectural visualization of a modern open-concept kitchen, with white marble countertops and gold fixtures, sunlight streaming through floor-to-ceiling windows, no people, 8k resolution.',
                details: 'Style (e.g., farmhouse, mid-century modern), Key Feature (e.g., oversized island, custom cabinetry), Time of Day (e.g., golden hour, bright noon).'
            },
            {
                goal: 'Exterior/Curb Appeal',
                template: 'Drone shot of a [Style] house exterior at twilight, perfectly manicured lawn, warm light glowing from the windows, HDR photography.',
                details: 'Style (e.g., colonial, Spanish stucco), Season (e.g., spring blooms, dusting of snow), Angle (e.g., straight-on, corner view).'
            },
            {
                goal: 'Virtual Staging (Blank Room)',
                template: 'Interior design concept of an empty living room with a large fireplace, virtually staged with Scandinavian furniture and neutral tones, photorealistic rendering.',
                details: 'Room Type (e.g., master bedroom, home office), Staging Style (e.g., luxury minimalist, colorful eclectic).'
            },
            {
                goal: 'Neighborhood Vibe',
                template: 'Lifestyle photo of people walking dogs on a tree-lined street with historic homes in the background, soft, sunny day, bokeh effect, focus on community.',
                details: 'Activity (e.g., kids playing, families at a local park), Location Detail (e.g., mountain view, beach access), Mood (e.g., calm, energetic).'
            }
        ]
    },
    grocery: {
        name: '🛒 Grocery Prompts (Focus: Freshness & Organization)',
        prompts: [
            {
                goal: 'Produce Display',
                template: 'Top-down flat lay of a colorful variety of fresh organic vegetables and fruits, misted with water droplets, arranged on a rustic wooden crate, vibrant natural light.',
                details: 'Item Focus (e.g., heirloom tomatoes, citrus fruits), Arrangement (e.g., pyramid stack, scattered), Detail (e.g., clear water droplets).'
            },
            {
                goal: 'Branded Product Shelf',
                template: 'Clean, commercial photography of a shelf stocked perfectly with our brand\'s [Product Category], focusing on consistent packaging and bold colors, bright white store lighting.',
                details: 'Product Category (e.g., artisan jams, craft beer), Shelf Detail (e.g., wooden shelf, price tags).'
            },
            {
                goal: 'Sustainable Shopping',
                template: 'Lifestyle image of a person with a reusable canvas bag filling it with bulk grains at a sustainable grocery, soft-focus background, earthy tones.',
                details: 'Action (e.g., using a refill station, comparing labels), Demographic (e.g., young woman, older gentleman).'
            },
            {
                goal: 'Checkout/Service',
                template: 'Candid, warm photo of a smiling cashier interacting with a customer at the checkout, soft ambient lighting, focus on friendly service.',
                details: 'Interaction (e.g., hand receiving change, bagging groceries), Atmosphere (e.g., small-town store, bustling market).'
            }
        ]
    },
    cafe: {
        name: '☕ Cafe Prompts (Focus: Comfort & Product)',
        prompts: [
            {
                goal: 'Latte Art/Product',
                template: 'Extreme close-up photo of a steaming latte with intricate rosetta latte art, on a wicker table with a blurred background of a cozy cafe interior, warm volumetric light.',
                details: 'Art Detail (e.g., perfect foam, dark espresso edge), Mug Type (e.g., ceramic mug, glass cup), Surface (e.g., marble, worn wood).'
            },
            {
                goal: 'Working in the Cafe',
                template: 'Aspirational lifestyle photo of a person working on a laptop at a small table near a window, coffee and pastry nearby, soft diffused light, shallow depth of field.',
                details: 'Action (e.g., writing in a notebook, reading a book), Time of Day (e.g., overcast day, late afternoon).'
            },
            {
                goal: 'Exterior View',
                template: 'Charming street-level photograph of a small, European-style cafe exterior, bicycle parked nearby, colorful flower boxes in the window, sunny morning.',
                details: 'Architecture (e.g., French bistro, modern glass front), Signage (e.g., hand-painted sign, neon lettering).'
            },
            {
                goal: 'The Moment',
                template: 'Candid photo of two friends laughing over coffee, their hands holding mugs, focus on hands and mugs, warm filter, bokeh background.',
                details: 'Subject Interaction (e.g., deep conversation, reading the paper), Filter/Vibe (e.g., vintage film, moody black and white).'
            }
        ]
    },
    onlinebusiness: {
        name: '💻 Online Business Prompts (Focus: Digital & Solution)',
        prompts: [
            {
                goal: 'Digital Product',
                template: '3D rendered mockup of a clean, user-friendly mobile app interface floating above a minimalist workstation, vibrant blue and white color scheme, futuristic lighting.',
                details: 'Product Type (e.g., e-commerce website, SaaS dashboard), Color Palette (e.g., brand colors), Setting (e.g., abstract background, city skyline).'
            },
            {
                goal: 'Entrepreneurship/Work',
                template: 'Aspirational lifestyle image of a diverse young professional working on a laptop overlooking a high-rise city view, early morning light, sense of achievement and focus.',
                details: 'Location (e.g., modern home office, sleek co-working space), Subject (e.g., person of specific gender/ethnicity), Mood (e.g., determined, relaxed).'
            },
            {
                goal: 'Data/Strategy',
                template: 'Abstract illustration of connecting nodes and glowing lines forming a complex strategy map or brain structure, dark background, science fiction style.',
                details: 'Concept (e.g., financial growth, cybersecurity), Style (e.g., geometric, wireframe).'
            },
            {
                goal: 'Team Collaboration',
                template: 'Professional photo of a diverse remote team on a video call grid on a monitor, with one person in the foreground smiling, bright, collaborative atmosphere.',
                details: 'Setting (e.g., coffee shop, individual desks), Focus (e.g., laughing, discussing a chart).'
            }
        ]
    },
    menudesign: {
        name: '📄 Menu Design Prompts (Focus: Layout & Aesthetic)',
        prompts: [
            {
                goal: 'Elegant Restaurant Menu',
                template: 'High-resolution digital design mockup of a trifold menu, minimalist, typography-focused layout, against a dark wooden background, utilizing gold foil accents and serif fonts, elegant, simple aesthetic.',
                details: 'Menu Type (e.g., single page, bound book), Material (e.g., textured paper, leather), Colors/Style (e.g., Art Deco, bright modern, distressed vintage).'
            },
            {
                goal: 'Bakery Menu Board',
                template: 'Photorealistic image of a large, wall-mounted chalkboard menu in a bakery, listing items like coffee and pastries in clean handwritten script, with small illustrative icons next to the names, warm, diffused lighting.',
                details: 'Display Type (e.g., backlit digital screen, hanging scroll), Font Style (e.g., whimsical script, bold block letters).'
            },
            {
                goal: 'Cafe Drinks Menu',
                template: 'Clean, flat lay composition of a square menu card, designed with a soft pastel color gradient (mint and peach), incorporating a simple line drawing of a coffee bean, ready for text insertion.',
                details: 'Shape/Size (e.g., long narrow list, A5 card), Graphic Element (e.g., watercolor splash, geometric pattern).'
            },
            {
                goal: 'Modern Digital Menu',
                template: 'Sleek UI/UX design mockup of a tablet-based digital menu interface, showing different food categories (e.g., Appetizers, Entrees), with high-contrast buttons and small placeholder image thumbnails, cyberpunk lighting.',
                details: 'Platform (e.g., website page, mobile app screen), Color Scheme (e.g., dark mode, neon accents).'
            }
        ]
    },
    marketingflyer: {
        name: '📢 Marketing Flyer Prompts (Focus: Attention & Promotion)',
        prompts: [
            {
                goal: 'Real Estate Open House Flyer',
                template: 'High-impact promotional flyer design, A4 size, featuring a small inset photo of a modern house in the top corner, bold, geometric layout using bright blue and white, with clear section areas for headlines, clean, sharp design.',
                details: 'Promotion Type (e.g., New Listing, Price Reduction), Color Palette (e.g., deep burgundy and cream), Font Style (e.g., clean sans-serif).'
            },
            {
                goal: 'Grand Opening Flyer',
                template: 'Vibrant, energetic poster design, A3 size, for a bakery grand opening, using a hand-drawn illustration of celebratory confetti and balloons, bold retro script typography (placeholder text "Grand Opening"), high-saturation colors.',
                details: 'Event Type (e.g., Seasonal Sale, New Product Launch), Style (e.g., cartoon art, vintage travel poster).'
            },
            {
                goal: 'Grocery Store Weekly Deal Flyer',
                template: 'Magazine-style ad layout, two-column design, with bright, appealing photographs of discounted items (e.g., fruit, meat) and large, visible price tag icons (placeholder numbers), red and yellow theme, clear hierarchy.',
                details: 'Category Focus (e.g., meat department, organic foods), Layout Style (e.g., newspaper ad, colorful brochure).'
            },
            {
                goal: 'Online Business Service Ad',
                template: 'Minimalist digital banner ad (1080x1080), featuring an abstract soft gradient background (purple and teal), a single line icon representing connectivity, and large placeholder text area for a call to action, Web 3.0 aesthetic.',
                details: 'Platform (e.g., Facebook ad, website footer banner), Icon/Symbol (e.g., target, lightbulb).'
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
