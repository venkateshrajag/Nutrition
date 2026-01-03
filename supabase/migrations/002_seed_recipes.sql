-- Seed Recipes SQL Script
-- Alternative to TypeScript seeding script
-- Run this in Supabase SQL Editor

-- Insert all 14 recipes from Saffron Suvar Recipe Collection

-- BREAKFAST RECIPES
INSERT INTO recipes (title, category, prep_time, cook_time, calories, protein, carbs, fat, fiber, ingredients, instructions, dietary_tags, source_link) VALUES
('Moong Dal Idli', 'breakfast', 35, 10, 90, 7, 8, 4, 1, 
 '["Moong dal (1 cup)", "Oil (2 tbsp)", "Mustard seeds (1 tsp)", "Chana dal (½ tsp)", "Urad dal (½ tsp)", "Cumin seeds (1 tsp)", "Hing (pinch)", "Curry leaves", "Ginger (1 inch)", "Green chilli (3)", "Carrot (2 tbsp grated)", "Turmeric (¼ tsp)", "Rava coarse (1 cup)", "Curd (1 cup)", "Salt (1 tsp)", "Coriander (2 tbsp)", "Eno (1 tsp)", "Cashew for garnish"]'::jsonb,
 '["Soak moong dal for 2 hours", "Grind with curd to make batter", "Temper oil with mustard, cumin, dals, curry leaves", "Add ginger, chilli, carrot, turmeric", "Roast rava till aromatic", "Mix into batter and rest for 20 mins", "Add eno and coriander", "Steam for 10 mins with cashew garnish"]'::jsonb,
 ARRAY['vegetarian'], 'https://hebbarskitchen.com/moong-dal-idli-recipe/'),

('Quinoa Upma + Greek Yogurt', 'breakfast', 5, 15, 496, 31, 63, 14, 9,
 '["Quinoa (1 cup)", "Oil (1½ tbsp)", "Mustard seeds (¼ tsp)", "Cumin seeds (½ tsp)", "Chana dal (1 tbsp)", "Urad dal (½ tsp)", "Cashews (12-15)", "Curry leaves (1 sprig)", "Onion (⅓ cup)", "Ginger (½ tsp)", "Green chili (1-2)", "Carrot (½ cup)", "Green beans (¼ cup)", "Green peas (¼ cup)", "Salt (⅓ tsp)", "Turmeric (¼ tsp)", "Lemon juice", "Oikos Greek Yogurt 0% (1 cup/175g)"]'::jsonb,
 '["Rinse quinoa well", "Heat oil, add mustard, cumin, chana dal, urad dal and cashews", "Add curry leaves, ginger, chilies, onion", "Sauté vegetables", "Add turmeric, salt and quinoa", "Pour water and cook until absorbed", "Add lemon juice", "Serve with 1 cup Oikos Greek Yogurt"]'::jsonb,
 ARRAY['vegetarian', 'high-protein'], 'https://www.indianhealthyrecipes.com/quinoa-upma/'),

('Medu Vada + Greek Yogurt', 'breakfast', 30, 15, 228, 22, 16, 7, 2,
 '["Urad dal (1 cup)", "Salt (⅓ tsp)", "Ice cold water", "Oil for frying", "Black pepper crushed (¼-½ tsp, optional)", "Green chilli (2-3, optional)", "Ginger (1 tsp, optional)", "Curry leaves (1 sprig, optional)", "Cumin seeds (½ tsp, optional)", "Onion (4 tbsp, optional)", "Oikos Greek Yogurt 0% (1 cup/175g)"]'::jsonb,
 '["Soak urad dal for 4-5 hours", "Grind to thick fluffy batter with salt and ice water", "Beat to aerate", "Optional: add pepper, ginger, chilli, curry leaves, cumin, onion", "Shape into doughnuts", "Deep fry on medium flame till golden", "Serve with 1 cup Oikos Greek Yogurt"]'::jsonb,
 ARRAY['vegetarian', 'high-protein'], 'https://www.indianhealthyrecipes.com/medu-vada-recipe/'),

