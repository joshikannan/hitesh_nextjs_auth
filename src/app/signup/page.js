"use client";
import React, { Fragment, useEffect, useState } from "react";
import { Stack, TextField, Card, Button } from "@mui/material"; // Removed Card as it's unused
import Link from "next/link";
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

const SignupPage = () => {
  const router = useRouter();
  const [disableSignupBtn, setDisableSignupBtn] = useState(true);
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState({
    username: "",
    email: "",
    password: "",
  });
  useEffect(() => {
    if (
      user.username.length > 0 &&
      user.email.length > 0 &&
      user.password.length > 0
    ) {
      setDisableSignupBtn(false);
    } else {
      setDisableSignupBtn(true);
    }
  }, [user]);

  const onSignup = async () => {
    setLoading(true);
    console.log(user);
    // try {
    //   const signupResponse = await axios.post("api/users/signup", user);
    //   if (signupResponse.data.status == 201) {
    //     toast.success(signupResponse.data.message, {
    //       duration: 4000,
    //       position: "top-right",
    //     });
    //     // router.push("/login");
    //     router.push("/verifyemail");
    //   } else {
    //     toast.error(signupResponse.data.message, {
    //       duration: 4000,
    //       position: "top-right",
    //       style: {},
    //     });
    //   }
    //   if (signupResponse.data.emailstatus) {
    //     toast.success(signupResponse.data.email, {
    //       duration: 6000,
    //       position: "top-right",
    //       style: {},
    //     });
    //   } else {
    //     toast.error(signupResponse.data.email, {
    //       duration: 6000,
    //       position: "top-right",
    //       style: {},
    //     });
    //   }

    //   console.log("signupResponse", signupResponse.data);
    // } catch (error) {
    //   toast.error(error.message);
    //   console.log("Signup error", error.message);
    // } finally {
    //   setLoading(false);
    // }
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
          <h1>{loading ? "Loading ... ..." : "Signup"}</h1>
          <TextField
            fullWidth
            size="small"
            label="User Name"
            onChange={(e) => {
              setUser({ ...user, username: e.target.value });
            }}
          />
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
            disabled={disableSignupBtn}
            variant="contained"
            onClick={onSignup}
          >
            Signup
          </Button>
          <Link href={"/login"}> Already have an account ? Login...</Link>
        </Card>
      </Stack>
    </Fragment>
  );
};

export default SignupPage;
