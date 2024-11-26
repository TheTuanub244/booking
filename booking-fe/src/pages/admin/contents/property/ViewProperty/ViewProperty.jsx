// src/components/ViewProperty.js

import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getPropertyById } from '../../../../../api/propertyAPI';
import {
  CircularProgress,
  Box,
  Alert,
} from '@mui/material';
import AdminPropertyDetail from '../../../component/PropertyDetail/PropertyDetail';


const ViewProperty = () => {
  const { id } = useParams(); 
  const [propertyData, setPropertyData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchProperty = async () => {
      try {
        const data = await getPropertyById(id);
        setPropertyData(data);
      } catch (err) {
        console.error('Error fetching property data:', err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchProperty();
  }, [id]);

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

  return <AdminPropertyDetail propertyData={propertyData} />;
};

export default ViewProperty;
export default ViewProperty;
