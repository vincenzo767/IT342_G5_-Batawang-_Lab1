# 7.0 UI/UX DESIGN

## 7.1 Web Application Wireframes

### Design System Foundation

**Colors:**
- Primary: #2563EB (Blue)
- Secondary: #7C3AED (Purple)
- Success: #10B981 (Green)
- Error: #EF4444 (Red)
- Neutral Gray: #6B7280
- Light Gray: #F3F4F6
- Dark Gray: #1F2937

**Typography:**
- Font Family: Inter
- Heading 1: 32px, Bold (600)
- Heading 2: 24px, Bold (600)
- Heading 3: 18px, Bold (600)
- Body Text: 14px, Regular (400)
- Small Text: 12px, Regular (400)

**Spacing Grid:** 8px base unit
- xs: 4px
- sm: 8px
- md: 16px
- lg: 24px
- xl: 32px
- 2xl: 48px

**Breakpoints:**
- Mobile: 320px - 639px
- Tablet: 640px - 1023px
- Desktop: 1024px+

---

### Homepage (Product Listing)

**Layout Overview:**
- Full-width responsive layout
- 3-column grid on desktop, 2-column on tablet, 1-column on mobile

**Header Section:**
```
┌─────────────────────────────────────────────────────────┐
│ [Logo]    [Search Bar.......................]  [🛒] [👤] │
│ SynChef                                        Cart  User │
└─────────────────────────────────────────────────────────┘
```

**Header Components:**
- Logo/Brand: 40px height, positioned on left
- Search Bar: 
  - Placeholder: "Search recipes..."
  - Full width up to 400px
  - Magnifying glass icon on left
  - Clear button on right (appears when text entered)
- Cart Icon: Badge shows item count
- User Menu: Dropdown with Profile, Orders, Logout options

**Navigation:**
- Categories filter (horizontal scroll on mobile)
- Difficulty level filter (Easy, Medium, Hard)
- Prep time filter (Quick filters: <15min, 15-30min, 30-60min, 60+min)
- Sort dropdown (Newest, Popular, Highest Rated, Prep Time)

**Content Grid:**
```
┌──────────────────────────────────────────────────┐
│  Filters & Sorting         Product Grid          │
├──────────────────┬──────────────────────────────┤
│ Categories      │ ┌──────────┐ ┌──────────┐    │
│ ☐ Breakfast     │ │          │ │          │    │
│ ☐ Lunch         │ │ Product  │ │ Product  │    │
│ ☐ Dinner        │ │    1     │ │    2     │    │
│ ☐ Dessert       │ └──────────┘ └──────────┘    │
│                 │ ┌──────────┐ ┌──────────┐    │
│ Difficulty      │ │          │ │          │    │
│ ☐ Easy          │ │ Product  │ │ Product  │    │
│ ☐ Medium        │ │    3     │ │    4     │    │
│ ☐ Hard          │ └──────────┘ └──────────┘    │
│                 │                              │
│ Prep Time       │ Pagination/Load More        │
│ ☐ <15 min       │                              │
│ ☐ 15-30 min     │                              │
│ ☐ 30-60 min     │                              │
│ ☐ 60+ min       │                              │
└──────────────────┴──────────────────────────────┘
```

**Product Card:**
```
┌──────────────────────┐
│                      │
│   [Product Image]    │ (Height: 200px)
│                      │
├──────────────────────┤
│ Recipe Name          │
│ ⭐ 4.5 (120 reviews) │
│ Prep: 15 min | 🍳 Easy
│                      │
│ $12.99               │
│ [Add to Cart] [❤]    │
└──────────────────────┘

Dimensions: 280px × 380px (desktop)
```

**Product Card Interactions:**
- Hover: Scale 105%, shadow increase, image overlay appears
- Favorite Heart: Toggle fill on click
- Quick View: Modal or drawer opens recipe details
- Add to Cart: Toast notification shows "Added to cart"

**Footer:**
```
┌──────────────────────────────────────────────────┐
│ About | Privacy Policy | Terms | Contact | Blog │
│           © 2024 SynChef. All rights reserved.   │
└──────────────────────────────────────────────────┘
```

---

### Product Detail Page

**Header:**
```
┌──────────────────────────────────────────────┐
│ ← Back    Recipe Name                   🛒 👤  │
└──────────────────────────────────────────────┘
```

