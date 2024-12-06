// PropertyForm.jsx
import React, { useState, useEffect, useCallback } from "react";
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
import PropTypes from "prop-types";

const PropertyForm = ({ initialData, onSubmit, formTitle }) => {
  const [propertyData, setPropertyData] = useState({
    name: "",
    description: "",
    address: {
      province: "",
      district: "",
      ward: "",
      street: "",
    },
    type: "",
    images: [],
    location: { lat: 0, lng: 0 },
    rooms: [],
    owner_id: localStorage.getItem("userId") || "",
  });

  const [selectedImages, setSelectedImages] = useState([]);
  const [submitError, setSubmitError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const [addressData, setAddressData] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [wards, setWards] = useState([]);

  const [openMapDialog, setOpenMapDialog] = useState(false);

  const [loadingAddressData, setLoadingAddressData] = useState(false);

  useEffect(() => {
    fetchAddressData();
  }, []);

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

  const mapAddressNamesToCodes = useCallback(() => {
    if (initialData && addressData.length > 0 && initialData.address) {
      const { province, district, ward, street } = initialData.address;
      let provinceCode = "";
      let districtCode = "";
      let wardCode = "";

      const selectedProvince = addressData.find((p) => p.name === province);
      if (selectedProvince) {
        provinceCode = selectedProvince.code;
        const selectedDistrict = selectedProvince.districts.find(
          (d) => d.name === district
        );
        if (selectedDistrict) {
          districtCode = selectedDistrict.code;
          const selectedWard = selectedDistrict.wards.find(
            (w) => w.name === ward
          );
          if (selectedWard) {
            wardCode = selectedWard.code;
          }
        }
      }

      setPropertyData((prevData) => ({
        ...prevData,
        name: initialData.name || "",
        description: initialData.description || "",
        type: initialData.type || "",
        address: {
          street: street || "",
          ward: ward || "",
          wardCode: wardCode || "",
          district: district || "",
          districtCode: districtCode || "",
          province: province || "",
          provinceCode: provinceCode || "",
        },
        images: initialData.images || [],
        location: {
          lat: initialData.location?.lat || 0,
          lng: initialData.location?.lng || 0,
        },
        rooms: initialData.rooms || [],
        owner_id: initialData.owner_id || prevData.owner_id,
      }));

      if (selectedProvince) {
        setDistricts(selectedProvince.districts || []);
        if (selectedProvince.districts.find((d) => d.code === districtCode)) {
          setWards(
            selectedProvince.districts
              .find((d) => d.code === districtCode)
              .wards.filter((w) => w.code === wardCode) || []
          );
        } else {
          setWards([]);
        }
      } else {
        setDistricts([]);
        setWards([]);
      }
    }
  }, [initialData, addressData]);

  useEffect(() => {
    mapAddressNamesToCodes();
  }, [mapAddressNamesToCodes]);

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
    if (!propertyData.description.trim()) return "Description is required.";
    if (!propertyData.type.trim()) return "Property type is required.";
    if (!propertyData.address.street.trim()) return "Street is required.";
    if (!propertyData.address.ward.trim()) return "Ward is required.";
    if (!propertyData.address.district.trim()) return "District is required.";
    if (!propertyData.address.province.trim()) return "Province is required.";
    if (propertyData.location.lat === 0 || propertyData.location.lng === 0)
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

    const formData = new FormData();
    formData.append("name", propertyData.name);
    formData.append("description", propertyData.description);
    formData.append("type", propertyData.type);
    formData.append("address", JSON.stringify(propertyData.address));
    formData.append("location", JSON.stringify(propertyData.location));
    formData.append("rooms", JSON.stringify(propertyData.rooms));
    formData.append("owner_id", propertyData.owner_id || "");

    if (Array.isArray(propertyData.images)) {
      propertyData.images.forEach((image, idx) => {
        formData.append(`images`, image);
      });
    } else if (propertyData.images) {
      formData.append("images", propertyData.images);
    }
    if (Array.isArray(propertyData.image)) {
      propertyData.image.forEach((imageFile, idx) => {
        formData.append(`image`, imageFile);
      });
    }

    console.log("FormData entries:");
    for (let pair of formData.entries()) {
      console.log(pair[0] + ": " + pair[1]);
    }

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

  const handlePropertyImageChange = (e) => {
    const files = Array.from(e.target.files);
    const newImages = [];
    const newImage = [];
    files.forEach((file) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        newImages.push(reader.result);
        newImage.push(file);
        if (newImages.length === files.length) {
          setPropertyData({
            ...propertyData,
            images: [...(propertyData.images || []), ...newImages],
            image: [...(propertyData.image || []), ...newImage],
          });
        }
      };
      reader.readAsDataURL(file);
    });
  };

  const handleRemoveImage = (index) => {
    const updatedImages = propertyData.images.filter((_, i) => i !== index); // Lọc bỏ ảnh theo index
    setPropertyData({
      ...propertyData,
      images: updatedImages,
    });
  };

  const handleMapClick = (location) => {
    setPropertyData((prevData) => ({
      ...prevData,
      location: {
        lat: location.lat,
        lng: location.lng,
      },
    }));
    setOpenMapDialog(false);
  };

  useEffect(() => {
    console.log("propertyData updated:", propertyData);
  }, [propertyData]);

  useEffect(() => {
    return () => {
      // Cleanup object URLs
      propertyData.images.forEach((img) => {
        if (img.startsWith("blob:")) {
          URL.revokeObjectURL(img);
        }
      });
    };
  }, [propertyData.images]);

  const handleAddRoom = () => {
    const newRoom = {
      id: Date.now(),
      roomName: "",
      roomSize: "",
    };
    setPropertyData((prevData) => ({
      ...prevData,
      rooms: [...prevData.rooms, newRoom],
    }));
  };

  const handleRemoveRoom = (index) => {
    setPropertyData((prevData) => {
      const updatedRooms = [...prevData.rooms];
      updatedRooms.splice(index, 1);
      return { ...prevData, rooms: updatedRooms };
    });
  };

  const handleRoomChange = (e, index) => {
    const { name, value } = e.target;
    setPropertyData((prevData) => {
      const updatedRooms = [...prevData.rooms];
      updatedRooms[index] = { ...updatedRooms[index], [name]: value };
      return { ...prevData, rooms: updatedRooms };
    });
  };

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

        <TextField
          label="Property Type"
          variant="outlined"
          fullWidth
          margin="normal"
          name="type"
          value={propertyData.type}
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
              {propertyData.address.provinceCode ? (
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
              {propertyData.address.districtCode ? (
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
                  onChange={handlePropertyImageChange}
                />
              </Button>
            </Grid>
          </Grid>
        </Box>

        <Box sx={{ mt: 4 }}>
          <Typography variant="h6" gutterBottom>
            Rooms
          </Typography>
          {propertyData.rooms.map((room, index) => (
            <Box
              key={room.id}
              sx={{
                border: "1px solid #ccc",
                borderRadius: 2,
                padding: 2,
                mb: 2,
                position: "relative",
              }}
            >
              <TextField
                label="Room Name"
                variant="outlined"
                fullWidth
                margin="normal"
                name="roomName"
                value={room.roomName}
                onChange={(e) => handleRoomChange(e, index)}
                required
              />

              <TextField
                label="Room Size (sq ft)"
                variant="outlined"
                fullWidth
                margin="normal"
                name="roomSize"
                type="number"
                value={room.roomSize}
                onChange={(e) => handleRoomChange(e, index)}
                required
              />

              <IconButton
                aria-label="remove room"
                onClick={() => handleRemoveRoom(index)}
                sx={{
                  position: "absolute",
                  top: 8,
                  right: 8,
                  backgroundColor: "rgba(255, 255, 255, 0.7)",
                  "&:hover": {
                    backgroundColor: "rgba(255, 255, 255, 1)",
                  },
                }}
              >
                <FontAwesomeIcon icon={faTimes} color="#f44336" />
              </IconButton>
            </Box>
          ))}

          <Button
            variant="outlined"
            startIcon={<FontAwesomeIcon icon={faPlus} />}
            onClick={handleAddRoom}
          >
            Add Room
          </Button>
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
            {propertyData.location.lat && propertyData.location.lng
              ? "Update Location"
              : "Select Location on Map"}
          </Button>
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
        message="Property created successfully!"
      />
    </Box>
  );
};

PropertyForm.propTypes = {
  initialData: PropTypes.shape({
    name: PropTypes.string,
    description: PropTypes.string,
    address: PropTypes.shape({
      province: PropTypes.string,
      district: PropTypes.string,
      ward: PropTypes.string,
      street: PropTypes.string,
    }),
    type: PropTypes.string,
    images: PropTypes.arrayOf(PropTypes.string),
    location: PropTypes.shape({
      lat: PropTypes.number,
      lng: PropTypes.number,
    }),
    rooms: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number,
        roomName: PropTypes.string,
        roomSize: PropTypes.string,
      })
    ),
    owner_id: PropTypes.string,
  }),
  onSubmit: PropTypes.func.isRequired,
  formTitle: PropTypes.string,
};

PropertyForm.defaultProps = {
  initialData: {
    name: "",
    description: "",
    address: {
      province: "",
      district: "",
      ward: "",
      street: "",
    },
    type: "",
    images: [],
    location: { lat: 0, lng: 0 },
    rooms: [],
    owner_id: "",
  },
  formTitle: "Property Form",
};

export default PropertyForm;
