"use client";
import React, { Fragment, useEffect, useState } from "react";
import { Stack, TextField, Card, Button } from "@mui/material"; // Removed Card as it's unused
import Link from "next/link";
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

const LoginPage = () => {
  const router = useRouter();
  const [disableLoginBtn, setDisableLoginBtn] = useState(true);
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  useEffect(() => {
    // Email validation regex
    const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(user.email);
    if (isValidEmail && user.password.length >= 3) {
      setDisableLoginBtn(false);
    } else {
      setDisableLoginBtn(true);
    }
  }, [user]);

  const onLogin = async () => {
    setLoading(true);
    try {
      const loginResponse = await axios.post("api/users/login", user);
      console.log("loginResponsen", loginResponse.data);
      const userId = loginResponse.data.id;
      console.log("userId", userId);
      if (!loginResponse.data.userVerified) {
        toast.error("User Not verified", {
          duration: 4000,
          position: "top-right",
        });
        router.push(`/verifyemail`);
      } else {
        if (loginResponse.data.status == 200) {
          toast.success(loginResponse.data.message, {
            duration: 4000,
            position: "top-right",
          });

          // router.push(`/profile/${userId}`);
          router.push(`/verifyemail`);
        } else {
          toast.error(loginResponse.data.message, {
            duration: 4000,
            position: "top-right",
            style: {},
          });
        }
      }
    } catch (error) {
      toast.error(error.message);
      console.log("Login error", error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Fragment>
      <Stack
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: "100%",
          height: "100vh", // Adjusted height to 100vh for full screen
        }}
      >
        <Card
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: 3,
            p: 3,
            width: "300px",
          }}
        >
          <h1>{loading ? "Loading ... ..." : "Login"}</h1>
          <TextField
            fullWidth
            size="small"
            label="E-Mail"
            onChange={(e) => {
              setUser({ ...user, email: e.target.value });
            }}
          />
          <TextField
            fullWidth
            size="small"
            label="Password"
            onChange={(e) => {
              setUser({ ...user, password: e.target.value });
            }}
          />
          <Button
            disabled={disableLoginBtn}
            variant="contained"
            onClick={onLogin}
          >
            Login
          </Button>
          <Link href={"/signup"}> Create New Account ? Signup...</Link>
        </Card>
      </Stack>
    </Fragment>
  );
};

export default LoginPage;
