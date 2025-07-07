import { useState } from 'react';
import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  AppBar,
  Toolbar,
  Typography,
  useTheme,
  CssBaseline,
  IconButton
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import './App.css';
import Scheduling from './Scheduling';
import Content from './Content';

const NAV_ITEMS = [
  { key: 'dashboard', label: 'Dashboard' },
  { key: 'scheduling', label: 'Scheduling' },
  { key: 'content', label: 'Content' },
  { key: 'analytics', label: 'Analytics' },
];

const drawerWidth = 240;

function App() {
  const [page, setPage] = useState('dashboard');
  const [mobileOpen, setMobileOpen] = useState(false);
  const theme = useTheme();

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <Box
      sx={{
        height: '100%',
        background: 'linear-gradient(135deg, #cc0033 0%, #990026 100%)',
        color: '#fff',
        display: 'flex',
        flexDirection: 'column',
        p: 0,
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', py: 4, mb: 2 }}>
        {/* Rutgers logo */}
        <Box
          sx={{
            width: 48,
            height: 48,
            borderRadius: 2,
            background: '#fff',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            mr: 2,
            boxShadow: '0 2px 8px 0 rgba(0,0,0,0.10)',
            overflow: 'hidden',
          }}
        >
          <img
            src={require('/Users/cjruiz/tesing1249/assets/images/rutgers-golf-logo.png')}
            alt="Rutgers Golf Course Logo"
            style={{ width: 40, height: 40, objectFit: 'contain', borderRadius: 8 }}
          />
        </Box>
        <Typography variant="h6" sx={{ fontWeight: 900, letterSpacing: 1, fontSize: 22 }}>
          Marketing Hub
        </Typography>
      </Box>
      <List sx={{ flexGrow: 1 }}>
        {NAV_ITEMS.map((item) => (
          <ListItem key={item.key} disablePadding>
            <ListItemButton
              selected={page === item.key}
              onClick={() => setPage(item.key)}
              sx={{
                borderRadius: 2,
                mx: 2,
                my: 0.5,
                color: '#fff',
                background: page === item.key ? 'rgba(255,255,255,0.18)' : 'none',
                boxShadow: page === item.key ? '0 2px 8px 0 rgba(0,0,0,0.10)' : 'none',
                fontWeight: page === item.key ? 700 : 400,
                '&:hover': {
                  background: 'rgba(255,255,255,0.10)',
                },
              }}
            >
              <ListItemText
                primary={item.label}
                primaryTypographyProps={{
                  fontWeight: page === item.key ? 700 : 400,
                  fontSize: 16,
                }}
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Box sx={{ p: 2, mt: 'auto', textAlign: 'center', fontSize: 13, opacity: 0.7 }}>
        <span>Rutgers Golf Course</span>
      </Box>
    </Box>
  );

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', background: '#f7f7fa' }}>
      <CssBaseline />
      {/* AppBar/Header */}
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
          background: 'linear-gradient(90deg, #cc0033 0%, #990026 100%)',
          boxShadow: '0 4px 16px 0 rgba(204,0,51,0.10)',
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h4"
            noWrap
            sx={{ fontWeight: 900, letterSpacing: 1, flexGrow: 1 }}
          >
            Rutgers Golf Course Marketing Hub
          </Typography>
        </Toolbar>
      </AppBar>
      {/* Sidebar/Drawer */}
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="sidebar navigation"
      >
        {/* Mobile Drawer */}
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{ keepMounted: true }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
        >
          {drawer}
        </Drawer>
        {/* Desktop Drawer */}
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      {/* Main Content */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: { xs: 2, sm: 4 },
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          mt: 10,
        }}
      >
        {page === 'dashboard' && (
          <>
            <h2>Dashboard</h2>
            <Card sx={{ marginBottom: '2rem', width: '100%' }}>
              <CardContent>
                <Typography variant="h5" component="h3" gutterBottom>
                  Engagement Overview
                </Typography>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                  Track your audience engagement over time
                </Typography>
                <Typography variant="body1" sx={{ marginBottom: '1rem' }}>
                  This card is powered by Material UI. You can use it for stats, events, or any dashboard content.
                </Typography>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => alert('Material UI Card!')}
                >
                  View Details
                </Button>
              </CardContent>
            </Card>
          </>
        )}
        {page === 'scheduling' && <Scheduling />}
        {page === 'content' && <Content />}
        {page === 'analytics' && (
          <>
            <h2>Analytics</h2>
            <p>Analytics and reporting features will go here.</p>
          </>
        )}
      </Box>
    </Box>
  );
}

export default App;
