# 6.0 DATABASE DESIGN

## 6.1 Entity Relationship Diagram

### Database Schema Overview

The SynChef database is designed to support a comprehensive recipe management, cooking guidance, and cultural culinary exploration platform. The schema emphasizes recipe organization, ingredient management, step-by-step cooking instructions with timers, and user personalization.

---

## Detailed Relationships

### One-to-Many Relationships:
- **Country → Recipes**: Each country has multiple traditional recipes
- **Country → Ingredients**: Each country has multiple traditional ingredients
- **Recipe → RecipeIngredients**: Each recipe contains multiple ingredients
- **Recipe → Steps**: Each recipe has multiple cooking steps
- **Ingredient → RecipeIngredients**: Each ingredient can be used in multiple recipes

### Many-to-Many Relationships:
- **Recipe ↔ Category**: Recipes can belong to multiple categories (via `recipe_categories` join table)

### One-to-One/Special Relationships:
- **User → FavoriteRecipes**: Users can favorite multiple recipes (stored as collection)
- **User → DietaryRestrictions**: Users can have multiple dietary restrictions
- **User → Allergies**: Users can specify multiple allergies
- **Ingredient → Substitutions**: Ingredients can have multiple substitutes

---

## Key Tables

### Core Entity Tables:

1. **users** - User accounts, authentication, and personalization
2. **recipes** - Recipe catalog with timing and difficulty information
3. **ingredients** - Ingredient catalog with origin and substitution data
4. **countries** - Country/cuisine information with geographic data
5. **categories** - Recipe classification (Vegan, Dessert, Main Course, etc.)
6. **steps** - Individual cooking instructions with timer support
7. **recipe_ingredients** - Junction table linking recipes to ingredients with quantities

### Supporting Collection Tables:

8. **recipe_categories** - Junction table for recipe-category relationships
9. **user_dietary_restrictions** - User dietary preferences
10. **user_allergies** - User allergen information
11. **user_favorite_recipes** - User's saved/favorited recipes
12. **ingredient_substitutions** - Alternative ingredients for substitution

---

## Table Structure Summary

●	users: id, email, username, password, full_name, profile_image_url, email_verified, active, preferred_unit_system, skill_level, created_at, updated_at

●	countries: id, name, code, continent, description, flag_emoji, latitude, longitude

●	recipes: id, name, description, country_id, prep_time_minutes, cook_time_minutes, total_time_minutes, default_servings, difficulty_level, image_url, cultural_context, created_at, updated_at

●	ingredients: id, name, description, country_id, is_traditional, category, image_url, allergen_info

●	steps: id, recipe_id, order_index, instruction, has_timer, timer_seconds, timer_label, is_parallel, parallel_group, image_url, tips, temperature, scales_with_servings

●	recipe_ingredients: id, recipe_id, ingredient_id, quantity, unit, order_index, preparation, is_optional, notes

●	categories: id, name, description, icon_name, color_code

●	recipe_categories: recipe_id, category_id

●	user_dietary_restrictions: user_id, restriction

●	user_allergies: user_id, allergen

●	user_favorite_recipes: user_id, recipe_id

●	ingredient_substitutions: ingredient_id, substitute_name

---

## Table Structure Details

### 1. users
**Purpose**: Store user account information and preferences

| Column Name | Data Type | Constraints | Description |
|-------------|-----------|-------------|-------------|
| id | BIGINT | PRIMARY KEY, AUTO_INCREMENT | Unique user identifier |
| email | VARCHAR(100) | NOT NULL, UNIQUE | User email address |
| username | VARCHAR(100) | NOT NULL, UNIQUE | Unique username |
| password | VARCHAR(255) | NULL | Hashed password (bcrypt) |
| full_name | VARCHAR(200) | NOT NULL | User's full name |
| profile_image_url | VARCHAR(255) | NULL | Profile picture URL |
| email_verified | BOOLEAN | NOT NULL, DEFAULT false | Email verification status |
| active | BOOLEAN | NOT NULL, DEFAULT true | Account active status |
| preferred_unit_system | VARCHAR(20) | DEFAULT 'METRIC' | METRIC or IMPERIAL |
| skill_level | VARCHAR(20) | DEFAULT 'BEGINNER' | BEGINNER, INTERMEDIATE, ADVANCED |
| created_at | TIMESTAMP | NOT NULL, AUTO | Account creation timestamp |
| updated_at | TIMESTAMP | NOT NULL, AUTO | Last update timestamp |

