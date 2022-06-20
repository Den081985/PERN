import React from "react";
import { useContext } from "react";
import { useEffect } from "react";
import { useCallback } from "react";
import { useState } from "react";
import { LinkList } from "../components/LinkList";
import { Loader } from "../components/Loader";
import { AuthContext } from "../context/AuthContext";
import { useHttp } from "../hooks/http.hooks";

const LinksPage = () => {
  const { loading, request } = useHttp();
  const { token } = useContext(AuthContext);

  const [links, setLinks] = useState([]);

  const linksHandler = useCallback(async () => {
    try {
      const fetched = await request("/api/links/", "GET", null, {
        Authorization: `Bearer ${token}`,
      });
      console.log(fetched);
      setLinks(fetched);
    } catch (error) {}
  }, [request, token]);

  useEffect(() => {
    linksHandler();
  }, [linksHandler]);

  if (loading) {
    return <Loader />;
  }
  return <>{!loading && <LinkList links={links} />}</>;
};

export default LinksPage;
