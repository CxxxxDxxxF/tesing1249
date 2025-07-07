import { useState } from 'react';
import { 
  Button, 
  Card, 
  CardContent, 
  Dialog, 
  DialogTitle, 
  DialogContent, 
  DialogActions,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Typography,
  Box,
  IconButton
} from '@mui/material';
import { Delete, Edit } from '@mui/icons-material';

const INITIAL_FORM = {
  title: '',
  desc: '',
  date: '',
  time: '',
  type: 'event',
  color: '#cc0033',
};

function getMonthDays(year, month) {
  const days = [];
  const firstDay = new Date(year, month, 1).getDay();
  const numDays = new Date(year, month + 1, 0).getDate();
  // Fill leading blanks
  for (let i = 0; i < firstDay; i++) days.push(null);
  // Fill days
  for (let d = 1; d <= numDays; d++) days.push(d);
  return days;
}

function Scheduling() {
  const [modalOpen, setModalOpen] = useState(false);
  const [form, setForm] = useState(INITIAL_FORM);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [items, setItems] = useState([]);
  const [editId, setEditId] = useState(null);
  const [calendarMonth, setCalendarMonth] = useState(new Date().getMonth());
  const [calendarYear, setCalendarYear] = useState(new Date().getFullYear());
  const [selectedDate, setSelectedDate] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    setSuccess(false);
    if (!form.title.trim()) {
      setError('Title is required');
      return;
    }
    if (editId) {
      // Update existing item
      setItems((prev) => prev.map(item => item.id === editId ? { ...item, ...form } : item));
    } else {
      // Add new event/task to list
      setItems((prev) => [
        { ...form, id: Date.now() },
        ...prev,
      ]);
    }
    setSuccess(true);
    setTimeout(() => {
      setModalOpen(false);
      setForm(INITIAL_FORM);
      setSuccess(false);
      setEditId(null);
    }, 1200);
  };

  const handleEdit = (item) => {
    setForm(item);
    setEditId(item.id);
    setModalOpen(true);
  };

  const handleDelete = (id) => {
    setItems((prev) => prev.filter(item => item.id !== id));
  };

  // Calendar logic
  const days = getMonthDays(calendarYear, calendarMonth);
  const monthName = new Date(calendarYear, calendarMonth, 1).toLocaleString('default', { month: 'long' });
  const todayStr = new Date().toISOString().slice(0, 10);

  // Group items by date
  const itemsByDate = items.reduce((acc, item) => {
    if (!item.date) return acc;
    if (!acc[item.date]) acc[item.date] = [];
    acc[item.date].push(item);
    return acc;
  }, {});

  // Filtered items for selected date
  const filteredItems = selectedDate ? items.filter(i => i.date === selectedDate) : items;

  return (
    <div>
      <Typography variant="h4" gutterBottom>Scheduling</Typography>
      <Typography variant="body1" gutterBottom>
        Manage your events, tasks, and content calendar here.
      </Typography>
      <Button
        variant="contained"
        color="primary"
        onClick={() => { setModalOpen(true); setForm(INITIAL_FORM); setEditId(null); }}
        sx={{ mb: 2 }}
      >
        + Add Event/Task
      </Button>
      
      {/* Calendar grid */}
      <Card sx={{ margin: '2rem 0', maxWidth: 420 }}>
        <CardContent>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 2 }}>
            <Button 
              variant="outlined" 
              size="small" 
              onClick={() => setCalendarMonth(m => m === 0 ? 11 : m - 1)}
            >
              &lt;
            </Button>
            <Typography variant="h6" sx={{ fontWeight: 700 }}>
              {monthName} {calendarYear}
            </Typography>
            <Button 
              variant="outlined" 
              size="small" 
              onClick={() => setCalendarMonth(m => m === 11 ? 0 : m + 1)}
            >
              &gt;
            </Button>
          </Box>
          
          <Box sx={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(7,1fr)', 
            gap: 0.5, 
            marginBottom: 1.5, 
            fontWeight: 600, 
            color: '#cc0033' 
          }}>
            {['Sun','Mon','Tue','Wed','Thu','Fri','Sat'].map(d => (
              <Typography key={d} sx={{ textAlign: 'center', fontSize: '0.875rem' }}>
                {d}
              </Typography>
            ))}
          </Box>
          
          <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(7,1fr)', gap: 0.5 }}>
            {days.map((d, i) => {
              if (!d) return <Box key={i} />;
              const dateStr = `${calendarYear}-${String(calendarMonth+1).padStart(2,'0')}-${String(d).padStart(2,'0')}`;
              const isToday = dateStr === todayStr;
              const isSelected = selectedDate === dateStr;
              const hasEvents = itemsByDate[dateStr]?.length > 0;
              return (
                <Box
                  key={i}
                  onClick={() => setSelectedDate(dateStr === selectedDate ? null : dateStr)}
                  sx={{
                    background: isSelected ? '#cc0033' : isToday ? '#ffe5eb' : hasEvents ? '#f8f9fa' : '#fff',
                    color: isSelected ? '#fff' : '#222',
                    borderRadius: 1.25,
                    minHeight: 44,
                    cursor: hasEvents ? 'pointer' : 'default',
                    border: hasEvents ? '2px solid #cc0033' : '1px solid #eee',
                    boxShadow: isSelected ? '0 2px 8px #cc003344' : undefined,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: 500,
                    position: 'relative',
                    transition: 'all 0.15s',
                    '&:hover': {
                      boxShadow: hasEvents ? '0 2px 8px rgba(0,0,0,0.1)' : undefined,
                    }
                  }}
                >
                  {d}
                  {hasEvents && (
                    <Box sx={{ 
                      position: 'absolute', 
                      bottom: 4, 
                      right: 6, 
                      width: 8, 
                      height: 8, 
                      borderRadius: '50%', 
                      background: '#cc0033' 
                    }} />
                  )}
                </Box>
              );
            })}
          </Box>
          
          {selectedDate && (
            <Box sx={{ marginTop: 1.5, textAlign: 'center' }}>
              <Typography variant="body2" sx={{ color: '#cc0033', fontWeight: 600 }}>
                Showing events for {selectedDate}
              </Typography>
              <Button 
                variant="outlined" 
                size="small" 
                sx={{ marginLeft: 1.5 }} 
                onClick={() => setSelectedDate(null)}
              >
                Clear
              </Button>
            </Box>
          )}
        </CardContent>
      </Card>

      {/* Items list */}
      {filteredItems.length > 0 && (
        <Card sx={{ mt: 2 }}>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              {selectedDate ? `Events for ${selectedDate}` : 'All Events'}
            </Typography>
            {filteredItems.map((item) => (
              <Box key={item.id} sx={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                alignItems: 'center', 
                p: 1, 
                mb: 1, 
                border: '1px solid #eee', 
                borderRadius: 1 
              }}>
                <Box>
                  <Typography variant="subtitle1">{item.title}</Typography>
                  {item.desc && (
                    <Typography variant="body2" color="text.secondary">
                      {item.desc}
                    </Typography>
                  )}
                  <Typography variant="caption" color="text.secondary">
                    {item.date} {item.time} • {item.type}
                  </Typography>
                </Box>
                <Box>
                  <IconButton size="small" onClick={() => handleEdit(item)}>
                    <Edit />
                  </IconButton>
                  <IconButton size="small" onClick={() => handleDelete(item.id)}>
                    <Delete />
                  </IconButton>
                </Box>
              </Box>
            ))}
          </CardContent>
        </Card>
      )}

      {/* Modal */}
      <Dialog open={modalOpen} onClose={() => { setModalOpen(false); setEditId(null); }} maxWidth="sm" fullWidth>
        <DialogTitle>{editId ? 'Edit' : 'Add'} Event or Task</DialogTitle>
        <form onSubmit={handleSubmit}>
          <DialogContent>
            <TextField
              name="title"
              value={form.title}
              onChange={handleChange}
              label="Title"
              fullWidth
              required
              margin="normal"
            />
            <TextField
              name="desc"
              value={form.desc}
              onChange={handleChange}
              label="Description (optional)"
              fullWidth
              multiline
              rows={2}
              margin="normal"
            />
            <TextField
              type="date"
              name="date"
              value={form.date}
              onChange={handleChange}
              label="Date"
              fullWidth
              margin="normal"
              InputLabelProps={{ shrink: true }}
            />
            <TextField
              type="time"
              name="time"
              value={form.time}
              onChange={handleChange}
              label="Time"
              fullWidth
              margin="normal"
              InputLabelProps={{ shrink: true }}
            />
            <FormControl fullWidth margin="normal">
              <InputLabel>Type</InputLabel>
              <Select
                name="type"
                value={form.type}
                onChange={handleChange}
                label="Type"
              >
                <MenuItem value="event">Event</MenuItem>
                <MenuItem value="task">Task</MenuItem>
                <MenuItem value="post">Post</MenuItem>
              </Select>
            </FormControl>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 2 }}>
              <Typography variant="body2">Color:</Typography>
              <input
                type="color"
                name="color"
                value={form.color}
                onChange={handleChange}
                style={{ width: 40, height: 40, border: 'none', borderRadius: 4 }}
              />
            </Box>
            {error && (
              <Typography color="error" variant="body2" sx={{ mt: 1 }}>
                {error}
              </Typography>
            )}
          </DialogContent>
          <DialogActions>
            <Button onClick={() => { setModalOpen(false); setEditId(null); }}>
              Cancel
            </Button>
            <Button type="submit" variant="contained" disabled={success}>
              {success ? 'Saved!' : (editId ? 'Update' : 'Add')}
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </div>
  );
}

export default Scheduling; 