**Indexes**:
- PRIMARY KEY (id)
- UNIQUE INDEX (email)
- UNIQUE INDEX (username)

---

### 2. recipes
**Purpose**: Store complete recipe information

| Column Name | Data Type | Constraints | Description |
|-------------|-----------|-------------|-------------|
| id | BIGINT | PRIMARY KEY, AUTO_INCREMENT | Unique recipe identifier |
| name | VARCHAR(200) | NOT NULL | Recipe name |
| description | TEXT | NULL | Recipe description |
| country_id | BIGINT | FOREIGN KEY, NOT NULL | Reference to countries table |
| prep_time_minutes | INTEGER | NOT NULL | Preparation time in minutes |
| cook_time_minutes | INTEGER | NOT NULL | Cooking time in minutes |
| total_time_minutes | INTEGER | NOT NULL | Total time in minutes |
| default_servings | INTEGER | NOT NULL | Default number of servings |
| difficulty_level | VARCHAR(20) | NULL | Easy, Medium, Hard |
| image_url | VARCHAR(500) | NULL | Recipe image URL |
| cultural_context | TEXT | NULL | Cultural background information |
| created_at | TIMESTAMP | NOT NULL, AUTO | Recipe creation timestamp |
| updated_at | TIMESTAMP | AUTO | Last update timestamp |

**Indexes**:
- PRIMARY KEY (id)
- FOREIGN KEY (country_id) REFERENCES countries(id)
- INDEX (difficulty_level)
- INDEX (country_id)

**Relationships**:
- MANY-TO-ONE with countries
- ONE-TO-MANY with recipe_ingredients
- ONE-TO-MANY with steps
- MANY-TO-MANY with categories

---

### 3. ingredients
**Purpose**: Store ingredient catalog with origin and substitution information

| Column Name | Data Type | Constraints | Description |
|-------------|-----------|-------------|-------------|
| id | BIGINT | PRIMARY KEY, AUTO_INCREMENT | Unique ingredient identifier |
| name | VARCHAR(200) | NOT NULL, UNIQUE | Ingredient name |
| description | VARCHAR(500) | NULL | Ingredient description |
| country_id | BIGINT | FOREIGN KEY, NULL | Origin country reference |
| is_traditional | BOOLEAN | DEFAULT false | Culture-specific ingredient flag |
| category | VARCHAR(50) | NULL | Vegetables, Spices, Proteins, etc. |
| image_url | VARCHAR(500) | NULL | Ingredient image URL |
| allergen_info | VARCHAR(200) | NULL | Allergen information |

**Indexes**:
- PRIMARY KEY (id)
- UNIQUE INDEX (name)
- FOREIGN KEY (country_id) REFERENCES countries(id)
- INDEX (category)
- INDEX (is_traditional)

**Relationships**:
- MANY-TO-ONE with countries
- ONE-TO-MANY with recipe_ingredients
- ONE-TO-MANY with ingredient_substitutions

---

### 4. countries
**Purpose**: Store country/cuisine information with geographic data

| Column Name | Data Type | Constraints | Description |
|-------------|-----------|-------------|-------------|
| id | BIGINT | PRIMARY KEY, AUTO_INCREMENT | Unique country identifier |
| name | VARCHAR(100) | NOT NULL, UNIQUE | Country name |
| code | VARCHAR(50) | NOT NULL | ISO country code (e.g., PH, IT, MX) |
| continent | VARCHAR(50) | NOT NULL | Continent name |
| description | VARCHAR(500) | NULL | Country culinary description |
| flag_emoji | VARCHAR(10) | NULL | Flag emoji character |
| latitude | DOUBLE | NOT NULL | Geographic latitude |
| longitude | DOUBLE | NOT NULL | Geographic longitude |

