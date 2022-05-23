import Head from "next/head";
import { Box, Container, Grid } from "@mui/material";
import { LatestOrders } from "../components/dashboard/latest-orders";
import { DashboardLayout } from "../components/dashboard-layout";
import { useCookies } from "react-cookie";
import { useEffect } from "react";
import { useRouter } from "next/router";

const Dashboard = () => {
  const [cookies, setCookie] = useCookies(["token"]);

  const isExistCookies = () => {
    if (cookies.token) {
      return true;
    }
    return false;
  };
  const router = useRouter();

  useEffect(() => {
    if (!isExistCookies()) {
      router.push("/login");
    }
  });
  return (
    <>
      <Head>
        <title>Dashboard</title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8,
        }}
      >
        <Container maxWidth={false}>
          <Grid container spacing={3}>
            <Grid item lg={8} md={12} xl={9} xs={12}>
              <LatestOrders />
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  );
};

Dashboard.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Dashboard;