**Layout Grid:**
```
┌─────────────────────────────────────────────────┐
│ Product Image       │  Product Information      │
│ (Main: 500x500)     │                           │
│ ☐ Thumbnail 1       │  Recipe Name              │
│ ☐ Thumbnail 2       │  ⭐ 4.5 (120)             │
│ ☐ Thumbnail 3       │  $12.99 | [Quantity: 1-10]
│ ☐ Thumbnail 4       │                           │
│                     │  Description              │
│                     │  Lorem ipsum dolor sit... │
│                     │                           │
│                     │  [Add to Cart]            │
│                     │  [Buy Now]                │
│                     │                           │
│                     │  Specifications:          │
│                     │  • Prep Time: 15 min      │
│                     │  • Cook Time: 25 min      │
│                     │  • Servings: 4            │
│                     │  • Difficulty: Medium     │
│                     │  • Cuisine: Italian       │
│                     │  • Ingredients: 8         │
└─────────────────────────────────────────────────┘
```

**Product Image Section:**
- Main image: 500x500px, high quality
- Thumbnail gallery: 80px square thumbnails
- Zoom functionality on hover
- Gallery swipe on mobile

**Product Information Section:**
- Recipe name (Heading 2)
- Rating with review count (clickable)
- Price: Large, primary color
- Quantity Selector:
  ```
  Quantity: [-] 1 [+]  (min 1, max 10)
  ```
- Add to Cart button: Primary color, 100% width
- Buy Now button: Secondary color, 100% width
- Product Specifications in accordion/expandable sections

**Tabs Below Main Content:**
```
┌────────────────────────────────────────────────┐
│ Description | Ingredients | Reviews | Ratings │
├────────────────────────────────────────────────┤
│ [Tab content area]                             │
└────────────────────────────────────────────────┘
```

**Tab Details:**
1. **Description Tab:**
   - Full product description
   - Cultural context
   - Chef tips/recommendations

2. **Ingredients Tab:**
   ```
   Ingredients (Serves 4)
   ☐ 500g Potatoes       [Substitute]
   ☐ 2 tbsp Olive Oil    [Substitute]
   ☐ Salt to taste       [Substitute]
   ☐ Black Pepper        [Optional]
   
   [Print Recipe] [Save to Shopping List]
   ```

3. **Reviews Tab:**
   - User ratings (star distribution)
   - Review list with user avatar, rating, text, date
   - Review filters (Most helpful, Recent, Highest rated)

4. **Related Products:**
   - Similar recipes carousel
   - "You might also like" section

---

### Shopping Cart Page

**Header:**
```
┌──────────────────────────────────────────────────┐
│ ← Back    Shopping Cart              [× Clear]   │
└──────────────────────────────────────────────────┘
```

**Main Content:**
```
┌──────────────────────────────────────────────────┐
│ Cart Items                  │ Order Summary      │
├──────────────────────────────┼───────────────────┤
│ [ ] ┌─────┐ Item 1          │ Subtotal: $25.98  │
│     │     │ Price: $12.99   │ Shipping: $5.00   │
│     │     │ Qty: 1          │ Tax: $2.48        │
│     │ Img │ [Remove]        │ ─────────────────  │
│     └─────┘ [Edit]          │ Total: $33.46     │
│                             │                   │
│ [ ] ┌─────┐ Item 2          │ [Promo Code]      │
│     │     │ Price: $15.99   │                   │
│     │     │ Qty: 2          │ [Proceed to       │
│     │ Img │ [Remove]        │  Checkout]        │
│     └─────┘ [Edit]          │                   │
│                             │ [Continue         │
│ ...more items...            │  Shopping]        │
└──────────────────────────────┴───────────────────┘
```

**Cart Item Card:**
- Checkbox for bulk delete
- Product image (80x80px)
- Product name and description
- Unit price
- Quantity selector (editable inline: [-] qty [+])
- Remove button (trash icon)
- Subtotal for that line item

**Order Summary (Sticky/Floating):**
- Subtotal
- Shipping cost (with options to change)
- Tax (auto-calculated)
- Total (prominent, large)
- Promotional code input
- Proceed to Checkout button (CTA)
- Continue Shopping button (secondary)

