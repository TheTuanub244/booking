import React, { useState, useEffect } from "react";
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
  MenuItem,
  CircularProgress,
} from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlus,
  faTimes,
  faMapMarkerAlt,
} from "@fortawesome/free-solid-svg-icons";
import { getProvince } from "../../../../api/addressAPI";
import LeafletMap from "../Map/LeafletMap";

const PropertyForm = ({ initialData, onSubmit, formTitle }) => {
  const [propertyData, setPropertyData] = useState({
    name: "",
    property_type: "",
    address: {
      street: "",
      ward: "",
      wardCode: "",
      district: "",
      districtCode: "",
      province: "",
      provinceCode: "",
    },
    owner_id: "",
    description: "",
    images: [],
    location: {
      latitude: 0,
      longitude: 0,
    },
    ...initialData,
  });

  const [submitError, setSubmitError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const [success, setSuccess] = useState(false);

  // State for address data
  const [addressData, setAddressData] = useState([]); // Contains provinces with their districts and wards
  const [districts, setDistricts] = useState([]);
  const [wards, setWards] = useState([]);

  // State for image uploads
  const [selectedImages, setSelectedImages] = useState([]);

  // State for map dialog
  const [openMapDialog, setOpenMapDialog] = useState(false);

  // Loading state
  const [loadingAddressData, setLoadingAddressData] = useState(false);

  useEffect(() => {
    fetchAddressData();
  }, []);

  useEffect(() => {
    if (initialData) {
      setPropertyData((prevData) => ({
        ...prevData,
        ...initialData,
      }));
      if (initialData.address) {
        const provinceCode = initialData.address.provinceCode;
        const districtCode = initialData.address.districtCode;

        const selectedProvince = addressData.find(
          (p) => p.code === parseInt(provinceCode)
        );
        if (selectedProvince) {
          setDistricts(selectedProvince.districts || []);
          const selectedDistrict = selectedProvince.districts.find(
            (d) => d.code === parseInt(districtCode)
          );
          if (selectedDistrict) {
            setWards(selectedDistrict.wards || []);
          }
        }
      }
    }
  }, [initialData, addressData]);

  const fetchAddressData = async () => {
    setLoadingAddressData(true);
    try {
      const response = await getProvince();
      setAddressData(response);
    } catch (error) {
      console.error("Failed to fetch address data:", error);
    } finally {
      setLoadingAddressData(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPropertyData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleAddressChange = (e) => {
    const { name, value } = e.target;
    const code = value ? parseInt(value) : "";

    if (name === "province") {
      const selectedProvince = addressData.find((p) => p.code === code);
      setDistricts(selectedProvince?.districts || []);
      setWards([]);
      setPropertyData((prevData) => ({
        ...prevData,
        address: {
          ...prevData.address,
          province: selectedProvince ? selectedProvince.name : "",
          provinceCode: code || "",
          district: "",
          districtCode: "",
          ward: "",
          wardCode: "",
        },
      }));
    } else if (name === "district") {
      const selectedDistrict = districts.find((d) => d.code === code);
      setWards(selectedDistrict?.wards || []);
      setPropertyData((prevData) => ({
        ...prevData,
        address: {
          ...prevData.address,
          district: selectedDistrict ? selectedDistrict.name : "",
          districtCode: code || "",
          ward: "",
          wardCode: "",
        },
      }));
    } else if (name === "ward") {
      const selectedWard = wards.find((w) => w.code === code);
      setPropertyData((prevData) => ({
        ...prevData,
        address: {
          ...prevData.address,
          ward: selectedWard ? selectedWard.name : "",
          wardCode: code || "",
        },
      }));
    } else {
      setPropertyData((prevData) => ({
        ...prevData,
        address: {
          ...prevData.address,
          [name]: value,
        },
      }));
    }
  };

  const validateForm = () => {
    if (!propertyData.name.trim()) return "Property name is required.";
    if (!propertyData.property_type.trim()) return "Property type is required.";
    if (!propertyData.address.street.trim()) return "Street is required.";
    if (!propertyData.address.ward.trim()) return "Ward is required.";
    if (!propertyData.address.district.trim()) return "District is required.";
    if (!propertyData.address.province.trim()) return "Province is required.";
    if (!propertyData.description.trim()) return "Description is required.";
    if (
      propertyData.location.latitude === 0 ||
      propertyData.location.longitude === 0
    )
      return "Location must be selected on the map.";
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
    setSubmitError("");

    // Prepare FormData
    const formData = new FormData();
    formData.append("name", propertyData.name);
    formData.append("property_type", propertyData.property_type);
    formData.append("description", propertyData.description);
    formData.append("owner_id", propertyData.owner_id);
    formData.append("address", JSON.stringify(propertyData.address));
    formData.append("location", JSON.stringify(propertyData.location));

    // Append images
    selectedImages.forEach((image) => {
      formData.append("images", image);
    });

    try {
      await onSubmit(formData);
      setSuccess(true);
    } catch (err) {
      console.error("Error submitting form:", err);
      setSubmitError(
        err.message || "Failed to submit the form. Please try again later."
      );
    } finally {
      setSubmitting(false);
    }
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    setSelectedImages((prevImages) => [...prevImages, ...files]);

    // Create preview URLs
    const previewUrls = files.map((file) => URL.createObjectURL(file));
    setPropertyData((prevData) => ({
      ...prevData,
      images: [...prevData.images, ...previewUrls],
    }));
  };

  const handleRemoveImage = (index) => {
    setSelectedImages((prevImages) => {
      const updatedImages = [...prevImages];
      updatedImages.splice(index, 1);
      return updatedImages;
    });

    setPropertyData((prevData) => {
      const updatedImages = [...prevData.images];
      URL.revokeObjectURL(updatedImages[index]);
      updatedImages.splice(index, 1);
      return { ...prevData, images: updatedImages };
    });
  };

  const handleMapClick = (location) => {
    setPropertyData((prevData) => ({
      ...prevData,
      location: {
        latitude: location.lat,
        longitude: location.lng,
      },
    }));
    setOpenMapDialog(false);
  };

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    setPropertyData((prevData) => ({
      ...prevData,
      owner_id: userId || "",
    }));
  }, []);

  return (
    <Box>
      <Typography variant="h4" component="h1" gutterBottom>
        {formTitle || "Property Form"}
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
          label="Province"
          variant="outlined"
          fullWidth
          margin="normal"
          name="province"
          value={propertyData.address.provinceCode || ""}
          onChange={handleAddressChange}
          select
          required
        >
          {loadingAddressData ? (
            <MenuItem value="">
              <CircularProgress size={24} />
            </MenuItem>
          ) : (
            addressData.map((province) => (
              <MenuItem key={province.code} value={province.code}>
                {province.name}
              </MenuItem>
            ))
          )}
        </TextField>

        <TextField
          label="District"
          variant="outlined"
          fullWidth
          margin="normal"
          name="district"
          value={propertyData.address.districtCode || ""}
          onChange={handleAddressChange}
          select
          required
          disabled={!propertyData.address.provinceCode}
        >
          {districts.length === 0 ? (
            <MenuItem value="">
              {propertyData.address.province ? (
                <CircularProgress size={24} />
              ) : (
                "Please select a province first"
              )}
            </MenuItem>
          ) : (
            districts.map((district) => (
              <MenuItem key={district.code} value={district.code}>
                {district.name}
              </MenuItem>
            ))
          )}
        </TextField>

        <TextField
          label="Ward"
          variant="outlined"
          fullWidth
          margin="normal"
          name="ward"
          value={propertyData.address.wardCode || ""}
          onChange={handleAddressChange}
          select
          required
          disabled={!propertyData.address.districtCode}
        >
          {wards.length === 0 ? (
            <MenuItem value="">
              {propertyData.address.district ? (
                <CircularProgress size={24} />
              ) : (
                "Please select a district first"
              )}
            </MenuItem>
          ) : (
            wards.map((ward) => (
              <MenuItem key={ward.code} value={ward.code}>
                {ward.name}
              </MenuItem>
            ))
          )}
        </TextField>

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
          label="Owner"
          variant="outlined"
          fullWidth
          margin="normal"
          value={propertyData.owner_id || "Owner ID not set"}
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
            {propertyData.images.map((imageUrl, index) => (
              <Grid item xs={12} sm={6} key={index}>
                <Box
                  sx={{
                    position: "relative",
                    width: "100%",
                    paddingTop: "56.25%",
                    overflow: "visible",
                  }}
                >
                  <img
                    src={imageUrl}
                    alt={`Property ${index + 1}`}
                    style={{
                      position: "absolute",
                      top: 0,
                      left: 0,
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                    loading="lazy"
                  />
                  <IconButton
                    aria-label="remove image"
                    onClick={() => handleRemoveImage(index)}
                    sx={{
                      position: "absolute",
                      top: -10,
                      right: -10,
                      width: 24,
                      height: 24,
                      backgroundColor: "rgba(255, 255, 255, 0.8)",
                      "&:hover": {
                        backgroundColor: "rgba(255, 255, 255, 1)",
                      },
                      borderRadius: "50%",
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
                component="label"
                sx={{
                  width: "100%",
                  height: "100%",
                  padding: 0,
                  borderRadius: 2,
                  textTransform: "none",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                  color: "text.secondary",
                  minHeight: 150,
                }}
              >
                <FontAwesomeIcon icon={faPlus} size="2x" />
                <Typography variant="body2" sx={{ mt: 1 }}>
                  Upload Images
                </Typography>
                <input
                  type="file"
                  hidden
                  multiple
                  accept="image/*"
                  onChange={handleImageUpload}
                />
              </Button>
            </Grid>
          </Grid>
        </Box>

        <Box sx={{ mt: 4 }}>
          <Typography variant="h6" gutterBottom>
            Property Location
          </Typography>
          <Button
            variant="outlined"
            startIcon={<FontAwesomeIcon icon={faMapMarkerAlt} />}
            onClick={() => setOpenMapDialog(true)}
          >
            {propertyData.location.latitude && propertyData.location.longitude
              ? "Update Location"
              : "Select Location on Map"}
          </Button>
          {propertyData.location.latitude &&
            propertyData.location.longitude && (
              <Typography variant="body2" sx={{ mt: 1 }}>
                Selected Location: Latitude {propertyData.location.latitude},
                Longitude {propertyData.location.longitude}
              </Typography>
            )}
        </Box>

        <Button
          type="submit"
          variant="contained"
          color="primary"
          sx={{ mt: 4 }}
          disabled={submitting}
        >
          {submitting ? "Submitting..." : "Submit"}
        </Button>
      </form>

      {/* Map Dialog */}
      <Dialog
        open={openMapDialog}
        onClose={() => setOpenMapDialog(false)}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>Select Property Location</DialogTitle>
        <DialogContent>
          <LeafletMap
            initialLocation={propertyData.location}
            onLocationSelect={handleMapClick}
            height="500px"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenMapDialog(false)} color="secondary">
            Cancel
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
