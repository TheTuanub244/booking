// src/components/PropertyDetail.js

import React from 'react';
import {
  Box,
  Grid,
  Typography,
  Paper,
  Button,
} from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLocationDot, faEdit } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

/**
 * PropertyDetail Component
 * Displays detailed information about a property.
 *
 * @param {Object} props
 * @param {Object} props.propertyData - The property data to display.
 */
const PropertyDetail = ({ propertyData }) => {
  const {
    _id,
    name,
    property_type, // Added property_type
    address,
    owner_id,
    images,
    description,
    rate,
  } = propertyData;

  // Construct full address string
  const fullAddress = `${address.street}, ${address.ward}, ${address.district}, ${address.province}`;

  // Determine how many placeholders are needed if images are fewer than 4
  const maxImages = 4;
  const displayedImages = images.slice(0, maxImages);
  const placeholders = maxImages - displayedImages.length;

  return (
    <Box
      sx={{
        padding: 4,
        backgroundColor: '#fff',
        maxHeight: '100vh',
        overflowY: 'auto',
      }}
    >
      {/* Top Bar with Edit Button */}
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'flex-start',
          mb: 2,
        }}
      >
        <Button
          variant="outlined"
          startIcon={<FontAwesomeIcon icon={faEdit} />}
          component={Link}
          to={`/admin/property/edit/${_id}`}
        >
          Edit
        </Button>
      </Box>

      {/* Main Content */}
      <Grid container spacing={4}>
        {/* Left Section: Details */}
        <Grid item xs={12} md={6}>
          {/* Property Name */}
          <Typography variant="h4" component="h1" gutterBottom>
            {name}
          </Typography>

          {/* Property Type */}
          <Typography variant="h6" color="text.secondary" gutterBottom>
            {property_type}
          </Typography>

          {/* Address */}
          <Box display="flex" alignItems="center" mb={1}>
            <FontAwesomeIcon icon={faLocationDot} style={{ marginRight: 8 }} />
            <Typography variant="subtitle1">{fullAddress}</Typography>
          </Box>

          {/* Rate */}
          <Typography variant="subtitle1" color="text.secondary" gutterBottom>
            ⭐ {rate}
          </Typography>

          {/* Owner ID */}
          <Typography variant="subtitle2" color="text.secondary" gutterBottom>
            Owner ID: {owner_id}
          </Typography>

          {/* Description */}
          <Typography variant="body1" paragraph>
            {description}
          </Typography>
        </Grid>

        {/* Right Section: Image Gallery */}
        <Grid item xs={12} md={6}>
          <Grid container spacing={2}>
            {/* Large Image */}
            <Grid item xs={12}>
              {displayedImages[0] ? (
                <Box
                  sx={{
                    position: 'relative',
                    width: '100%',
                    paddingTop: '56.25%', // 16:9 Aspect Ratio
                    overflow: 'hidden',
                  }}
                >
                  <img
                    src={displayedImages[0]}
                    alt={`Property  1`}
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
                </Box>
              ) : (
                <Paper
                  variant="outlined"
                  sx={{
                    height: 0,
                    paddingTop: '56.25%', // Maintain aspect ratio
                    
                  }}
                />
              )}
            </Grid>

            {/* Three Small Images */}
            <Grid item xs={12}>
              <Grid container spacing={2}>
                {[1, 2, 3].map((i) => (
                  <Grid item xs={4} key={i}>
                    {displayedImages[i] ? (
                      <Box
                        sx={{
                          position: 'relative',
                          width: '100%',
                          paddingTop: '56.25%', // 16:9 Aspect Ratio
                          overflow: 'hidden',
                         
                        }}
                      >
                        <img
                          src={displayedImages[i]}
                          alt={`Property  ${i + 1}`}
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
                      </Box>
                    ) : (
                      <div
                      />
                    )}
                  </Grid>
                ))}
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};

export default PropertyDetail;
