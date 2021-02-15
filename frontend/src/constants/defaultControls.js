export const Controls = {
    active: true,
    name: 'Controls',
    HomeScreen: [{
        active: true,
        name: 'Secondary Navigation Bar',
        styles: {
            desktop: {
                type: 'MagicBox',
                name: 'Secondary Navigation Bar',
            }
        },
        slider: [{
            slide: [{
                name: 'Product Categories',
                title: {
                    title: 'Product Categories',
                    icon: {
                        code: 'fas',
                        name: 'bars'
                    }
                },
                controller: true,
                action: 'showNavBarSubBox',
                controls: {
                    event: 'hover',
                    read: ['styles'],
                    trigger: ['slide'],
                    getFrom: 'none'
                }
            }, {
                name: 'SuperMarket',
                title: {
                    title: 'SuperMarket',
                },
                controller: true,
                action: 'showNavBarSubBox',
                controls: {
                    event: 'hover',
                    read: ['styles'],
                    trigger: ['slide'],
                    getFrom: 'none'
                }
            }, {
                name: 'Offers & Suggestions',
                title: {
                    title: 'Offers & Suggestions',
                    icon: {
                        name: 'fire-alt',
                        code: 'fas',
                    }
                },
                controller: true,
                action: 'showNavBarSubBox',
                controls: {
                    event: 'hover',
                    read: ['styles'],
                    trigger: ['slide'],
                    getFrom: 'none'
                }
            }, {
                name: "My Sarah's",
                title: { title: "My Sarah's" },
                controller: true,
                action: 'showNavBarSubBox',
                controls: {
                    event: 'hover',
                    read: ['styles'],
                    trigger: ['slide'],
                    getFrom: 'none'
                }
            }, {
                name: 'Sarah Plus', title: { title: 'Sarah Plus' },
                controller: true,
                action: 'showNavBarSubBox',
                controls: {
                    event: 'hover',
                    read: ['styles'],
                    trigger: ['slide'],
                    getFrom: 'none'
                }
            }, {
                name: 'Sarah Club',
                title: { title: 'Sarah Club' },
                controller: true,
                action: 'showNavBarSubBox',
                controls: {
                    event: 'hover',
                    read: ['styles'],
                    trigger: ['slide'],
                    getFrom: 'none'
                }
            }, {
                name: 'Question!',
                title: { title: 'Question!' },
                controller: true,
                action: 'showNavBarSubBox',
                controls: {
                    event: 'hover',
                    read: ['styles'],
                    trigger: ['slide'],
                    getFrom: 'none'
                }
            }, {
                name: 'Become a Seller',
                title: { title: 'Become a Seller' },
                controller: true,
                action: 'showNavBarSubBox',
                controls: {
                    event: 'hover',
                    read: ['styles'],
                    trigger: ['slide'],
                    getFrom: 'none'
                }
            }],
            slides: [{ name: 'Product Categories' }, { name: 'SuperMarket' },
            { name: 'Offers & Suggestions' }, { name: "My Sarah's" },
            { name: 'Sarah Plus' }, { name: 'Question!' }, { name: 'Become a Seller' }]
        }]
    }, {
        active: true,
        name: 'Action Note',
        controllable: true,
        action: 'actionNote',
        styles: {
            desktop: {
                type: 'MagicBox',
                name: 'Action Note Desktop',
            }
        }
    }, {
        active: true,
        name: 'Image Ribbon',
        title: {
            title: 'Surprising Products',
        },
        styles: {
            desktop: {
                type: 'MagicBox',
                name: 'Image Ribbon',
            }
        },
        slider: [{
            collections: {
                type: 'Product',
                limit: 20,
                collections: ['Any']
            }
        }]
    }, { // done
        active: true,
        name: 'Hero',
        styles: {
            desktop: {
                type: 'MagicBox',
                name: 'Hero'
            }
        },
        // slides
        slider: [{
            // slides
            slides: [{
                name: 'Frozen Cocktail',
                src: '../../images/sample-1.jpg',
                link: ''
            }, {
                name: 'Light FruDoza',
                src: '../../images/sample-3.jpg',
                link: ''
            }, {
                name: 'Cashews Raw',
                src: '../../images/sample-2.jpg',
                link: ''
            }],
        }, {
            slides: [{
                name: 'banner-sample-7',
                src: '../../images/banner-sample-7.jpg',
                link: ''
            }, {
                name: 'banner-sample-8',
                src: '../../images/banner-sample-8.jpg',
                link: ''
            }, {
                name: 'banner-sample-9',
                src: '../../images/banner-sample-9.jpg',
                link: ''
            }, {
                name: 'banner-sample-10',
                src: '../../images/banner-sample-10.jpg',
                link: ''
            }, {
                name: 'banner-sample-11',
                src: '../../images/banner-sample-11.jpg',
                link: ''
            }]
        }]
    }, {
        active: true,
        name: 'digikala style',
        styles: {
            desktop: {
                type: 'MagicBox',
                name: 'digikala style'
            }
        },
        title: {
            title: 'SuperMarket Products'
        },
        slider: [{
            controllable: true,
            action: 'digiProduct',
            controls: {
                event: 'hover',
            },
            collections: {
                type: 'Product',
                collections: ['Featured'],
                limit: 1
            },
        }, {
            collections: {
                type: 'Product',
                collections: ['Featured'],
                limit: 5
            },
            slide: [{
                isDefault: true,
                controller: true,
                action: 'digiProduct',
                controls: {
                    event: 'hover',
                    read: ['slides'],
                    trigger: ['slide', 'autoPlay'],
                    getFrom: 'content',
                },
            }]
        }]
    }, {
        active: true,
        name: 'Featured',
        styles: {
            desktop: {
                type: 'MagicBox',
                name: 'Featured'
            }
        },
        slider: [{
            collections: {
                type: 'Product',
                collections: ['Featured'],
            },
            slides: [{
                title: 'Featured Products',
                src: '../../images/stunning.png'
            }]
        }]
    }, {
        active: true,
        name: 'Moment Suggestions',
        styles: {
            desktop: {
                type: 'MagicBox',
                name: 'Moment Suggestions'
            }
        },
        slider: [{
            title: {
                title: 'Special Products',
            },
            collections: {
                type: 'Product',
                collections: ['Special Offer'],
            },
            slide: [{
                name: 'Adidas',
                title: {
                    title: 'New Collections'
                }
            }],
            slides: [{
                link: '',
                name: 'Adidas',
                src: '4940604d493ce2d94e1b53cb293a6168.png'
            }]
        }, {
            title: {
                title: 'Moment Suggestions',
            },
            collections: {
                type: 'Product',
                collections: ['Moment Suggestions'],
            }
        }]
    }, { // done
        active: true,
        name: 'Categories',
        styles: {
            desktop: {
                name: 'Categories',
                type: 'MagicBox',
            }
        },
        slider: [{
            title: {
                title: 'Product Categories',
            },
            slide: [{
                name: 'category-sample-1',
                title: {
                    title: 'Meat & Chicken'
                }
            }, {
                name: 'category-sample-2',
                title: {
                    title: 'Sauces & Jars'
                }
            }, {
                name: 'category-sample-3',
                title: {
                    title: 'Cans & Seeds'
                }
            }, {
                name: 'category-sample-4',
                title: {
                    title: 'Snacks'
                }
            }, {
                name: 'category-sample-5',
                title: {
                    title: 'Fruits & Veggies'
                }
            }, {
                name: 'category-sample-6',
                title: {
                    title: 'Dairy & Eggs'
                }
            }, {
                name: 'category-sample-7',
                title: {
                    title: 'Beauty & Care'
                }
            }, {
                name: 'category-sample-8',
                title: {
                    title: 'Frozen'
                }
            }, {
                name: 'category-sample-9',
                title: {
                    title: 'Hot & Soft Drinks'
                }
            }, {
                name: 'category-sample-10',
                title: {
                    title: 'Pasta, Rice, & More'
                }
            }, {
                name: 'category-sample-11',
                title: {
                    title: 'Household Care'
                }
            }],
            slides: [{
                name: 'category-sample-1',
                src: '../../images/category-sample-1.jpg',
                link: ''
            }, {
                name: 'category-sample-2',
                src: '../../images/category-sample-2.jpg',
                link: ''
            }, {
                name: 'category-sample-3',
                src: '../../images/category-sample-3.jpg',
                link: ''
            }, {
                name: 'category-sample-4',
                src: '../../images/category-sample-4.jpg',
                link: ''
            }, {
                name: 'category-sample-5',
                src: '../../images/category-sample-5.jpg',
                link: ''
            }, {
                name: 'category-sample-6',
                src: '../../images/category-sample-6.png',
                link: ''
            }, {
                name: 'category-sample-7',
                src: '../../images/category-sample-7.jpg',
                link: ''
            }, {
                name: 'category-sample-8',
                src: '../../images/category-sample-8.jpg',
                link: ''
            }, {
                name: 'category-sample-9',
                src: '../../images/category-sample-9.png',
                link: ''
            }, {
                name: 'category-sample-10',
                src: '../../images/category-sample-10.png',
                link: ''
            }, {
                name: 'category-sample-11',
                src: '../../images/category-sample-11.png',
                link: ''
            }]
        }]
    }, {
        active: true,
        name: 'Controller-Controllabel',
        styles: {
            desktop: {
                type: 'MagicBox',
                name: '2controlBox'
            }
        },
        slider: [{
            title: {
                title: 'Filter By : ',
                icon: {
                    name: 'filter',
                    code: 'fas',
                }
            },
            controller: true,
            action: 'changeSlides',
            controls: {
                event: 'click',
                read: ['slides', 'title'],
                trigger: ['title'],
                getFrom: 'controls',
                collections: {
                    type: 'Product',
                    collections: ['Popular', 'Featured', 'Special Offer'],
                }
            },
            slide: [{
                name: 'Popular',
                title: { title: 'Popular' },
                controller: true,
                action: 'changeSlides',
                controls: {
                    event: 'click',
                    read: ['title'],
                    trigger: ['title'],
                    getFrom: 'controls',
                    collections: {
                        type: 'Product',
                        collections: ['Popular'],
                    }
                }
            }, {
                name: 'Featured',
                title: { title: 'Featured' },
                controller: true,
                action: 'changeSlides',
                controls: {
                    event: 'click',
                    read: ['title'],
                    trigger: ['title'],
                    getFrom: 'controls',
                    collections: {
                        type: 'Product',
                        collections: ['Featured'],
                    }
                }
            }, {
                name: 'New Arrival',
                title: { title: 'New Arrival' },
                controller: true,
                action: 'changeSlides',
                controls: {
                    event: 'click',
                    read: ['title'],
                    trigger: ['title'],
                    getFrom: 'controls',
                    collections: {
                        type: 'Product',
                        collections: ['New Arrival'],
                    }
                }
            }, {
                name: 'Special',
                title: { title: 'Special' },
                controller: true,
                action: 'changeSlides',
                controls: {
                    event: 'click',
                    read: ['title'],
                    trigger: ['title'],
                    getFrom: 'controls',
                    collections: {
                        type: 'Product',
                        collections: ['Special'],
                    }
                }
            }],
            slides: [
                { name: 'Popular' },
                { name: 'Featured' },
                { name: 'New Arrival' },
                { name: 'Special' }
            ]
        }, {
            collections: {
                type: 'Product',
                collections: ['Popular', 'Featured', 'Special Offer'],
            },
            controllable: true,
            action: 'changeSlides',
        }]
    }, {
        active: true,
        name: 'Sub_Banners',
        styles: {
            desktop: {
                name: 'Sub_Banners',
                type: 'MagicBox',
            }
        },
        slider: [{
            slides: [{
                name: 'sub-banner-1',
                src: '../../images/sub-banner-1.jpg',
                link: ''
            }, {
                name: 'sub-banner-2',
                src: '../../images/sub-banner-2.jpg',
                link: ''
            }, {
                name: 'sub-banner-3',
                src: '../../images/sub-banner-3.jpg',
                link: ''
            }, {
                name: 'sub-banner-4',
                src: '../../images/sub-banner-4.jpg',
                link: ''
            }]
        }],
    }, {
        active: true,
        name: 'New Arrival',
        styles: {
            desktop: {
                name: 'New Arrival',
                type: 'MagicBox',
            }
        },
        slider: [{
            title: {
                title: 'New Arrival Products'
            },
            collections: {
                type: 'Product',
                collections: ['New Arrival']
            }
        }]
    }, { // done
        active: true,
        name: 'Banners',
        styles: {
            desktop: {
                name: 'Banners',
                type: 'MagicBox',
            }
        },
        slider: [{
            slides: [{
                name: 'banner-sample-1',
                src: '../../images/banner-sample-1.jpg',
                link: ''
            }, {
                name: 'banner-sample-2',
                src: '../../images/banner-sample-2.jpg',
                link: ''
            }, {
                name: 'banner-sample-3',
                src: '../../images/banner-sample-3.jpg',
                link: ''
            }, {
                name: 'banner-sample-4',
                src: '../../images/banner-sample-4.jpg',
                link: ''
            }, {
                name: 'banner-sample-5',
                src: '../../images/banner-sample-5.jpg',
                link: ''
            }]
        }]
    }, {
        active: true,
        name: 'Popular',
        styles: {
            desktop: {
                name: 'Popular',
                type: 'MagicBox',
            }
        },
        slider: [{
            title: {
                title: 'Popular Products'
            },
            collections: {
                type: 'Product',
                collections: ['Popular']
            }
        }]
    }],
}