**Empty State (if no items):**
```
┌──────────────────────────────────┐
│                                  │
│      🛒 Your cart is empty       │
│                                  │
│   Continue shopping to find      │
│    delicious recipes!            │
│                                  │
│      [Continue Shopping]         │
│                                  │
└──────────────────────────────────┘
```

---

### Checkout Page

**Multi-Step Indicator:**
```
Step 1: Cart ✓ → Step 2: Shipping → Step 3: Payment → Step 4: Confirm (Current)
```

**Page Layout:**
```
┌────────────────────────────────────────────────────┐
│ Checkout                              [75% Complete]
├────────────────────────────────────────────────────┤
│                                                    │
│ Shipping Address                                   │
│ ┌──────────────────────────────────────────────┐  │
│ │ Full Name: [________________]                │  │
│ │ Email:     [________________]                │  │
│ │ Address:   [________________]                │  │
│ │ City:      [________]  State: [___] Zip: [__] │  │
│ │ Country:   [Select Country ▼]                │  │
│ │                                              │  │
│ │ ☐ Use different billing address              │  │
│ │ ☐ Add to Address Book                       │  │
│ └──────────────────────────────────────────────┘  │
│                                                    │
│ Order Review                                       │
│ ┌──────────────────────────────────────────────┐  │
│ │ Item 1 × 1 ....................... $12.99   │  │
│ │ Item 2 × 2 ....................... $31.98   │  │
│ │                                              │  │
│ │ Subtotal: ........................ $44.97   │  │
│ │ Shipping: ........................ $5.00    │  │
│ │ Tax:     ......................... $4.00    │  │
│ │ ─────────────────────────────────────────    │  │
│ │ Total:   ......................... $53.97   │  │
│ └──────────────────────────────────────────────┘  │
│                                                    │
│ Payment Method                                     │
│ ⦿ Credit/Debit Card                               │
│   Card Number: [____] [____] [____] [____]       │
│   Exp Date: [__/__]  CVV: [___]                 │
│ ○ PayPal                                          │
│ ○ Apple Pay                                       │
│                                                    │
│ ☐ I agree to Terms and Conditions                 │
│                                                    │
│              [← Back]  [Place Order]              │
└────────────────────────────────────────────────────┘
```

**Form Validation:**
- Real-time field validation (green checkmark/error message)
- Clear error messages
- Helper text for each field
- Auto-fill from saved addresses (if user logged in)

**Payment Processing:**
- Loading state with spinner during processing
- Success/error confirmation
- Order confirmation page with order number and expected delivery

---

### Admin Dashboard

**Sidebar Navigation:**
```
┌──────────────────────────┐
│ 🏠 Dashboard             │ ← Active
└──────────────────────────┘
┌──────────────────────────┐
│ 📦 Products              │
│   ├─ Manage              │
│   ├─ Add New             │
│   └─ Categories          │
└──────────────────────────┘
┌──────────────────────────┐
│ 📋 Orders                │
│   ├─ All Orders          │
│   ├─ Processing          │
│   ├─ Shipped             │
│   └─ Completed           │
└──────────────────────────┘
┌──────────────────────────┐
│ 👥 Users                 │
│   ├─ All Users           │
│   ├─ Active              │
│   └─ Inactive            │
└──────────────────────────┘
┌──────────────────────────┐
│ ⚙️ Settings              │
│   ├─ General             │
│   ├─ Shipping Zones      │
│   └─ Tax Rates           │
└──────────────────────────┘
┌──────────────────────────┐
│ 📊 Analytics             │
│   ├─ Sales Report        │
│   ├─ Traffic             │
│   └─ Revenue             │
└──────────────────────────┘
```

**Dashboard Content Area:**
```
┌─────────────────────────────────────────────────────────────┐
│ Dashboard > Home                        [Admin: John Doe] 👤 │
└─────────────────────────────────────────────────────────────┘

Quick Stats Cards:
┌──────────────┐ ┌──────────────┐ ┌──────────────┐ ┌──────────────┐
│ Total Orders │ │ Total Sales  │ │ New Users    │ │ Avg Rating   │
│ 1,234        │ │ $45,678      │ │ 28           │ │ 4.7 / 5.0    │
│ ↑ 12%        │ │ ↑ 8.2%       │ │ ↑ 5%         │ │ ↑ 0.2        │
└──────────────┘ └──────────────┘ └──────────────┘ └──────────────┘

Recent Orders Chart & Sales Trend
┌─────────────────────────────────────────────────────────────┐
│ Sales Trend (Last 30 Days)                                  │
│ [Line Chart]                                                │
└─────────────────────────────────────────────────────────────┘
```

