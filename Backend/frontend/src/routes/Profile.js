import React, { useEffect, useState } from "react";
import Paper from "@mui/material/Paper";
import Sidebar from "../components/Base/Sidebar";

export default function Profile() {
  const e = Sidebar.useremail;

  return <Paper>{e}</Paper>;
}
