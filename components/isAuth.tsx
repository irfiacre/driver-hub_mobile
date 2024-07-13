"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "expo-router";
import { findLocalUser } from "@/services/database/helpers";

export default function isAuth(Component: any) {
  return function IsAuth(props: any) {
    const [user, setUser] = useState(null);
    const router = useRouter();

    useEffect(() => {
      (async () => {
        const localUser = await findLocalUser();
        if (localUser) {
          setUser(localUser);
        } else {
          return router.replace("/");
        }
      })();
    }, []);

    if (!user) {
      return null;
    }

    return <Component user={user} {...props} />;
  };
}
