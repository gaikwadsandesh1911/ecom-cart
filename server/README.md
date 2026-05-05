USER
├── name, email, password, role
└── cartData []
    ├── { productId → ref: Product, quantity }
    ├── { productId → ref: Product, quantity }
    └── { productId → ref: Product, quantity }


PRODUCT
├── name, description, price, image, category
└── stock


ORDER
├── userId → ref: User
├── address {}
├── amount, status, payment
└── items []
    ├── { productId → ref: Product, name, price, quantity, image }
    ├── { productId → ref: Product, name, price, quantity, image }
    └── { productId → ref: Product, name, price, quantity, image }



How they  connect 

User ──────────────────────────────── Order
 │                                      │
 │  user places order                   │
 │  userId ref lives in Order           │
 │                                      │
 └──── cartData[ ] ────────────────── items[ ]
           │                              │
           │  both point to               │
           └──── Product ────────────────┘
                  │
                  name, price, image
                  copied into order.items
                  (snapshot at time of purchase)



1. User signs up
        └── User document created with empty cartData []

2. User browses and adds to cart
        └── cartData.push({ productId, quantity })

3. User places order
        ├── New Order document created
        ├── order.userId = user._id
        ├── order.items = cartData (with name, price, image copied from Product)
        │         └── price is SNAPSHOT — not a live ref
        │             so price changes don't affect old orders
        └── cartData = []  (cart cleared)

4. Admin updates order status
        └── order.status: Preparing → Shipped → Delivered