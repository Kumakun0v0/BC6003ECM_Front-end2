import Head from "next/head";
import NextLink from "next/link";
import { useRouter } from "next/router";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Box, Button, Container, Grid, Link, TextField, Typography } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import React, { useEffect } from "react";
import { useCookies } from "react-cookie";

const Logout = () => {
  const router = useRouter();

  const [cookies, setCookie] = useCookies(["token"]);

  const removeCookies = () => {
    setCookie("token", "", { path: "/" });
  };

  useEffect(() => {
    removeCookies();
  }, []);

  return (
    <>
      <Head>
        <title>Login</title>
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
          <NextLink href="/" passHref>
            <Button component="a" startIcon={<ArrowBackIcon fontSize="small" />}>
              Dashboard
            </Button>
          </NextLink>
          <Box sx={{ my: 3 }}>
              <Typography color="textPrimary" variant="h4">
                Logout
              </Typography>
              <Typography color="textSecondary" gutterBottom variant="body2">
                Logout Success!
              </Typography>
            </Box>
        </Container>
      </Box>
    </>
  );
};

export default Logout;
