import Board from './components/Board'
import './App.css';
import { themes } from './types/themes';

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { FormControlLabel, Switch } from '@mui/material';
import { useState } from 'react';

function App() {
    const [imagesEnabled, setImagesEnabled] = useState<boolean>(false);
    const [playAI, setPlayAI] = useState<boolean>(true);

    const handleImageEnabledChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setImagesEnabled(event.target.checked);
    }

    const handlePlayAIChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPlayAI(event.target.checked);
    }

    return (
        <>
            <Board imagesEnabled={imagesEnabled} playAI={playAI} theme={themes[0]} />

            <FormControlLabel control={<Switch checked={imagesEnabled} onChange={handleImageEnabledChange} />} label="Images" />
            <FormControlLabel control={<Switch checked={playAI} onChange={handlePlayAIChange} />} label="Play AI" />
        </>
    );
}

export default App;
