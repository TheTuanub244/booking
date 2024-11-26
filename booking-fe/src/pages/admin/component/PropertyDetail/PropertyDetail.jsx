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

const PropertyDetail = ({ propertyData }) => {
  const {
    _id,
    name,
    address,
    owner_id,
    images,
    description,
    rate,
  } = propertyData;

  const fullAddress = `${address.street}, ${address.ward}, ${address.district}, ${address.province}`;

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


      <Grid container spacing={4}>
    
        <Grid item xs={12} md={6}>
 
          <Typography variant="h4" component="h1" gutterBottom>
            {name}
          </Typography>

          <Box display="flex" alignItems="center" mb={1}>
            <FontAwesomeIcon icon={faLocationDot} style={{ marginRight: 8 }} />
            <Typography variant="subtitle1">{fullAddress}</Typography>
          </Box>

          <Typography variant="subtitle1" color="text.secondary" gutterBottom>
            ⭐ {rate}
          </Typography>

          <Typography variant="subtitle2" color="text.secondary" gutterBottom>
            Owner ID: {owner_id}
          </Typography>


          <Typography variant="body1" paragraph>
            {description}
          </Typography>
        </Grid>

 
        <Grid item xs={12} md={6}>
          <Grid container spacing={2}>
  
            <Grid item xs={12}>
              {displayedImages[0] ? (
                <Box
                  sx={{
                    position: 'relative',
                    width: '100%',
                    paddingTop: '56.25%', 
                    overflow: 'hidden',
                    borderRadius: 2,
                  }}
                >
                  <img
                    src={displayedImages[0]}
                    alt={`Property 1`}
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
                    paddingTop: '56.25%', 
                    borderRadius: 2,
                  }}
                />
              )}
            </Grid>


            <Grid item xs={12}>
              <Grid container spacing={2}>
                {[1, 2, 3].map((i) => (
                  <Grid item xs={4} key={i}>
                    {displayedImages[i] ? (
                      <Box
                        sx={{
                          position: 'relative',
                          width: '100%',
                          paddingTop: '56.25%', 
                          overflow: 'hidden',
                          borderRadius: 2,
                        }}
                      >
                        <img
                          src={displayedImages[i]}
                          alt={`Property ${i + 1}`}
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
                          paddingTop: '56.25%', 
                          borderRadius: 2,
                        }}
                      />
                    )}
                  </Grid>
                ))}

                {Array.from({ length: placeholders }).map((_, index) => (
                  <Grid item xs={4} key={`placeholder-${index}`}>
                    <Paper
                      variant="outlined"
                      sx={{
                        height: 0,
                        paddingTop: '56.25%', 
                        borderRadius: 2,
                      }}
                    />
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
