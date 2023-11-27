import { Box, Typography } from '@mui/joy'
import List from './Components/List';
//CSS
import './css/global.css';
import Navbar from './Components/Navbar';

function App() {
  return (
    <>
    <Navbar/>
    <Typography
    level='h1'
    className='title'
    fontWeight={"bold"}
    >
      Welcome to Cats Gallery!
    </Typography>
    <Box>
      <List/>
    </Box>
    </>
  );
}

export default App;
