import React from 'react';
import { AppBar, Toolbar, Typography, IconButton, Link, Box, Drawer, List, ListItem, ListItemText, ListItemIcon, useMediaQuery } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import HomeIcon from '@mui/icons-material/Home'; 
import BusinessIcon from '@mui/icons-material/Business';
import WorkIcon from '@mui/icons-material/Work';
import logo from '../assets/react.svg'; 

const Navbar: React.FC = () => {
    const [drawerOpen, setDrawerOpen] = React.useState(false);
    const isLargeScreen = useMediaQuery('(min-width:1250px)');

    const handleDrawerOpen = () => {
        setDrawerOpen(true);
    };

    const handleDrawerClose = () => {
        setDrawerOpen(false);
    };

    return (
        <>
            <AppBar position="static" className='navbar'>
                <Toolbar>
                    
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        <img src={logo} alt="Logo" style={{ height: '30px', marginRight: '10px' }} />
                        <h1 className='navbar-title'>Employee</h1> <span className='navbar-title-decorator'>manager</span>
                    </Typography>
                    {!isLargeScreen && (
                        <IconButton edge="start" color="inherit" aria-label="menu" onClick={handleDrawerOpen}>
                            <MenuIcon />
                        </IconButton>
                    )}
                    {isLargeScreen && (
                        <Box sx={{ display: 'flex' }}>
                            <Link href="/" color="inherit" underline="none" sx={{ marginRight: '20px' }}>
                                Empleados
                            </Link>
                            <Link href="/careers" color="inherit" underline="none" sx={{ marginRight: '20px' }}>
                                Carreras
                            </Link>
                            <Link href="/skills" color="inherit" underline="none">
                                Habilidades
                            </Link>
                        </Box>
                    )}
                </Toolbar>
            </AppBar>
            <Drawer
                anchor="right"
                open={drawerOpen}
                onClose={handleDrawerClose}
                sx={{
                    '& .MuiDrawer-paper': {
                        background: '#1976d2',
                        color:'white' 
                    },
                }}
            >
                <List>
                    <div className="w100 flex-center">
                    <img src={logo} alt="Logo" style={{ height: '30px', margin: '10px auto' }} />
                    </div>
                    <ListItem  onClick={handleDrawerClose}>
                        <ListItemIcon sx={{ color: 'white' }}><HomeIcon /></ListItemIcon>
                        <ListItemText primary="Empleados" />
                    </ListItem>
                    <ListItem  onClick={handleDrawerClose}>
                        <ListItemIcon sx={{ color: 'white' }}><BusinessIcon /></ListItemIcon>
                        <ListItemText primary="Carreras" />
                    </ListItem>
                    <ListItem  onClick={handleDrawerClose}>
                        <ListItemIcon sx={{ color: 'white' }}><WorkIcon /></ListItemIcon>
                        <ListItemText primary="Habilidades" />
                    </ListItem>
                </List>
            </Drawer>
        </>
    );
}

export default Navbar;
