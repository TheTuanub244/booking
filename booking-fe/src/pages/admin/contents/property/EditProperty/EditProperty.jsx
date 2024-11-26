import React, { useState, useEffect } from 'react';
import {
  Box,
  Grid,
  Typography,
  TextField,
  Button,
  CircularProgress,
  Alert,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faTimes, faPlus } from '@fortawesome/free-solid-svg-icons';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { getPropertyById } from '../../../../../api/propertyAPI';

const EditProperty = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [propertyData, setPropertyData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const [openAddImageDialog, setOpenAddImageDialog] = useState(false);
  const [newImageUrl, setNewImageUrl] = useState('');

  useEffect(() => {
    const fetchProperty = async () => {
      try {
        const data = await getPropertyById(id);
        setPropertyData({
          ...data,
          address: data.address || {
            street: '',
            ward: '',
            district: '',
            province: '',
          },
          images: data.images || [],
        });
      } catch (err) {
        console.error('Error fetching property data:', err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchProperty();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPropertyData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleAddressChange = (e) => {
    const { name, value } = e.target;
    setPropertyData((prevData) => ({
      ...prevData,
      address: {
        ...prevData.address,
        [name]: value,
      },
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setSubmitError('');

    try {
      navigate(`/admin/property/view/${id}`);
    } catch (err) {
      console.error('Error updating property:', err);
      setSubmitError('Failed to update property. Please try again later.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleRemoveImage = (index) => {
    setPropertyData((prevData) => {
      const updatedImages = [...prevData.images];
      updatedImages.splice(index, 1);
      return { ...prevData, images: updatedImages };
    });
  };

  const handleOpenAddImageDialog = () => {
    setNewImageUrl('');
    setOpenAddImageDialog(true);
  };

  const handleCloseAddImageDialog = () => {
    setOpenAddImageDialog(false);
  };

  const handleAddImage = () => {
    if (newImageUrl.trim() === '') return;
    setPropertyData((prevData) => ({
      ...prevData,
      images: [...prevData.images, newImageUrl.trim()],
    }));
    setOpenAddImageDialog(false);
  };

  const displayedImages = propertyData?.images || [];

  if (loading) {
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '80vh',
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  if (error || !propertyData) {
    return (
      <Box
        sx={{
          textAlign: 'center',
          padding: 4,
        }}
      >
        <Alert severity="error">
          Failed to load property details. Please try again later.
        </Alert>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        padding: 4,
        backgroundColor: '#fff',
        maxHeight: '100vh',
        overflowY: 'auto',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'flex-start',
          mb: 2,
        }}
      >
        <Button
          variant="outlined"
          startIcon={<FontAwesomeIcon icon={faArrowLeft} />}
          component={Link}
          to={`/admin/property/view/${id}`}
        >
          Back to Details
        </Button>
      </Box>

      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
          <Typography variant="h4" component="h1" gutterBottom>
            Edit Property
          </Typography>

          {submitError && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {submitError}
            </Alert>
          )}

          <form onSubmit={handleSubmit}>
            <TextField
              label="Property Name"
              variant="outlined"
              fullWidth
              margin="normal"
              name="name"
              value={propertyData.name}
              onChange={handleChange}
              required
            />

            <TextField
              label="Property Type"
              variant="outlined"
              fullWidth
              margin="normal"
              name="property_type"
              value={propertyData.property_type}
              onChange={handleChange}
              required
            />

            <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
              Address
            </Typography>

            <TextField
              label="Street"
              variant="outlined"
              fullWidth
              margin="normal"
              name="street"
              value={propertyData.address.street}
              onChange={handleAddressChange}
              required
            />

            <TextField
              label="Ward"
              variant="outlined"
              fullWidth
              margin="normal"
              name="ward"
              value={propertyData.address.ward}
              onChange={handleAddressChange}
              required
            />

            <TextField
              label="District"
              variant="outlined"
              fullWidth
              margin="normal"
              name="district"
              value={propertyData.address.district}
              onChange={handleAddressChange}
              required
            />

            <TextField
              label="Province"
              variant="outlined"
              fullWidth
              margin="normal"
              name="province"
              value={propertyData.address.province}
              onChange={handleAddressChange}
              required
            />

            <TextField
              label="OwnerID(chưa call đc api admin nên để tạm thế)"
              variant="outlined"
              fullWidth
              margin="normal"
              name="owner_id"
              value={propertyData.owner_id}
              InputProps={{
                readOnly: true,
              }}
            />

            <TextField
              label="Description"
              variant="outlined"
              fullWidth
              margin="normal"
              name="description"
              value={propertyData.description}
              onChange={handleChange}
              multiline
              rows={4}
              required
            />

            <Button
              type="submit"
              variant="contained"
              color="primary"
              sx={{ mt: 2 }}
              disabled={submitting}
            >
              {submitting ? 'Saving...' : 'Save Changes'}
            </Button>
          </form>
        </Grid>

        <Grid item xs={12} md={6}>
          <Typography variant="h6" gutterBottom>
            Property Images
          </Typography>
          <Grid container spacing={2}>
            {displayedImages.map((imageUrl, index) => (
              <Grid item xs={12} sm={6} key={index}>
                <Box
                  sx={{
                    position: 'relative',
                    width: '100%',
                    paddingTop: '56.25%',
                    overflow: 'visible',
                    borderRadius: 2,
                  }}
                >
                  <img
                    src={imageUrl}
                    alt={`Property ${index + 1}`}
                    style={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                    }}
                    loading="lazy"
                  />
                  <IconButton
                    aria-label="remove image"
                    onClick={() => handleRemoveImage(index)}
                    sx={{
                      position: 'absolute',
                      top: -10,
                      right: -10,
                      width: 24,
                      height: 24,
                      backgroundColor: 'rgba(255, 255, 255, 0.8)',
                      '&:hover': {
                        backgroundColor: 'rgba(255, 255, 255, 1)',
                      },
                      borderRadius: '50%',
                      padding: 0,
                    }}
                  >
                    <FontAwesomeIcon icon={faTimes} color="#f44336" size="sm" />
                  </IconButton>
                </Box>
              </Grid>
            ))}

            <Grid item xs={12} sm={6}>
              <Button
                variant="outlined"
                onClick={handleOpenAddImageDialog}
                sx={{
                  width: '100%',
                  height: '100%',
                  padding: 0,
                  borderRadius: 2,
                  textTransform: 'none',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center',
                  color: 'text.secondary',
                }}
              >
                <FontAwesomeIcon icon={faPlus} size="2x" />
                <Typography variant="body2" sx={{ mt: 1 }}>
                  Add Image
                </Typography>
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>

      <Dialog open={openAddImageDialog} onClose={handleCloseAddImageDialog}>
        <DialogTitle>Add New Image</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Image URL"
            type="url"
            fullWidth
            variant="outlined"
            value={newImageUrl}
            onChange={(e) => setNewImageUrl(e.target.value)}
            required
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseAddImageDialog} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleAddImage} color="primary" variant="contained">
            Add
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default EditProperty;
