/* eslint-disable react-hooks/exhaustive-deps */
import { useStore } from "@hooks/useStore";
import { Dashboard } from "@pages/Dashboard";
import { Login } from "@pages/Login";
import { observer } from "mobx-react-lite";
import React, { useEffect } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router";

const ProtectedRoute = observer(({ element }: { element: React.ReactNode }) => {
  const { authCtrl } = useStore();

  if (!authCtrl.user) {
    return <Navigate to="/login" replace />;
  }
  return element;
});

const OutsideRoute = observer(({ element }: { element: React.ReactNode }) => {
  const { authCtrl } = useStore();

  if (authCtrl.user) {
    return <Navigate to="/" replace />;
  }
  return element;
});

function App() {
  const { authCtrl } = useStore();

  useEffect(() => {
    authCtrl.setUserFromSession();
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<OutsideRoute element={<Login />} />} />
        <Route path="/" element={<ProtectedRoute element={<Dashboard />} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