**Product Management:**
```
┌──────────────────────────────────────────────────┐
│ Products                          [+ Add Product]│
├──────────────────────────────────────────────────┤
│ [Search...] [Filter ▼] [Sort ▼]                │
│                                                  │
│ ID | Name     | Price | Stock | Status | Action│
│ ──────────────────────────────────────────────  │
│ 1  | Pasta    | $9.99 | 45    | Active | ⋯    │
│ 2  | Pizza    | $12.99| 32    | Active | ⋯    │
│ 3  | Salad    | $8.99 | 0     | Low     | ⋯    │
│ ...                                             │
│ [← Prev] Page 1 of 5 [Next →]                 │
└──────────────────────────────────────────────────┘

Action Menu (⋯):
  - Edit
  - View Details
  - Duplicate
  - Archive
  - Delete
```

**Edit Product Modal:**
```
┌────────────────────────────────────────────────┐
│ Edit Product                            [×]    │
├────────────────────────────────────────────────┤
│ Product Name:      [________________]          │
│ Description:       [________________]          │
│ Price:             [$___________]              │
│ Stock:             [___] units                 │
│ Category:          [Select Category ▼]        │
│ Image:             [← → Upload]                │
│ Status:            ○ Active  ○ Draft           │
│                                                 │
│           [Cancel]  [Save Changes]             │
└────────────────────────────────────────────────┘
```

**Order Management:**
```
┌──────────────────────────────────────────────────────────┐
│ Orders                    [Filter by Status ▼]           │
├──────────────────────────────────────────────────────────┤
│ Order ID | Customer | Date  | Total  | Status   | Action│
│ ──────────────────────────────────────────────────────── │
│ #ORD001  | John     | 2/27  | $53.97 | Shipped  | ⋯    │
│ #ORD002  | Sarah    | 2/26  | $32.45 | Pending  | ⋯    │
│ #ORD003  | Mike     | 2/25  | $78.90 | Delivered| ⋯    │
│          │          │       │        │          │      │
│ [← Prev] Page 1 of 12 [Next →]                         │
└──────────────────────────────────────────────────────────┘

Order Detail Modal:
┌────────────────────────────────────────────────┐
│ Order #ORD001                             [×]  │
├────────────────────────────────────────────────┤
│ Customer: John Doe                             │
│ Date: Feb 27, 2024                             │
│ Status: [Pending ▼] [Update Status]            │
│                                                 │
│ Items:                                          │
│ • Pasta × 2 ...................... $19.98    │
│ • Sauce × 1 ...................... $5.99     │
│                                                 │
│ Subtotal: ........................ $25.97    │
│ Shipping: ........................ $5.00     │
│ Tax:     ......................... $2.30     │
│ Total:   ......................... $33.27    │
│                                                 │
│ Shipping Address:                              │
│ John Doe                                        │
│ 123 Main St, City, ST 12345                     │
│                                                 │
│        [Print](../Refund)[Ship]               │
└────────────────────────────────────────────────┘
```

---

## 7.2 Mobile Application Wireframes

### Bottom Navigation

**Tab Bar (Fixed):**
```
┌──────────────────────────────────────────────────┐
│ 🏠     🔍     🛒     👤                           │
│ Home   Search Cart   Profile                     │
│ Active                                            │
└──────────────────────────────────────────────────┘

Tab Dimensions: 44x56px minimum
Touch target: 44x44px minimum
```

---

### Home Screen

