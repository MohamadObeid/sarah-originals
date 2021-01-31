export const TitleStyles = [{
    // Default styles
    name: 'Default Title Desktop Styles',
    display: 'flex',// 'flex' },
    padding: '1rem',// '1rem' },
    design: 'Classic',// 'Classic' },
    border: '0',// '0' },
    borderSide: 'Around',
    width: '100%',
    backgroundColor: 'inherit',//'inherit' },
    alignItems: 'center',//'center' },
    justifyContent: 'space-between',// 'space-between' },
    borderRadius: '0',// '0.2rem' },
    flexDirection: 'row',
    title: {
        text: 'Container Title',// 'Container Title' },
        color: '#404040',// '#404040' },
        position: 'relative',// 'relative' },
        fontSize: '1.9rem',//'1.9rem' },
        border: '0',// '0' },
        padding: '0',// '0' },
        margin: '0 2rem 0 0',
    },
    strokeLine: {
        display: 'flex',// 'flex' },
        color: 'blue',// 'blue' },
        height: '2px',// '2px' },
        width: '100%',// '100%' },
    },
    showAll: {
        display: 'flex',// 'flex' },
        position: 'relative',// 'relative' },
        direction: 'X',// 'X' },
        fontSize: '1.3rem',// '1.3rem' },
        color: '#00000080',// '#00000080' },
        border: '0',// '0' },
        text: 'show all',// 'show all' },
        padding: '0',// '0' },
        margin: '0 0 0 2rem',
    },
    chevron: {
        display: 'flex',// 'flex' },
        color: 'blue',// 'blue' },
        fontSize: '1.9rem',// '1.9rem' },
    }
}, {
    name: 'Center Stroke 100',
    strokeLine: {
        color: '#d3b25d',
    },
    chevron: {
        color: '#d3b25d',
    }
}, {
    name: 'Top-Fish-100',
    design: 'Fish',
    title: {
        fontSize: '1.5rem',
        text: 'Surprising Products',
        color: '#d3b25d',
    },
}, {
    name: 'Light Bottom Stroke 100',
    padding: '0 3rem',
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
    title: {
        border: '1px solid red',
        padding: '1.2rem 2rem 1.2rem 0'
    },
    strokeLine: {
        height: '1px',
        color: '#00000020'
    },
    showAll: {
        position: 'absolute',
        color: '#00000090',
        padding: '1.2rem 1rem',
    },
    chevron: {
        color: '#00000080',
        fontSize: '1.6rem'
    }
}, {
    name: 'Simple Slide Title',
    margin: '0 0 1rem 0',
    title: {
        fontSize: '1.5rem',
    },
    strokeLine: {
        display: 'none'
    },
    showAll: {
        text: '',
    },
    chevron: {
        color: '#d3b25d',
    }
}, {
    name: 'Light Bottom Stroke 100 (No show more)',
    display: 'flex',
    padding: '0 3rem',
    border: '0',
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
    title: {
        border: '1px solid red',
        padding: '1.2rem 2rem 1.2rem 0'
    },
    strokeLine: {
        height: '1px',
        color: '#00000020'
    },
    showAll: {
        display: 'none',
        position: 'absolute',
        color: '#00000080',
        fontSize: '1.4rem',
        padding: '1.2rem 0',
    },
    chevron: {
        color: '#00000080',
        fontSize: '1.6rem'
    }
}, {
    name: 'Simple Title',
    display: 'flex',
    padding: '1rem 0',
    border: '0',
    alignItems: 'center',
    justifyContent: 'center',
    margin: '1rem 0 0 0',
    title: {
        fontSize: '1.4rem',
        position: 'relative',
        padding: '0',
        margin: '0',
        color: '#606060'
    },
    strokeLine: {
        width: '0%'
    },
    showAll: {
        display: 'none',
    },
    chevron: {
        display: 'none'
    }
}]