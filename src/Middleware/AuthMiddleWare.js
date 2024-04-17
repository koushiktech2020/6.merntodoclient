import { Routes, Route, Navigate } from "react-router-dom";
import { publicRoutes, protectedRoutes } from "Routes/Routes";

const AuthMiddleWare = () => {
  let token = null;

  token = localStorage.getItem("token");

  return (
    <Routes>
      {/* ====== mapping of non authenticated routes start ====== */}

      {!token &&
        publicRoutes.map((routename, index) => (
          <Route
            path={routename.path}
            element={<routename.element />}
            exact
            key={index}
          />
        ))}

      {/* ====== mapping of non authenticated routes end ====== */}

      {/* ====== mapping of authenticated route start ====== */}

      {token &&
        protectedRoutes.map((routename, index) => (
          <Route
            path={routename.path}
            element={<routename.element />}
            exact
            key={index}
          />
        ))}

      {/* ====== mapping of authenticated route end ====== */}

      {/* ====== default redirect to dashboard ======= */}

      {token ? (
        <Route path="*" element={<Navigate to="/todoapp" replace />} />
      ) : (
        <Route path="*" element={<Navigate to="/" replace />} />
      )}
    </Routes>
  );
};

export default AuthMiddleWare;
