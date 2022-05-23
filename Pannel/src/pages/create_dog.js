import Head from "next/head";
import NextLink from "next/link";
import { useRouter } from "next/router";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Box, Button, Container, TextField, Typography } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import React from "react";
import { useCookies } from "react-cookie";
import axios from "axios";

const CreateDog = () => {
  const router = useRouter();
  const [cookies, setCookie] = useCookies(["token"]);
  const formik = useFormik({
    initialValues: {
      name: "Q",
      age: 3,
      breed: "Akita",
      gender: "female",
      microchipNumber: "001",
      neutered: true,
      dob: "2021-09-10",
      image: "https://images.dog.ceo/breeds/akita/Akina_Inu_in_Riga_1.jpg",
      shelterId: "18673fef-9f3a-4ea6-a2a3-77e4b5ea7f1d",
      isAdopted: false,
      memo: "Qute",
    },
    validationSchema: Yup.object({
      name: Yup.string().max(255).required("Name is required"),
      age: Yup.number().max(255).required("Age is required"),
      breed: Yup.string().max(255).required("Breed is required"),
      gender: Yup.string().max(255).required("Gender is required"),
      microchipNumber: Yup.string().max(255).required("Microchip Number is required"),
      neutered: Yup.string().max(255).required("Neutered is required"),
      dob: Yup.string().max(255).required("DoB is required"),
      image: Yup.string().max(255).required("Image is required"),
    }),
    onSubmit: (data, { resetForm }) => {
      console.log(data);
      const result = axios
        .post("https://7k21oxn5gh.execute-api.us-east-2.amazonaws.com/dev/dog", data)
        .then((res) => {
          console.log(res);
        });
      resetForm({});
      alert("Dog created");
    },
  });

  return (
    <>
      <Head>
        <title>Create</title>
      </Head>
      <Box
        component="main"
        sx={{
          alignItems: "center",
          display: "flex",
          flexGrow: 1,
          minHeight: "100%",
        }}
      >
        <Container maxWidth="sm">
          <NextLink href="/order" passHref>
            <Button component="a" startIcon={<ArrowBackIcon fontSize="small" />}>
              Dashboard
            </Button>
          </NextLink>
          <form onSubmit={formik.handleSubmit}>
            <Box sx={{ my: 3 }}>
              <Typography color="textPrimary" variant="h4">
                Create Dog
              </Typography>
              <Typography color="textSecondary" gutterBottom variant="body2">
                Submit to create a new dog record
              </Typography>
            </Box>
            <TextField
              error={Boolean(formik.touched.name && formik.errors.name)}
              fullWidth
              helperText={formik.touched.name && formik.errors.name}
              label="Name"
              margin="normal"
              name="name"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.name}
              variant="outlined"
            />
            <TextField
              error={Boolean(formik.touched.age && formik.errors.age)}
              fullWidth
              helperText={formik.touched.age && formik.errors.age}
              label="Age"
              margin="normal"
              name="age"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.age}
              variant="outlined"
            />
            <TextField
              error={Boolean(formik.touched.breed && formik.errors.breed)}
              fullWidth
              helperText={formik.touched.breed && formik.errors.breed}
              label="Breed"
              margin="normal"
              name="breed"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.breed}
              variant="outlined"
            />
            <TextField
              error={Boolean(formik.touched.gender && formik.errors.gender)}
              fullWidth
              helperText={formik.touched.gender && formik.errors.gender}
              label="Gender"
              margin="normal"
              name="gender"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.gender}
              variant="outlined"
            />
            <TextField
              error={Boolean(formik.touched.microchipNumber && formik.errors.microchipNumber)}
              fullWidth
              helperText={formik.touched.microchipNumber && formik.errors.microchipNumber}
              label="Microchip Number"
              margin="normal"
              name="microchipNumber"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.microchipNumber}
              variant="outlined"
            />
            <TextField
              error={Boolean(formik.touched.neutered && formik.errors.neutered)}
              fullWidth
              helperText={formik.touched.neutered && formik.errors.neutered}
              label="Neutered"
              margin="normal"
              name="neutered"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.neutered}
              variant="outlined"
            />
            <TextField
              error={Boolean(formik.touched.dob && formik.errors.dob)}
              fullWidth
              helperText={formik.touched.dob && formik.errors.dob}
              label="DoB"
              margin="normal"
              name="dob"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.dob}
              variant="outlined"
            />
            <TextField
              error={Boolean(formik.touched.image && formik.errors.image)}
              fullWidth
              helperText={formik.touched.image && formik.errors.image}
              label="Image"
              margin="normal"
              name="image"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.image}
              variant="outlined"
            />
            <TextField
              error={Boolean(formik.touched.memo && formik.errors.memo)}
              fullWidth
              helperText={formik.touched.memo && formik.errors.memo}
              label="Memo"
              margin="normal"
              name="memo"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.memo}
              variant="outlined"
            />
            <Box sx={{ py: 2 }}>
              <Button
                color="primary"
                // disabled={formik.isSubmitting}
                fullWidth
                size="large"
                type="submit"
                variant="contained"
              >
                Submit
              </Button>
            </Box>
          </form>
        </Container>
      </Box>
    </>
  );
};

export default CreateDog;