**Layout:**
```
┌────────────────────────────────┐
│ ☰  SynChef              🔔  👤  │ Header: 56px
├────────────────────────────────┤
│ [🔍 Search recipes...]         │ Search Bar: 48px
├────────────────────────────────┤
│ Quick Filters (Horizontal):    │
│ [All] [Easy] [Quick] [Vegan]   │
├────────────────────────────────┤
│ "Trending Today"               │
│ ┌──────────────────────────┐   │
│ │  [Image]                 │   │ Card Height: 240px
│ │  Recipe Name             │   │ Full Width: 100%-32px
│ │  ⭐ 4.5  |  15 min       │   │
│ │  [Add to Cart]  [❤]      │   │
│ └──────────────────────────┘   │
│                                │
│ "Recommended For You"          │
│ ┌──────────┐ ┌──────────┐     │
│ │[Image]   │ │[Image]   │     │ 2-Column Grid
│ │Recipe 1  │ │Recipe 2  │     │ Card Height: 200px
│ │⭐ 4.5   │ │⭐ 4.2   │     │
│ └──────────┘ └──────────┘     │
│                                │
│ ┌──────────┐ ┌──────────┐     │
│ │[Image]   │ │[Image]   │     │
│ │Recipe 3  │ │Recipe 4  │     │
│ │⭐ 4.7   │ │⭐ 4.1   │     │
│ └──────────┘ └──────────┘     │
│                                │
│ [Load More/Pagination]         │
│                                │
├────────────────────────────────┤
│  🏠    🔍    🛒    👤          │ Bottom Nav
└────────────────────────────────┘
```

**Interactions:**
- Pull-to-refresh: Refresh content
- Swipe left on card: Quick add to cart
- Long press on card: Open context menu
- Tap on recipe: Navigate to detail page
- Tap filter pills: Toggle filter

---

### Product Detail Screen

**Layout:**
```
┌────────────────────────────────┐
│ ← Recipe Name              🛒   │ Header: 56px (sticky)
├────────────────────────────────┤
│                                │
│  [Product Image]               │ Image Height: 300px
│  [Swipe Gallery: ●○○○]        │ Full width, scalable
│                                │
├────────────────────────────────┤
│ Recipe Name                    │
│ ⭐ 4.5 (120 reviews)          │
│ Prep: 15 min | Cook: 25 min    │
│ Difficulty: Medium             │
│ Cuisine: Italian               │
│                                │
│ Price: $12.99                  │
│ ────────────────────────────── │
│                                │
│ Description                    │
│ Lorem ipsum dolor sit amet,    │
│ consectetur adipiscing elit... │
│                                │
│ Ingredients (8 items)          │
│ • 500g Potatoes               │
│ • 2 tbsp Olive Oil            │
│ • Salt to taste               │
│ [Show More ▼]                 │
│                                │
│ Reviews & Ratings             │
│ ⭐ 4.5 out of 5 (120)         │
│ [View All Reviews]            │
│                                │
│ ┌────────────────────────────┐ │
│ │ Name: John D.              │ │ Review Card
│ │ ⭐⭐⭐⭐⭐ (5/5)           │ │
│ │ "Amazing recipe!"          │ │
│ │ 2 days ago                 │ │
│ └────────────────────────────┘ │
│                                │
├────────────────────────────────┤
│ Qty: [-] 1 [+]                 │ Sticky Bottom
│ [Add to Cart Button]           │ 56px height
└────────────────────────────────┘
```

**Image Gallery:**
- Main image fills screen width
- swipe left/right for thumbnails
- Pinch to zoom enabled
- Double-tap to zoom
- Indicator dots show position

**Quantity Selector:**
- Positioned in sticky bottom bar
- Touch-friendly: 44x44px minimum buttons
- Prevent: Min 1, Max 10