('Cottage Cheese Uttapam', 'breakfast', 30, 20, 355, 25, 58, 2, 10,
 '["Mung dal (¼ cup)", "Urad dal (¼ cup)", "Basmati rice (¼ cup)", "Fenugreek seeds (¼ tsp, optional)", "Cottage cheese low-fat (¾ cup)", "Water (½ cup for grinding + soaking)", "Cumin seeds (½ tsp)", "Ginger (1-inch)", "Green chilli (1)", "Salt (1 tsp)", "Baking soda (¼ tsp)", "Onion (1 small, diced)", "Tomato (1, diced)", "Cilantro (¼ cup)"]'::jsonb,
 '["Soak mung dal, urad dal, rice and fenugreek for 30 mins or overnight", "Blend with cottage cheese, water, cumin, ginger, chilli and salt to smooth batter", "Stir in baking soda", "Spread on greased hot pan", "Top with onion, tomato, cilantro", "Cook both sides till golden"]'::jsonb,
 ARRAY['vegetarian', 'high-protein'], 'https://ministryofcurry.com/cottage-cheese-uttapam/');

-- LUNCH RECIPES  
INSERT INTO recipes (title, category, prep_time, cook_time, calories, protein, carbs, fat, fiber, ingredients, instructions, dietary_tags, source_link) VALUES
('Egg Biryani + Greek Yogurt', 'lunch', 45, 30, 700, 34, 94, 19, 4,
 '["Basmati rice (2 cups)", "Coconut oil (3 tbsp)", "Ginger garlic paste (1 tbsp)", "Onion (1 cup)", "Green chilli (1-2)", "Boiled eggs (4-5)", "Tomato (1)", "Turmeric (¼ tsp)", "Red chilli powder (1 tsp)", "Garam/biryani masala (1 tbsp)", "Mint/coriander (¼ cup)", "Yogurt (6 tbsp)", "Salt (1+ tsp)", "Water (3.75-4 cups)", "Star anise (1)", "Bay leaf (1)", "Cumin seeds (½ tsp)", "Cardamom (4)", "Cloves (4)", "Cinnamon (1 inch)", "Oikos Greek Yogurt 0% (1 cup/175g)"]'::jsonb,
 '["Soak rice for 20-30 mins", "Boil eggs", "Temper coconut oil with whole spices", "Fry onion, chilli, ginger garlic", "Cook tomato, yogurt, spices, mint", "Add eggs and biryani masala", "Boil water with salt, add soaked rice", "Pressure cook 1 whistle or Instant Pot 5 mins", "Serve with 1 cup Oikos Greek Yogurt"]'::jsonb,
 ARRAY['high-protein'], 'https://www.indianhealthyrecipes.com/egg-biryani/'),

('Dal Vada', 'lunch', 25, 15, 90, 6, 16, 1, 7,
 '["Moong dal (¾ cup)", "Chana dal (¼ cup)", "Urad dal (2 tbsp)", "Garam masala (½-¾ tsp)", "Ginger garlic paste (1½ tsp)", "Onion (1)", "Green chilli (2-3)", "Red chilli (2, optional)", "Curry leaves (2 sprigs)", "Coriander (3 tbsp)", "Cumin seeds (½ tsp)", "Salt (½-¾ tsp)", "Oil for frying"]'::jsonb,
 '["Soak dals for 2 hours", "Grind coarse, keeping some whole", "Mix with onion, ginger garlic, garam masala, cumin, chilli, curry/coriander leaves and salt", "Shape into flat balls", "Deep fry or air fry 15-17 mins at 360°F"]'::jsonb,
 ARRAY['vegetarian', 'vegan'], 'https://www.indianhealthyrecipes.com/dal-vada-recipe/'),

