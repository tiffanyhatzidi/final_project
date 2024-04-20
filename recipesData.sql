insert into ingredients (ingredient) values ('barley rusks');
insert into ingredients (ingredient) values ('tomatoes');
insert into ingredients (ingredient) values ('feta');
insert into ingredients (ingredient) values ('kalamata olives');
insert into ingredients (ingredient) values ('oregano');
insert into ingredients (ingredient) values ('olive oil');
insert into ingredients (ingredient) values ('balsamic vinaigrette');

insert into recipes (recipe_name, instructions, time_taken) 
    values ('dakos salad',
             '1. Start by soaking the rusks in water to soften them as needed. \n 2. Then cut the rusks and tomatoes into bite size chunks. \n 3. Pit the olives as needed and cut into small pieces. crumble the feta on top and mix all together with the remaining ingredients as desired.',
             interval '10 minutes');

insert into ingredients_recipes values (default, (select id from recipes where recipe_name = 'dakos salad'),
                                        (select id from ingredients where ingredient = 'barley rusks'), 
                                        '2 whole');
insert into ingredients_recipes values (default, (select id from recipes where recipe_name = 'dakos salad'),
                                        (select id from ingredients where ingredient = 'tomatoes'),
                                        '2 large');
insert into ingredients_recipes values (default, (select id from recipes where recipe_name = 'dakos salad'),
                                        (select id from ingredients where ingredient = 'feta'));

insert into ingredients_recipes values (default, (select id from recipes where recipe_name = 'dakos salad'),
                                        (select id from ingredients where ingredient = 'kalamata olives'));

insert into ingredients_recipes values (default, (select id from recipes where recipe_name = 'dakos salad'),
                                        (select id from ingredients where ingredient = 'oregano'));

insert into ingredients_recipes values (default, (select id from recipes where recipe_name = 'dakos salad'),
                                        (select id from ingredients where ingredient = 'olive oil'));

insert into ingredients_recipes values (default, (select id from recipes where recipe_name = 'dakos salad'),
                                        (select id from ingredients where ingredient = 'balsamic vinaigrette'));
