export const themes: Theme[] = [
    {
        name: 'Classic',
        lightSquareColor: '#f0d9b5',
        darkSquareColor: '#b58863',
        lightHighlightColor: '#e6c078',
        darkHighlightColor: '#946b4a',
        selectedColor: '#c0a673',
    },
    {
        name: 'Stealthy',
        lightSquareColor: '#272727',
        darkSquareColor: '#242424',
        lightHighlightColor: '#2d2d2d',
        darkHighlightColor: '#212121',
        selectedColor: '#383838',
    },
    {
        name: 'Ocean',
        lightSquareColor: '#a2d5f2',
        darkSquareColor: '#197278',
        lightHighlightColor: '#c4ebfa',
        darkHighlightColor: '#155a66',
        selectedColor: '#ff5733',
    },
    {
        name: 'Forest',
        lightSquareColor: '#c8e6c9',
        darkSquareColor: '#388e3c',
        lightHighlightColor: '#a5d6a7',
        darkHighlightColor: '#2e7d32',
        selectedColor: '#6d4c41',
    },
    {
        name: 'Midnight',
        lightSquareColor: '#4a90e2',
        darkSquareColor: '#283593',
        lightHighlightColor: '#7cb1f2',
        darkHighlightColor: '#3f51b5',
        selectedColor: '#673ab7',
    }
];

export interface Theme {
    name: string;
    lightSquareColor: string;
    darkSquareColor: string;
    lightHighlightColor: string;
    darkHighlightColor: string;
    selectedColor: string;
}