('Besan Chilla', 'lunch', 15, 10, 124, 7, 18, 2, 3,
 '["Besan/chickpea flour (1 cup)", "Ajwain/carom seeds (½ tsp)", "Salt (⅓-½ tsp)", "Turmeric (⅛ tsp)", "Onion (3 tbsp)", "Tomato (3 tbsp)", "Green chilli (1)", "Ginger (1 tsp)", "Coriander (handful)", "Water (⅔-1 cup)", "Oil/ghee (2 tsp)"]'::jsonb,
 '["Mix besan with ajwain, turmeric and salt", "Add onion, tomato, ginger, chilli and coriander", "Add water to make thick pouring batter", "Spread thin on greased hot tawa", "Drizzle oil", "Cook both sides till golden"]'::jsonb,
 ARRAY['vegetarian', 'vegan', 'gluten-free'], 'https://www.indianhealthyrecipes.com/besan-chilla-recipe/'),

('Chana Chaat', 'lunch', 10, 30, 180, 9, 30, 3, 8,
 '["Chickpeas (1 cup)", "Onion (1 medium, chopped)", "Tomato (1 medium, chopped)", "Cucumber (½, chopped)", "Green chilli (1-2)", "Coriander leaves (2 tbsp)", "Chaat masala (1 tsp)", "Cumin powder (½ tsp)", "Red chilli powder (¼ tsp)", "Lemon juice (2 tbsp)", "Salt to taste"]'::jsonb,
 '["Soak chickpeas overnight", "Pressure cook until tender", "Mix with chopped onion, tomato, cucumber, green chilli and coriander", "Add chaat masala, cumin powder, red chilli powder, lemon juice and salt", "Toss well and serve fresh"]'::jsonb,
 ARRAY['vegetarian', 'vegan', 'gluten-free'], 'https://www.archanaskitchen.com/chana-chaat-recipe'),

('Egg Dosa (Muttai Dosa)', 'lunch', 15, 10, 465, 30, 59, 11, 22,
 '["Dosa batter (1 cup)", "Eggs (2)", "Onion (¼ cup, chopped)", "Green chilies (2, chopped)", "Coriander leaves (2 tbsp)", "Carrot (2-3 tbsp grated, optional)", "Oil (1½ tbsp)", "Salt as needed"]'::jsonb,
 '["Spread dosa batter on hot greased tawa", "Pour egg in center, break yolk and spread evenly", "Add chopped onions, green chilies, coriander", "Drizzle oil around edges and over toppings", "Cook till base is firm", "Flip and cook other side till crispy", "Serve hot"]'::jsonb,
 ARRAY['high-protein'], 'https://www.indianhealthyrecipes.com/egg-dosa-recipe/');

-- DINNER RECIPES
INSERT INTO recipes (title, category, prep_time, cook_time, calories, protein, carbs, fat, fiber, ingredients, instructions, dietary_tags, source_link) VALUES
('Soya Chunks Curry', 'dinner', 25, 15, 244, 20, 20, 8, 8,
 '["Soya chunks (1¼ cup)", "Oil (1½-2 tbsp)", "Cumin seeds (½ tsp)", "Mustard seeds (pinch)", "Curry leaves (1 sprig)", "Onion (1 cup)", "Green chilli (1)", "Ginger garlic paste (1½ tsp)", "Tomatoes (1½ cup/2 large)", "Coconut (¼ cup) or cashews (10)", "Red chilli powder (¾-1 tsp)", "Garam masala (¾-1 tsp)", "Coriander powder (¾-1 tsp)", "Turmeric (⅛ tsp)", "Salt (½-¾ tsp)", "Coriander leaves (2 tbsp)"]'::jsonb,
 '["Boil soya chunks in water till soft, squeeze out water", "Blend tomatoes with coconut", "Temper oil with cumin, mustard, curry leaves", "Sauté onions till golden, add ginger garlic", "Add tomato-coconut paste, cook till thick", "Add spices and soya chunks", "Simmer 5-8 mins"]'::jsonb,
 ARRAY['vegetarian', 'vegan', 'high-protein'], 'https://www.indianhealthyrecipes.com/soya-chunks-curry/'),

