// src/pages/CreateNewProperty.jsx

import React from 'react';
import {
  Box,
  Grid,
  Button,
} from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { Link, useNavigate } from 'react-router-dom';
import PropertyForm from '../../../component/PropertyForm/PropertyForm';

const AddNewProperty = () => {
  const navigate = useNavigate();

  const handleCreateSubmit = async (newData) => {
    console.log({newData})
    navigate(`/admin/property`);
  };

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
          to="/admin/property"
        >
          Back to Property List
        </Button>
      </Box>

      <Grid container spacing={4}>
        <Grid item xs={12} md={8}>
          <PropertyForm
            initialData={{
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
            }}
            onSubmit={handleCreateSubmit}
            formTitle="Create New Property"
          />
        </Grid>

      </Grid>
    </Box>
  );
};

export default AddNewProperty;
