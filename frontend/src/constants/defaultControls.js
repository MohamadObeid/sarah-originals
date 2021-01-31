export const Controls = {
    active: true,
    name: 'Controls',
    HomeScreen: [{
        active: true,
        type: 'Product Box',
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
        type: 'Image Box',
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
                title: 'Frozen Cocktail',
                src: '../../images/sample-1.jpg',
                link: ''
            }, {
                title: 'Light FruDoza',
                src: '../../images/sample-3.jpg',
                link: ''
            }, {
                title: 'Cashews Raw',
                src: '../../images/sample-2.jpg',
                link: ''
            }],
        }, {
            slides: [{
                title: 'banner-sample-7',
                src: '../../images/banner-sample-7.jpg',
                link: ''
            }, {
                title: 'banner-sample-8',
                src: '../../images/banner-sample-8.jpg',
                link: ''
            }, {
                title: 'banner-sample-9',
                src: '../../images/banner-sample-9.jpg',
                link: ''
            }, {
                title: 'banner-sample-10',
                src: '../../images/banner-sample-10.jpg',
                link: ''
            }, {
                title: 'banner-sample-11',
                src: '../../images/banner-sample-11.jpg',
                link: ''
            }]
        }]
    }, {
        active: true,
        type: 'Product Box',
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
        type: 'Product Box',
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
            slides: [{
                link: '',
                title: 'Adidas',
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
        type: 'Image Box',
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
            slides: [{
                title: 'category-sample-1',
                src: '../../images/category-sample-1.jpg',
                link: ''
            }, {
                title: 'category-sample-2',
                src: '../../images/category-sample-2.jpg',
                link: ''
            }, {
                title: 'category-sample-3',
                src: '../../images/category-sample-3.jpg',
                link: ''
            }, {
                title: 'category-sample-4',
                src: '../../images/category-sample-4.jpg',
                link: ''
            }, {
                title: 'category-sample-5',
                src: '../../images/category-sample-5.jpg',
                link: ''
            }, {
                title: 'category-sample-6',
                src: '../../images/category-sample-6.png',
                link: ''
            }, {
                title: 'category-sample-7',
                src: '../../images/category-sample-7.jpg',
                link: ''
            }, {
                title: 'category-sample-8',
                src: '../../images/category-sample-8.jpg',
                link: ''
            }, {
                title: 'category-sample-9',
                src: '../../images/category-sample-9.png',
                link: ''
            }, {
                title: 'category-sample-10',
                src: '../../images/category-sample-10.png',
                link: ''
            }, {
                title: 'category-sample-11',
                src: '../../images/category-sample-11.png',
                link: ''
            }]
        }]
    }, {
        active: true,
        type: 'Image Box',
        name: 'Sub_Banners',
        styles: {
            desktop: {
                name: 'Sub_Banners',
                type: 'MagicBox',
            }
        },
        slider: [{
            slides: [{
                title: 'sub-banner-1',
                src: '../../images/sub-banner-1.jpg',
                link: ''
            }, {
                title: 'sub-banner-2',
                src: '../../images/sub-banner-2.jpg',
                link: ''
            }, {
                title: 'sub-banner-3',
                src: '../../images/sub-banner-3.jpg',
                link: ''
            }, {
                title: 'sub-banner-4',
                src: '../../images/sub-banner-4.jpg',
                link: ''
            }]
        }],
    }, {
        active: true,
        type: 'Product Box',
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
        type: 'Image Box',
        name: 'Banners',
        styles: {
            desktop: {
                name: 'Banners',
                type: 'MagicBox',
            }
        },
        slider: [{
            slides: [{
                title: 'banner-sample-1',
                src: '../../images/banner-sample-1.jpg',
                link: ''
            }, {
                title: 'banner-sample-2',
                src: '../../images/banner-sample-2.jpg',
                link: ''
            }, {
                title: 'banner-sample-3',
                src: '../../images/banner-sample-3.jpg',
                link: ''
            }, {
                title: 'banner-sample-4',
                src: '../../images/banner-sample-4.jpg',
                link: ''
            }, {
                title: 'banner-sample-5',
                src: '../../images/banner-sample-5.jpg',
                link: ''
            }]
        }]
    }, {
        active: true,
        type: 'Product Box',
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