import { useState } from 'react';
import { 
  Button, 
  Card, 
  CardContent, 
  Dialog, 
  DialogTitle, 
  DialogContent, 
  DialogActions,
  Typography,
  Box
} from '@mui/material';

function Content() {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <div>
      <Typography variant="h4" gutterBottom>Content</Typography>
      <Typography variant="body1" gutterBottom>
        Manage your social media and marketing content here.
      </Typography>
      <Button
        variant="contained"
        color="primary"
        onClick={() => setModalOpen(true)}
        sx={{ mb: 2 }}
      >
        + Create Content
      </Button>
      
      <Card sx={{ margin: '2rem 0', borderLeft: '6px solid #cc0033' }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Instagram Post
          </Typography>
          <Typography variant="body2" color="text.secondary" gutterBottom>
            Scheduled for 2025-07-10
          </Typography>
          <Typography variant="body1" sx={{ fontSize: 14, color: '#444', marginBottom: 1 }}>
            "Join us for the Summer Invitational! Register now."
          </Typography>
          <Typography variant="body2" sx={{ fontSize: 13, color: '#888' }}>
            Platform: Instagram • Status: Scheduled
          </Typography>
        </CardContent>
      </Card>
      
      <Dialog open={modalOpen} onClose={() => setModalOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Create Content</DialogTitle>
        <DialogContent>
          <Typography variant="body1" sx={{ mb: 2 }}>
            This is a Material UI modal. Add your content creation form here.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setModalOpen(false)}>
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default Content; 