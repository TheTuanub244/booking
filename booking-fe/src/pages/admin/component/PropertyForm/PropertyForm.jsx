import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  TextField,
  Button,
  Alert,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Snackbar,
  Grid,
} from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faTimes } from '@fortawesome/free-solid-svg-icons';

const PropertyForm = ({ initialData, onSubmit, formTitle }) => {
  const [propertyData, setPropertyData] = useState({
    name: '',
    property_type: '',
    address: {
      street: '',
      ward: '',
      district: '',
      province: '',
    },
    owner_id: '', 
    description: '',
    images: [],
    ...initialData,
  });

  const [submitError, setSubmitError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const [openAddImageDialog, setOpenAddImageDialog] = useState(false);
  const [newImageUrl, setNewImageUrl] = useState('');

  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (initialData) {
      setPropertyData({
        name: initialData.name || '',
        property_type: initialData.property_type || '',
        address: initialData.address || {
          street: '',
          ward: '',
          district: '',
          province: '',
        },
        owner_id: initialData.owner_id || '',
        description: initialData.description || '',
        images: initialData.images || [],
      });
    }
  }, [initialData]);

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

  const validateForm = () => {
    if (!propertyData.name.trim()) return 'Property name is required.';
    if (!propertyData.property_type.trim()) return 'Property type is required.';
    if (!propertyData.address.street.trim()) return 'Street is required.';
    if (!propertyData.address.ward.trim()) return 'Ward is required.';
    if (!propertyData.address.district.trim()) return 'District is required.';
    if (!propertyData.address.province.trim()) return 'Province is required.';
    if (!propertyData.description.trim()) return 'Description is required.';
    return null;
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const validationError = validateForm();
    if (validationError) {
      setSubmitError(validationError);
      return;
    }

    setSubmitting(true);
    setSubmitError('');

    try {
      await onSubmit(propertyData);
      setSuccess(true);
    } catch (err) {
      console.error('Error submitting form:', err);
      setSubmitError(err.message || 'Failed to submit the form. Please try again later.');
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

  const isValidImageUrl = (url) => {
    const pattern = /\.(jpeg|jpg|gif|png|bmp|svg)$/;
    return pattern.test(url.toLowerCase());
  };
  const handleAddImage = () => {
    if (newImageUrl.trim() === '' || !isValidImageUrl(newImageUrl)) return;
    setPropertyData((prevData) => ({
      ...prevData,
      images: [...prevData.images, newImageUrl.trim()],
    }));
    setOpenAddImageDialog(false);
  };

  const displayedImages = propertyData.images || [];

  return (
    <Box>
      <Typography variant="h4" component="h1" gutterBottom>
        {formTitle || 'Property Form'}
      </Typography>

      {submitError && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {submitError}
        </Alert>
      )}

      <form onSubmit={handleFormSubmit}>
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
          label="Owner"
          variant="outlined"
          fullWidth
          margin="normal"
          value={propertyData.owner_id || 'Ch get dc Owner nen de tam'}
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

        <Box sx={{ mt: 2 }}>
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
                    paddingTop: '56.25%', // 16:9 aspect ratio
                    overflow: 'visible',
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
                  minHeight: 150,
                }}
              >
                <FontAwesomeIcon icon={faPlus} size="2x" />
                <Typography variant="body2" sx={{ mt: 1 }}>
                  Add Image
                </Typography>
              </Button>
            </Grid>
          </Grid>
        </Box>

        <Button
          type="submit"
          variant="contained"
          color="primary"
          sx={{ mt: 4 }}
          disabled={submitting}
        >
          {submitting ? 'Submitting...' : 'Submit'}
        </Button>
      </form>

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
            error={newImageUrl !== '' && !isValidImageUrl(newImageUrl)}
            helperText={
              newImageUrl !== '' && !isValidImageUrl(newImageUrl)
                ? 'Please enter a valid image URL.'
                : ''
            }
          />
          {isValidImageUrl(newImageUrl) && (
            <Box sx={{ mt: 2 }}>
              <img
                src={newImageUrl}
                alt="Preview"
                style={{ width: '100%', maxHeight: '200px', objectFit: 'cover' }}
              />
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseAddImageDialog} color="secondary">
            Cancel
          </Button>
          <Button
            onClick={handleAddImage}
            color="primary"
            variant="contained"
            disabled={!isValidImageUrl(newImageUrl)}
          >
            Add
          </Button>
        </DialogActions>
      </Dialog>
      <Snackbar
        open={success}
        autoHideDuration={3000}
        onClose={() => setSuccess(false)}
        message="Property submitted successfully!"
      />
    </Box>
  );
};

export default PropertyForm;