**Indexes**:
- PRIMARY KEY (id)
- UNIQUE INDEX (name)
- INDEX (continent)
- INDEX (code)

**Relationships**:
- ONE-TO-MANY with recipes
- ONE-TO-MANY with ingredients

---

### 5. categories
**Purpose**: Recipe classification and organization

| Column Name | Data Type | Constraints | Description |
|-------------|-----------|-------------|-------------|
| id | BIGINT | PRIMARY KEY, AUTO_INCREMENT | Unique category identifier |
| name | VARCHAR(50) | NOT NULL, UNIQUE | Category name |
| description | VARCHAR(500) | NULL | Category description |
| icon_name | VARCHAR(50) | NULL | Icon identifier for UI |
| color_code | VARCHAR(7) | NULL | Hex color code for UI |

**Indexes**:
- PRIMARY KEY (id)
- UNIQUE INDEX (name)

**Relationships**:
- MANY-TO-MANY with recipes (via recipe_categories)

---

### 6. steps
**Purpose**: Individual cooking instructions with timer support

| Column Name | Data Type | Constraints | Description |
|-------------|-----------|-------------|-------------|
| id | BIGINT | PRIMARY KEY, AUTO_INCREMENT | Unique step identifier |
| recipe_id | BIGINT | FOREIGN KEY, NOT NULL | Reference to recipes table |
| order_index | INTEGER | NOT NULL | Step sequence number |
| instruction | TEXT | NOT NULL | Cooking instruction text |
| has_timer | BOOLEAN | NOT NULL, DEFAULT false | Timer requirement flag |
| timer_seconds | INTEGER | NULL | Timer duration in seconds |
| timer_label | VARCHAR(100) | NULL | Timer description |
| is_parallel | BOOLEAN | DEFAULT false | Can execute simultaneously flag |
| parallel_group | INTEGER | NULL | Parallel execution group ID |
| image_url | VARCHAR(500) | NULL | Step illustration URL |
| tips | TEXT | NULL | Pro tips for this step |
| temperature | VARCHAR(50) | NULL | Required temperature |
| scales_with_servings | BOOLEAN | DEFAULT false | Timer scales with servings flag |

**Indexes**:
- PRIMARY KEY (id)
- FOREIGN KEY (recipe_id) REFERENCES recipes(id) ON DELETE CASCADE
- INDEX (recipe_id, order_index)
- INDEX (has_timer)

**Relationships**:
- MANY-TO-ONE with recipes

---

### 7. recipe_ingredients
**Purpose**: Junction table linking recipes to ingredients with quantities

| Column Name | Data Type | Constraints | Description |
|-------------|-----------|-------------|-------------|
| id | BIGINT | PRIMARY KEY, AUTO_INCREMENT | Unique identifier |
| recipe_id | BIGINT | FOREIGN KEY, NOT NULL | Reference to recipes table |
| ingredient_id | BIGINT | FOREIGN KEY, NOT NULL | Reference to ingredients table |
| quantity | DECIMAL(10,2) | NOT NULL | Ingredient quantity |
| unit | VARCHAR(50) | NOT NULL | Measurement unit |
| order_index | INTEGER | NOT NULL | Display order |
| preparation | VARCHAR(200) | NULL | Preparation method |
| is_optional | BOOLEAN | DEFAULT false | Optional ingredient flag |
| notes | TEXT | NULL | Additional notes |

**Indexes**:
- PRIMARY KEY (id)
- FOREIGN KEY (recipe_id) REFERENCES recipes(id) ON DELETE CASCADE
- FOREIGN KEY (ingredient_id) REFERENCES ingredients(id)
- INDEX (recipe_id, order_index)

**Relationships**:
- MANY-TO-ONE with recipes
- MANY-TO-ONE with ingredients

---

### 8. recipe_categories
**Purpose**: Junction table for many-to-many recipe-category relationship

