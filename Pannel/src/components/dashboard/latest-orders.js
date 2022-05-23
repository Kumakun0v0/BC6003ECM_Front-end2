import PerfectScrollbar from "react-perfect-scrollbar";
import {
  Box,
  Button,
  Card,
  CardHeader,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import { SeverityPill } from "../severity-pill";
import axios from "axios";
import { useState, useEffect } from "react";

export const LatestOrders = (props) => {
  const [orders, setOrders] = useState([]);
  useEffect(async () => {
    console.log("getData...");
    const request = axios.create({
      baseURL: "https://7k21oxn5gh.execute-api.us-east-2.amazonaws.com",
      headers: { "Content-Type": "application/json" },
      withCredentials: false,
    });
    await request
      .get("/dev/dog/adopt")
      .then((response) => {
        console.log("getData... complete");
        console.log(response);
        let result = response.data;
        console.log(result);
        setOrders(result);
      })
      .catch((error) => {
        console.log("getData... error");
        console.log(error);
      });
  }, []);

  return (
    <Card {...props}>
      <CardHeader title="Latest Orders" />
      <PerfectScrollbar>
        <Box sx={{ minWidth: 800 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Dog Name</TableCell>
                <TableCell>Customer</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {orders.map((order) => (
                <TableRow hover key={order.dog_name}>
                  <TableCell>{order.dog_name}</TableCell>
                  <TableCell>{order.user_name}</TableCell>
                  <TableCell>{order.email}</TableCell>
                  <TableCell>
                    <SeverityPill
                      color={
                        (order.status === "delivered" && "success") ||
                        (order.status === "pending" && "warning") ||
                        "error"
                      }
                    >
                      {order.status}
                    </SeverityPill>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Box>
      </PerfectScrollbar>
      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-end",
          p: 2,
        }}
      >
        <Button
          color="primary"
          endIcon={<ArrowRightIcon fontSize="small" />}
          size="small"
          variant="text"
        >
          View all
        </Button>
      </Box>
    </Card>
  );
};
