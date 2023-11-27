import React from 'react'
import '../css/global.css'
import { Box, Stack, Typography,} from '@mui/joy'
import logo from '../media/logo.svg'

function Navbar() {
  return (
    <>
    <Stack
    direction={"row"}
    alignItems={"center"}
    spacing={{md:3,sm:2,xs:1}}
    className="nav"
    >
        <Box
        justifySelf={"flex-start"}
        className="logo-box"
        >
        <img src={logo} alt={"logo"}/>
        </Box>
        <Typography
        level='title-lg'
        className="title"
        >
         Cats
        </Typography>
    </Stack>
    </>
  )
}

export default Navbar