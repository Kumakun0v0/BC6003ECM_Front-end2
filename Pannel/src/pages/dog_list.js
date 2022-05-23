import Head from "next/head";
import NextLink from "next/link";
import { useRouter } from "next/router";
import { Formik } from "formik";
import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
  Card,
  CardContent,
  CardMedia,
  CardActions,
  Grid,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import React from "react";
import { useCookies } from "react-cookie";
import { useEffect, useState } from "react";
import axios from "axios";

const DogList = () => {
  const router = useRouter();
  const [cookies, setCookie] = useCookies(["token"]);

  const isExistCookies = () => {
    if (cookies.token) {
      return true;
    }
    return false;
  };

  useEffect(() => {
    if (!isExistCookies()) {
      router.push("/login");
    }
  });

  const [dogs, setDogs] = useState([]);
  useEffect(async () => {
    console.log("getData...");
    const request = axios.create({
      baseURL: "https://7k21oxn5gh.execute-api.us-east-2.amazonaws.com",
      headers: { "Content-Type": "application/json" },
      withCredentials: false,
    });
    await request
      .get("/dev/dog")
      .then((response) => {
        console.log("getData... complete");
        console.log(response);
        let result = response.data;
        console.log(result);
        setDogs(result);
      })
      .catch((error) => {
        console.log("getData... error");
        console.log(error);
      });
  }, []);

  return (
    <>
      <Head>
        <title>Dog List</title>
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
        <Container maxWidth={false}>
          <NextLink href="/order" passHref>
            <Button component="a" startIcon={<ArrowBackIcon fontSize="small" />}>
              Dashboard
            </Button>
          </NextLink>
          <Grid container spacing={3}>
            {dogs.map((dog) => (
              <Grid item lg={3} sm={3} xl={3} xs={12} key={dog.id}>
                <Formik
                  initialValues={{ uid: dog.id, memo: dog.memo, action: "" }}
                  onSubmit={(values) => {
                    if (values.action === "delete") {
                      const request = axios.create({
                        baseURL: "https://7k21oxn5gh.execute-api.us-east-2.amazonaws.com",
                      });
                      request.delete(`/dev/dog/${values.uid}`).then((response) => {
                        console.log(response);
                        router.reload();
                      });
                    } else if (values.action === "modify") {
                      const request = axios.create({
                        baseURL: "https://7k21oxn5gh.execute-api.us-east-2.amazonaws.com",
                        headers: { "Content-Type": "application/json" },
                        withCredentials: false,
                      });
                      request
                        .put(`/dev/dog/${values.uid}`, { memo: values.memo })
                        .then((response) => {
                          console.log(response);
                          router.reload();
                        });
                    }
                  }}
                >
                  {(props) => (
                    <form onSubmit={props.handleSubmit}>
                      <Card sx={{ maxWidth: 345 }}>
                        <CardMedia
                          component="img"
                          height="140"
                          image={dog.image.original}
                          alt="green iguana"
                        />
                        <CardContent>
                          <Typography gutterBottom variant="h5" component="div">
                            {dog.name}
                          </Typography>
                          <TextField
                            error={Boolean(props.touched.memo && props.errors.memo)}
                            fullWidth
                            helperText={props.touched.memo && props.errors.memo}
                            margin="normal"
                            name="memo"
                            onBlur={props.handleBlur}
                            onChange={props.handleChange}
                            type="memo"
                            value={props.values.memo}
                            variant="outlined"
                          />
                        </CardContent>
                        <TextField
                          error={Boolean(props.touched.uid && props.errors.uid)}
                          fullWidth
                          helperText={props.touched.uid && props.errors.uid}
                          margin="normal"
                          name="uid"
                          onBlur={props.handleBlur}
                          onChange={props.handleChange}
                          type="uid"
                          value={dog.id}
                          variant="outlined"
                          disabled
                        />
                        <CardActions>
                          <Button
                            size="small"
                            type="submit"
                            name="action"
                            value="modify"
                            onClick={props.handleChange}
                          >
                            Modify
                          </Button>
                          <Button
                            size="small"
                            type="submit"
                            name="action"
                            value="delete"
                            onClick={props.handleChange}
                          >
                            Delete
                          </Button>
                        </CardActions>
                      </Card>
                    </form>
                  )}
                </Formik>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>
    </>
  );
};

export default DogList;
