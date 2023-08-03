import Board from './components/Board'
import './App.css';

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { FormControlLabel, Switch } from '@mui/material';
import { useState } from 'react';

function App() {
    const [imagesEnabled, setImagesEnabled] = useState<boolean>(true);

    const handleImageEnabledChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setImagesEnabled(event.target.checked);
    }

    return (
        <>
            <Board imagesEnabled={imagesEnabled} />

            <FormControlLabel control={<Switch checked={imagesEnabled} onChange={handleImageEnabledChange} />} label="Images" />
        </>
    );
}

export default App;
