import React from 'react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Drawer, List, ListItemButton, ListItemText, ListItemIcon, IconButton } from '@mui/material'
// import '../../component.css'
import TextSnippetIcon from '@mui/icons-material/TextSnippet';
import InfoIcon from '@mui/icons-material/Info';
import MenuIcon from '@mui/icons-material/Menu';


const DrawerComp = () => {
    const [openDrawer, setOpenDrawer] = useState(false);
    const logout = () => {
        setOpenDrawer(false)
        localStorage.clear();
        window.location.reload();

    }


    return (
        <>
            <Drawer open={openDrawer}
                onClose={() => setOpenDrawer(false)}
            >
                <List>
                    <Link to="home" className='NavLink'>
                        <ListItemButton onClick={() => setOpenDrawer(false)}>
                            <ListItemIcon>
                                <TextSnippetIcon />
                                <ListItemText  >TEMPLETE</ListItemText>
                            </ListItemIcon>
                        </ListItemButton>
                    </Link>
                    <Link to="about" className='NavLink'>
                        <ListItemButton onClick={() => setOpenDrawer(false)}>
                            <ListItemIcon ><InfoIcon />
                                <ListItemText  >ABOUT US</ListItemText>
                            </ListItemIcon>
                        </ListItemButton>
                    </Link>
                    <ListItemButton onClick={logout}>
                        <ListItemIcon ><InfoIcon />
                            <ListItemText  >Logout</ListItemText>
                        </ListItemIcon>
                    </ListItemButton>

                </List>
            </Drawer >

            <IconButton sx={{ marginLeft: "auto" }} onClick={() => setOpenDrawer(!openDrawer)}>
                <MenuIcon />
            </IconButton>

        </>
    )
}

export default DrawerComp