**Call-to-Action Button:**
- Full-width, 56px height
- Primary color (#2563EB)
- Tap feedback: opacity change
- Loading state: Spinner + "Adding..."
- Success: Toast notification

---

### Cart Screen

**Layout:**
```
┌────────────────────────────────┐
│ ← Shopping Cart       [Edit]    │
├────────────────────────────────┤
│                                │
│ Items in Cart: 2 items         │
│                                │
│ Item 1                         │
│ ┌────────────────────────────┐ │
│ │ [Image] x  Recipe 1        │ │
│ │           Price: $12.99    │ │
│ │           Qty: [-] 1 [+]   │ │
│ │ ↖ Swipe to delete          │ │
│ └────────────────────────────┘ │
│                                │
│ Item 2                         │
│ ┌────────────────────────────┐ │
│ │ [Image] x  Recipe 2        │ │
│ │           Price: $15.99    │ │
│ │           Qty: [-] 2 [+]   │ │
│ │ ↖ Swipe to delete          │ │
│ └────────────────────────────┘ │
│                                │
├────────────────────────────────┤
│         [Promo Code]           │
│         [Apply Discount]       │
│                                │
├────────────────────────────────┤
│ Order Summary (Sticky):        │ Sticky
│ Subtotal: ......... $28.98    │ Bottom:
│ Shipping: ......... $5.00     │ 160px
│ Tax: .............. $2.72     │
│ Total: ............ $36.70    │
│                                │
│ [Continue Shopping]            │
│ [Proceed to Checkout] (Primary)│
└────────────────────────────────┘
```

**Interactions:**
- Tap [Edit]: Toggle edit mode
- Edit Mode:
  - Checkboxes appear for bulk delete
  - Select items, [Delete Selected] button shows
  - Checkboxes: 48x48px touch targets
- Swipe gesture: Reveal delete button with red background
- Swipe back: Hide delete button
- Tap quantity: Inline editing

**Edit Mode:**
```
┌────────────────────────────────┐
│ ← Cart               [Delete]   │
├────────────────────────────────┤
│ [☐] Item 1                     │
│ [☑] Item 2                     │
│ [☐] Item 3                     │
│                                │
│ Items Selected: 1              │
│ [Select All]                   │
│                                │
│         [Delete Selected]      │
└────────────────────────────────┘
```

---

### Checkout Flow

**Step Indicator:**
```
┌────────────────────────────────┐
│ 1:Cart ✓  2:Shipping ✓ 3:Payment ● 4:Confirm
│ ◯─────────◯──────────◯──────────◯
└────────────────────────────────┘
```

**Step 1: Shipping Address**
```
┌────────────────────────────────┐
│ ← Checkout              [Skip?] │
├────────────────────────────────┤
│ Step 1 of 4: Shipping Address  │
│                                │
│ Use Saved Address:             │
│ ⦿ Home (123 Main St...)       │
│ ○ Work (456 Work Ave...)      │
│ ○ Enter New Address           │
│                                │
│ [Or: Show form below:]         │
│ Full Name: [_____________]    │
│ Email:     [_____________]    │
│ Address:   [_____________]    │
│ City/State:[__________][__]   │
│ Zip:       [_______]          │
│ Country:   [Select ▼]         │
│                                │
│ ☐ Save this address            │
│                                │
│         [Continue] →           │
└────────────────────────────────┘
```

**Step 2: Payment**
```
┌────────────────────────────────┐
│ ← Checkout              [Skip?] │
├────────────────────────────────┤
│ Step 2 of 4: Payment Method    │
│                                │
│ ⦿ Credit/Debit Card           │
│   Card Number: [______]       │
│   Exp: [__/___] CVV: [___]   │
│ ○ PayPal                       │
│ ○ Apple Pay                    │
│ ○ Google Pay                   │
│                                │
│ ☐ Save payment method          │
│                                │
│         [Complete Order] →     │
└────────────────────────────────┘
```

**Step 3: Order Confirmation**
```
┌────────────────────────────────┐
│ ← Checkout              ✓      │
├────────────────────────────────┤
│ Step 3 of 4: Review             │
│                                │
│ Order Summary:                 │
│ Item 1 × 2 ......... $25.98   │
│ Item 2 × 1 ......... $12.99   │
│                                │
│ Subtotal: .......... $38.97   │
│ Shipping:  ......... $5.00    │
│ Tax: ............... $3.52    │
│ Total: ............ $47.49    │
│ ────────────────────────────── │
│ Shipping to:                   │
│ John Doe                        │
│ 123 Main St, City, ST 12345    │
│                                │
│ ☐ I agree to Terms & Conditions│
│                                │
│        [← Back] [Place Order]  │
│                                │
├────────────────────────────────┤
│         [Processing...]         │
└────────────────────────────────┘
```

**Step 4: Success**
```
┌────────────────────────────────┐
│                                │
│           ✓ Success!           │
│                                │
│ Order #ORD001                  │
│ Confirmed                      │
│                                │
│ Thank you for your order!      │
│                                │
│ Expected Delivery:             │
│ Feb 28 - Mar 1, 2024           │
│                                │
│ Confirmation sent to:          │
│ john@example.com               │
│                                │
│ [Track Order]                  │
│ [Continue Shopping]            │
│ [Download Invoice]             │
│                                │
└────────────────────────────────┘
```

---

## 7.3 Mobile-Specific Features

### Touch Optimization
- Minimum button size: 44x44px
- Minimum touch target: 48x48px
- Spacing between targets: 8-16px
- Tap feedback: 200ms ripple effect or opacity change

### Gesture Support
- **Swipe left**: Quick actions (delete, add to cart)
- **Swipe right**: Go back/close
- **Pull-to-refresh**: Reload content
- **Pinch**: Zoom images
- **Double-tap**: Zoom image to fit
- **Long-press**: Context menu
- **Scroll**: Natural scrolling with momentum

### Offline Caching
- Product images cached locally
- Recently viewed recipes cached
- Shopping cart persisted to local storage
- Offline mode indicator
- "Retry" button for failed requests

### Bottom Navigation
- Always accessible
- 4-5 main sections
- Active state highlighted (color + icon fill)
- Badge for notifications (cart count, messages)
- Safe area consideration for notch/home indicator

### Simplified Forms
- Mobile-first form design
- Single column layout
- Large input fields (56px height)
- Clear labels above inputs
- Appropriate keyboard types:
  - Email: `type="email"`
  - Phone: `type="tel"`
  - Numbers: `type="number"`
  - Text: `type="text"`
- Minimal required fields
- Auto-fill enabled
- Error messages below fields
- Success checkmarks

### Performance
- Images lazy-loaded
- Skeleton screens while loading
- Progressive enhancement
- Debounced search (300ms)
- Pagination over infinite scroll
- Reduced animations on preference

---

## 7.4 Design Components

### Buttons

**Primary Button**
- Background: #2563EB
- Padding: 12px 24px
- Border-radius: 8px
- Font: Inter, 14px, Bold
- Height: 44px minimum
- States: Default, Hover (opacity 0.9), Active (depressed), Disabled (opacity 0.5)

**Secondary Button**
- Background: #7C3AED
- Same sizing as primary
- Used for alternative actions

**Tertiary Button**
- Background: Transparent
- Border: 2px solid #2563EB
- Color: #2563EB
- Used for dismissive actions

### Input Fields

**Text Input**
- Height: 44px
- Padding: 12px 16px
- Border: 1px solid #D1D5DB
- Border-radius: 8px
- Font: Inter, 14px
- Focus state: Border color #2563EB, box-shadow
- Error state: Border color #EF4444
- Placeholder color: #9CA3AF

### Cards

**Product Card**
- Border-radius: 12px
- Box-shadow: 0 1px 3px rgba(0,0,0,0.1)
- Hover: shadow increases, slightly scaled up
- Padding: 0 (for images), 16px for content

### Modals

**Modal**
- Background: White
- Border-radius: 16px (top) for mobile, 12px for desktop
- Overlay: rgba(0,0,0,0.5)
- Animation: Slide up on mobile, fade in on desktop
- Close button: Top right, 44x44px

### Navigation

**Header**
- Height: 56px
- Safe area padding: +0px top (notch aware)
- Sticky: Should remain visible while scrolling

**Bottom Navigation**
- Height: 56px
- Safe area padding: +0px bottom
- Background: White
- Border-top: 1px solid #E5E7EB
- Sticky: Always visible

---

## 7.5 Responsive Breakpoints

### Mobile (320px - 639px)
- Single column layouts
- Full-width cards
- Stack header elements vertically
- Bottom navigation primary
- Touch-first interactions
- Increased padding
- Larger typography

### Tablet (640px - 1023px)
- 2-column grids
- Combined navigation (top + side drawer)
- Wider cards
- Medium padding
- Balanced typography

### Desktop (1024px+)
- 3+ column grids
- Full sidebar navigation
- Optimized spacing
- Standard typography
- Hover interactions

---

## Color Contrast & Accessibility

- Primary text on light: #1F2937 (WCAG AAA)
- Primary text on primary bg: #FFFFFF (WCAG AAA)
- Secondary text: #6B7280 (WCAG AA)
- Error/Success: Supported by icons, not color alone
- Focus states: 2px outline with min 3:1 contrast

---

## Typography Sizes

| Size | Use Case |
|------|----------|
| 32px | Page titles, H1 |
| 24px | Section titles, H2 |
| 18px | Subsection, H3 |
| 16px | Button text, H4 |
| 14px | Body text, inputs |
| 12px | Small text, captions |
| 10px | Micro text, metadata |

---

## Spacing Scale

```
4px  = xs
8px  = sm
16px = md
24px = lg
32px = xl
48px = 2xl
64px = 3xl
```

All spacing should align to 8px grid where possible.
