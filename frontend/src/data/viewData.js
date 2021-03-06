export const viewData = [{
    active: true,
    name: 'Secondary Navigation Bar',
    website: 'Sarah Originals',
    slider: [{
        controller: false, //
        controls: [{
            event: 'hover',
            action: 'showNavBarSubBox',
            trigger: { type: 'slide', className: ['slide-wrapper'] },
            search: {
                type: 'View',
                push: { className: ['product-name'], key: 'keyword' },
            }
        }],
        slide: [{
            name: 'Product Categories',
            title: {
                title: 'Product Categories',
                icon: {
                    code: 'fas',
                    name: 'bars'
                }
            }
        }, {
            name: 'SuperMarket',
            title: { title: 'SuperMarket' },
        }, {
            name: 'Offers & Suggestions',
            title: {
                title: 'Offers & Suggestions',
                icon: {
                    name: 'fire-alt',
                    code: 'fas',
                }
            }
        }, {
            name: "My Sarah's",
            title: { title: "My Sarah's" },
        }, {
            name: 'Sarah Plus',
            title: { title: 'Sarah Plus' },
        }, {
            name: 'Sarah Club',
            title: { title: 'Sarah Club' },
        }, {
            name: 'Question!',
            title: { title: 'Question!' },
        }, {
            name: 'Become a Seller',
            title: { title: 'Become a Seller' },
        }],
    }]
}, {
    active: true,
    website: 'Sarah Originals',
    name: 'Action Note',
    controllable: true,
    action: 'addToCart'
}, {
    active: true,
    website: 'Sarah Originals',
    name: 'Image Ribbon',
    title: { title: 'Surprising Products' },
    slider: [{
        name: 'Image Ribbon Slider',
        search: {
            type: 'Product',
            limit: 20,
            collections: ['Any']
        },
        controller: false, //
        route: '/product',
        controls: [{
            event: 'click',
            action: 'productPage',
            trigger: { type: 'slide', className: ['slide-wrapper'] },
            search: {
                type: 'Product',
                push: { className: ['product-name'], key: 'keyword' },
            }
        }]
    }]
}, { // done
    active: true,
    website: 'Sarah Originals',
    name: 'Hero',
    // slides
    slider: [{
        controller: false,//
        controls: [{
            event: 'click',
            action: 'productsPage',
            route: '/products',
            trigger: { type: 'slide', className: ['slide-wrapper'] },
            search: {
                type: 'Product',
                push: { className: ['product-name'], key: 'collections' }
            }
        }],
        slide: [{
            name: 'Frozen Cocktail',
            src: '../../images/sample-1.jpg',
        }, {
            name: 'Light FruDoza',
            src: '../../images/sample-3.jpg',
        }, {
            name: 'Cashews Raw',
            src: '../../images/sample-2.jpg',
        }],
    }, {
        controller: false,//
        controls: [{
            event: 'click',
            action: 'productsPage',
            route: '/products',
            trigger: { type: 'slide', className: ['slide-wrapper'] },
            search: {
                type: 'Product',
                push: { className: ['product-name'], key: 'collections' }
            }
        }],
        slide: [{
            name: 'banner-sample-7',
            src: '../../images/banner-sample-7.jpg',
        }, {
            name: 'banner-sample-8',
            src: '../../images/banner-sample-8.jpg',
        }, {
            name: 'banner-sample-9',
            src: '../../images/banner-sample-9.jpg',
        }, {
            name: 'banner-sample-10',
            src: '../../images/banner-sample-10.jpg',
        }, {
            name: 'banner-sample-11',
            src: '../../images/banner-sample-11.jpg',
        }]
    }]
}, {
    active: true,
    website: 'Sarah Originals',
    name: 'digikala style',
    title: {
        title: 'SuperMarket Products'
    },
    slider: [{
        controllable: true,
        action: 'digiProduct',
        search: {
            type: 'Product',
            keyword: 'Watermelon',
        },
    }, {
        search: {
            type: 'Product',
            collections: ['Featured'],
            limit: 5
        },
        controller: true,
        controls: [{
            event: 'hover',
            action: 'digiProduct',
            trigger: { type: 'slide', className: ['slide-wrapper'] },
            push: ['slide']
        }, {
            event: 'autoPlay',
            action: 'digiProduct',
            trigger: { type: 'slider', className: ['marker-wrapper'] },
            push: ['slide']
        }],
    }]
}, {
    active: true,
    website: 'Sarah Originals',
    name: 'Featured',
    slider: [{
        controller: false, //
        controls: [{
            event: 'click',
            action: 'productsPage',
            trigger: { type: 'slider', className: ['slider-wrapper', 'showall-wrapper'] },
            search: {
                type: 'Product',
                collections: ['Featured']
            }
        }],
        search: {
            type: 'Product',
            collections: ['Featured'],
        },
        slide: [{
            title: {
                title: 'Featured Products'
            },
            src: '../../images/stunning.png'
        }]
    }]
}, {
    active: true,
    website: 'Sarah Originals',
    name: 'Moment Suggestions',
    slider: [{
        title: {
            title: 'Special Products'
        },
        search: {
            type: 'Product',
            collections: ['Special Offer'],
        },
        controller: false,
        controls: [{
            slide: ['Adidas'],
            action: 'productsPage',
            route: '/products',
            trigger: { type: 'slide', className: ['title-wrapper'] },
            event: 'click',
            search: {
                type: 'Product',
                push: { className: ['product-name'], key: 'collections' },
            }
        }, {
            action: 'productsPage',
            route: '/product',
            trigger: { type: 'slide', className: ['product-name'] },
            event: 'click',
            search: {
                type: 'Product',
                push: { className: ['product-name'], key: 'keyword' },
            }
        }],
        slide: [{
            index: 0,
            name: 'Adidas',
            title: {
                title: 'New Collections'
            },
            src: '4940604d493ce2d94e1b53cb293a6168.png',
        }],
    }, {
        title: {
            title: 'Moment Suggestions'
        },
        search: {
            type: 'Product',
            collections: ['Moment Suggestions'],
        }
    }]
}, { // done
    active: true,
    website: 'Sarah Originals',
    name: 'Categories',
    slider: [{
        title: {
            title: 'Product Categories'
        },
        controller: false, //
        controls: [{
            action: 'productsPage',
            trigger: { type: 'slide', className: ['slide-wrapper'] },
            event: 'click',
            route: '/products',
            search: {
                type: 'Product',
                push: { key: 'collections', className: ['title-text'] },
            }
        }, {
            action: 'productsPage',
            trigger: { type: 'slider', className: ['showall-wrapper'] },
            event: 'click',
            route: '/products',
            search: {
                type: 'Product',
                collections: ['Any'],
            }
        }],
        slide: [{
            name: 'category-sample-1',
            src: '../../images/category-sample-1.jpg',
            title: {
                title: 'Meat & Chicken'
            }
        }, {
            name: 'category-sample-2',
            src: '../../images/category-sample-2.jpg',
            title: {
                title: 'Sauces & Jars'
            }
        }, {
            name: 'category-sample-3',
            src: '../../images/category-sample-3.jpg',
            title: {
                title: 'Cans & Seeds'
            }
        }, {
            name: 'category-sample-4',
            src: '../../images/category-sample-4.jpg',
            title: {
                title: 'Snacks'
            }
        }, {
            name: 'category-sample-5',
            src: '../../images/category-sample-5.jpg',
            title: {
                title: 'Fruits & Veggies'
            }
        }, {
            name: 'category-sample-6',
            src: '../../images/category-sample-6.png',
            title: {
                title: 'Dairy & Eggs'
            }
        }, {
            name: 'category-sample-7',
            src: '../../images/category-sample-7.jpg',
            title: {
                title: 'Beauty & Care'
            }
        }, {
            name: 'category-sample-8',
            src: '../../images/category-sample-8.jpg',
            title: {
                title: 'Frozen'
            }
        }, {
            name: 'category-sample-9',
            src: '../../images/category-sample-9.png',
            title: {
                title: 'Hot & Soft Drinks'
            }
        }, {
            name: 'category-sample-10',
            src: '../../images/category-sample-10.png',
            title: {
                title: 'Pasta, Rice, & More'
            }
        }, {
            name: 'category-sample-11',
            src: '../../images/category-sample-11.png',
            title: {
                title: 'Household Care'
            }
        }],
    }]
}, {
    active: true,
    website: 'Sarah Originals',
    name: 'Controller-Controllabel',
    slider: [{
        title: {
            title: 'Filter By : ',
            icon: {
                name: 'filter',
                code: 'fas',
            }
        },
        controller: true,
        controls: [{
            action: 'changeSlides',
            event: 'click',
            trigger: { type: 'slide', className: ['title-wrapper'] },
            search: {
                type: 'Product',
                push: { key: 'collections', className: ['title-text'] }
            }
        }, {
            action: 'changeSlides',
            event: 'click',
            trigger: { type: 'slider', className: ['title-wrapper'] },
            search: {
                type: 'Product',
                collections: ['Popular', 'Featured', 'Special Offer'],
            }
        }],
        slide: [{
            name: 'Popular',
            title: { title: 'Popular' },
        }, {
            name: 'Featured',
            title: { title: 'Featured' },
        }, {
            name: 'New Arrival',
            title: { title: 'New Arrival' },
        }, {
            name: 'Special',
            title: { title: 'Special' },
        }],
    }, {
        controllable: true,
        action: 'changeSlides',
        search: {
            type: 'Product',
            collections: ['Popular', 'Featured', 'Special Offer'],
        }
    }]
}, {
    active: true,
    website: 'Sarah Originals',
    name: 'Sub_Banners',
    slider: [{
        slide: [{
            name: 'sub-banner-1',
            src: '../../images/sub-banner-1.jpg',
        }, {
            name: 'sub-banner-2',
            src: '../../images/sub-banner-2.jpg',
        }, {
            name: 'sub-banner-3',
            src: '../../images/sub-banner-3.jpg',
        }, {
            name: 'sub-banner-4',
            src: '../../images/sub-banner-4.jpg',
        }]
    }],
}, {
    active: true,
    website: 'Sarah Originals',
    name: 'New Arrival',
    slider: [{
        title: {
            title: 'New Arrival Products'
        },
        search: {
            type: 'Product',
            collections: ['New Arrival']
        }
    }]
}, { // done
    active: true,
    website: 'Sarah Originals',
    name: 'Banners',
    slider: [{
        slide: [{
            name: 'banner-sample-1',
            src: '../../images/banner-sample-1.jpg',
        }, {
            name: 'banner-sample-2',
            src: '../../images/banner-sample-2.jpg',
        }, {
            name: 'banner-sample-3',
            src: '../../images/banner-sample-3.jpg',
        }, {
            name: 'banner-sample-4',
            src: '../../images/banner-sample-4.jpg',
        }, {
            name: 'banner-sample-5',
            src: '../../images/banner-sample-5.jpg',
        }]
    }]
}, {
    active: true,
    website: 'Sarah Originals',
    name: 'Popular',
    slider: [{
        title: {
            title: 'Popular Products'
        },
        search: {
            type: 'Product',
            collections: ['Popular']
        },
    }]
}, {
    name: 'SuperMarkety',
    active: true,
    website: 'Sarah Originals',
    slider: [{
        controller: true,
        controls: [{
            action: 'productsPage',
            event: 'click',
            trigger: { type: 'slide', className: ['title-wrapper'] },
            search: {
                type: 'Product',
                push: { key: 'collections', className: ['product-name'] }
            }
        }],
        slide: [{
            name: 'Super Market',
            title: {
                title: 'Super Market',
            },
        }, {
            name: 'Surprising Products',
            title: {
                title: 'Surprising Products',
            },
        }, {
            name: 'Proteins & Meats',
            title: {
                title: 'Proteins & Meats',
            },
        }, {
            name: 'Snacks',
            title: {
                title: 'Snacks',
            },
        }, {
            name: 'Breakfast',
            title: {
                title: 'Breakfast',
            },
        }, {
            name: 'Drinks',
            title: {
                title: 'Drinks',
            },
        }, {
            name: 'Staples and Groceries',
            title: {
                title: 'Staples and Groceries',
            },
        }, {
            name: 'Nuts & Sweets',
            title: {
                title: 'Nuts & Sweets',
            },
        }]
    }]
}, {
    name: 'Category Ribbon',
    active: true,
    website: 'Sarah Originals',
    title: {
        title: 'Super Market',
        icon: {
            code: 'fas',
            name: 'shipping-fast'
        }
    },
    slider: [{
        name: 'category ribbon slider',
        title: {
            title: 'Categories'
        },
        controllable: true,
        action: 'productsCategories',
        search: {
            type: 'Category',
            collections: ['Any']
        },
        controller: true,
        controls: [{
            push: ['title-text'],
            event: 'click',
            action: 'productsPage',
            trigger: { type: 'slide', className: ['slide-wrapper'] },
            search: {
                type: 'Product',
                push: { key: 'collections', className: ['product-name'] },
            }
        }]
    }]
}]
/////////////// related pros are pros that have the same collection or category