('Egg Bhurji (Coconut Oil)', 'dinner', 15, 10, 180, 14, 4, 12, 1,
 '["Eggs (4-5)", "Coconut oil (2 tbsp)", "Cumin seeds (½ tsp)", "Curry leaves (1 sprig)", "Onion (1 medium)", "Green chilli (2)", "Ginger (½ inch)", "Tomato (1 medium)", "Turmeric (¼ tsp)", "Red chilli powder (½ tsp)", "Coriander leaves", "Salt to taste"]'::jsonb,
 '["Heat coconut oil, add cumin and curry leaves", "Sauté onion, green chilli, ginger until soft", "Add tomato, turmeric, red chilli and salt", "Cook until tomatoes soften", "Add beaten eggs", "Scramble on low heat until cooked", "Garnish with coriander"]'::jsonb,
 ARRAY['high-protein', 'low-carb'], 'https://www.indianhealthyrecipes.com/egg-bhurji/'),

('Protein Oats Khichdi', 'dinner', 25, 15, 280, 14, 42, 6, 8,
 '["Rolled oats (½ cup)", "Moong dal (½ cup)", "Ghee (1 tbsp)", "Cumin seeds (½ tsp)", "Mustard seeds (¼ tsp)", "Onion (1 small)", "Ginger (1 tsp)", "Green chilli (1)", "Turmeric (¼ tsp)", "Mixed vegetables (½ cup)", "Water (3 cups)", "Salt to taste", "Lemon juice", "Coriander"]'::jsonb,
 '["Sauté cumin, mustard in ghee", "Add onion, ginger, green chilli", "Add moong dal, oats, turmeric, vegetables and water", "Pressure cook or simmer until dal is soft", "Season with salt, lemon juice and coriander"]'::jsonb,
 ARRAY['vegetarian', 'high-protein'], 'https://ministryofcurry.com/protein-oats-khichdi/'),

('Chana Masala', 'dinner', 40, 30, 260, 12, 38, 7, 10,
 '["Chickpeas (1½ cups)", "Onion (2 medium)", "Tomatoes (3)", "Ginger (1½ inch)", "Garlic (5-6 cloves)", "Green chilli (2)", "Oil (3 tbsp)", "Cumin seeds (1 tsp)", "Bay leaf (1)", "Cinnamon (1 inch)", "Cloves (3)", "Chana masala (1½ tbsp)", "Red chilli powder (¾ tsp)", "Coriander powder (1 tsp)", "Amchur/dry mango powder (1 tsp)", "Salt", "Coriander leaves"]'::jsonb,
 '["Soak and cook chickpeas", "Blend onion-tomato masala", "Sauté whole spices", "Add masala and cook until oil separates", "Add chickpeas, chana masala powder, amchur", "Simmer until thick", "Garnish with coriander and ginger"]'::jsonb,
 ARRAY['vegetarian', 'vegan', 'gluten-free'], 'https://www.indianhealthyrecipes.com/chana-masala-recipe/'),

('Rajma Masala', 'dinner', 45, 30, 290, 13, 42, 8, 11,
 '["Rajma/kidney beans (1 cup)", "Onion (2 medium)", "Tomatoes (3 medium)", "Ginger-garlic paste (1 tbsp)", "Oil/ghee (3 tbsp)", "Cumin seeds (1 tsp)", "Bay leaf (1)", "Red chilli powder (1 tsp)", "Coriander powder (1 tsp)", "Garam masala (½ tsp)", "Kasuri methi/dried fenugreek leaves (1 tsp)", "Cream (2 tbsp, optional)", "Salt", "Coriander leaves"]'::jsonb,
 '["Soak and pressure cook rajma until soft", "Sauté onion, ginger-garlic until golden", "Add tomato puree, cook until oil separates", "Add spices, cooked rajma with liquid", "Simmer until thick and creamy", "Finish with cream and coriander"]'::jsonb,
 ARRAY['vegetarian', 'vegan', 'gluten-free'], 'https://www.indianhealthyrecipes.com/rajma-masala-recipe/');

-- Verify insertion
SELECT category, COUNT(*) as count FROM recipes GROUP BY category ORDER BY category;
