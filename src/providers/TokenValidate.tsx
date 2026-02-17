import { Grid } from "@mui/material";
import { FC, JSX, useEffect, useMemo, useState } from "react";

import { userContext, UserWithToken } from "../contexts/userContext";
// import img from "../assets/Loading_short.gif";
import { ApiRepository } from "../data/repository";
import { ApiResponse } from "../data/response";
import { User } from "../models/user";

interface Props {
  token?: string;
  children: (data: UserWithToken) => JSX.Element;
}

export const TokenValidate: FC<Props> = ({ token, children }) => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<ApiResponse<User>>();

  useEffect(() => {
    setLoading(true);
    ApiRepository.validarToken(token as string)
      .then(setData)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [token]);

  const providerValue = useMemo<UserWithToken | undefined>(() => {
    if (!data || data.error) {
      return undefined;
    }

    return { ...data.data, token: token as string };
  }, [data, token]);

  if (loading) {
    return (
      <Grid
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "50vh",
        }}
      >
        <img
          // src={img}
          src="https://c.tenor.com/8mLhYjYpXoAAAAAC/loading-cat.gif"
          alt="loading"
          style={{ maxWidth: "35%", maxHeight: "35%" }}
        />
      </Grid>
    );
  }

  if (!data) {
    return <h1>Token no encontrado</h1>;
  }
  if (data.error) {
    return <h1>{data.message}</h1>;
  }

  if (!providerValue) {
    return <h1>Token no encontrado</h1>;
  }

  return (
    <userContext.Provider value={providerValue}>
      {children(providerValue)}
    </userContext.Provider>
  );
};
