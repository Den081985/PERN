const { useState, useCallback } = require("react");

//кастомный хук для работы с запросми к серверу
/**
 * Хук useCallback вернёт мемоизированную версию колбэка, который изменяется только, если изменяются
 *  значения одной из зависимостей. Это полезно при передаче колбэков оптимизированным дочерним
 * компонентам, которые полагаются на равенство ссылок для предотвращения ненужных рендеров
 *
 */
export const useHttp = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const request = useCallback(
    async (url, method = "GET", body = null, headers = {}) => {
      setLoading(true);
      try {
        if (body) {
          body = JSON.stringify(body);
          headers["Content-Type"] = "application/json";
        }

        const response = await fetch(url, {
          method,
          body,
          headers,
        });
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || "Request Error");
        }

        setLoading(false);
        return data;
      } catch (error) {
        setLoading(false);
        setError(error.message);
        throw error;
      }
    },
    []
  );
  //функция удаления ошибок

  const cleanError = useCallback(() => setError(null), []);
  return { loading, error, request, cleanError };
};
