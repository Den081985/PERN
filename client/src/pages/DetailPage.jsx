import React, { useCallback, useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { LinkCard } from "../components/LinkCard";
import { Loader } from "../components/Loader";
import { AuthContext } from "../context/AuthContext";
import { useHttp } from "../hooks/http.hooks";

const DetailPage = () => {
  const { token } = useContext(AuthContext);
  const { request, loading } = useHttp();
  const [link, setLink] = useState(null);
  //получаем id из эндпоинта
  const linkId = useParams().id;

  //функция загрузки ссылки
  const linkHandler = useCallback(async () => {
    try {
      const fetched = await request(`/api/links/${linkId}`, "GET", null, {
        Authorization: `Bearer ${token}`,
      });
      // console.log(fetched);
      setLink(fetched);
    } catch (error) {}
  }, [token, linkId, request]);
  // console.log(link);

  useEffect(() => {
    linkHandler();
  }, [linkHandler]);

  if (loading) {
    return <Loader />;
  }
  return <>{!loading && link && <LinkCard link={link} />}</>;
};

export default DetailPage;