| Column Name | Data Type | Constraints | Description |
|-------------|-----------|-------------|-------------|
| recipe_id | BIGINT | FOREIGN KEY, NOT NULL | Reference to recipes table |
| category_id | BIGINT | FOREIGN KEY, NOT NULL | Reference to categories table |

**Indexes**:
- PRIMARY KEY (recipe_id, category_id)
- FOREIGN KEY (recipe_id) REFERENCES recipes(id) ON DELETE CASCADE
- FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE CASCADE
- INDEX (category_id)

---

### 9. user_dietary_restrictions
**Purpose**: Store user dietary preferences

| Column Name | Data Type | Constraints | Description |
|-------------|-----------|-------------|-------------|
| user_id | BIGINT | FOREIGN KEY, NOT NULL | Reference to users table |
| restriction | VARCHAR(50) | NOT NULL | Dietary restriction name |

**Indexes**:
- FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
- INDEX (user_id)

---

### 10. user_allergies
**Purpose**: Store user allergen information

| Column Name | Data Type | Constraints | Description |
|-------------|-----------|-------------|-------------|
| user_id | BIGINT | FOREIGN KEY, NOT NULL | Reference to users table |
| allergen | VARCHAR(50) | NOT NULL | Allergen name |

**Indexes**:
- FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
- INDEX (user_id)

---

### 11. user_favorite_recipes
**Purpose**: Store user's favorited recipes

| Column Name | Data Type | Constraints | Description |
|-------------|-----------|-------------|-------------|
| user_id | BIGINT | FOREIGN KEY, NOT NULL | Reference to users table |
| recipe_id | BIGINT | NOT NULL | Reference to recipes table |

**Indexes**:
- FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
- INDEX (user_id)
- INDEX (recipe_id)

---

### 12. ingredient_substitutions
**Purpose**: Store ingredient substitution suggestions

| Column Name | Data Type | Constraints | Description |
|-------------|-----------|-------------|-------------|
| ingredient_id | BIGINT | FOREIGN KEY, NOT NULL | Reference to ingredients table |
| substitute_name | VARCHAR(200) | NOT NULL | Substitute ingredient name |

**Indexes**:
- FOREIGN KEY (ingredient_id) REFERENCES ingredients(id) ON DELETE CASCADE
- INDEX (ingredient_id)

---

## Entity Relationship Diagram (ERD)

```
┌─────────────────┐
│    COUNTRIES    │
├─────────────────┤
│ PK id           │
│    name         │◄────┐
│    code         │     │
│    continent    │     │
│    description  │     │
│    flag_emoji   │     │
│    latitude     │     │
│    longitude    │     │
└─────────────────┘     │
         │              │
         │ 1:N          │ 1:N
         │              │
         ▼              │
┌─────────────────┐     │         ┌──────────────────────┐
│    RECIPES      │     │         │    INGREDIENTS       │
├─────────────────┤     │         ├──────────────────────┤
│ PK id           │     │         │ PK id                │
│    name         │     └─────────┤ FK country_id        │
│    description  │               │    name              │
│ FK country_id   │───────────────┤    description       │
│    prep_time    │               │    is_traditional    │
│    cook_time    │               │    category          │
│    total_time   │               │    image_url         │
│    servings     │               │    allergen_info     │
│    difficulty   │               └──────────────────────┘
│    image_url    │                          │
│ cultural_context│                          │
│    created_at   │                          │
│    updated_at   │                          │
└─────────────────┘                          │
         │                                   │
         │ 1:N                               │
         ├───────────────┐                   │
         │               │                   │
         ▼               ▼                   │
┌─────────────────┐ ┌────────────────────┐  │
│     STEPS       │ │ RECIPE_INGREDIENTS │  │
├─────────────────┤ ├────────────────────┤  │
│ PK id           │ │ PK id              │  │
│ FK recipe_id    │ │ FK recipe_id       │  │
│    order_index  │ │ FK ingredient_id   │◄─┘
│    instruction  │ │    quantity        │
│    has_timer    │ │    unit            │
│    timer_seconds│ │    order_index     │
│    timer_label  │ │    preparation     │
│    is_parallel  │ │    is_optional     │
│ parallel_group  │ │    notes           │
│    image_url    │ └────────────────────┘
│    tips         │
│    temperature  │
│ scales_w_servgs │
└─────────────────┘

┌─────────────────┐         ┌─────────────────────┐
│   CATEGORIES    │         │  RECIPE_CATEGORIES  │
├─────────────────┤         ├─────────────────────┤
│ PK id           │◄────────┤ FK recipe_id        │
│    name         │   N:M   │ FK category_id      │
│    description  │         └─────────────────────┘
│    icon_name    │                    │
│    color_code   │                    └──────┐
└─────────────────┘                           │
                                              │
┌──────────────────────────────────┐          │
│           USERS                  │          │
├──────────────────────────────────┤          │
│ PK id                            │          │
│    email                         │          │
│    username                      │          │
│    password                      │          │
│    full_name                     │          │
│    profile_image_url             │          │
│    email_verified                │          │
│    active                        │          │
│    preferred_unit_system         │          │
│    skill_level                   │          │
│    created_at                    │          │
│    updated_at                    │          │
└──────────────────────────────────┘          │
         │                                    │
         │ 1:N                                │
         ├────────────────────┬───────────────┼─────────────┐
         ▼                    ▼               ▼             ▼
┌────────────────┐  ┌──────────────┐ ┌─────────────┐ ┌──────────────┐
│USER_DIETARY_   │  │USER_ALLERGIES│ │USER_FAVORITE│ │INGREDIENT_   │
│  RESTRICTIONS  │  ├──────────────┤ │  _RECIPES   │ │SUBSTITUTIONS │
├────────────────┤  │FK user_id    │ ├─────────────┤ ├──────────────┤
│FK user_id      │  │   allergen   │ │FK user_id   │ │FK ingredient │
│   restriction  │  └──────────────┘ │   recipe_id │ │    _id       │
└────────────────┘                   └─────────────┘ │substitute_   │
                                                     │    name      │
                                                     └──────────────┘
```

---

## Database Design Principles

### Normalization
- The schema follows **Third Normal Form (3NF)** to minimize data redundancy
- Junction tables properly implement many-to-many relationships
- Atomic values in all columns

### Scalability Considerations
- Auto-incrementing primary keys for efficient indexing
- Foreign key constraints maintain referential integrity
- Indexed columns for frequently queried fields
- Cascade delete operations for child records

### Data Integrity
- NOT NULL constraints on required fields
- UNIQUE constraints on email, username, ingredient names
- Foreign key relationships ensure data consistency
- Default values for boolean flags

### Performance Optimization
- Indexed foreign keys for join performance
- Composite indexes on (recipe_id, order_index) for ordered queries
- Eager vs. Lazy fetching strategies configured per relationship
- Timestamp indexes for temporal queries

---

## Business Rules Enforced by Schema

1. **User Uniqueness**: Each user must have unique email and username
2. **Recipe Completeness**: Recipes must have country, timings, and servings
3. **Step Ordering**: Steps maintain order through order_index
4. **Ingredient Quantities**: All recipe ingredients must specify quantity and unit
5. **Geographic Data**: Countries must have valid latitude/longitude
6. **Cascade Deletion**: Deleting a recipe removes all associated steps and ingredients
7. **Optional Fields**: Ingredients can be marked as optional in recipes
8. **Timer Validation**: Steps with timers must specify duration in seconds
9. **Parallel Execution**: Steps can be grouped for simultaneous cooking
10. **Cultural Context**: Recipes and ingredients can be linked to specific countries

---

## Future Extensions

Potential additions to support advanced features:

1. **timers** table - Track active cooking timers for users
2. **user_cooking_sessions** - Store ongoing cooking sessions
3. **recipe_ratings** - User ratings and reviews
4. **recipe_modifications** - User customizations of recipes
5. **shopping_lists** - Generated from selected recipes
6. **meal_plans** - Weekly meal planning feature
7. **cooking_history** - Track completed recipes
8. **recipe_variations** - Different versions of same recipe
9. **nutrition_info** - Nutritional information per serving
10. **equipment** - Required kitchen equipment per recipe
